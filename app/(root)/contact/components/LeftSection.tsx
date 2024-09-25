'use client'

import React from 'react'
import { HiOutlineEnvelope, HiOutlineHome, HiOutlinePhone } from 'react-icons/hi2'
import { BsThreads } from 'react-icons/bs'
import { LiaFacebookF, LiaInstagram, LiaTwitter } from 'react-icons/lia'

const LeftSection = () => {
  return (
    <div className="pb-8 md:pb-0 h-full flex flex-col justify-between">
      <div className='mb-6 md:mb-8'>
        <h2 className='mb-6 md:mb-8 text-2xl md:text-3xl lg:text-4xl font-semibold'>Get In Touch With Us</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit est incidunt aut vel quaerat voluptates ad ipsam, quia ex, ratione placeat eius illum quo esse dolorum, optio veniam culpa. Quo.</p>
      </div>
      <div className="flex flex-col gap-6 md:gap-8">
        <div className="flex md:gap-3 gap-2">
          <div className="lg:w-16 lg:h-16 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
            <HiOutlineHome size={32} className='hidden lg:block'/>
            <HiOutlineHome size={22} className='lg:hidden'/>
          </div>
          <div className='flex flex-col gap-1 lg:w-[calc(100%_-_5rem)] w-[calc(100%_-_3.75rem)]'>
            <h2 className='mb-1 md:text-xl text-lg font-semibold'>Our Offices</h2>
            <p className='text-[0.95rem] leading-[1.4rem] md:text-base'>Block 12B, Omo-Disu Street, Owutu Estate, Ikeja, Lagos State.</p>
            <p className='text-[0.95rem] leading-[1.4rem] md:text-base'>Block 12B, Omo-Disu Street, Owutu Estate, Ikeja, Oyo State.</p>
            <p className='text-[0.95rem] leading-[1.4rem] md:text-base'>Block 12B, Omo-Disu Street, Owutu Estate, Ikeja, Ogun State.</p>
          </div>
        </div>
        <div className="flex md:gap-3 gap-2">
          <div className="lg:w-16 lg:h-16 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
            <HiOutlinePhone size={32} className='hidden lg:block'/>
            <HiOutlinePhone size={22} className='lg:hidden'/>
          </div>
          <div className='flex flex-col gap-1 lg:w-[calc(100%_-_5rem)] w-[calc(100%_-_3.75rem)]'>
            <h2 className='mb-1 md:text-xl text-lg font-semibold'>Our Contact lines</h2>
            <p className='text-[0.95rem] leading-[1.4rem] md:text-base'>+2347057689543</p>
            <p className='text-[0.95rem] leading-[1.4rem] md:text-base'>+2347035678902</p>
            <p className='text-[0.95rem] leading-[1.4rem] md:text-base'>+2347035678902</p>
          </div>
        </div>
        <div className="flex md:gap-3 gap-2">
          <div className="lg:w-16 lg:h-16 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
            <HiOutlineEnvelope size={32} className='hidden lg:block'/>
            <HiOutlineEnvelope size={22} className='lg:hidden'/>
          </div>
          <div className='flex flex-col gap-1 lg:w-[calc(100%_-_5rem)] w-[calc(100%_-_3.75rem)]'>
            <h2 className='mb-1 md:text-xl text-lg font-semibold'>Our email address</h2>
            <p className='text-[0.95rem] leading-[1.4rem] md:text-base'>info@nomeorealtors.com</p>
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-4">
        <h2 className='mb-1 md:text-xl text-lg font-semibold'>Follow us on social media:</h2>
        <div className='flex gap-6 items-center'>
          <a href="https://wwww.instagram.com/nomeosuites" className='hover:scale-110 bg-primary text-white w-10 h-10 lg:w-12 lg:h-12 flex rounded-full items-center justify-center'>
            <LiaInstagram size={22} className='lg:hidden'/>
            <LiaInstagram size={24} className='hidden lg:block'/>
          </a>
          <a href="https://wwww.facebook.com/nomeosuites" className='hover:scale-110 bg-primary text-white w-10 h-10 lg:w-12 lg:h-12 flex rounded-full items-center justify-center'>
            <LiaFacebookF size={22} className='lg:hidden'/>
            <LiaFacebookF size={24} className='hidden lg:block'/>
          </a>
          <a href="https://wwww.twitter.com/nomeosuites" className='hover:scale-110 bg-primary text-white w-10 h-10 lg:w-12 lg:h-12 flex rounded-full items-center justify-center'>
            <LiaTwitter size={22} className='lg:hidden'/>
            <LiaTwitter size={24} className='hidden lg:block'/>
          </a>
          <a href="https://wwww.threads.com/nomeosuites" className='hover:scale-110 bg-primary text-white w-10 h-10 lg:w-12 lg:h-12 flex rounded-full items-center justify-center'>
            <BsThreads size={19} className='lg:hidden' />
            <BsThreads size={21} className='hidden lg:block'/>
          </a>
        </div>
      </div>
    </div>
  )
}

export default LeftSection