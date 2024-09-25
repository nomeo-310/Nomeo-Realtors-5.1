'use client'

import { aboutUsData } from '@/assets/data';
import Container from '@/components/shared/Container';
import React from 'react'
import SetApartSection from './SetApartSection';
import PartnerSection from './PartnerSection';
import ServicesSection from './ServiceSection';
import TeamSection from './TeamSection';

type Props = {}

const AboutUs = (props: Props) => {
  return (
    <Container className='pt-24 lg:pt-28'>
      <h2 className="lg:text-2xl text-xl text-center">About Us</h2>
      <p className='lg:text-xl md:text-lg mt-5'>{aboutUsData.maintitle}</p>
      <SetApartSection />
      <PartnerSection />
      <ServicesSection />
      <TeamSection />
    </Container>
  )
};

export default AboutUs