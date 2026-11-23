'use client'
import { useState, useRef, useEffect, useContext, Suspense } from 'react'
import {BsPlayFill, BsPauseFill} from 'react-icons/bs'
import {ImVolumeHigh, ImVolumeMedium, ImVolumeLow, ImVolumeMute2} from 'react-icons/im'
import {RiForward30Line, RiReplay10Line} from 'react-icons/ri'
import {vazir} from '@/app/utils/fonts'
import Sections from './Sections'
import AudioLoading from './AudioLoading'
import { EpisodeContext } from '@/app/context/EpisodeContext' 
import CastPlusScrubWaveform from "@/app/components/Player/CastPlusScrubWaveform";
import Loading from '../Loading'

const Controller = ({ url , episode, isPlayerOpened, playerCollapsed, setImgWidth, setImgHeight }) => {
	const [play, setPlay] = useState(true);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(0.7);
	const [volumeToggle, setVolumeToggle] = useState(false);
	const [load, setLoad] = useState(true);
	const [previousVolume, setPreviousVolume] = useState(0);
	const [isBuffering, setIsBuffering] = useState(false);
	const { setAudio } = useContext(EpisodeContext)
	const [audioState, setAudioState] = useState(null);
	const audio = useRef();

	useEffect(() => {
		setAudioState(audio.current);
	}, [url]);

	const togglePlay = () => {
		audio.current.paused ? audio.current.play() : audio.current.pause();
		episodeimageWidthHandler()
		setPlay(!play)
	}

	const changeCurrentTime = () => {
		if(audio.current.duration && audio.current.currentTime){
			setCurrentTime(audio.current.currentTime)
			setDuration(audio.current.duration)
		}
	}

	const showTime = (time) => {
		if(time > 60 ){
			let hour =  parseInt(time / 3600)
			let min = parseInt(time % 3600 / 60 , 10 )
			let second = parseInt(time % 60 )

			if(hour < 10) {
				hour = `0${hour}`
			}

			if(min < 10) {
				min = `0${min}`
			}

			if(second < 10) {
				second = `0${second}`
			} return `${hour}:${min}:${second}`
		}
		if(time / 60 < 60) {
			let hour = "00"
			let min = parseInt(time / 60, 10)
			let second = parseInt(time % 60 )

			if(min < 10) {
				min = `0${min}`
			}

			if(second < 10) {
				second = `0${second}`
			} return `${hour}:${min}:${second}`
		}

		else {
			time = parseInt(time, 10)
			if(time < 10) {
				time = `0${time}`
			}
			return `0:${time}`
		}
	}

	const valueProgress = () => {
		var value = (currentTime * 1000) / duration;
		if(isNaN(value)) {
			value = 0;
		}
		return value
	}

	const controllerHandler = (e) => {
		setCurrentTime((e.target.value * duration) / 1000)
		audio.current.currentTime = (e.target.value * duration) / 1000
		audio.current.play()
		setPlay(true)
	}

	const volumeValueProgress = () => {
		var value = volume * 100;
		if(isNaN(value)) {
			value = 100;
		}
		return value
	}

	const volumeHandler = (e) => {
		setVolume((e.target.value / 100));
		audio.current.volume = (e.target.value / 100);
		volumeValueProgress();
	}

	const toggleVolume = () => {
		if(!volumeToggle) {
			setPreviousVolume(volume);
			setVolumeToggle(true);
			setVolume(0)
			audio.current.volume = 0;
		} else {
			setVolumeToggle(false);
			setVolume(previousVolume);
			audio.current.volume = previousVolume;
		}
	}

	const forwardCurrentTime = () => {
		audio.current.currentTime += 30
		setPlay(true);
		audio.current.play();
	}

	const backwardCurrentTime = () => {
		audio.current.currentTime -= 10
		setPlay(true);
		audio.current.play();
	}

	const audioLoaded = () => {
		setLoad(false);
		setDuration(audio.current.duration);
		setAudio(audio.current)
	}

	useEffect(() => {
		if (!isPlayerOpened) {
			audio.current.pause();
			audio.current.currentTime = 0;
			setCurrentTime(0);
			setPlay(false);
		} else {
			audio.current.pause();
		}
		episodeimageWidthHandler()
	}, [isPlayerOpened])

	const episodeimageWidthHandler = () => {
		if (audio.current.paused) {
    	  setImgWidth(180)
    	  setImgHeight(180)
			
    	} else {
    	  setImgWidth(220)
    	  setImgHeight(220)
    	}
	}

  return (
	<div className={`${vazir.className} ${"w-full"}`}>
		{episode.length > 0 && episode.sections.length === 0 ? '' : 
			<Suspense fallback={<Loading />}>
				<Sections isAudioPlay={setPlay} data={audio.current} episodes={episode} playerOpened={isPlayerOpened} isPlayerCollapsed={playerCollapsed} />
			</Suspense>
		}

		<audio ref={audio} src={url} onTimeUpdate={(e) =>{changeCurrentTime(e)}} onEnded={togglePlay} onCanPlayThrough={audioLoaded} autoPlay preload="metadata" onWaiting={() => setIsBuffering(true)} onCanPlay={() => setIsBuffering(false)} ></audio>

		<div className="controller w-full flex flex-row justify-center rounded-xl px-6 py-3">
			{load ? <AudioLoading /> : <div className='flex flex-col w-full'>
				<div className="flex flex-col items-center w-full">
					<div className="flex items-center w-full">
						<div className='w-full'>
							<CastPlusScrubWaveform
							media={audioState}
							height={70}
							barWidth={3}
							barGap={2}
							waveColor="#334155"
							progressColor="#ffffff"
							/>
							<div className='flex justify-between'>
								<p className='hidden md:block md:text-md text-sm mt-3 md:mt-0 text-gray-400'> {showTime(currentTime)} </p>
								<p className='hidden md:block md:text-md text-sm mt-3 md:mt-0 text-gray-400'> {showTime(duration)} </p>
							</div>
						</div>
					</div>
					<div className="w-full mt-1">
						<div className='col-span-1'>
							<div className="flex justify-between md:hidden">
								<p className='text-xs text-gray-400'> {showTime(currentTime)} </p>
								<p className='text-xs text-gray-400'> {showTime(duration)} </p>
							</div>
						</div>
						<div className='flex justify-center items-center col-span-1 space-x-2 mt-2'>
							<span onClick={backwardCurrentTime} className='p-3 rounded-full text-4xl text-white'><RiReplay10Line className='text-md text-white' /></span>
							{isBuffering ? <div className='flex items-center bg-white rounded-full p-1'><span className="w-14 h-14 inline-block animate-spin rounded-full border-[3px] border-black border-t-gray-300 box-content"></span></div> : 
							<div className='bg-white rounded-full w-fit p-4 md:mt-0' onClick={togglePlay}>
								{audio.current.paused ? <BsPlayFill className='text-black text-4xl' /> : <BsPauseFill  className='text-black text-4xl'/>}
							</div> }
							<span onClick={forwardCurrentTime} className='p-3 rounded-full text-4xl text-white'><RiForward30Line  className='text-md text-white' /></span>
						</div>
					</div>
					<div className='volume-body flex items-center w-full mt-4'>
						<span className='volume-icon rounded-full p-2 duration-150'><ImVolumeMute2 className='text-lg text-white'/></span>
						<div className='volume-input flex items-center w-full h-10 p-2 rounded-md shadow-md duration-100'>
							<input id='progressBar' className='w-full controller-input' type="range" min='0' max='100' onChange={(e) => volumeHandler(e)} value={volumeValueProgress()}/>
						</div>
						<span className='volume-icon rounded-full p-2 duration-150' onClick={toggleVolume}>
							{volume >= 0 && volume <= .33 ? <ImVolumeLow className='text-lg text-white'/> : volume > .33 && volume <= .66 ? <ImVolumeMedium className='text-lg text-white'/> : <ImVolumeHigh className='text-lg text-white' />}
						</span>
					</div>
				</div>
			</div>}
		</div>
		
	</div>
  )
}

export default Controller