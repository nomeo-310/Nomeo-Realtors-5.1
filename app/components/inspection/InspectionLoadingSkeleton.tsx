import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

type Props = {}

const InspectionLoadingSkeleton = (props: Props) => {

  const LoadingSkeleton = () => {
    return (
      <div className="w-full animate-pulse rounded bg-card p-3 md:p-4 shadow-sm">
        <Skeleton className='w-28 h-4 rounded mb-1.5'/>
        <div className='flex gap-4'>
          <Skeleton className='flex-none rounded-full md:size-16 size-12'/>
          <div className='w-full space-y-1.5 grow'>
            <Skeleton className='md:h-16 h-12 rounded w-full'/>
            <div className='flex items-center justify-between w-full mt-2' >
              <Skeleton className='w-28 h-4 rounded'/>
              <Skeleton className='h-4 rounded w-20'/>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className='space-y-4'>
      <LoadingSkeleton/>
      <LoadingSkeleton/>
      <LoadingSkeleton/>
    </div>
  )
}

export default InspectionLoadingSkeleton;