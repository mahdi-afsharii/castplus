"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

/**
 * CastPlusScrubWaveform
 *
 * Uses an existing HTMLAudioElement through the `media` prop.
 * The same audio element is used for playback and waveform interaction.
 */
export default function CastPlusScrubWaveform({
  media,
  height = 58,
  barWidth = 3,
  barGap = 2,
  barRadius = 3,
  waveColor = "#64748B",
  progressColor = "#418FF4",
  cursorColor = "#FFFFFF",
  minPxPerSec = 90,
  className = "",
  onReady,
  onDurationChange,
  onTimeUpdate,
  onPlay,
  onPause,
}) {
  const hostRef = useRef(null);
  const viewportRef = useRef(null);
  const waveRef = useRef(null);
  const rafRef = useRef(0);

  const callbacksRef = useRef({
    onReady,
    onDurationChange,
    onTimeUpdate,
    onPlay,
    onPause,
  });

  // Keep the latest callbacks without rebuilding WaveSurfer on every render.
  callbacksRef.current = {
    onReady,
    onDurationChange,
    onTimeUpdate,
    onPlay,
    onPause,
  };

  const dragRef = useRef({
    active: false,
    pointerId: null,
    lastX: 0,
    wasPlaying: false,
    moved: false,
    seekRaf: 0,
  });

  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!hostRef.current || !media) return;

    // WaveSurfer needs the URL to decode and draw the waveform.
    // `media` ensures playback uses the existing HTMLAudioElement.
    const audioUrl = media.currentSrc || media.src;

    if (!audioUrl) {
      console.warn("CastPlus waveform: media element has no audio source.");
      return;
    }

    setReady(false);
    setDuration(0);

    const ws = WaveSurfer.create({
      container: hostRef.current,
      url: audioUrl,
      media,
      height,
      waveColor,
      progressColor,
      cursorColor: "transparent",
      cursorWidth: 0,
      barWidth,
      barGap,
      barRadius,
      barHeight: 0.9,
      normalize: true,
      minPxPerSec,
      fillParent: false,
      autoScroll: false,
      autoCenter: false,
      interact: false,
      dragToSeek: false,
      hideScrollbar: true,
    });

    waveRef.current = ws;

    function startFollow() {
      cancelAnimationFrame(rafRef.current);

      const tick = () => {
        const viewport = viewportRef.current;
        const instance = waveRef.current;

        if (!viewport || !instance || !instance.isPlaying()) return;

        const pxPerSec = instance.options.minPxPerSec || minPxPerSec;
        const target = Math.max(0, instance.getCurrentTime() * pxPerSec);

        if (!dragRef.current.active) {
          viewport.scrollLeft = target;
        }

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    }

    const onWsReady = (loadedDuration) => {
      setDuration(loadedDuration);
        setReady(true);

      // onReady always receives the actual HTMLAudioElement.
      callbacksRef.current.onReady?.(media);
      callbacksRef.current.onDurationChange?.(loadedDuration);

      requestAnimationFrame(() => {
        const viewport = viewportRef.current;
        if (viewport) {
          const pxPerSec = ws.options.minPxPerSec || minPxPerSec;
          viewport.scrollLeft = Math.max(0, media.currentTime * pxPerSec);
        }
      });
    };

    const onWsTime = (time) => {
      callbacksRef.current.onTimeUpdate?.(time);
    };

    const onWsPlay = () => {
      callbacksRef.current.onPlay?.();
      startFollow();
    };

    const onWsPause = () => {
      callbacksRef.current.onPause?.();
      cancelAnimationFrame(rafRef.current);
    };

    const onWsFinish = () => {
      cancelAnimationFrame(rafRef.current);
    };

    ws.on("ready", onWsReady);
    ws.on("timeupdate", onWsTime);
    ws.on("play", onWsPlay);
    ws.on("pause", onWsPause);
    ws.on("finish", onWsFinish);
    ws.on("error", (error) => {
      console.error("CastPlus waveform:", error);
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(dragRef.current.seekRaf);
      ws.destroy();

      if (waveRef.current === ws) {
        waveRef.current = null;
      }
    };
  }, [
    media,
    height,
    barWidth,
    barGap,
    barRadius,
    waveColor,
    progressColor,
    minPxPerSec,
  ]);

  const seekFromScroll = useCallback(
    (scrollLeft) => {
      const ws = waveRef.current;

      if (!ws || !duration) return;

      const pxPerSec = ws.options.minPxPerSec || minPxPerSec;
      const nextTime = Math.max(
        0,
        Math.min(duration, scrollLeft / pxPerSec)
      );

      ws.setTime(nextTime);
    },
    [duration, minPxPerSec]
  );

  const onPointerDown = (event) => {
    if (!ready || !viewportRef.current) return;

    const ws = waveRef.current;
    const state = dragRef.current;

    state.active = true;
    state.pointerId = event.pointerId;
    state.lastX = event.clientX;
    state.wasPlaying = ws?.isPlaying() ?? false;
    state.moved = false;

    cancelAnimationFrame(rafRef.current);

    viewportRef.current.setPointerCapture?.(event.pointerId);
    viewportRef.current.style.cursor = "grabbing";

    // Pause while scrubbing for stable seeking.
    if (state.wasPlaying) {
      ws.pause();
    }
  };

  const onPointerMove = (event) => {
    const state = dragRef.current;
    const viewport = viewportRef.current;

    if (!state.active || !viewport || state.pointerId !== event.pointerId) {
      return;
    }

    const dx = event.clientX - state.lastX;

    if (Math.abs(dx) > 0) {
      state.moved = true;
    }

    state.lastX = event.clientX;

    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const nextScroll = Math.max(
      0,
      Math.min(maxScroll, viewport.scrollLeft - dx)
    );

    viewport.scrollLeft = nextScroll;

    cancelAnimationFrame(state.seekRaf);

    state.seekRaf = requestAnimationFrame(() => {
      seekFromScroll(nextScroll);
    });

    event.preventDefault();
  };

  const finishDrag = (event) => {
    const state = dragRef.current;
    const viewport = viewportRef.current;
    const ws = waveRef.current;

    if (!state.active || (event && state.pointerId !== event.pointerId)) {
      return;
    }

    state.active = false;

    cancelAnimationFrame(state.seekRaf);

    viewport?.releasePointerCapture?.(state.pointerId);

    if (viewport) {
      viewport.style.cursor = "grab";
    }

    // Apply the final seek, then resume if playback was active before dragging.
    if (viewport) {
      seekFromScroll(viewport.scrollLeft);
    }

    if (state.wasPlaying) {
      requestAnimationFrame(() => {
        ws?.play();
      });
    }

    state.pointerId = null;
  };

  return (
    <section
      className={`w-full select-none ${className}`}
      aria-label="Audio waveform player"
    >
      <div className="relative overflow-hidden rounded-lg">
        <div
          ref={viewportRef}
          className="overflow-x-hidden touch-pan-y"
          style={{
            height,
            cursor: ready ? "grab" : "default",
            touchAction: "pan-y",
            overscrollBehavior: "contain",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onLostPointerCapture={finishDrag}
        >
          <div
            className="relative h-full"
            style={{
              width: duration
                ? `${duration * minPxPerSec + (viewportRef.current?.clientWidth || 0)}px`
                : "100%",
              minWidth: "100%",
            }}
          >
            <div
              ref={hostRef}
              className="absolute inset-y-0"
              style={{
                left: viewportRef.current
                  ? `${viewportRef.current.clientWidth / 2}px`
                  : "50%",
                width: duration
                  ? `${Math.max(1, duration * minPxPerSec)}px`
                  : "100%",
              }}
            />
          </div>
        </div>

        {/* Fixed playhead: the waveform moves underneath it. */}
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 z-10 -translate-x-1/2"
          style={{
            width: 2,
            background: cursorColor,
            boxShadow: "0 0 8px rgba(0,0,0,.25)",
          }}
        />
      </div>
    </section>
  );
}
