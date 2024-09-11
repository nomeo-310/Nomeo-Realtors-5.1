import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type Props = {
  src:string
  alt?: string
  className?: string
}

const ImageAvatar = ({src, alt, className}: Props) => {
  return (
    <div className={cn('relative w-11 h-11 flex items-center justify-center bg-gray-300 rounded overflow-hidden', className)}>
      <Image src={src ? src : '/images/default_user.png'} alt={alt ? alt : 'avatar'} fill priority className='object-cover' />
    </div>
  )
}

export default ImageAvatar