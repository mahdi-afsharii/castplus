'use client'
import {vazir, nunito, balooBhaijaan2} from '@/app/utils/fonts'
import { AiFillStar } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';
import SearchPodcasts from './SearchPodcasts';
import { useState } from 'react';
import SearchLoading from "@/app/components/SearchLoading"
import NoResult from '@/app/img/NoResult.svg'
import PodcastIcon from '@/app/img/podcast-icon.png'

const Podcasts = ({ data }) => {
	const [podcasts, setPodcasts] = useState(data);
	const [loading, setLoading] = useState(false);
	
  return (
	<div className={`${balooBhaijaan2.className}`}>
		<SearchPodcasts setLoading={setLoading} getSearchResults={(results) => setPodcasts(results)}/>
		
		{loading ? <SearchLoading /> : podcasts.length === 0 ? <div className={`${nunito.className} ${'flex items-center justify-center h-[400px] w-full text-lg'}`}><Image alt='No Result' src={NoResult} /></div> : 
		<div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 sm:mx-0 sm:gap-x-6 sm:gap-y-4 gap-x-2 gap-y-4 sm:px-0 mt-8'>
			{podcasts.map((podcast) => (
			  	<Link href={`/podcasts/${podcast.id}`} key={podcast.id} className={vazir.className}>
				  	<div className='flex flex-col items-center bg-white w-full rounded-2xl overflow-hidden border-[1px] border-gray-150 col-span-1'>
						<div className='w-full h-fit'>
							<div className='flex items-center w-full p-3'>
								<Image className='w-full rounded-xl h-fit' src={podcast.thumbnail ? podcast.thumbnail : PodcastIcon} alt='podcast image' width={300} height={300} />
							</div>
						</div>
						<div className='px-3 sm:py-4 pb-3 pt-1 w-full'>
							<h1 className='sm:text-lg text-base font-semibold truncate'>{podcast.name}</h1>
							<p className='sm:h-[40px] h-[35px] overflow-hidden sm:text-sm text-xs text-Gray sm:my-3 mt-2 line-clamp-2'>{podcast.about}</p>
							<div className={`${balooBhaijaan2.className} ${'flex items-center justify-center bg-gray-50 rounded-lg p-2 sm:gap-6 gap-5 sm:mt-6 mt-4'}`}>
								<div className='flex flex-col items-center justify-center'>
									<span className='flex sm:gap-x-1 sm:text-base text-sm font-bold'>
										<AiFillStar className='text-amber-400 sm:text-xl text-base' />
										<p className=''>{podcast.stargazers_count}</p>
									</span>
									<span className='sm:text-sm text-xs text-gray-600'>Rating</span>
								</div>
								<span className='border-s-[1px] border-gray-300 w-[2px] h-6'></span>
								<div className='flex flex-col items-center justify-center'>
									<span className='flex gap-x-1 text-base font-bold ms-1'>{podcast.episodes.length}</span>
									<span className='sm:text-sm text-xs text-gray-600'>Episodes</span>
								</div>
							</div>
						</div>
					</div>
			  	</Link>
			))}
		</div>}
	</div>
  )
}

export default Podcasts