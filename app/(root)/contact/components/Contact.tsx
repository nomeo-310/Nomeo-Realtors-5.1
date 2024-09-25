'use client'

import Container from '@/components/shared/Container';
import React from 'react'
import LeftSection from './LeftSection';
import RightSection from './RightSection';


const Contact = () => {
  return (
    <Container className='pt-24 lg:pt-28'>
      <h2 className="lg:text-2xl text-xl text-center mb-5">Contact Us</h2>
      <div className="w-full grid md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-3 lg:h-[46rem] h-full">
        <LeftSection/>
        <RightSection />
      </div>
    </Container>
  )
}

export default Contact