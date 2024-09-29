'use client'

import React from 'react'
import InfiniteScrollClient from '@/components/shared/InfiniteScrollClient';
import { userInspectionProps, userProps } from '@/lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { LucideLoader2 } from 'lucide-react';
import InspectionLoadingSkeleton from '@/app/components/inspection/InspectionLoadingSkeleton';
import UserInspectionCard from '@/app/components/inspection/UserInspectionCard';


type Props = {
  user: userProps
}

type dataProps = {
  inspections: userInspectionProps[];
  nextPage: number;
};

const Inspections = ({user}: Props) => {

  const fetchApiData = async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch("/api/getUserInspections", {
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

  const inspections: userInspectionProps[] = data?.pages.flatMap((page) => page.inspections) || [];

  if (status === "pending") {
    return (
      <div className="flex flex-col gap-4 w-full lg:w-[80%] xl:w-[70%]">
        <InspectionLoadingSkeleton/>
      </div>
    )
  };

  if (status === "success" && !inspections.length && !hasNextPage) {
    return (
      <p className="text-base lg:text-lg text-center text-muted-foreground">
        You have not booked inspections yet.
      </p>
    );
  };

  if (status === "error") {
    return (
      <p className="text-base lg:text-lg text-center text-destructive">
        An error occur while loading your booked inspections.
      </p>
    );
  }

  return (
    <InfiniteScrollClient className='w-full min-h-[73.5vh] flex slide-in-left space-y-4' onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}>
      <div className="flex flex-col gap-4 w-full lg:w-[80%] xl:w-[70%]">
        <h2 className='font-semibold md:hidden text-lg'>Inspections</h2>
        { inspections && inspections.map((item) => (
          <UserInspectionCard inspection={item} user={user} key={item._id}/>
        ))}
        { isFetchingNextPage && ( <LucideLoader2 className="mx-auto animate-spin my-3" />)}
      </div>
    </InfiniteScrollClient>
  )
}

export default Inspections;