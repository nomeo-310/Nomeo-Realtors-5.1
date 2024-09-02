'use client'

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const PropertySkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className='w-full sm:aspect-square aspect-video xl:h-[15rem] lg:h-[14rem] sm:h-[13rem] h-[12.5rem] mb-2'>
        <Skeleton className='h-full rounded-md bg-neutral-300'/>
      </div>
      <div>
        <Skeleton className='h-4 w-full rounded-md bg-neutral-300'/>
        <div className="flex gap-3 items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Skeleton className='h-4 w-4 rounded-full bg-neutral-300'/>
            <Skeleton className='h-4 w-24 rounded-full bg-neutral-300'/>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className='h-4 w-4 rounded-full bg-neutral-300'/>
            <Skeleton className='h-4 w-24 rounded-full bg-neutral-300'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertySkeleton;