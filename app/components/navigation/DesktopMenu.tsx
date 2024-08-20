'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import DesktopMenuDropdown from './DesktopMenuDropdown'
import { HiOutlineUser } from 'react-icons/hi2'
import NotificationIndicator from './NotificationIndicator'

type Props = {
  currentUser: boolean
  notification: boolean
}

const DesktopMenu = ({currentUser, notification}: Props) => {
  const pathname = usePathname();

  const NavLink = ({link, label}:{link:string, label:string}) => {
    return (
      <Link href={link} className={cn('capitalize lg:text-lg py-2 lg:px-4 px-3 rounded-full hover:bg-gray-200 dark:hover:bg-[#292524] font-semibold', pathname === link && 'bg-primary/70 text-white hover:bg-primary/70 hover:text-white')}>
        {label}
      </Link>
    )
  };

  const LoginButton = () => {
    return (
      <button className='flex lg:px-5 px-3 py-2 rounded-full bg-primary text-white items-center' onClick={() => console.log('login')}>
        { currentUser && notification ? <NotificationIndicator/> : <HiOutlineUser size={22} className='lg:mr-3 mr-2' />}
        <div className='border-l-white lg:text-lg lg:pl-3 pl-2 font-semibold'>Login</div>
      </button>
    )
  };

  return (
    <div className='hidden md:flex lg:gap-8 gap-6 lg:min-w-[70%] md:min-w-[65%] justify-end h-full items-center'>
      <div className="flex items-center gap-2">
        <NavLink
          link='/for-rent'
          label='For Rent'
        />
        <NavLink
          link='/for-sale'
          label='For Sale'
        />
        <NavLink
          link='/about-us'
          label='About Us'
        />
        <NavLink
          link='/blogs'
          label='Blogs'
        />
      </div>
      <div>
        { currentUser ? <DesktopMenuDropdown notification={ notification } currentUser={currentUser} /> : <LoginButton/> }
      </div>
    </div>
  )
}

export default DesktopMenu