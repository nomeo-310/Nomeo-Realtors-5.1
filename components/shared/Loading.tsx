'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { PuffLoader } from "react-spinners"

type Props = {
  style?: string
  size?: number
}

const Loading = ({style, size}: Props) => {
  return (
    <div className={cn('w-full h-screen flex items-center justify-center flex-col bg-gray/50 ', style)}>
      <PuffLoader size={size ? size: 60} color='yellow'/>
    </div>
  )
}

export default Loading
