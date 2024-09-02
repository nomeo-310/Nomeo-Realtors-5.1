'use client'

import React from 'react'
import PropertySkeleton from '../../property/PropertySkeleton';

const FeaturedPropertiesLoading = () => {
  return (
    <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 lg:mt-10 lg:gap-x-4 md:gap-x-3 gap-y-6 md:gap-y-8">
      <PropertySkeleton/>
      <PropertySkeleton/>
      <PropertySkeleton/>
      <PropertySkeleton/>
      <PropertySkeleton/>
      <PropertySkeleton/>
    </div>
  )
}

export default FeaturedPropertiesLoading