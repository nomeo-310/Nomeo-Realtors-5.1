'use client'

import Container from '@/components/shared/Container'
import React from 'react'
import Header from '../Header'
import OurServiceCard from './OurServiceCard'
import { ourService, ourServices } from '@/assets/data'

const OurServices = () => {
  return (
    <Container className='pt-16'>
      <React.Fragment>
        <Header
          mainTitle='Our Services'
          subTitle='At Nomeo Suites, we offer a comprehensive range of services designed to empower you on your real estate journey in Lagos and other states we operate, whether you&apos;re a buyer, seller, landlord, or tenant.'
          link='/about-us/#ourservices'
          linkTitle='Read more...'
        />
        <div className="mt-8 lg:mt-10 grid md:grid-cols-3 grid-cols-1 gap-4 lg:gap-8">
          {ourServices.map((item:ourService, index:number) => (
            <OurServiceCard key={index} {...item}/>
          ))}
        </div>
      </React.Fragment>
    </Container>
  )
}

export default OurServices