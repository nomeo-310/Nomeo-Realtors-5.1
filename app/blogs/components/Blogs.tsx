'use client'

import LatestBlogPosts from '@/app/components/blogs/LatestBlogs';
import { blogData } from '@/assets/data';
import Container from '@/components/shared/Container';
import React from 'react'
import AllBlogs from './AllBlogs';
import { userProps } from '@/lib/types';

type Props = {
  user: userProps;
}

const Blogs = ({user}:Props) => {
  return (
    <Container className='pt-24 lg:pt-28'>
      <div className="pt-10">
        <h2 className="lg:text-2xl text-xl text-center">Blog</h2>
        <p className="lg:text-xl md:text-lg mt-5 mb-2">{blogData.mainTitle}</p>
        <div className="w-full mt-8 lg:mt-10">
          <h2 className="lg:text-2xl text-xl mb-8 lg:mb-10">Recent blog posts</h2>
          <LatestBlogPosts />
        </div>
        <div className="w-full mt-8 lg:mt-10">
          <h2 className="lg:text-2xl text-xl">All blog posts</h2>
          <AllBlogs user={user}/>
        </div>
      </div>
    </Container>
  )
}

export default Blogs