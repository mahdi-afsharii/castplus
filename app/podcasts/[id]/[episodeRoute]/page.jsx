import { server } from '@/app/lib/server';
import Episode from '@/app/components/Episode'

async function fetchPodcast() {
	const response = await fetch(`${server}/api/podcasts`, { cache: 'no-store' });
	const podcasts = await response.json();
	return podcasts;
}

const PodcastPage = async ({ params }) => {
	const { episodeRoute, id } = await params
	const res = await fetchPodcast();
	console.log(id);
	
  return (
	<div className='container mx-auto'>
		<Episode data={res} episodeRoute={episodeRoute} id={id} />
	</div>
  )
}

export default PodcastPage
