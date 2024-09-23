'use client'

import React from 'react'
import PropertySkeleton from './PropertySkeleton';

type Props = {}

const PropertiesLoading = (props: Props) => {

  return (
    <div className='w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-x-4 md:gap-x-3 gap-y-6 md:gap-y-8'>
      <PropertySkeleton/>
      <PropertySkeleton/>
      <PropertySkeleton/>
      <PropertySkeleton className='hidden md:block'/>
      <PropertySkeleton className='hidden md:block'/>
      <PropertySkeleton className='hidden md:block'/>
    </div>
  )
}

export default PropertiesLoading