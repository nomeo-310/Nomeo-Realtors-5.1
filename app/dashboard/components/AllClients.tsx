'use client'

import React from 'react'

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

const AllClients = ({setActiveTab}: Props) => {
  return (
    <div className='w-full h-full flex slide-in-left'>
      <div className="flex flex-col lg:gap-4 gap-3 w-full lg:w-[85%] xl:w-[75%]">
        <div className='flex gap-4 lg:gap-6 cursor-pointer'>
          <h2 className='text-xl md:text-3xl font-semibold'>All Clients</h2>
          <h2 className='text-xl md:text-3xl font-semibold text-gray-400' onClick={() =>setActiveTab('add-client')}>Add Client</h2>
        </div>
      </div>
    </div>
  )
}

export default AllClients