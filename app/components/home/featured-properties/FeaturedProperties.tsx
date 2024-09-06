'use client'

import Container from '@/components/shared/Container'
import React from 'react'
import Header from '../Header'
import { userProps } from '@/lib/types';
import FeaturedProperty from './FeaturedProperty';

const FeaturedProperties = ({user}:{user:userProps}) => {
  
  return (
    <Container id='featuredProperties'>
      <Header
        mainTitle='Featured Properties'
        subTitle='Browse our featured listings below to get a glimpse of what we offer.  From modern apartments in desirable neighborhoods to luxurious homes with stunning amenities, we&apos;re confident you&apos;ll find a property that captures your heart.'
      />
      <FeaturedProperty user={user}/>
    </Container>
  )
}

export default FeaturedProperties;