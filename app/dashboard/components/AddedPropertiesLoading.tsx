import PropertySkeleton from '@/app/components/property/PropertySkeleton';
import React from 'react'

type Props = {}

const AddedPropertiesLoading = (props: Props) => {
  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 mt-8 xl:gap-x-4 md:gap-x-3 gap-y-6'>
      <PropertySkeleton/>
      <PropertySkeleton/>
      <PropertySkeleton/>
      <PropertySkeleton/>
      <PropertySkeleton/>
      <PropertySkeleton/>
    </div>
  )
}

export default AddedPropertiesLoading