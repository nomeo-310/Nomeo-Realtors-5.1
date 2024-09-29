'use client'

import React from 'react'
import { aboutUsData } from '@/assets/data';
import Image from 'next/image';
import Link from 'next/link';
import { BsInstagram, BsLinkedin, BsThreads } from 'react-icons/bs';

type itemProps = {
  name:string; 
  role:string;
  imageUrl: string; 
  instagramUrl: string;
  linkedinUrl: string;
  threadsUrl: string;
} 

const TeamSection = () => {

  const TeamMemberCard = ({name, role, instagramUrl, imageUrl, threadsUrl, linkedinUrl}:itemProps) => {
    return (
      <div className="w-full h-fit cursor-pointer group drop-shadow-md overflow-hidden">
        <div className="aspect-square overflow-hidden rounded w-full h-full relative flex items-center justify-center">
          <Image src={imageUrl} alt={`${name}_image`} fill priority className='object-cover'/>
          <div className='p-8 md:p-4 absolute w-full h-full bg-black/30 z-[200] top-0 left-0 opacity-0 group-hover:opacity-100 transition translate-y-[100vh] group-hover:translate-y-0 duration-500 ease-in-out group-active:translate-y-0 flex place-items-end justify-center'>
            <div className='w-full py-4 rounded drop-shadow-md bg-white/90 -translate-y-[100vh] delay-500 ease-in-out duration-700 group-hover:translate-y-0 z-[500] flex items-center justify-center flex-col'>
              <h2 className='text-base font-semibold'>{name}</h2>
              <p className='text-sm'>{role}</p>
              <div className='mt-4 flex items-center gap-4'>
                <Link href={instagramUrl}><BsInstagram size={24} className='hover:scale-125 hover:text-primary'/></Link>
                <Link href={threadsUrl}><BsThreads size={24} className='hover:scale-125 hover:text-primary'/></Link>
                <Link href={linkedinUrl}><BsLinkedin size={24} className='hover:scale-125 hover:text-primary'/></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <React.Fragment>
      <h2 className='lg:text-4xl text-2xl mb-5 mt-10'>Meet our team</h2>
      <p className='lg:text-xl md:text-lg mb-2'>{aboutUsData.meetTheTeam.subtitle}</p>
      <div className="grid grid-cols-1 mt-10 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-4 lg:gap-5 items-center justify-center">
        {aboutUsData.meetTheTeam.teamList.map((item:itemProps) => (
          <TeamMemberCard key={item.name} {...item}/>
        ))}
      </div>
    </React.Fragment>
  )
};

export default TeamSection;