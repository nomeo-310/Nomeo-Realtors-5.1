'use client'

import React from 'react'
import { propertyProps, userProps } from '@/lib/types';
import { HiOutlineMapPin } from 'react-icons/hi2';
import LikeButton from './LikeButton';
import BookmarkButton from './BookmarkButton';

type Props = {
  property: propertyProps
  user: userProps
}

const Header = ({property, user}: Props) => {
  return (
    <div className='mb-4 lg:mb-5'>
      <h2 className='lg:text-3xl md:text-2xl text-xl'>{property.title}.</h2>
      <div className="w-full flex md:flex-row flex-col md:items-center justify-between gap-2 md:gap-0">
        <div className='flex items-center'>
          <div className='flex items-center gap-2 border-r border-black pr-2'>
            <HiOutlineMapPin size={22} className='hidden md:block'/>
            <HiOutlineMapPin size={18} className='md:hidden'/>
            <p className='lg:text-lg'>{property.city}, {property.state}</p>
          </div>
          <div className='flex items-center gap-2 font-semibold'>
            <p className='lg:text-lg capitalize border-r border-black px-2'>for {property.propertyTag}</p>
            <p  className='lg:text-lg capitalize'>{property.furnitureStatus}</p>
          </div>
        </div>
        { user._id !== property.agent.user._id &&
          <div className="flex items-center gap-3 justify-end">
            <LikeButton user={user} property={property}/>
            <BookmarkButton user={user} property={property}/>
          </div>
        }
      </div>
    </div>
  )
}

export default Header