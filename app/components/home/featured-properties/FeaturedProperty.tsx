'use client'

import React from 'react'
import { propertyProps, userProps } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import FeaturedPropertiesLoading from './FeaturedPropertiesLoading';
import PropertyCard from '../../property/PropertyCard';

const FeaturedProperty = ({user}:{user:userProps}) => {
  const { status, data } = useQuery({
    queryKey: ['featured-properties'],
    queryFn: () => fetch('/api/getFeaturedProperties').then((res) => res.json()),
  });

  if (status === 'pending') {
    return <FeaturedPropertiesLoading />
  };

  if (status === 'error') {
    return (
      <p className='lg:text-xl md:text-lg text-center text-red-400 mt-8 lg:mt-10 w-full'>
        Error while loading featured properties. Reload page.
      </p>
    )
  };


  const featuredProperties:propertyProps[] = data;

  if (status === 'success' && !featuredProperties.length ) {
    return (
      <p className='lg:text-xl md:text-lg text-center mt-8 lg:mt-10 w-full text-red-400'>
        There is no featured property.
      </p>
    )
  };

  return (
    <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 lg:mt-10 lg:gap-x-4 md:gap-x-3 gap-y-6 md:gap-y-8">
      { featuredProperties.map((property:propertyProps) => (
        <PropertyCard property={property} user={user} agentMode={false} agentProfileMode={false} key={property._id}/>
      ))}
    </div>
  )
}

export default FeaturedProperty