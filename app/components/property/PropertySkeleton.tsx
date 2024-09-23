'use client'

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const PropertySkeleton = ({className}:{className?:string}) => {
  return (
    <div className={cn("w-full animate-pulse", className)}>
      <div className='w-full sm:aspect-square aspect-video xl:h-[15rem] lg:h-[14rem] sm:h-[13rem] h-[12.5rem] mb-2'>
        <Skeleton className='h-full rounded-md bg-neutral-300'/>
      </div>
      <div>
        <Skeleton className='h-4 w-full rounded-full bg-neutral-300'/>
        <div className="flex gap-3 items-center justify-between mt-2">
          <Skeleton className='h-4 w-24 rounded-full bg-neutral-300'/>
          <Skeleton className='h-4 w-24 rounded-full bg-neutral-300'/>
        </div>
      </div>
    </div>
  )
}

export default PropertySkeleton;