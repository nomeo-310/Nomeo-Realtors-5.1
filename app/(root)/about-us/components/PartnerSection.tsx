'use client'

import React from 'react'
import { aboutUsData } from '@/assets/data';


const PartnerSection = () => {
  return (
    <React.Fragment>
      <h2 className='lg:text-4xl text-2xl mb-2 mt-10'>What partnering with Nomeo Suites means?</h2>
      <p className='lg:text-xl md:text-lg mb-6 lg:mb-8'>{aboutUsData.partneringWithUs.subtitle}</p>
      <ul className='list-disc list-inside'>
        {aboutUsData.partneringWithUs.whyPartner.map((item:{ title: string; body: string; }, index:number) => (
        <li className='lg:text-xl md:text-lg mb-5 md:mb-6 lg:mb-8 last:mb-0' key={index}>
          <span className='font-semibold'>{item.title}:</span> {item.body}
        </li>
        ))}
      </ul>
    </React.Fragment>
  )
};

export default PartnerSection