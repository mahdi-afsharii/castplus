import { EpisodeContext } from '@/app/context/EpisodeContext';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { TbRefresh } from "react-icons/tb";
import { BsQuote  } from "react-icons/bs";

const TranscriptModal = ({ episodeDetail, transcriptOpen, setTranscriptOpen }) => {
   const { mainSection } = useContext(EpisodeContext);
   const mainSectionRef = useRef([])
   const [detailTab, setDetailTab] = useState("transcript")

   console.log(episodeDetail);
   
    const scrollToMainSection = () => {
        if (mainSectionRef.current[mainSection]) {
            mainSectionRef.current[mainSection].scrollIntoView({behavior:"smooth"})
        }
    }
   
    useEffect(() => {
        scrollToMainSection();
    }, [mainSection])
   
  return (
    <div className={`${transcriptOpen ? "max-lg:fixed" : "max-lg:hidden"} ${'top-0 left-0 bg-black w-full h-full z-50'}`}>
        <div className='max-lg:container mx-auto '>
            <div className='flex relative justify-between max-lg:mt-2'>
                <span className='cursor-pointer lg:hidden' onClick={() => setTranscriptOpen(false)}><IoClose className='text-white text-3xl p-3 box-content'></IoClose></span>
                <div className='lg:hidden fixed top-4 right-4' onClick={scrollToMainSection}>
                    <div className='bg-white box-content rounded-full'>
                        <span className='right-3 cursor-pointer'><TbRefresh className='text-black text-3xl p-2 box-content'></TbRefresh></span>
                        <span className='absolute cursor-pointer top-[5px] right-[5px]'><BsQuote  className='text-black text-xs p-3 box-content'></BsQuote ></span>
                    </div>
                </div>
            </div>
            <div className='flex justify-center w-full lg:gap-2 mt-2 mb-5'>
                <div className='flex rounded-full bg-Navy p-1 w-full justify-between'>
                    <button className={`${detailTab === "transcript" ? "bg-white text-black" : "text-white"} ${'lg:text-base text-sm font-semibold w-28 p-2 rounded-full'}`} onClick={() => setDetailTab("transcript")}>Transcript</button>
                    <button className={`${detailTab === "summary" ? "bg-white text-black" : "text-white"} ${'lg:text-base text-sm font-semibold w-28 p-2 rounded-full'}`} onClick={() => setDetailTab("summary")}>Summary</button>
                    <button className={`${detailTab === "tags" ? "bg-white text-black" : "text-white"} ${'lg:text-base text-sm font-semibold w-28 p-2 rounded-full'}`} onClick={() => setDetailTab("tags")}>Tags</button>
                </div>
                <div className='lg:block hidden top-4 right-4' onClick={scrollToMainSection}>
                    <div className='relative bg-white box-content rounded-full'>
                        <span className='right-3 cursor-pointer'><TbRefresh className='text-black text-3xl p-2 box-content'></TbRefresh></span>
                        <span className='absolute cursor-pointer bottom-[5px] left-[5px]'><BsQuote  className='text-black text-xs p-3 box-content'></BsQuote ></span>
                    </div>
                </div>
            </div>
            <div className='overflow-y-auto scrollbar-hide lg:h-[78vh] h-[75vh] lg:bg-Navy/70 px-5 rounded-xl'>
                {detailTab === "transcript" &&
                    <div className='h-full'>
                      {episodeDetail.sections&& episodeDetail.sections.map((section, index) => (
                            <div key={section.id} className='pt-6' ref={(element) => mainSectionRef.current[index] = element}>
                                <div className={`${section.number == mainSection ? "text-Blue" : "text-gray-400"} ${'flex text-sm gap-1'}`}>
                                    <div>
                                        <span>{ Math.floor(section.duration / 60) < 10 ? '0' + Math.floor(section.duration / 60).	toString() : Math.floor(section.duration / 60).toString()}</span>:
                						<span>{section.duration % 60 < 10 ? '0' + (section.duration % 60).toString() : (section.	duration % 60).toString()}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{section.title}</span>
                                </div>
                                <p className={`${section.number == mainSection ? "text-white" : "text-gray-400"} ${'text-lg/8 text-justify mt-1'}`}>{section.transcript}</p>
                            </div>
                        ))
                      }
                    </div>
                }
                {detailTab === "summary" &&
                    <div className=''>
                      {episodeDetail.sections&& episodeDetail.sections.map((section, index) => (
                            <div key={section.id} className='pt-6' ref={(element) => mainSectionRef.current[index] = element}>
                                <div className={`${section.number == mainSection ? "text-Blue" : "text-gray-400"} ${'flex text-sm gap-1'}`}>
                                    <div>
                                        <span>{ Math.floor(section.duration / 60) < 10 ? '0' + Math.floor(section.duration / 60).	toString() : Math.floor(section.duration / 60).toString()}</span>:
                						<span>{section.duration % 60 < 10 ? '0' + (section.duration % 60).toString() : (section.	duration % 60).toString()}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{section.title}</span>
                                </div>
                                <p className={`${section.number == mainSection ? "text-white" : "text-gray-400"} ${'text-lg/8 text-justify mt-1'}`}>{section.summary}</p>
                            </div>
                        ))
                      }
                    </div>
                }
                {detailTab === "tags" &&
                    <div className=''>
                      {episodeDetail.sections&& episodeDetail.sections.map((section, index) => (
                            <div key={section.id} className='pt-6' ref={(element) => mainSectionRef.current[index] = element}>
                                <div className={`${section.number == mainSection ? "text-Blue" : "text-gray-400"} ${'flex text-sm gap-1'}`}>
                                    <div>
                                        <span>{ Math.floor(section.duration / 60) < 10 ? '0' + Math.floor(section.duration / 60).	toString() : Math.floor(section.duration / 60).toString()}</span>:
                						<span>{section.duration % 60 < 10 ? '0' + (section.duration % 60).toString() : (section.	duration % 60).toString()}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{section.title}</span>
                                </div>
                                <div className={`${section.number == mainSection ? "text-white" : "text-gray-400"} ${'flex gap-2 text-base text-justify mt-1'}`}>
                                    {section.tags.map((tag) => (
                                        <p className='bg-slate-200/20 rounded-lg text px-2'>{tag.name}</p>
                                    ))}
                                </div>
                            </div>
                        ))
                      }
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default TranscriptModal
