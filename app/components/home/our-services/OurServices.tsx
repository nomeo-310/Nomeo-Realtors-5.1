'use client'

import Container from '@/components/shared/Container'
import React from 'react'
import Header from '../Header'

type Props = {}

const OurServices = (props: Props) => {
  return (
    <Container className='pt-16'>
      <Header
        mainTitle='Our Services'
        subTitle='At Nomeo Suites, we offer a comprehensive range of services designed to empower you on your real estate journey in Lagos and other states we operate, whether you&apos;re a buyer, seller, landlord, or tenant.'
        link='/about-us/#ourservices'
        linkTitle='Read more...'
      />
    </Container>
  )
}

export default OurServices