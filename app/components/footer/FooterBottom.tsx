'use client'


import { useCookies, usePrivacyPolicy, useTermsOfService } from '@/lib/useModals';
import React from 'react'
import { MdOutlineCopyright } from "react-icons/md"


const FooterBottom = () => {
  const date:Date = new Date();
  const cookieControl = useCookies();
  const privacyControl = usePrivacyPolicy();
  const termsControl = useTermsOfService()
  
  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-4 pt-10">
      <div className='flex items-center gap-1 md:justify-start justify-center'>
        <MdOutlineCopyright/>
        <h2>{date.getFullYear()} Nomeo Realtors. All Rights Reserved.</h2>
      </div>
      <div className="flex gap-4 md:justify-start justify-center">
        <button className='hover:underline' onClick={() => termsControl.onOpen()}>Terms of Service</button>
        <button className='hover:underline' onClick={() => privacyControl.onOpen()}>Privacy Policy</button>
        <button className='hover:underline' onClick={() => cookieControl.onOpen()}>Cookies</button>
      </div>
    </div>
  )
};

export default FooterBottom;