'use client'


import React from 'react'
import Container from '@/components/shared/Container'
import Header from '../Header'
import LatestBlogPosts from '../../blogs/LatestBlogs';


const LatestBlogs = () => {

  return (
    <Container id='latestBlogs'>
      <Header
        className='mb-8 lg:mb-10'
        mainTitle='Our Latest Blogs'
        subTitle='Your one-stop shop for navigating the exciting and ever-changing world of Lagos real estate. Whether you&apos;re a seasoned investor, a first-time homebuyer, a curious renter, or simply someone with a dream of owning property, we&apos;ve got you covered. Here at Nomeo Suites, we&apos;re passionate about empowering you with the knowledge and insights you need to make informed decisions on your real estate journey.'
        link="/blogs"
        linkTitle="Read all..."
      />
      <LatestBlogPosts />
    </Container>
  )
}

export default LatestBlogs