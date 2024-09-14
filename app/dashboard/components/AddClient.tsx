'use client'

import InspectionCard from '@/app/components/inspection/InspectionCard';
import InspectionLoadingSkeleton from '@/app/components/inspection/InspectionLoadingSkeleton';
import InfiniteScrollClient from '@/components/shared/InfiniteScrollClient';
import { inspectionProps, userProps } from '@/lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { LucideLoader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  
  React.useLayoutEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user])

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

  const Inspections = () => {

    if (status === "pending") {
      return <InspectionLoadingSkeleton/>;
    };

    if (status === "success" && !inspections.length && !hasNextPage) {
      return (
        <p className="text-base lg:text-lg text-center text-muted-foreground">
          You do not have any potential client at the moment.
        </p>
      );
    };

    if (status === "error") {
      return (
        <p className="text-base lg:text-lg text-center text-destructive">
          An error occur while loading your potential clients.
        </p>
      );
    }

    return (
      <InfiniteScrollClient className='space-y-4' onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}>
        { inspections && inspections.map((item) => (
          <InspectionCard inspection={item} setActiveTab={setActiveTab}/>
        ))}
        {isFetchingNextPage && ( <LucideLoader2 className="mx-auto animate-spin my-3" />)}
      </InfiniteScrollClient>
    )
  };

  return (
    <div className='w-full h-full flex slide-in-left'>
      <div className="flex flex-col lg:gap-4 gap-3 w-full lg:w-[85%] xl:w-[75%]">
        <div className='flex gap-4 lg:gap-6 cursor-pointer'>
          <h2 className='text-xl md:text-3xl font-semibold'>Add Client</h2>
          <h2 className='text-xl md:text-3xl font-semibold text-gray-400' onClick={() =>setActiveTab('all-clients')}>All Clients</h2>
        </div>
        <Inspections />
      </div>
    </div>
  )
}

export default AddClient