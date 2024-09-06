'use client'

import React from 'react'
import { blogProps, userProps } from '@/lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScrollClient from '@/components/shared/InfiniteScrollClient';
import BlogCard from '@/app/components/blogs/BlogCard';
import { LucideLoader2 } from 'lucide-react';
import AllBlogsLoading from './AllBlogsLoading';

type Props = {
  user: userProps;
}

type dataProps = {
  blogs: blogProps[];
  nextPage: number;
};

const AllBlogs = ({user}: Props) => {

  const fetchApiData = async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch("/api/getAllBlogs", {
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
    queryKey: ["all-posts"],
    queryFn: fetchApiData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage
  });

  const blogs: blogProps[] = data?.pages.flatMap((page) => page.blogs) || [];
  
  if (status === "pending") {
    return <AllBlogsLoading />;
  };

  if (status === "success" && !blogs.length && !hasNextPage) {
    return (
      <p className="text-base lg:text-lg text-center text-muted-foreground">
        You have not created any blog post yet.
      </p>
    );
  };

  if (status === "error") {
    return (
      <p className="text-base lg:text-lg text-center text-destructive">
        An error occur while loading your created posts.
      </p>
    );
  }

  return(
    <InfiniteScrollClient className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-x-4 md:gap-x-3 gap-y-6 mt-8' onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}>
      { blogs && blogs.map((item) => (
        <BlogCard blog={item} user={user} agentMode={false} />
      ))}
      {isFetchingNextPage && ( <LucideLoader2 className="mx-auto animate-spin my-3" />)}
    </InfiniteScrollClient>
  )
};

export default AllBlogs