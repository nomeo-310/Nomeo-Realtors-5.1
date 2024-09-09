'use client'

import { inspectionProps, userProps } from '@/lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react'

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  user: userProps
}

type dataProps = {
  inspections: inspectionProps[];
  nextPage: number;
};

const AddClient = ({setActiveTab, user}: Props) => {

  const fetchApiData = async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch("/api/getAgentInspections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pageParam }),
    });

    if (!response.ok) {
      throw new Error("Something went wrong, try again later");
    }

    const data:dataProps = await response.json();
    return data;
  };

  const {  data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status} = useInfiniteQuery({
    queryKey: ["inspections", user._id],
    queryFn: fetchApiData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage
  });

  const inspections: inspectionProps[] = data?.pages.flatMap((page) => page.inspections) || [];
  console.log(inspections)

  return (
    <div className='w-full h-full flex slide-in-left'>
      <div className="flex flex-col lg:gap-4 gap-3 w-full lg:w-[85%] xl:w-[75%]">
        <div className='flex gap-4 lg:gap-6 cursor-pointer'>
          <h2 className='text-xl md:text-3xl font-semibold'>Add Client</h2>
          <h2 className='text-xl md:text-3xl font-semibold text-gray-400' onClick={() =>setActiveTab('all-clients')}>All Clients</h2>
        </div>
      </div>
    </div>
  )
}

export default AddClient