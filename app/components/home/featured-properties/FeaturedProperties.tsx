'use client'

import Container from '@/components/shared/Container'
import React from 'react'
import Header from '../Header'

const FeaturedProperties = () => {

  return (
    <Container id='featuredProperties'>
      <Header
        mainTitle='Featured Properties'
        subTitle='Browse our featured listings below to get a glimpse of what we offer.  From modern apartments in desirable neighborhoods to luxurious homes with stunning amenities, we&apos;re confident you&apos;ll find a property that captures your heart.'
      />
    </Container>
  )
}

export default FeaturedProperties;