import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'


const AgentLoadingSkeleton = () => {

  const LoadingSkeleton = () => {
    return (
      <div className="w-full animate-pulse rounded bg-card p-3 md:p-4 shadow-sm">
        <div className='flex gap-4'>
          <Skeleton className='flex-none rounded-full md:size-16 size-12'/>
          <div className='w-full space-y-2 grow'>
            <div className="flex gap-2">
              <Skeleton className='h-8 md:w-32'/>
              <Skeleton className='h- md:w-28'/>
            </div>
            <Skeleton className='h-8 rounded w-[65%]'/>
            <Skeleton className='h-8 rounded w-[80%]'/>
            <Skeleton className='h-8 rounded w-full'/>
            <div className='flex items-center justify-between w-full mt-2' >
              <Skeleton className='w-28 h-8 rounded'/>
              <Skeleton className='h-8 rounded w-20'/>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className='w-full min-h-[73.5vh] flex slide-in-left space-y-4'>
      <div className="flex flex-col gap-4 w-full lg:w-[80%] xl:w-[70%]">
        <LoadingSkeleton/>
        <LoadingSkeleton/>
      </div>
    </div>
  )
}

export default AgentLoadingSkeleton;