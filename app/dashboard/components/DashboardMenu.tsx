'use client'

import React from 'react'
import { HiOutlineBell, HiOutlineBellAlert, HiOutlineCog6Tooth, HiOutlineDocumentText, HiOutlineHome, HiOutlineUserGroup, HiOutlineUsers } from 'react-icons/hi2';
import { IconType } from 'react-icons/lib';
import { TbBellRinging, TbFileText, TbHomeHeart, TbHomePlus, TbHomeRibbon, TbLockPlus, TbUserEdit } from 'react-icons/tb';

type dashboardMenuProps = {
  agentLoggedIn:boolean
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

type menuItemProps = {
  label:string, 
  icon:IconType, 
  active:boolean, 
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

const DashboardMenu = ({agentLoggedIn, activeTab, setActiveTab}: dashboardMenuProps) => {

  const DashboardMenuItem = ({label, icon:Icon, active, setActiveTab}: menuItemProps) => {
    const activeStyle = 'bg-primary md:border-l-4 md:rounded-r hover:md:border-l-4 md:border-black md:dark:border-white rounded md:rounded-l-none hover:bg-primary';

    return (
      <div className={`${active ? activeStyle : 'rounded hover:bg-primary/70'} md:p-4 p-2.5  md:flex md:gap-3 items-center cursor-pointer hover:border-l-0`} onClick={() => setActiveTab(label)}>
        <Icon size={28} className='md:block hidden'/>
        <Icon size={24} className='md:hidden'/>
        <h2 className='text-lg md:block hidden capitalize'>{label}</h2>
      </div>
    )
  };

  return (
    <React.Fragment>
      <DashboardMenuItem
        label='Notifications'
        icon={HiOutlineBell}
        active={activeTab === 'Notifications'}
        setActiveTab={setActiveTab}
      />
      { agentLoggedIn ? (
        <React.Fragment>
          <DashboardMenuItem
            label='Properties'
            icon={HiOutlineHome}
            active={activeTab === 'Properties'}
            setActiveTab={setActiveTab}
          />
          <DashboardMenuItem
            label='Posts'
            icon={HiOutlineDocumentText}
            active={activeTab === 'Posts'}
            setActiveTab={setActiveTab}
          />
          <DashboardMenuItem
            label='Clients'
            icon={HiOutlineUsers}
            active={activeTab === 'Clients'}
            setActiveTab={setActiveTab}
          />
          <DashboardMenuItem
            label='Settings'
            icon={HiOutlineCog6Tooth}
            active={activeTab === 'Settings'}
            setActiveTab={setActiveTab}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <DashboardMenuItem
            label='Properties'
            icon={HiOutlineHome}
            active={activeTab === 'Properties'}
            setActiveTab={setActiveTab}
          />
          <DashboardMenuItem
            label='Agents'
            icon={HiOutlineUsers}
            active={activeTab === 'Agents'}
            setActiveTab={setActiveTab}
          />
          <DashboardMenuItem
            label='Settings'
            icon={HiOutlineCog6Tooth}
            active={activeTab === 'Settings'}
            setActiveTab={setActiveTab}
          />
        </React.Fragment>        
      )
    }

    </React.Fragment>
  )
}

export default DashboardMenu;