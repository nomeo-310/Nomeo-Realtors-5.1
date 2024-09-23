'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import DesktopMenuDropdown from './DesktopMenuDropdown'
import { HiOutlineUser } from 'react-icons/hi2'
import NotificationIndicator from './NotificationIndicator'
import { useLogin } from '@/lib/useModals'
import { userProps } from '@/lib/types'

type Props = {
  currentUser: userProps
  notificationCount: number | undefined
}

const DesktopMenu = ({currentUser, notificationCount}: Props) => {
  const pathname = usePathname();
  const loginUser = useLogin();

  const NavLink = ({link, label}:{link:string, label:string}) => {
    return (
      <Link href={link} className={cn('capitalize lg:text-lg py-2 lg:px-4 px-3 rounded-full hover:bg-gray-200 dark:hover:bg-[#292524] font-semibold', pathname === link && 'bg-primary text-white hover:bg-primary hover:text-white')}>
        {label}
      </Link>
    )
  };

  const LoginButton = () => {
    return (
      <button className='flex lg:px-5 px-3 py-2 rounded-full bg-primary text-white items-center outline-none' onClick={() =>loginUser.onOpen()}>
        { notificationCount && notificationCount > 0 ? <NotificationIndicator notificationCount={notificationCount}/> : <HiOutlineUser size={22} className='lg:mr-3 mr-2' />}
        <div className='border-l-white lg:text-lg lg:pl-3 pl-2 font-semibold border-l'>Login</div>
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
        { currentUser ? <DesktopMenuDropdown notificationCount={ notificationCount } currentUser={currentUser} /> : <LoginButton/> }
      </div>
    </div>
  )
}

export default DesktopMenu