'use client'

import React from 'react'
import { propertyProps, userProps } from '@/lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import PropertiesLoading from '@/app/components/property/PropertiesLoading';
import InfiniteScrollClient from '@/components/shared/InfiniteScrollClient';
import PropertyCard from '@/app/components/property/PropertyCard';
import { LucideLoader2 } from 'lucide-react';

type pageProps = {
  searchParams: {[key: string]: string | undefined};
  user: userProps
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
};

const AllRent = ({searchParams, user, setIsLoading}:pageProps) => {

  const fetchApiData = async ({pageParam}: {pageParam: number}) => {

    const response = await fetch('/api/getAllRentProperties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ page: pageParam, query: searchParams})
    });
    
    if (!response.ok) {
      throw new Error('Something went wrong, try again later');
    }

    const data = await response.json();
    return data
  };

  const {data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['rent-properties', searchParams],
    queryFn: fetchApiData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage
  });

  const properties:propertyProps[] = data?.pages.flatMap(page => page.properties) || [];

  if (status === 'pending') {
    {searchParams.state && setIsLoading(true)}
    return <PropertiesLoading/>
  };

  if (status === 'success' && !properties.length && !hasNextPage) {
    {searchParams.state && setIsLoading(false)}
    return (
      <p className='text-base lg:text-lg text-center'>
        { searchParams.state ? 
          'No property fits into the data you just searched. Try again another time' : 
          'No rent properties yet'
        }
      </p>
    )
  };

  if (status === 'error') {
    {searchParams.state && setIsLoading(false)}
    return (
      <p className='text-base lg:text-lg text-center text-destructive'>
        An error occur while loading properties.
      </p>
    )
  };

  {searchParams.state && setIsLoading(false)}
  return (
    <InfiniteScrollClient  className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-x-4 md:gap-x-3 gap-y-6 md:gap-y-8" 
    onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}>
      { properties.map((property) => (
        <PropertyCard property={property} user={user} agentMode={false} agentProfileMode={false} key={property._id}/>
      ))}
      { isFetchingNextPage && <LucideLoader2 className='mx-auto animate-spin my-3'/> }
    </InfiniteScrollClient>
  )
};

export default AllRent;