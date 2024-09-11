'use client'

import React from 'react'
import BlogSkeleton from '@/app/components/blogs/BlogSkeleton';


const AllBlogsLoading = () => {
  return (
    <div className='grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 grid-cols-1 mt-8 xl:gap-x-4 md:gap-x-3 gap-y-6'>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <div className='hidden lg:block'>
        <BlogSkeleton/>
      </div>
      <div className='hidden lg:block'>
        <BlogSkeleton/>
      </div>
      <div className="hidden xl:block">
        <BlogSkeleton/>      
      </div>
      <div className="hidden xl:block">
        <BlogSkeleton/>       
      </div>
    </div>
  )
}

export default AllBlogsLoading;