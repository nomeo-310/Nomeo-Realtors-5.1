'use client'

import React from 'react'
import { blogProps, userProps } from '@/lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import PostLoading from './PostLoading';
import InfiniteScrollClient from '@/components/shared/InfiniteScrollClient';
import BlogCard from '@/app/components/blogs/BlogCard';
import { LucideLoader2 } from 'lucide-react';

type Props = {
  user: userProps;
}

type dataProps = {
  blogs: blogProps[];
  nextPage: number;
};

const UserLikedPosts = ({user}: Props) => {

  const fetchApiData = async ({ pageParam }: { pageParam: number }) => {
    const response = await fetch("/api/getLikedBlogs", {
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
    queryKey: ["liked-posts", user._id],
    queryFn: fetchApiData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage
  });

  const blogs: blogProps[] = data?.pages.flatMap((page) => page.blogs) || [];
  
  const Blogs = () => {

    if (status === "pending") {
      return <PostLoading />;
    };

    if (status === "success" && !blogs.length && !hasNextPage) {
      return (
        <p className="text-base lg:text-lg text-center text-muted-foreground">
          You do not have any liked blog post. Try liking a blog post to see something.
        </p>
      );
    };

    if (status === "error") {
      return (
        <p className="text-base lg:text-lg text-center text-destructive">
          An error occur while loading your liked blog posts.
        </p>
      );
    }

    return(
      <InfiniteScrollClient className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-x-4 md:gap-x-3 gap-y-6 w-full' onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}>
        { blogs && blogs.map((item) => (
          <BlogCard blog={item} user={user} agentMode={false} />
        ))}
        {isFetchingNextPage && ( <LucideLoader2 className="mx-auto animate-spin my-3" />)}
      </InfiniteScrollClient>
    )
  };

  return (
    <div className='w-full min-h-[73.5vh] flex slide-in-left space-y-4'>
      <h2 className='font-semibold md:hidden text-lg'>Liked Posts</h2>
      <Blogs/>
    </div>
  )
};

export default UserLikedPosts;