'use client'

import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons/lib'

type Props = {
  icon:IconType
  mainTitle: string
  subTitle: string
  id: string
};

const cardStyle = 'border p-5 md:p-3 lg:p-6 md:aspect-square aspect-video hover:drop-shadow-md hover:bg-card active:bg-card flex active:border-0 hover:border-0 items-center justify-center rounded flex-col gap-4'

const OurServiceCard = ({icon:Icon, mainTitle, subTitle, id}: Props) => {
  return (
    <div className={cardStyle}>
      <div className='flex items-center w-full gap-4 md:gap-2 lg:justify-center justify-normal'>
        <div className="lg:size-28 size-20 md:size-16 rounded bg-neutral-200 flex items-center justify-center flex-none">
          <Icon className='text-neutral-700 lg:block hidden size-16'/>
          <Icon className='text-neutral-700 lg:hidden md:block hidden size-8'/>
          <Icon className='text-neutral-700 md:hidden size-12'/>
        </div>
        <p className='lg:hidden text-2xl md:text-lg font-medium'>{mainTitle}</p>
      </div>
      <p className='lg:block hidden text-2xl font-medium'>{mainTitle}</p>
      <p className='line-clamp-4 lg:text-center'>{subTitle}</p>
      <div className='flex items-center justify-end w-full'>
        <Link href={`/about-us/${id}`} className='text-base text-primary'>Read more...</Link>
      </div>
    </div>
  )
}

export default OurServiceCard