'use client'

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { HiCheck, HiOutlineMoon, HiOutlinePower, HiOutlineSun, HiOutlineTv, HiOutlineUser } from 'react-icons/hi2'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { capitalizeName, cn } from '@/lib/utils'
import NotificationIndicator from './NotificationIndicator'
import { useTheme } from 'next-themes'
import { userProps } from '@/lib/types'
import { signOut } from 'next-auth/react'

type Props = {
  notification: boolean
  currentUser: userProps
}

const DesktopMenuDropdown = ({notification, currentUser}: Props) => {
  const path = usePathname();
  const { theme, setTheme } = useTheme();

  const { fullName, firstName } = capitalizeName(currentUser?.name)

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className='flex lg:px-5 px-3 py-2 rounded-full bg-primary text-white items-center cursor-pointer'>
          { currentUser && notification ? <NotificationIndicator/> : <HiOutlineUser size={20} className='lg:mr-3 mr-2' />}
          <div className='border-l lg:text-lg lg:pl-3 pl-2 font-semibold border-l-white'>{firstName}</div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4 my-2 rounded">
        <DropdownMenuLabel className='line-clamp-1'>
          <p className='text-base'>{fullName}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className='flex flex-col gap-1'>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className='rounded'>
              <p className='text-base font-semibold'>Themes</p>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className='rounded mx-2'>
                <DropdownMenuItem className='rounded' onClick={() => setTheme("dark")}>
                  <div className="flex items-center gap-3">
                    <p className='text-base'>Dark Mode</p>
                    <HiOutlineMoon size={18}/>
                    {theme === "dark" && <HiCheck size={18} />}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className='rounded' onClick={() => setTheme("light")}>
                  <div className="flex items-center gap-3">
                    <p className='text-base'>Light Mode</p>
                    <HiOutlineSun size={18}/>
                    {theme === "light" && <HiCheck size={18} />}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className='rounded' onClick={() => setTheme("system")}>
                  <div className="flex items-center gap-3">
                    <p className='text-base'>System Default</p>
                    <HiOutlineTv size={18}/>
                    {theme === "system" && <HiCheck size={18} />}
                  </div>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem className={cn('rounded', path === '/dashboard' && 'bg-primary/70 text-white')}>
            <Link href={'/dashboard'}><p className='text-base font-semibold'>Dashboard</p></Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className='rounded'>
        <p className='text-base font-semibold'>Log out</p>
          <DropdownMenuShortcut>
            <HiOutlinePower size={18}/>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DesktopMenuDropdown