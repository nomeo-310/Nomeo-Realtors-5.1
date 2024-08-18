import Image from 'next/image';
import React from 'react'
import HomePageSearch from './HomePageSearch';


const LandingPage = () => {
  return (
    <div className='h-svh w-full'>
      <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center overflow-hidden">
        <Image src={'/images/desktop_banner.jpg'} className='object-cover' fill alt='banner' priority/>
      </div>
      <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center md:gap-12 gap-7 flex-col lg:pt-[3%] pt-[12%]">
        <div className="flex flex-col lg:gap-10 md:gap-8 gap-5">
          <div className="flex flex-col items-center slide-in-top_1">
            <h2 className='lg:text-7xl md:text-5xl text-3xl text-white'>Find a modern property</h2>
            <h2 className='lg:text-7xl md:text-5xl text-3xl text-white'>that <span className='text-primary'>suits you.</span></h2>
          </div>
          <div className='slide-in-top_2'>
            <h2 className='text-white lg:text-4xl md:text-3xl text-xl lg:w-[78%] w-[80%] mx-auto text-center'>Discover the perfect property that suits your unique style and needs.</h2>
          </div>
          <div className='mx-auto slide-in-top_3 bg-card/20 overflow-hidden rounded mt-10 border'>
            <HomePageSearch />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;