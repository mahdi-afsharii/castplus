import React, { useContext } from 'react'
import { EpisodeContext } from '@/app/context/EpisodeContext'
import { IoClose } from 'react-icons/io5'

const ChapterModal = ({ chapterOpen, setChapterOpen }) => {
    const { episode, mainSection, audio } = useContext(EpisodeContext)
    
    const changeCurrentTime = (time) => {
        audio.currentTime = time;
        audio.play();
        console.log('play');
        
    }

  return (
    <div className={`${chapterOpen ? "max-lg:fixed" : "max-lg:hidden"} ${'top-0 bg-black w-full h-full z-50'}`}>
        <div className='lg:hidden flex relative justify-between my-2'>
            <span className='cursor-pointer' onClick={() => setChapterOpen(false)}><IoClose className='text-white text-3xl p-3 box-content'></IoClose></span>
        </div>
        <div className='overflow-y-auto scrollbar-hide lg:h-[92vh] h-[85vh]'>
            <div className='max-lg:container mx-auto'>
                {episode.sections&& episode.sections.map((section) => (
                    <div key={section.number} className={`${section.number === mainSection ? "text-white" : "text-gray-400"}`} onClick={() => changeCurrentTime(section.timeStart)}>
                        <div className='grid grid-cols-12 p-1 rounded-md cursor-pointer duration-75'>
                            <div className='col-span-10 space-y-1'>
                                <h1 className={`${section.number === mainSection ? "text-Blue" : "text-gray-400"} ${'text-sm'}`}>{section.title}</h1>
                                <p className='text-xs  truncate'>{section.summary}</p>
                            </div>
                            <div className='flex justify-end items-center col-span-2'>
                                <p className=' text-xs'>{Math.floor(section.duration / 3600) >= 10 ? Math.floor(section.duration / 3600) : '0' +  Math.floor(section.duration / 3600).toString()}:</p>
                                <p className=' text-xs'>{Math.floor(section.duration % 3600 / 60) >= 10 ? Math.floor(section.duration % 3600 / 60) : '0' +  Math.floor(section.duration % 3600 / 60).toString()}:</p>
                                <p className=' text-xs'>{Math.floor(section.duration % 60) >= 10 ? Math.floor(section.duration % 60) : '0' +  Math.floor(section.duration % 60).toString()}</p>
                            </div>
                        </div>
                        <span className='block h-[1px] w-full bg-slate-200/20 my-2'></span>
                    </div>
                ))
                }
            </div>
        </div>
    </div>
  )
}

export default ChapterModal
