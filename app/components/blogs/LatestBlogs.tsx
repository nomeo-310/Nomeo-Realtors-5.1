'use client'


import React from 'react'
import ImageAvatar from '@/components/shared/ImageAvatar'
import Image from 'next/image'
import Link from 'next/link'
import { HiMiniArrowRight } from 'react-icons/hi2'
import { useQuery } from '@tanstack/react-query'
import LatestBlogsLoading from './LatestBlogsLoading';
import { formatDate } from '@/lib/utils';
import { blogProps } from '@/lib/types';



const LatestBlogPosts = () => {

  const { data, status } = useQuery({
    queryKey: ['latest-blogs'],
    queryFn: () => fetch('/api/getLatestBlogs').then((res) => res.json()),
  });

  if (status === 'pending') {
    return <LatestBlogsLoading/>
  };

  if (status === 'error') {
    return (
      <p className='lg:text-xl md:text-lg text-center text-red-400 mt-8 lg:mt-10 font-semibold w-full'>
        Error while loading latest blogs. Reload page.
      </p>
    )
  };

  const blogList:blogProps[] = data;

  if (status === 'success' && !blogList.length ) {
    return (
      <p className='lg:text-xl md:text-lg text-center mt-8 lg:mt-10 w-full text-red-400'>
       There is no recent blog.
      </p>
    )
  };

  return (
    <div className="w-full h-fit grid md:grid-cols-2 xl:gap-4 gap-3 grid-cols-1">
      <div className="w-full mb-2 md:mb-0">
        <div className="w-full aspect-video lg:h-[18rem] h-[15rem] rounded relative overflow-hidden flex items-center justify-center mb-4 bg-neutral-600">
          <Image src={blogList[0].bannerImage.secure_url} alt='banner_1' priority fill className='object-cover'/>
          <div className="absolute bottom-0 left-0 w-full bg-black/30 p-4 text-white flex items-center justify-between">
            <div>
              <h2 className='capitalize'>{blogList[0].author.user.name}</h2>
              <p className='text-sm'>{formatDate(blogList[0].createdAt)}</p>
            </div>
            <div>
              <ImageAvatar className='rounded-full flex-none lg:w-11 lg:h-11 w-10 h-10' src={blogList[0].author.user.image}/>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='line-clamp-2 lg:text-xl text-lg font-semibold'>{blogList[0].title}</p>
          <p className='line-clamp-2 text-gray-400 dark:text-white'>{blogList[0].intro}</p>
          <Link href={`/blogs/${blogList[0]._id}`} className='flex items-center gap-2 font-semibold hover:text-yellow-400 text-sm lg:mt-5 mt-4'>
            CONTINUE READING
            <HiMiniArrowRight size={18}/>
          </Link>
        </div>
      </div>
      <div className="w-full sm:hidden mb-2">
        <div className="w-full aspect-video lg:h-[18rem] h-[15rem] rounded relative overflow-hidden flex items-center justify-center mb-4 bg-neutral-600">
          <Image src={blogList[1].bannerImage.secure_url} alt='banner_1' priority fill className='object-cover'/>
          <div className="absolute bottom-0 left-0 w-full bg-black/30 p-4 text-white flex items-center justify-between">
            <div>
              <h2 className='capitalize'>{blogList[1].author.user.name}</h2>
              <p className='text-sm'>{formatDate(blogList[1].createdAt)}</p>
            </div>
            <div>
              <ImageAvatar className='rounded-full flex-none lg:w-11 lg:h-11 w-10 h-10' src={blogList[1].author.user.image}/>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='line-clamp-2 lg:text-xl text-lg font-semibold'>{blogList[1].title}</p>
          <p className='line-clamp-2 text-gray-400 dark:text-white'>{blogList[1].intro}</p>
          <Link href={`/blogs/${blogList[1]._id}`} className='flex items-center gap-2 font-semibold hover:text-yellow-400 text-sm lg:mt-5 mt-4'>
            CONTINUE READING
            <HiMiniArrowRight size={18}/>
          </Link>
        </div>
      </div>
      <div className="w-full sm:hidden mb-2">
        <div className="w-full aspect-video lg:h-[18rem] h-[15rem] rounded relative overflow-hidden flex items-center justify-center mb-4 bg-neutral-600">
          <Image src={blogList[2].bannerImage.secure_url} alt='banner_1' priority fill className='object-cover'/>
          <div className="absolute bottom-0 left-0 w-full bg-black/30 p-4 text-white flex items-center justify-between">
            <div>
              <h2 className='capitalize'>{blogList[2].author.user.name}</h2>
              <p className='text-sm'>{formatDate(blogList[2].createdAt)}</p>
            </div>
            <div>
              <ImageAvatar className='rounded-full flex-none lg:w-11 lg:h-11 w-10 h-10' src={blogList[2].author.user.image}/>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='line-clamp-2 lg:text-xl text-lg font-semibold'>{blogList[2].title}</p>
          <p className='line-clamp-2 text-gray-400 dark:text-white'>{blogList[2].intro}</p>
          <Link href={`/blogs/${blogList[2]._id}`} className='flex items-center gap-2 font-semibold hover:text-yellow-400 text-sm lg:mt-5 mt-4'>
            CONTINUE READING
            <HiMiniArrowRight size={18}/>
          </Link>
        </div>
      </div>
      <div className="md:grid w-full grid-rows-2 xl:gap-4 gap-3 hidden">
        <div className="w-full flex gap-3">
          <div className="w-[40%] h-full relative rounded overflow-hidden flex items-center justify-center bg-neutral-600">
            <Image src={blogList[1].bannerImage.secure_url} alt='banner_image' fill priority className='object-cover'/>
            <div className="absolute bottom-0 left-0 w-full bg-black/30 p-4 text-white flex items-center justify-between">
              <div>
                <h2 className='capitalize'>{blogList[1].author.user.name}</h2>
                <p className='text-sm'>{formatDate(blogList[1].createdAt)}</p>
              </div>
              <div>
                <ImageAvatar className='rounded-full flex-none w-10 h-10' src={blogList[1].author.user.image}/>
              </div>
            </div>
          </div>
          <div className="w-[60%] h-full flex flex-col justify-between pb-4">
            <p className='line-clamp-2 lg:text-xl text-lg font-semibold'>{blogList[1].title}</p>
            <p className='line-clamp-3 text-gray-400 dark:text-white'>{blogList[1].intro}</p>
            <Link href={`/blogs/${blogList[1]._id}`} className='flex items-center gap-2 font-semibold hover:text-yellow-400 text-sm lg:mt-5 mt-4'>
              CONTINUE READING
              <HiMiniArrowRight size={18}/>
            </Link>
          </div>
        </div>
        <div className="w-full flex gap-3">
          <div className="w-[40%] h-full relative rounded overflow-hidden flex items-center justify-center bg-neutral-600">
            <Image src={blogList[2].bannerImage.secure_url} alt='banner_image' fill priority className='object-cover'/>
            <div className="absolute bottom-0 left-0 w-full bg-black/30 p-4 text-white flex items-center justify-between">
              <div>
                <h2 className='capitalize'>{blogList[2].author.user.name}</h2>
                <p className='text-sm'>{formatDate(blogList[2].createdAt)}</p>
              </div>
              <div>
                <ImageAvatar className='rounded-full flex-none w-10 h-10' src={blogList[2].author.user.image}/>
              </div>
            </div>
          </div>
          <div className="w-[60%] h-full flex flex-col justify-between pb-4">
            <p className='line-clamp-2 lg:text-xl text-lg font-semibold'>{blogList[2].title}</p>
            <p className='line-clamp-3 text-gray-400 dark:text-white'>{blogList[2].intro}</p>
            <Link href={`/blogs/${blogList[2]._id}`} className='flex items-center gap-2 font-semibold hover:text-yellow-400 text-sm lg:mt-5 mt-4'>
              CONTINUE READING
              <HiMiniArrowRight size={18}/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
};

export default LatestBlogPosts