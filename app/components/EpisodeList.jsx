'use client'
import Link from "next/link";
import Image from "next/image";
import { vazir, lalezar, nunito } from "../utils/fonts";
import { MdOutlinePodcasts } from 'react-icons/md'
import PodcastIcon from '@/app/img/podcast-icon.png'

const EpisodeList = ({data}) => {
	const episodes = data.episodes

  return (
	<>
	  {episodes.length === 0 ? <div className={`${nunito.className} ${"flex justify-center w-full my-6 space-x-2"}`}><p className="text-2xl font-bold">No Episode Yet</p><MdOutlinePodcasts className="text-3xl" /></div> : 
	  	<div className="space-y-4">
	  		{episodes.map((episode) => (
				<div className="rounded-2xl overflow-hidden border-[1px] border-border-gray" key={episode.id}>
					<figure className="flex bg-white rounded-xl relative">
					  	<Link href={`/podcasts/${data.id}/${episode.id}`} key={episode.title} className={`${vazir.className} ${''}`}>
					  		<Image className="block h-full sm:min-w-[135px] min-w-[80px] w-20 sm:w-32 sm:min-w-32 object-cover border-e-[1px] border-gray" src={episode.thumbnail ? episode.thumbnail : PodcastIcon} alt="episode thumbnail" width="300" height="300" />
					  	</Link>
						<div className="p-2 md:space-y-2 space-y-1">
							<Link href={`/podcasts/${data.id}/${episode.id}`} key={episode.title} className={vazir.className}>
								<blockquote className="h-auto ">
									<h1 className='sm:text-base text-xs font-semibold'>{episode.title}</h1>
									<p className="sm:text-sm text-xs text-Gray font-medium mt-1 md:mt-2 line-clamp-1">{episode.description}</p>
								</blockquote>
							</Link>
							<figcaption className="font-medium">
								<div className="flexjustify-start text-gray-700 dark:text-gray-500">
									<span className={lalezar.className}>
										<p className='bg-gray-50 w-fit px-1 rounded-md pt-1 text-gray-500 sm:text-xs text-[10px]'>{`${episode.published_date} | ${episode.published_time}`}</p>
									</span>
								</div>
							</figcaption>
						</div>
					</figure>
				</div>
			))}
	  	</div>}
	</>
  )
}

export default EpisodeList
