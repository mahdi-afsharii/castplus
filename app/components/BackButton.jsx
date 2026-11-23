'use client'
import { useRouter } from 'next/navigation';
import { IoIosArrowBack } from "react-icons/io";

const BackButton = () => {
    const router = useRouter();

  return (
    <div>
        <button id="back-button" className="relative top-5 ms-5 z-50 backdrop-blur-md bg-gray-50/80 items-center justify-center p-3 shadow-lg w-fit rounded-full cursor-pointer hover:scale-105 text-2xl text-gray-600 duration-200" onClick={() => router.back()} aria-label='Go Back'>
            <IoIosArrowBack />
        </button>
    </div>
  )
}

export default BackButton
