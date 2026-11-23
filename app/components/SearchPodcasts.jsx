'use client'
import { useState } from 'react';
import { vazir } from '@/app/utils/fonts'
import { RiSearchLine } from "react-icons/ri";
import { server } from '@/app/lib/server'

const SearchPodcasts = ({ getSearchResults, setLoading }) => {
	const [query, setQuery] = useState('');
	const handleSubmit = async (e) => {
		setLoading(true)
		fetch(`${server}/api/search`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				query : query,
			}),
		   })
			.then((response) => response.json())
			.then((data) => {
				setLoading(false)
				getSearchResults(data);
			})
			.catch((error) => {
				console.error(error);
		});
	}
	
	return (
		<div className='flex gap-2 justify-end items-center mb-6'>
			<div className='flex md:flex-row flex-col relative justify-between w-full'>
				<div className='flex flex-col w-full justify-center'>
					<span className='text-sm text-gray-400'>Find the right podcast for you</span>
					<p className='text-4xl font-semibold text-gray-700'>All Podcasts</p>
				</div> 
				<div className='flex items-center gap-2 w-full h-fit md:mt-0 mt-3'>
					<div className={`${vazir.className} ${'flex justify-between search h-fit w-full bg-white px-8 md:pt-3 md:pb-2 pt-4 pb-3 shadow-lg shadow-gray-200 rounded-full '}`}>
						<input onKeyUp={e => {e.keyCode === 13 ? handleSubmit() : ''}} onChange={ (e) => setQuery(e.target.value)} className='input w-full sm:text-lg text-sm' type="text" placeholder='Search The Podcast Here...' />
					</div> 
					<button onClick={handleSubmit} className='flex items-center justify-center rounded-full px-3 py-[11px] bg-Blue hover:bg-darkBlue border-y-[1.5px] border-[#2c6fe4] shadow-lg duration-150 box-content'>
						<RiSearchLine className='text-2xl text-white'/>
					</button>
				</div>
			</div>
		</div>
	)
}

export default SearchPodcasts
