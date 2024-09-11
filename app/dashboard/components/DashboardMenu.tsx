'use client'

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { HiOutlineBell, HiOutlineCog6Tooth, HiOutlineDocumentText, HiOutlineHome, HiOutlineSquaresPlus, HiOutlineUsers } from 'react-icons/hi2';
import { IconType } from 'react-icons/lib';

type dashboardMenuProps = {
  agentLoggedIn:boolean
}

type menuItemProps = {
  label:string, 
  icon:IconType, 
  active:boolean, 
  link: string,
}

const DashboardMenu = ({agentLoggedIn}: dashboardMenuProps) => {
  const router = useRouter();
  const pathName = usePathname()

  const DashboardMenuItem = ({label, icon:Icon, active, link}: menuItemProps) => {
    const activeStyle = 'bg-primary md:border-l-4 md:rounded-r hover:md:border-l-4 md:border-black md:dark:border-white rounded md:rounded-l-none hover:bg-primary';

    return (
      <Link className={`${active ? activeStyle : 'rounded hover:bg-primary/70'} md:p-4 p-2.5  md:flex md:gap-3 items-center cursor-pointer hover:border-l-0`} href={link}>
        <Icon size={28} className='md:block hidden'/>
        <Icon size={24} className='md:hidden'/>
        <h2 className='text-lg md:block hidden capitalize'>{label}</h2>
      </Link>
    )
  };

  return (
    <React.Fragment>
      <DashboardMenuItem
        label='Notifications'
        icon={HiOutlineBell}
        active={ pathName === '/dashboard'}
        link='/dashboard'
      />
      { agentLoggedIn ? (
        <React.Fragment>
          <DashboardMenuItem
            label='Properties'
            icon={HiOutlineHome}
            active={pathName === '/dashboard/properties'}
            link='/dashboard/properties'
          />
          <DashboardMenuItem
            label='Posts'
            icon={HiOutlineDocumentText}
            active={pathName === '/dashboard/posts'}
            link='/dashboard/posts'
          />
          <DashboardMenuItem
            label='Clients'
            icon={HiOutlineUsers}
            active={pathName === '/dashboard/clients'}
            link='/dashboard/clients'
          />
          <DashboardMenuItem
            label='Settings'
            icon={HiOutlineCog6Tooth}
            active={pathName === '/dashboard/settings'}
            link='/dashboard/settings'
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <DashboardMenuItem
            label='Properties'
            icon={HiOutlineHome}
            active={pathName === '/dashboard/properties'}
            link='/dashboard/properties'
          />
          <DashboardMenuItem
            label='Agents'
            icon={HiOutlineUsers}
            active={pathName === '/dashboard/agents'}
            link='/dashboard/agents'
          />
          <DashboardMenuItem
            label='Inspections'
            icon={HiOutlineSquaresPlus}
            active={pathName === '/dashboard/inspections'}
            link='/dashboard/inspections'
          />
          <DashboardMenuItem
            label='Settings'
            icon={HiOutlineCog6Tooth}
            active={pathName === '/dashboard/settings'}
            link='/dashboard/settings'
          />
        </React.Fragment>        
      )
    }

    </React.Fragment>
  )
}

export default DashboardMenu;