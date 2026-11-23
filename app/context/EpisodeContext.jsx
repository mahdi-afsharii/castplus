"use client";

import { createContext, useState } from "react";

export const EpisodeContext = createContext();

export function EpisodeProvider({ children }) {
  const [episode, setEpisode] = useState([]);
  const [playerOpened, setPlayerOpened] = useState(false);
  const [podcast, setPodcast] = useState(null);
  const [audio, setAudio] = useState(null);
  const [mainSection, setMainSection] = useState(null);

  return (
    <EpisodeContext.Provider
      value={{ episode, setEpisode, playerOpened, setPlayerOpened, podcast, setPodcast, audio, setAudio, mainSection, setMainSection }}
    >
      {children}
    </EpisodeContext.Provider>
  );
}