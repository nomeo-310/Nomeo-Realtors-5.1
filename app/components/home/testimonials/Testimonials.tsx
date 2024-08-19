'use client'

import React from 'react'
import Container from '@/components/shared/Container'
import Header from '../Header'
import TestimonialSlider from './TestimonialSlider'
import { testimonials } from '@/assets/data'

const Testimonials = () => {
  return (
    <Container id='testimonials'>
      <React.Fragment>
        <Header
          mainTitle='What our customers are saying'
          subTitle="Don't just take our word for it! Here at Nomeo Suites, we're dedicated to providing exceptional service to our clients on all sides of the Lagos real estate market.  See what some of our satisfied customers have to say about their experiences with our team:"
        />
        <TestimonialSlider testimonials={testimonials} useButton/>
      </React.Fragment>
    </Container>
  )
}

export default Testimonials