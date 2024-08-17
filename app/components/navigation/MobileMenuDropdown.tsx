'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { HiBars3, HiOutlineMoon, HiOutlinePower, HiOutlineSun, HiOutlineTv } from 'react-icons/hi2'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type Props = {
  currentUser: boolean
}

const MobileMenuDropdown = ({currentUser}: Props) => {
  const path = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={'icon'} className='md:hidden flex-none'>
          <HiBars3 size={26}/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ml-2 rounded">
        { currentUser &&
          <React.Fragment>
            <DropdownMenuLabel className='line-clamp-1'>
              <p className='text-base'>Salomi Onome</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </React.Fragment>
        }
        <DropdownMenuGroup className='flex flex-col gap-1'>
          <DropdownMenuItem className={cn('rounded', path === '/for-sale' && 'bg-primary/70 text-white')}>
            <Link href={'/for-sale'}><p className='text-base'>For Sale</p></Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={cn('rounded', path === '/for-rent' && 'bg-primary/70 text-white')}>
            <Link href={'/for-rent'}><p className='text-base'>For Rent</p></Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={cn('rounded', path === '/about-us' && 'bg-primary/70 text-white')}>
            <Link href={'/about-us'}><p className='text-base'>About Us</p></Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={cn('rounded', path === '/blogs' && 'bg-primary/70 text-white')}>
            <Link href={'/blogs'}><p className='text-base'>Blogs</p></Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className='flex flex-col gap-1'>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className='rounded'>
              <p className='text-base'>Themes</p>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className='rounded'>
                <DropdownMenuItem className='rounded'>
                  <div className="flex items-center gap-3">
                  <p className='text-base'>Dark Mode</p>
                    <HiOutlineMoon size={18}/>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className='rounded'>
                  <div className="flex items-center gap-3">
                  <p className='text-base'>Light Mode</p>
                    <HiOutlineSun size={18}/>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className='rounded'>
                  <div className="flex items-center gap-3">
                  <p className='text-base'>System Default</p>
                    <HiOutlineTv size={18}/>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          { currentUser &&
            <DropdownMenuItem className={cn('rounded', path === '/dashboard' && 'bg-primary/70 text-white')}>
              <Link href={'/dashboard'}><p className='text-base'>Dashboard</p></Link>
            </DropdownMenuItem>
          }
        </DropdownMenuGroup>
        { currentUser &&
          <React.Fragment>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log('I just logged out')} className='rounded'>
            <p className='text-base'>Log out</p>
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

