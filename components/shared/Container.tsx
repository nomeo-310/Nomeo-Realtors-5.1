import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  children: React.ReactNode
  id?: string
  className?: string
  onClick?: () => void
}

const Container = ({children, className, onClick, id}: Props) => {
  return (
    <div id={id} className={cn('lg:px-[6%] px-[4%] lg:pb-20 pb-16', className)} onClick={onClick}>
      {children}
    </div>
  )
}

export default Container;