import { userProps } from '@/lib/types';
import React from 'react'

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  user: userProps
}

const RentedProperties = ({user, setActiveTab}: Props) => {
  return (
    <div className='w-full min-h-[73.5vh] flex slide-in-left'>
      <div className="flex flex-col lg:gap-4 gap-3 w-full">
        <div className='flex w-full lg:gap-6 gap-4 cursor-pointer'>
          <h2 className='text-xl md:text-3xl font-semibold'>Rented Properties</h2>
          <h2 className='text-xl md:text-3xl font-semibold text-gray-400' onClick={() =>setActiveTab('bookmarks')}>Bookmarks</h2>
          { !user.showLikedProperties && <h2 className='text-xl md:text-3xl font-semibold text-gray-400' onClick={() =>setActiveTab('liked-properties')}>Liked Properties</h2> }
        </div>
      </div>
    </div>
  )
}

export default RentedProperties;