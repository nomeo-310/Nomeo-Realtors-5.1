'use client'

import React from 'react'
import { agentProps } from '@/lib/types';
import Container from '@/components/shared/Container';
import Footer from '@/app/components/footer/Footer';
import { HiOutlineUser } from 'react-icons/hi2';
import ProfileHeader from './ProfileHeader';
import AgentInfo from './AgentInfo';

type Props = {
  agent: agentProps
};

const Profile = ({agent}:Props) => {

  return (
    <React.Fragment>
      <Container className='pt-24 lg:pt-28 flex md:gap-5 lg:gap-7 gap-3.5 min-h-screen'>
        <div className="sticky top-[78px] h-full lg:w-[22%] md:w-[32%] flex flex-col gap-2 w-[10.5%]">
          <div className='rounded bg-primary/70 md:p-4 p-2.5 md:flex md:gap-3 items-center cursor-pointer'>
            <HiOutlineUser size={28} className='md:block hidden'/>
            <HiOutlineUser size={24} className='md:hidden'/>
            <h2 className='text-lg md:block hidden capitalize'>Agent Profile</h2>
          </div>
        </div>
        <div className='lg:w-[78%] md:w-[68%] w-[89.5%]'>
          <div className="flex flex-col gap-4 w-full lg:w-[80%] xl:w-[70%] rounded">
            <ProfileHeader agent={agent}/>
            <AgentInfo agent={agent}/>
          </div>
        </div>
      </Container>
      <Footer/>
    </React.Fragment>
  )
};

export default Profile