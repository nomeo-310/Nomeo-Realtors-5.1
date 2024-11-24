'use client'

import { userProps } from '@/lib/types'
import React from 'react'
import { HiBars3 } from 'react-icons/hi2'

type Props = {
  user: userProps
}

const Wallet = (user: Props) => {
  return (
    <div className='w-full min-h-[73.5vh] flex slide-in-left space-y-4'>
      <div className="flex flex-col gap-3 w-full lg:w-[80%] xl:w-[70%]">
        <h2 className='font-semibold md:hidden text-lg'>Wallet</h2>
        <div className='w-full h-48 sm:h-60 rounded overflow-hidden relative shadow-sm bg-neutral-200 cursor-pointer'>
          <div className="absolute md:right-4 md:top-4 right-2.5 top-2.5" onClick={()=>console.log('open menu')}>
            <HiBars3 className='size-6 md:size-7'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet