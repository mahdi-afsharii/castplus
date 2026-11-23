'use client'
import { useState } from 'react';
import SearchEpisodeSectionByTags from './SearchEpisodeSectionByTags';
import { vazir, balooBhaijaan2 , lalezar } from '../utils/fonts';
import { useContext } from 'react';
import { EpisodeContext } from '../context/EpisodeContext';
import Image from 'next/image';
import { FaPlay } from "react-icons/fa";
import BackButton from './BackButton';

const Episode = ({ data, episodeRoute, id }) => {
	const { setEpisode, setPlayerOpened, setPodcast } = useContext(EpisodeContext)
	
	const podcasts = data;
	const podcast = podcasts.filter((podcast) => {
	  return podcast.id === id
	})

	const episode = podcast[0].episodes.filter((episode) => {
	  return episode.id === episodeRoute
	})

	const [searchTagModalRef, setsearchTagModalRef] = useState(null)
	const tagsList = [];
	const getNonRepeatingTags = () => {
		episode[0].sections.forEach(section => {
			section.tags.forEach(tag => {
				if (!tagsList.includes(tag.name)) {
					tagsList.push(tag.name);
				}
			})
		})
	}
	getNonRepeatingTags();

	const searchTagModal = (modal) => {
		setsearchTagModalRef(modal)
	}

	const showSearchTagModal = () => {
		searchTagModalRef.classList.remove('hidden');
	}

return (
	<>
		{episode.map((episode) => (
		<div key={episode.id} className={`${vazir.className} mt-8 w-full min-w-0`}>

			{/* Episode Hero */}
			<div className="relative -mt-8 w-full min-h-[420px]">

				{/* Background Thumbnail */}
				<div className="absolute inset-0 -z-10 overflow-hidden">
					<span className="block w-full h-full blur-[100px] opacity-20 [mask-image:linear-gradient(to_top,transparent_0%,black_100%)]">
						<Image
							src={episode.thumbnail}
							alt="Episode Thumbnail"
							width={50}
							height={50}
							className="w-full h-[500px] object-cover"
						/>
					</span>
				</div>

				<div className=''><BackButton /></div>
				
				{/* Desktop Layout */}
				<div className="hidden lg:block relative w-full -top-5">
					<div className="container mx-auto px-6 pt-16 lg:pl-16">
						<div className="flex items-center gap-10">

						<Image
							src={episode.thumbnail}
							alt="Episode Thumbnail"
							width={250}
							height={250}
							className="rounded-xl shadow-2xl object-cover"
						/>

						<div className="flex flex-col gap-3">
							<h1 className="text-5xl font-bold mt-3">
								{episode.title}
							</h1>
							<p className="text-sm line-clamp-3 w-fit px-2 pt-1 rounded-md text-justify">
								{episode.description}
							</p>

							<p className="text-xs text-gray-600 font-bold bg-gray-100/30 border-y-[0.5px] border-white-100/50 w-fit px-2 pt-1 rounded-md">
								{episode.published_date} • {episode.published_time}
							</p>
							<button
								className={`${balooBhaijaan2.className} ${"flex items-center gap-2 bg-black/70 py-2 px-6 w-fit text-White rounded-full mt-2 hover:bg-black/80 duration-200"}`}
								onClick={() => {
									setEpisode(episode);
									setPlayerOpened(true);
									setPodcast(podcast);
								}}
							>
								Play
								<FaPlay className="text-[10px]" />
							</button>
						</div>

						</div>
					</div>
				</div>
				
				
				{/* Mobile & Tablet Layout */}
				<div className="lg:hidden relative w-full px-6 pt-6 top-5">

					{/* Thumbnail */}
					<div className="flex justify-start">
						<Image
							src={episode.thumbnail}
							alt="Episode Thumbnail"
							width={150}
							height={150}
							className="w-44 h-4w-44 sm:w-36 sm:h-36 object-cover rounded-2xl shadow-xl"
						/>
					</div>

					{/* Title & Date */}
					<div className="flex flex-col items-start gap-3 mt-5 w-full">

						<h1 className="text-2xl font-bold">
							{episode.title}
						</h1>

						<p className="text-xs sm:text-sm w-fit px-2 py-1 rounded-md text-justify">
							{episode.description}
						</p>

						<p className={`${balooBhaijaan2.className} ${'text-xs sm:text-sm text-gray-600 font-bold bg-gray-100/30 border-y-[0.5px] border-white-100/50 w-fit px-2 pt-1 rounded-md'}`}>
							{episode.published_date} • {episode.published_time}
						</p>

					</div>

					{/* Play Button */}
					<div className="mt-5">
						<button
							className={`${balooBhaijaan2.className} ${"flex items-center gap-3 bg-black/70 py-2 px-6 text-White rounded-full text-lg hover:bg-black/80 duration-200"}`}
							onClick={() => {
								setEpisode(episode);
								setPlayerOpened(true);
								setPodcast(podcast);
							}}
							>
							Play 
							<FaPlay className="text-[13px]" />
						</button>
					</div>

				</div>





			</div>

				{/* Episode Sections */}
				<div className="w-full px-4">
				<SearchEpisodeSectionByTags
					tags={tagsList}
					searchTagModalRefrence={searchTagModal}
					episodeData={episode}
				/>
				</div>

		</div>
    ))}
  </>
)

}

export default Episode
