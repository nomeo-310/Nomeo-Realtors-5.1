'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { HiBars3, HiCheck, HiOutlineMoon, HiOutlinePower, HiOutlineSun, HiOutlineTv } from 'react-icons/hi2'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { capitalizeName, cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { userProps } from '@/lib/types'
import { signOut } from 'next-auth/react'

type Props = {
  currentUser: userProps
}

const MobileMenuDropdown = ({currentUser}: Props) => {
  
  const { fullName } = capitalizeName(currentUser?.name);
  const path = usePathname();

  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={'icon'} className='md:hidden flex-none'>
          <HiBars3 size={26}/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ml-4 rounded my-2">
        { currentUser &&
          <React.Fragment>
            <DropdownMenuLabel className='line-clamp-1'>
              <p className='text-base'>{fullName}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </React.Fragment>
        }
        <DropdownMenuGroup className='flex flex-col gap-1'>
          <DropdownMenuItem className={cn('rounded', path === '/for-sale' && 'bg-primary/70 text-white')}>
            <Link href={'/for-sale'}><p className='text-base font-semibold'>For Sale</p></Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={cn('rounded', path === '/for-rent' && 'bg-primary/70 text-white')}>
            <Link href={'/for-rent'}><p className='text-base font-semibold'>For Rent</p></Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={cn('rounded', path === '/about-us' && 'bg-primary/70 text-white')}>
            <Link href={'/about-us'}><p className='text-base font-semibold'>About Us</p></Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={cn('rounded', path === '/blogs' && 'bg-primary/70 text-white')}>
            <Link href={'/blogs'}><p className='text-base font-semibold'>Blogs</p></Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
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
                    <p className='text-base font-medium'>Dark Mode</p>
                    <HiOutlineMoon size={18}/>
                    {theme === "dark" && <HiCheck size={18} />}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className='rounded' onClick={() => setTheme("light")}>
                  <div className="flex items-center gap-3">
                    <p className='text-base font-medium'>Light Mode</p>
                    <HiOutlineSun size={18}/>
                    {theme === "light" && <HiCheck size={18} />}
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className='rounded' onClick={() => setTheme("system")}>
                  <div className="flex items-center gap-3">
                    <p className='text-base font-medium'>System Default</p>
                    <HiOutlineTv size={18}/>
                    {theme === "system" && <HiCheck size={18} />}
                  </div>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          { currentUser &&
            <DropdownMenuItem className={cn('rounded', path === '/dashboard' && 'bg-primary/70 text-white')}>
              <Link href={'/dashboard'}><p className='text-base font-semibold'>Dashboard</p></Link>
            </DropdownMenuItem>
          }
        </DropdownMenuGroup>
        { currentUser &&
          <React.Fragment>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()} className='rounded'>
            <p className='text-base font-semibold'>Log out</p>
              <DropdownMenuShortcut>
                <HiOutlinePower size={18}/>
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </React.Fragment>
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MobileMenuDropdown

