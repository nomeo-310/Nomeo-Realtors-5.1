'use client'

import React from 'react'
import { clientProps, userProps } from '@/lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScrollClient from '@/components/shared/InfiniteScrollClient';
import ClientCard from '@/app/components/rent-out/ClientCard';
import { LucideLoader2 } from 'lucide-react';
import InspectionLoadingSkeleton from '@/app/components/inspection/InspectionLoadingSkeleton';
import { useRouter } from 'next/navigation';

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  user: userProps
}

type dataProps = {
  clients: clientProps[];
  nextPage: number;
};

const AllClients = ({setActiveTab, user}: Props) => {
  const router = useRouter();
  
  React.useLayoutEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  const fetchApiData = async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch("/api/getAgentClients", {
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
    queryKey: ["clients", user._id],
    queryFn: fetchApiData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage
  });

  const clients: clientProps[] = data?.pages.flatMap((page) => page.clients) || [];

  const Clients = () => {

    if (status === "pending") {
      return <InspectionLoadingSkeleton/>;
    };

    if (status === "success" && !clients.length && !hasNextPage) {
      return (
        <p className="text-base lg:text-lg text-center text-muted-foreground">
          You do not have any client at the moment.
        </p>
      );
    };

    if (status === "error") {
      return (
        <p className="text-base lg:text-lg text-center text-destructive">
          An error occur while loading your clients.
        </p>
      );
    }

    return (
      <InfiniteScrollClient className='space-y-4' onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}>
        { clients && clients.map((item) => (
          <ClientCard client={item} user={user} key={item._id}/>
        ))}
        {isFetchingNextPage && ( <LucideLoader2 className="mx-auto animate-spin my-3" />)}
      </InfiniteScrollClient>
    )
  };

  return (
    <div className='w-full h-full flex slide-in-left'>
      <div className="flex flex-col lg:gap-4 gap-3 w-full lg:w-[85%] xl:w-[75%]">
        <div className='flex gap-4 lg:gap-6 cursor-pointer'>
          <h2 className='text-xl md:text-3xl font-semibold'>All Clients</h2>
          <h2 className='text-xl md:text-3xl font-semibold text-gray-400' onClick={() =>setActiveTab('add-client')}>Add Client</h2>
        </div>
        <Clients />
      </div>
    </div>
  )
}

export default AllClients