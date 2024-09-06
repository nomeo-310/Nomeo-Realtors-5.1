'use client'

import React from 'react'
import BlogSkeleton from '@/app/components/blogs/BlogSkeleton';


const PostLoading = () => {
  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 mt-8 xl:gap-x-4 md:gap-x-3 gap-y-6'>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
    </div>
  )
}

export default PostLoading;