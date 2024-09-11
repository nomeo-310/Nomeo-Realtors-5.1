'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HiMiniArrowRight } from 'react-icons/hi2'
import ImageAvatar from '@/components/shared/ImageAvatar'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import { blogProps, userProps } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { AiOutlineHeart } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

type blogCardProps = {
  blog: blogProps
  agentMode: boolean
  user: userProps
};

const BlogCard = ({blog, agentMode, user}: blogCardProps) => {
  const userId = user && user?._id;
  const liked = blog.likes.includes(userId);

  const router = useRouter();

  const BlogMenu = () => {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button className='rounded-full border outline-none focus:outline-none'>
            <HiEllipsisHorizontal size={26} className='text-white'/>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20 rounded z-10 bg-card p-1 md:mr-12 mr-8 mt-2">
          <DropdownMenuItem className='rounded cursor-pointer'>
            <p className='text-sm'>Delete</p>
          </DropdownMenuItem>
          <DropdownMenuItem className='rounded cursor-pointer'>
            <p className='text-sm'>Edit</p>
          </DropdownMenuItem>
          <DropdownMenuItem className='rounded cursor-pointer' onClick={() => router.push(`/blogs/${blog._id}`)}>
            <p className='text-sm'>View</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  };

  return (
    <div className="w-full flex flex-col gap-2 cursor-pointer group">
      <div className="md:aspect-square xl:h-[15rem] lg:h-[14rem] sm:h-[13rem] h-[12.5rem] aspect-video flex items-center justify-center overflow-hidden rounded">
        <div className='w-full h-full relative bg-neutral-600'>
          <Image src={blog.bannerImage.secure_url} alt='blog_art' fill className='object-cover' priority/>
          { !agentMode && <div className="absolute bottom-0 left-0 w-full bg-black/30 p-4 text-white flex items-center justify-between">
            <div>
              <h2 className='text-base capitalize'>{blog.author.user.name}</h2>
              <p className='text-sm'>{formatDate(blog.createdAt)}</p>
            </div>
            <div>
              <ImageAvatar className='rounded-full overflow-hidden lg:w-11 lg:h-11 w-10 h-10' src={blog.author.user.image}/>
            </div>
          </div> }
          { agentMode ? (
          <div className="right-3 top-3 absolute flex items-center gap-4">
            <BlogMenu/>
          </div>
          ) : (
          <div className="right-3 top-3 absolute flex items-center gap-3">
            { liked &&
              <div className='relative hover:opacity-80 transition cursor-pointer bg-red-100 p-1 rounded-full'>
                <AiOutlineHeart size={20} className='fill-rose-500'/>
              </div>
            }
          </div> ) }
        </div>
      </div>
      <div className='flex gap-2 flex-col'>
        <p className='line-clamp-2 lg:text-xl text-lg font-semibold'>{blog.title}</p>
        {!agentMode && <p className='line-clamp-2 text-gray-400 dark:text-white'>{blog.intro}</p>}
        { !agentMode && 
          <Link href={`/blogs/${blog._id}`} className='flex items-center gap-2 font-semibold hover:text-yellow-400 text-sm mt-2'>
            CONTINUE READING
            <HiMiniArrowRight size={18}/>
          </Link>
        }
      </div>
    </div>
  )
}

export default BlogCard