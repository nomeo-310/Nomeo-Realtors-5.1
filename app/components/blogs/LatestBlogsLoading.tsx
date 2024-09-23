'use client'

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const LatestBlogsLoading = () => { 
  return (
    <div className="w-full h-fit grid md:grid-cols-2 xl:gap-4 gap-3 grid-cols-1 animate-pulse">
      <div className="w-full mb-2 md:mb-0">
        <div className="w-full aspect-video lg:h-[18rem] h-[15rem] rounded relative overflow-hidden mb-2">
          <Skeleton className='w-full h-full bg-neutral-300'/>
        </div>
        <div className='w-full'>
          <Skeleton className='h-20 w-full rounded-md bg-neutral-300 hidden md:block'/>
          <div className="mt-2 w-full">
            <Skeleton className='h-4 w-full rounded-full bg-neutral-300'/>
            <div className="flex items-center gap-2 mt-2">
              <Skeleton className='h-4 w-28 rounded-full bg-neutral-300'/>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:hidden mb-2">
        <div className="w-full aspect-video lg:h-[18rem] h-[15rem] rounded relative overflow-hidden">
          <Skeleton className='w-full h-full bg-neutral-300'/>
        </div>
        <div className='w-full mt-2'>
          <Skeleton className='h-4 w-full rounded-full bg-neutral-300'/>
          <div className="mt-2 w-full">
            <div className="flex items-center gap-2 mt-2">
              <Skeleton className='h-4 w-28 rounded-full bg-neutral-300'/>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:hidden mb-2">
        <div className="w-full aspect-video lg:h-[18rem] h-[15rem] rounded relative overflow-hidden">
          <Skeleton className='w-full h-full bg-neutral-300'/>
        </div>
        <div className='w-full mt-2'>
          <div className="mt-2 w-full">
            <Skeleton className='h-4 w-full rounded-full bg-neutral-300'/>
            <div className="flex items-center gap-2 mt-2">
              <Skeleton className='h-4 w-28 rounded-full bg-neutral-300'/>
            </div>
          </div>
        </div>
      </div>
      <div className="md:grid w-full grid-rows-2 xl:gap-4 gap-3 hidden">
        <div className="w-full flex gap-3">
          <div className="w-[40%] h-full relative rounded overflow-hidden">
            <Skeleton className='h-full w-full rounded-md bg-neutral-300'/>
          </div>
          <div className="w-[60%] h-full flex flex-col justify-between pb-4">
            <Skeleton className='h-4 w-full rounded-full bg-neutral-300'/>
            <Skeleton className='h-4 w-[80%] rounded-full bg-neutral-300 mt-1'/>
            <div className="mt-2 w-full">
              <Skeleton className='h-32 w-full rounded-md bg-neutral-300'/>
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className='h-4 w-28 rounded-full bg-neutral-300'/>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex gap-3">
          <div className="w-[40%] h-full relative rounded overflow-hidden">
            <Skeleton className='h-full w-full rounded-md bg-neutral-300'/>
          </div>
          <div className="w-[60%] h-full flex flex-col justify-between pb-4">
            <Skeleton className='h-4 w-full rounded-full bg-neutral-300'/>
            <Skeleton className='h-4 w-[80%] rounded-full bg-neutral-300 mt-1'/>
            <div className="mt-2 w-full">
              <Skeleton className='h-32 w-full rounded-md bg-neutral-300'/>
              <div className="flex items-center gap-2 mt-2 ">
                <Skeleton className='h-4 w-28 rounded-full bg-neutral-300'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LatestBlogsLoading