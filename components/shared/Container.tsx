import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  children: React.ReactNode
  id?: string
  className?: string
}

const Container = ({children, className, id}: Props) => {
  return (
    <div id={id} className={cn('lg:px-[6%] px-[4%] lg:pb-20 pb-16', className)}>
      {children}
    </div>
  )
}

export default Container;