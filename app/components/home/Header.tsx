'use client'


import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

type Props = {
  className?:string
  mainTitle?:string
  subTitle?:string
  linkTitle?:string
  link?:string
};

const Header = ({className, mainTitle, subTitle, linkTitle, link}: Props) => {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-center justify-between">
        <h2 className='lg:text-4xl text-3xl'>{mainTitle}</h2>
        {link && <Link href={link} className='lg:text-lg text-primary hover:underline'>{linkTitle}</Link>}
      </div>
      <p className='ml-2 lg:text-xl md:text-lg'>{subTitle}</p>
    </div>
  )
}

export default Header