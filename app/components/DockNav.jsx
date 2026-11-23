'use client'
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { GoHome, GoHomeFill, GoSearch } from "react-icons/go";
import { HiOutlineRectangleStack, HiRectangleStack, HiUserCircle, HiOutlineUserCircle  } from "react-icons/hi2";

const DockNav = () => {
    const url = usePathname()
    
  return (
    <div className='md:hidden flex justify-between w-full fixed bg-White/80 backdrop-blur-md bottom-0 py-3 px-8 z-50'>
        <Link href={'/'}>
            <div className='flex flex-col gap-1 items-center'>
                {url === '/' ? 
                    <>
                        <GoHomeFill className='text-3xl  text-[#418ff5] bg-[#e0eeff] px-4 py-1 rounded-full box-content' />
                        <span className='text-xs text-[#418ff5]'>Home</span>
                    </>
                    : 
                    <>
                        <GoHome className='text-3xl text-gray-400 px-4 py-1 box-content' />
                        <span className='text-xs text-gray-400'>Home</span>
                    </>
                }
            </div>
        </Link>
        <Link href={'/search'}>
            <div className='flex flex-col gap-1 items-center'>
                {url.includes('/search') ? 
                    <>
                        <GoSearch className='text-3xl  text-[#418ff5] bg-[#e0eeff] px-4 py-1 rounded-full box-content' />
                        <span className='text-xs text-[#418ff5]'>Search</span>
                    </>
                    : 
                    <>
                        <GoSearch className='text-3xl text-gray-400 px-4 py-1 box-content' />
                        <span className='text-xs text-gray-400'>Search</span>
                    </>
                }
            </div>
        </Link>
        <Link href={'/podcasts'}>
            <div className='flex flex-col gap-1 items-center'>
                {url.includes('/podcasts') ? 
                    <>
                        <HiRectangleStack className='text-3xl  text-[#418ff5] bg-[#e0eeff] px-4 py-1 rounded-full box-content' />
                        <span className='text-xs text-[#418ff5]'>Podcasts</span>
                    </>
                    : 
                    <>
                        <HiOutlineRectangleStack className='text-3xl text-gray-400 px-4 py-1 box-content' />
                        <span className='text-xs text-gray-400'>Podcasts</span>
                    </>
                }
            </div>
        </Link>
        <div className='flex flex-col gap-1 items-center' onClick={signIn}>
            <Link href={'/signin-signup'} >
                    {url.includes('/profile') ? 
                        <>
                            <HiUserCircle className='text-3xl  text-[#418ff5] bg-[#e0eeff] px-4 py-1 rounded-full box-content' />
                            <span className='text-xs text-[#418ff5]'>Profile</span>
                        </>
                        : 
                        <>
                            <HiOutlineUserCircle className='text-3xl text-gray-400 px-4 py-1 box-content' />
                            <span className='text-xs text-gray-400'>Profile</span>
                        </>
                    }
            </Link>
        </div>
    </div>
  )
}

export default DockNav