'use client'
import { lalezar, vazir } from "../../utils/fonts";
import {IoIosArrowForward, IoIosArrowBack} from 'react-icons/io'
import { HiBookOpen } from "react-icons/hi";
import { useEffect, useState, useRef, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { EpisodeContext } from "@/app/context/EpisodeContext";

const SectionsPage = ({data, episodes, isAudioPlay}) => {
	const { setMainSection } = useContext(EpisodeContext);
	const [isCheckNumberOfSections, setIsCheckNumberOfSections] = useState(false)
	var audio = data;
	var sections = episodes.sections;
	const sectionBtn = useRef([]);
	const searchParams = useSearchParams();

	const sectionBeingPlayIndex = () => {
		if(audio && sections) {
			let firstIndex = sections.filter((section) => {
				return section.timeStart <= audio.currentTime;
			});

			let sectionIndex = firstIndex.length > 0 ? firstIndex[firstIndex.length - 1].number : 0;
			return sectionIndex;
		}
	}
	const sectionIndex = sectionBeingPlayIndex();

	const autoChangeActiveBtn = () => {
		if(sectionBtn.current[sectionIndex]) {
			sectionBtn.current.forEach((Button) => {
				if (Button !== null) {
					Button.classList.remove('btn-active')
				}
			})
			sectionBtn.current[sectionIndex].classList.add('btn-active')
			sectionBtn.current[sectionIndex].scrollIntoView({ behavior: "smooth" })
		}
	}

	const sectionProgressBarHandler = () => {
		if (sections) {
			let timeStart = sections[sectionIndex].timeStart;
			let nextTimeStart = null;
			let activeButton = sectionBtn.current[sectionIndex];
			let sectionProgressBar = activeButton.getElementsByTagName('span')[0];
			let progressBarWidth = activeButton.offsetWidth;
			let progressBarRange = null;
			let progressBarRangeWidth = null;
	
			if(sectionIndex < (sectionBtn.current.length - 1)) {
				nextTimeStart = sections[sectionIndex + 1].timeStart;
			} else if(sectionIndex == (sectionBtn.current.length - 1)) {
				nextTimeStart = sections[sectionIndex].timeStart;
			}
	
			if (sectionProgressBar) {
				
				if(audio.currentTime > sections[sections.length - 1].timeStart && audio.currentTime <= audio.duration) {
					progressBarRange = (audio.currentTime - timeStart) * (progressBarWidth / (audio.duration - timeStart));
					progressBarRangeWidth = progressBarRange + 'px';
					sectionProgressBar.style.width = progressBarRangeWidth;
				} else if (audio.currentTime >= timeStart && audio.currentTime < nextTimeStart) {
					progressBarRange = (audio.currentTime - timeStart) * (progressBarWidth / (nextTimeStart - timeStart));
					progressBarRangeWidth = progressBarRange + 'px';
					sectionProgressBar.style.width = progressBarRangeWidth;
				}
			}

		}
		
	}
	
	const changeCurrentTime = (e) => {
		sectionBtn.current.forEach((Button) => {
			if (Button !== null) {
				Button.classList.remove('btn-active')
			}
		});

		if (e.target.tagName === 'SPAN' && (e.target.id === 'section-progressbar' || e.target.id === 'section-title')) {
			e.target.parentElement.classList.add('btn-active');
			audio.currentTime = e.target.parentElement.getAttribute('timeStart');
		} else if (e.target.tagName === 'SPAN') {
			e.target.parentElement.parentElement.classList.add('btn-active');
			audio.currentTime = e.target.parentElement.parentElement.getAttribute('timeStart');
		} else if (e.target.tagName === 'svg') {
			e.target.parentElement.parentElement.parentElement.classList.add('btn-active');
			audio.currentTime = e.target.parentElement.parentElement.parentElement.getAttribute('timeStart');
		} else if (e.target.tagName === 'path') {
			e.target.parentElement.parentElement.parentElement.parentElement.classList.add('btn-active');
			audio.currentTime = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('timeStart');
		} else if (e.target.tagName === 'P') {
			e.target.parentElement.classList.add('btn-active');
			audio.currentTime = e.target.parentElement.getAttribute('timeStart');
		} else {
			e.target.classList.add('btn-active');
			audio.currentTime = e.target.getAttribute('timeStart');
		}
		isAudioPlay(true);
		audio.play();
	}
	
	useEffect(() => {
		if(audio) {
			autoChangeActiveBtn();
			setMainSection(sectionIndex);
		}
	}, [sectionIndex]);

	useEffect(() => {
		if(audio) {
			sectionProgressBarHandler()
		}
	})

	const removeScrollBtn = () => {
		if (sectionBtn.current.length > 0 && sectionBtn.current[sectionIndex]) {
			var sectionBody = document.getElementById('section-body')
			
			var scrollForwardBtn = document.getElementById('scroll-forward-btn')
			var scrollBackwardBtn = document.getElementById('scroll-backward-btn')
			if(sectionBody.firstElementChild.scrollLeft <= 0) {
				scrollBackwardBtn.style.color = '#ededed'
			} else {
				scrollBackwardBtn.style.color = '#2e56f3'
			}
			
			if(Math.ceil(sectionBody.firstElementChild.scrollLeft) >= (sectionBody.firstElementChild.scrollWidth - sectionBody.firstElementChild.clientWidth)) {
				scrollForwardBtn.style.color = '#ededed'
			} else {
				scrollForwardBtn.style.color = '#2e56f3'
			}
		}
	}

	const checkNumberOfSection = () => {
		if(!isCheckNumberOfSections && sectionBtn.current.length > 0 && sectionBtn.current[sectionIndex]) {
			let buttonWidth = sectionBtn.current[sectionIndex].scrollWidth;
			let sectionBody = document.getElementById('section-body');
			let sectionBodyWidth = document.getElementById('section-body').offsetWidth;
			let scrollForwardBtn = document.getElementById('scroll-forward-btn');
			let scrollBackwardBtn = document.getElementById('scroll-backward-btn');
	
			if (sections) {
				if (buttonWidth * sections.length < sectionBodyWidth) {
					sectionBody.classList.add('flex');
					sectionBody.classList.add('justify-center');
					scrollForwardBtn.classList.add('hidden');
					scrollBackwardBtn.classList.add('hidden');
				} else {
					sectionBody.classList.remove('flex');
					sectionBody.classList.remove('justify-center');
				}
			}

			setIsCheckNumberOfSections(true);
		}
	}
	
	useEffect(() => {
		checkNumberOfSection()
	});
		
	const scrollForward = () => {
		if (sectionBtn.current.length > 0) {
			var scrollWidth = sectionBtn.current[sectionIndex].scrollWidth
			var sectionBody = document.getElementById('section-body')
			sectionBody.firstElementChild.scrollBy({left: scrollWidth, behavior: "smooth"})
		}
	}

	const scrollBackward = () => {
		if (sectionBtn.current.length > 0) {
			var scrollWidth = sectionBtn.current[sectionIndex].scrollWidth
			var sectionBody = document.getElementById('section-body')
			sectionBody.firstElementChild.scrollBy({left: -scrollWidth, behavior: "smooth"})
		}
	}

	useEffect(() => {
		if(audio) {
			audio.currentTime = searchParams.get('timeStart')
			autoChangeActiveBtn()
		}
	}, [searchParams.get('timeStart')])

	return (
		<>
			<div className={`${vazir.className} ${"relative overflow-hidden rounded-xl h-fit mt-5"}`}>
				<span id="scroll-backward-btn" className="lg:flex hidden absolute top-0 left-0 justify-between items-center h-full z-10 cursor-pointer text-3xl text-Blue duration-150" onClick={scrollBackward}><IoIosArrowBack /></span>
				<span id="scroll-forward-btn" className="lg:flex hidden absolute top-0 right-0 justify-between items-center h-full z-10 cursor-pointer text-3xl text-Blue duration-150" onClick={scrollForward}><IoIosArrowForward /></span>
				<div className="relative lg:mx-8">
					<div id="section-body" className="relative overflow-x-auto px-2 py-2 scroll-smooth">
						<div className="section-child relative w-full flex snap-x snap-mandatory overflow-x-auto gap-2" onScrollCapture={removeScrollBtn}>
							{sections && sections.map((section, index) => (
								<div key={section.number} className="relative snap-center">
									<button id="section-btn" timestart={section.timeStart} sectionnumber={sections.indexOf(section)} onClick={changeCurrentTime} ref={(element) => (sectionBtn.current[index] = element)} className={`${vazir.className} ${"overflow-hidden relative rounded-lg bg-Ink py-3 px-3 xl:w-80 lg:w-56 md:w-56 w-[70vw] h-20 sm:text-md vazir text-sm duration-150 inline-block select-none"}`}>
										<span id="section-progressbar" className="inline-block absolute top-0 left-0 bg-[#b8c7ff26] w-0 h-full z-10" ></span>
										<p className={`${lalezar.className} ${"absolute top-3 section-duration flex align-center text-xs text-[#bbb] 	select-none"}`}>
											<span className='me-1'><HiBookOpen className='text-base' /></span>
											<span>{ Math.floor(section.duration / 60) < 10 ? '0' + Math.floor(section.duration / 60).	toString() : Math.floor(section.duration / 60).toString()}</span>:
											<span>{section.duration % 60 < 10 ? '0' + (section.duration % 60).toString() : (section.	duration % 60).toString()}</span>
										</p>
										<span id="section-title" className={`${vazir.className} ${"line-clamp-2 text-left mt-4 text-white"}`}>
											{section.title }
										</span>
									</button>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SectionsPage