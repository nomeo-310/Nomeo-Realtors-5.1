'use client'

import React from 'react'
import ImageAvatar from '@/components/shared/ImageAvatar'
import { LiaQuoteLeftSolid } from 'react-icons/lia'

type Props = {
  title: string
  testimony: string
  name: string
  career: string
  profileImage: string
}

const TestimonialCard = ({title, testimony, name, career, profileImage}: Props) => {
  return (
    <div className='drop-shadow rounded p-4 w-full mb-3 bg-card dark:bg-[#0c0a09]'>
        <h2 className='mb-5 font-semibold lg:text-xl text-lg capitalize'>{title}</h2>
        <div className='lg:mb-6 mb-5'>
          <div className='p-1 border rounded float-left mr-2 mt-2 text-muted-foreground'>
            <LiaQuoteLeftSolid size={28}/>
          </div>
          <p className='text-muted-foreground'>{testimony}</p>
        </div>
        <div className='w-full flex gap-2 justify-between items-center'>
          <ImageAvatar src={profileImage} className='rounded-full flex-none overflow-hidden lg:w-14 lg:h-14'/>
          <div className='md:text-center'>
            <h2 className='font-semibold capitalize text-lg'>{name}</h2>
            <h2 className='text-muted-foreground capitalize'>{career}</h2>
          </div>
        </div>
    </div>
  )
}

export default TestimonialCard