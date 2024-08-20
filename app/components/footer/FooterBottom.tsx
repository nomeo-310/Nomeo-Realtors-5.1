'use client'


import React from 'react'
import { MdOutlineCopyright } from "react-icons/md"


const FooterBottom = () => {
  const date:Date = new Date();
  
  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-4 pt-10">
      <div className='flex items-center gap-1 md:justify-start justify-center'>
        <MdOutlineCopyright/>
        <h2>{date.getFullYear()} Nomeo Realtors. All Rights Reserved.</h2>
      </div>
      <div className="flex gap-4 md:justify-start justify-center">
        <button className='hover:underline' onClick={() => {}}>Terms of Service</button>
        <button className='hover:underline' onClick={() => {}}>Privacy Policy</button>
        <button className='hover:underline' onClick={() => {}}>Cookies</button>
      </div>
    </div>
  )
};

export default FooterBottom;