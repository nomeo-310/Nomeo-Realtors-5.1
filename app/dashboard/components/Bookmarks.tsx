import React from 'react'
import InfiniteScrollClient from '@/components/shared/InfiniteScrollClient';
import { propertyProps, userProps } from '@/lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import PropertiesLoading from './PropertiesLoading';
import PropertyCard from '@/app/components/property/PropertyCard';
import { LucideLoader2 } from 'lucide-react';

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  user: userProps;
};

type dataProps = {
  properties: propertyProps[];
  nextPage: number;
};

const Bookmarks = ({setActiveTab, user}: Props) => {

  const fetchApiData = async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch("/api/getBookmarkedProperties", {
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
    queryKey: ["bookmarked-properties", user._id],
    queryFn: fetchApiData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage
  });

  const properties: propertyProps[] = data?.pages.flatMap((page) => page.properties) || [];

  const Properties = () => {

    if (status === "pending") {
      return <PropertiesLoading />;
    };

    if (status === "success" && !properties.length && !hasNextPage) {
      return (
        <p className="text-base lg:text-lg text-center text-muted-foreground">
          You have not bookmarked any properties yet.
        </p>
      );
    };

    if (status === "error") {
      return (
        <p className="text-base lg:text-lg text-center text-destructive">
          An error occur while loading your bookmarked properties.
        </p>
      );
    }

    return (
      <InfiniteScrollClient className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-x-4 md:gap-x-3 gap-y-6' onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}>
        { properties && properties.map((item) => (
          <PropertyCard property={item} user={user} agentMode={false} agentProfileMode={false} />
        ))}
        {isFetchingNextPage && ( <LucideLoader2 className="mx-auto animate-spin my-3" />)}
      </InfiniteScrollClient>
    )
  };

  return (
    <div className='w-full min-h-[73.5vh] flex slide-in-left'>
      <div className="flex flex-col lg:gap-4 gap-3 w-full">
        <div className='flex w-full lg:gap-6 gap-4 cursor-pointer'>
          <h2 className='text-xl md:text-3xl font-semibold'>Bookmarks</h2>
          <h2 className='text-xl md:text-3xl font-semibold text-gray-400' onClick={() =>setActiveTab('rented-properties')}>Rented Properties</h2>
          { user.showLikedProperties && <h2 className='text-xl md:text-3xl font-semibold text-gray-400' onClick={() =>setActiveTab('liked-properties')}>Liked Properties</h2> }
        </div>
        <Properties/>
      </div>
    </div>
  )
}

export default Bookmarks