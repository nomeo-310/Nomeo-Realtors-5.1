'use client'

import Container from '@/components/shared/Container';
import ImageAvatar from '@/components/shared/ImageAvatar';
import { blogProps, userProps } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import { BsEyeFill } from 'react-icons/bs';
import LikeButton from './LikeButton';

type Props = {
  blog: blogProps
  user:userProps
}

const Blog = ({blog, user}: Props) => {
  return (
    <Container className='pt-24 lg:pt-28'>
      <div className="mb-8">
        <div className="flex w-full justify-between items-center">
          <h2 className='xl:text-4xl lg:text-3xl md:text-2xl text-xl font-semibold mt-8 mb-4'>{blog.title}</h2>
          { user?._id !== blog.author.user._id &&
            <div>
              <LikeButton user={user} blog={blog}/>
            </div>
          }
        </div>
        <div className='mb-4 flex items-center gap-3'>
          <ImageAvatar className='rounded-full w-10 h-10 border flex-none' src={blog.author.user.image}/>
          <div className='lg:text-lg border-r pr-3 capitalize'>{blog.author.user.name}</div>
          <div className='lg:text-lg border-r pr-3'>{formatDate(blog.createdAt)}</div>
          <div className='lg:text-lg flex items-center gap-2'>
            <BsEyeFill size={22}/>
            {blog.readTime} mins read
          </div>
        </div>
        <div className="w-full aspect-video relative flex items-start flex-col justify-start rounded overflow-hidden lg:h-[38rem] mb-6">
          <Image src={blog.bannerImage.secure_url} alt='banner_image' priority fill className='object-cover'/>
        </div>
        <div className='ProseMirror whitespace-pre-line' dangerouslySetInnerHTML={{__html: blog.content}}>
        </div>
      </div>
      <hr/>
      <div className='py-8 flex gap-3 lg:gap-5 w-full'>
        <div className="w-fit">
          <ImageAvatar className='w-28 h-28 lg:w-40 lg:h-40 md:w-36 md:h-36 flex-none rounded-full border' src={blog.author.user.image}/>
        </div>
        <div className='flex justify-between flex-col gap-2 grow'>
          <h2 className='lg:text-xl md:text-lg capitalize'>{blog.author.user.name}</h2>
          <p className='line-clamp-3 lg:line-clamp-4 lg:text-lg'>{blog.author.agentBio}</p>
        </div>
      </div>
    </Container>
  )
}

export default Blog