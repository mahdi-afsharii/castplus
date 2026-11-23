'use client'
import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { BsChatLeftQuoteFill } from "react-icons/bs";
import { PiBookOpenFill } from "react-icons/pi";
import {BsPlayFill, BsPauseFill} from 'react-icons/bs'
import PodcastIcon from "@/app/img/podcast-icon.png"
import Image from 'next/image';
import { vazir } from '../../utils/fonts';
import { useContext } from 'react';
import { EpisodeContext } from '@/app/context/EpisodeContext';
import Controller from './Controller';
import TranscriptModal from './TranscriptModal';
import ChapterModal from './ChapterModal';

const EpisodePlayer = () => {
  const { episode, playerOpened, podcast, setPlayerOpened, audio } = useContext(EpisodeContext);
  const [isPlayerCollapsed, setIsPlayerCollapsed] = useState(false)
  const [closeAnimate, setCloseAnimate] = useState(false);
  const [openAnimate, setOpenAnimate] = useState(false);
  const [miniPlayerEnter, setMiniPlayerEnter] = useState(false);
  const [imageWidth, setImageWidth] = useState(220);
  const [imageHeight, setImageHeight] = useState(220);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [isChapterOpen , setIsChapterOpen] = useState(false)

  const togglePlay = () => {
    audio.paused ? audio.play() : audio.pause();
  }

  const collapseClose = () => {
    setCloseAnimate(true);
  }

  const collapseOpen = () => {
    setOpenAnimate(true);
  }
  
  return (
    <>
      <div className={isPlayerCollapsed ? "fixed flex justify-center w-full lg:bottom-5 bottom-[90px] z-[51]" : "hidden"}>
        <div id='mini-player-container' className={`${vazir.className} ${'flex justify-between items-center backdrop-blur-md bg-gray-50/80 w-full h-16 rounded-[20px] shadow-2xl mx-7'} ${miniPlayerEnter ? "music-player-enter" : ""}`}>
          <div className='grid grid-cols-6 w-full'>
            <div id='mini-player-content' className='grid gap-3 p-3 col-span-5 grid-cols-5' onClick={() => {setIsPlayerCollapsed(false); collapseOpen()}} >
              <div className='relative col-span-1'>
                <Image alt='Episode Thumbnail' src={episode.thumbnail ? episode.thumbnail : PodcastIcon} width={45} height={45} id='mini-player-image-shadow' className='absolute min-w-[45px] min-h-[45px] -top-[3px] left-0 rounded-xl' />
                <Image alt='Episode Thumbnail' src={episode.thumbnail ? episode.thumbnail : PodcastIcon} width={45} height={45} className='absolute min-w-[45px] min-h-[45px] -top-[3px] left-0 rounded-xl' />
              </div>
              <div id='mini-player-detail' className='flex flex-col col-span-4'>
                <span className='font-bold text-sm line-clamp-1'>{ episode.title }</span>
                <span className='text-gray-400 text-xs line-clamp-1'>{podcast&& podcast[0].name }</span>
              </div>
            </div>
            <div id='mini-player-handler col-span-1 ' className='flex items-center'>
              <div onClick={togglePlay} className='p-3'>
                {audio && audio.paused ? <BsPlayFill className='text-black text-3xl' /> : <BsPauseFill  className='text-black text-3xl'/>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${vazir.className} ${isPlayerCollapsed ? 'hidden' : "block"}`}>
        <div className={`${playerOpened ? "block" : "hidden"} ${'fixed overflow-y-auto scrollbar-hide bottom-0 w-full h-full bg-black z-[51] collapse-animation'} ${closeAnimate ? "collapse-close-animation" : ""} ${openAnimate ? "collapse-open-animation" : ""}`} 
        onAnimationEnd={(e) => {
          if (e.animationName === 'collapse_close') {
            setIsPlayerCollapsed(true);
            setCloseAnimate(false);
            setMiniPlayerEnter(true)
          }
          if (e.animationName === 'collapse_open') {
            setIsPlayerCollapsed(false);
            setOpenAnimate(false);
          }
        }}>
          <div className='max-lg:container mx-auto lg:px-10'>
              <div id='navigator' className='flex justify-between mt-3'>
                <span><IoIosArrowDown className='hover:bg-Ink text-white text-3xl p-2 rounded-full box-content duration-200' onClick={collapseClose} /></span>
                <span onClick={() => setPlayerOpened(false)}><IoClose className='hover:bg-Ink text-white text-3xl p-2 rounded-full box-content duration-200' /></span>
              </div>
          </div>
          <div className='lg:grid grid-cols-10 gap-10 lg:px-10'>
            <div className='col-span-4 flex flex-col items-center'>
              <div id='thumbnail' className='relative flex justify-center mt-5 lg:h-[180px] lg:w-[180px] h-[220px] w-[220px]'>
                <Image id='episode-image-shadow' alt={"Episode Image"} src={episode.thumbnail ? episode.thumbnail : PodcastIcon} width={imageWidth} height={imageHeight} className={`${'absolute top-0 rounded-[35px] duration-300'}`} />
                <Image alt={"Episode Image"} src={episode.thumbnail ? episode.thumbnail : PodcastIcon} width={imageWidth} height={imageHeight} className={`${'absolute top-0 rounded-[35px] duration-300'}`} />
              </div>
              <div id='details' className='flex flex-col text-center mt-6'>
                <span id='title' className='text-xl font-bold line-clamp-1 text-white'>{ episode.title }</span>
                <span id='athur' className='text-sm text-gray-400'>{podcast && podcast[0].name }</span>
              </div>
              <div id='sections' className='relative'></div>
              <div id='progressbar'></div>
              <div id='controller' className='w-full'>
                <Controller url={episode.url} episode={episode} isPlayerOpened={playerOpened} playerCollapsed={isPlayerCollapsed} setImgWidth={setImageWidth} setImgHeight={setImageHeight} />
              </div>
              <div id='player-dock' className='lg:hidden flex items-center gap-[2px] rounded-full overflow-hidden mb-2'>
                <span className='flex items-center px-6 py-3 rounded-lg bg-Ink text-white text-2xl box-content h-6 w-6 cursor-pointer' onClick={() => setIsChapterOpen(true)}><PiBookOpenFill /></span>
                <span className='flex items-center px-6 py-3 rounded-lg bg-Ink text-white text-xl box-content h-6 w-6 cursor-pointer' onClick={() => setIsTranscriptOpen(true)}><BsChatLeftQuoteFill /></span>
              </div>
            </div>
            <div className='col-span-3'>

              <ChapterModal chapterOpen={isChapterOpen} setChapterOpen={setIsChapterOpen} />
            </div>
            <div className='col-span-3'>
              <TranscriptModal episodeDetail={episode} transcriptOpen={isTranscriptOpen} setTranscriptOpen={setIsTranscriptOpen} />

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EpisodePlayer