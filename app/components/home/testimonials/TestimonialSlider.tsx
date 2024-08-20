'use client'


import React from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';
import TestimonialCard from './TestimonialCard';
import { LiaArrowRightSolid, LiaArrowLeftSolid } from "react-icons/lia"
import { testimony, testimonySliderSettings } from '@/assets/data';

type Props = {
  useButton?: boolean 
  testimonials: testimony[]
}

const TestimonialSlider = ({useButton, testimonials}: Props) => {
  const swiperRef = React.useRef<SwiperCore>();

  return (
    <div className='mt-8 lg:mt-10 lg:-mx-10 -mx-4'>
      <div className='flex lg:gap-2 gap-1 items-center'>
        <div>
          <button onClick={() => swiperRef.current?.slidePrev()} className={`${useButton ? 'grow w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-primary hover:scale-105 hover:border active:border': ''}`}>
            { useButton ? <LiaArrowLeftSolid size={26} /> : <CiCircleChevLeft size={45} /> }
          </button>
        </div>
        <Swiper 
          breakpoints={testimonySliderSettings}
          modules={[Navigation, Pagination, A11y]}
          onBeforeInit={(swiper) => {swiperRef.current = swiper;}}
          loop={true}>
          { testimonials.map((testimony:testimony, index:number) => (
            <SwiperSlide key={`slide_${index}`}>
              <TestimonialCard {...testimony}/>
            </SwiperSlide>
            ))}
        </Swiper>
        <div>
          <button onClick={() => swiperRef.current?.slideNext()} className={`${useButton ? 'grow w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-primary hover:scale-105 hover:border active:border': ''}`}>
            { useButton ? <LiaArrowRightSolid size={26} /> : <CiCircleChevRight size={45} /> }
          </button>
        </div>
      </div>
    </div>
  )
}

export default TestimonialSlider