'use client'

import React from 'react'
import { Skeleton } from '@/components/ui/skeleton';

const NotificationLoadingSkeleton = () => {

  const LoadingSkeleton = () => {
    return (
      <div className="w-full animate-pulse rounded bg-card p-3 md:p-4 shadow-sm">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Skeleton className='size-10 rounded-full'/>
            <div className='space-y-1.5'>
              <Skeleton className='h-3 w-20 rounded'/>
              <Skeleton className='h-3 w-24 rounded'/>
            </div>
          </div>
          <Skeleton className='h-16 rounded'/>
          <div className="flex justify-end">
            <Skeleton className='h-3 w-24 rounded'/>
          </div>
        </div>
      </div>
    )
  };
  return (
    <div className="w-full">
      <div className='space-y-4 w-full lg:w-[80%] xl:w-[70%]'>
        <LoadingSkeleton/>
        <LoadingSkeleton/>
        <LoadingSkeleton/>
      </div>
    </div>
  )
}

export default NotificationLoadingSkeleton