"use client"
import Link from 'next/link'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { GoHome, GoHomeFill, GoSearch } from "react-icons/go";
import { HiOutlineRectangleStack, HiRectangleStack, HiUserCircle, HiOutlineUserCircle  } from "react-icons/hi2";
import { usePathname } from 'next/navigation'
import { PiSignOutLight, PiHeadphonesFill, PiHeadphonesLight } from "react-icons/pi";
import Logo from "@/app/img/castplus.svg"
import Image from 'next/image'
import { nunito } from '../utils/fonts'

const Sidebar = () => {
	const { data: session } = useSession()
    const url = usePathname();
    
    
  return (
    <div className='fixed top-0 left-0 w-16 lg:w-64 h-screen bg-white z-50'>
        <div className="flex flex-col justify-between h-full py-5 px-1 lg:px-3 overflow-y-auto scrollbar-hide">
            <div>
                <div className='px-1 py-2 mb-4 w-fit'>
                    <Link href={"/"} className='flex items-end'>
                        <Image alt="" src={Logo} width={25} height={25} className='px-2 py-1 box-content' />
                        <span className={`${nunito.className} ${'hidden lg:block text-2xl font-bold text-Blue'}`}>CastPlus</span>
                    </Link>
                </div>
                <Link href={'/'}>
                    <div className={`${url === '/' ? "lg:lg:bg-[#e0eeff]" : ""} ${'hover:bg-gray-100 flex lg:flex-row md:flex-col items-center rounded-md py-2 gap-1 duration-100'}`}>
                        {url === '/' ? 
                            <>
                                <GoHomeFill className='text-3xl text-[#418ff5] px-2 py-1 rounded-full box-content' />
                                <span className='lg:text-lg text-sm font-semibold text-[#418ff5]'>Home</span>
                            </>
                            : 
                            <>
                                <GoHome className='text-3xl text-gray-400 lg:px-2 md:px-1 py-1 box-content' />
                                <span className='lg:text-lg text-sm text-gray-400'>Home</span>
                            </>
                        }
                    </div>
                </Link>
                <Link href={'/search'}>
                    <div className={`${url.includes('/search') ? "lg:bg-[#e0eeff]" : ""} ${'hover:bg-gray-100 flex lg:flex-row md:flex-col items-center rounded-md py-2 gap-1 duration-100'}`}>
                        {url.includes('/search') ? 
                            <>
                                <GoSearch className='text-3xl text-[#418ff5] px-2 py-1 rounded-full box-content' />
                                <span className='lg:text-lg text-sm font-semibold text-[#418ff5]'>Search</span>
                            </>
                            : 
                            <>
                                <GoSearch className='text-3xl text-gray-400 lg:px-2 md:px-1 py-1 box-content' />
                                <span className='lg:text-lg text-sm text-gray-400'>Search</span>
                            </>
                        }
                    </div>
                </Link>
                <Link href={'/podcasts'}>
                    <div className={`${url.includes('/podcasts') ? "lg:bg-[#e0eeff]" : ""} ${'hover:bg-gray-100 flex lg:flex-row md:flex-col items-center rounded-md py-2 gap-1 duration-100'}`}>
                        {url.includes('/podcasts') ? 
                            <>
                                <HiRectangleStack className='text-3xl text-[#418ff5] px-2 py-1 rounded-full box-content' />
                                <span className='lg:text-lg text-sm font-semibold text-[#418ff5]'>Podcasts</span>
                            </>
                            : 
                            <>
                                <HiOutlineRectangleStack className='text-3xl text-gray-400 lg:px-2 md:px-1 py-1 box-content' />
                                <span className='lg:text-lg text-sm text-gray-400'>Podcasts</span>
                            </>
                        }
                    </div>
                </Link>
                <Link href={'/profile'}>
                    <div className={`${url.includes('/profile') ? "lg:bg-[#e0eeff]" : ""} ${'hover:bg-gray-100 flex lg:flex-row md:flex-col items-center rounded-md py-2 gap-1 duration-100'}`}>
                        {url.includes('/profile') ? 
                            <>
                                <HiUserCircle className='text-3xl text-[#418ff5] px-2 py-1 rounded-full box-content' />
                                <span className='lg:text-base text-sm font-semibold text-[#418ff5]'>Profile</span>
                            </>
                            : 
                            <>
                                <HiOutlineUserCircle className='text-3xl text-gray-400 lg:px-2 md:px-1 py-1 box-content' />
                                <span className='lg:text-base text-sm text-gray-400'>Profile</span>
                            </>
                        }
                    </div>
                </Link>
                <Link href={'/contactus'}>
                    <div className={`${url.includes('/contactus') ? "lg:bg-[#e0eeff]" : ""} ${'lg:flex hidden hover:bg-gray-100 lg:flex-row md:flex-col items-center rounded-md py-2 gap-1 duration-100'}`}>
                        {url.includes('/contactus') ? 
                            <>
                                <PiHeadphonesFill className='text-3xl text-[#418ff5] px-2 py-1 rounded-full box-content' />
                                <span className='lg:text-base text-sm font-semibold text-[#418ff5]'>Contact Us</span>
                            </>
                            : 
                            <>
                                <PiHeadphonesLight  className='text-3xl text-gray-400 lg:px-2 md:px-1 py-1 box-content' />
                                <span className='lg:text-base text-sm text-gray-400'>Contact Us</span>
                            </>
                        }
                    </div>
                </Link>
            </div>
            <div className='lg:block hidden'>
                {session ?
                <Link href='/' onClick={() => signOut()}>
                    <button className='hover:bg-rose-200 flex items-center text-rose-600 bg-white rounded-lg font-semibold p-2 duration-150 w-full mt-2'>
                        <PiSignOutLight className='text-3xl px-4 py-1 box-content' />
                        <span>Sign Out</span>
                    </button>
                </Link>
                :
                <Link href='/signin-signup' onClick={() => signIn()}><button className='hover:bg-blue-700 bg-Blue text-white rounded-lg font-semibold shadow-lg shadow-LightBlue py-3 px-5 duration-150 w-full mt-2'>Sign In / Sign Up</button></Link>
                }
            </div>
        </div>
    </div>
  )
}

export default Sidebar
