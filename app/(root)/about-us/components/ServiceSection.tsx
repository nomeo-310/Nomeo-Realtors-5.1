'use client'

import React from 'react'
import { aboutUsData } from '@/assets/data';

const ServicesSection = () => {
  return (
    <React.Fragment>
      <h2 className='lg:text-4xl text-2xl mb-5 mt-10' id='ourservices'>What services do we render?</h2>
      <p className='lg:text-xl md:text-lg mb-2'>{aboutUsData.whatservice.subtitle}</p>
      <p className='lg:text-xl md:text-lg mb-6 lg:mb-8'>We offer a comprehensive range of services, including:</p>
      <ul className='list-disc list-inside'>
        {aboutUsData.whatservice.ourServices.map((item:{ title: string; body: string; id:string }, index:number) => (
        <li className='lg:text-xl md:text-lg mb-5 md:mb-6 lg:mb-8 last:mb-0' key={index} id={item.id}>
          <span className='font-semibold'>{item.title}:</span> {item.body}
        </li>
        ))}
      </ul>
    </React.Fragment>
  )
};

export default ServicesSection