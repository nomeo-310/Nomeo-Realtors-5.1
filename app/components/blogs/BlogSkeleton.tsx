'use client'

import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const BlogSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className='w-full sm:aspect-square aspect-video xl:h-[15rem] lg:h-[14rem] sm:h-[13rem] h-[12.5rem] mb-2'>
        <Skeleton className='h-full rounded-md bg-neutral-300'/>
      </div>
      <div>
        <Skeleton className='h-4 w-full rounded-md bg-neutral-300'/>
        <div className="mt-2 w-full">
          <Skeleton className='h-20 w-full rounded-md bg-neutral-300'/>
          <div className="flex items-center gap-2 mt-2">
            <Skeleton className='h-4 w-4 rounded-full bg-neutral-300'/>
            <Skeleton className='h-4 w-28 rounded-full bg-neutral-300'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSkeleton;