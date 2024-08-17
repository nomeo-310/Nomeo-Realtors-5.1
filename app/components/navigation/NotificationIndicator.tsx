import React from 'react'
import { HiBell, HiOutlineBell } from 'react-icons/hi2'

type Props = {}

const NotificationIndicator = (props: Props) => {
  return (
    <div className='lg:mr-3 mr-2 relative'>
      <HiOutlineBell size={22}/>
        <span className='absolute -right-1 -top-1 bg-red-400 rounded-full text-white px-1 text-xs font-medium tabular-nums'>
          1
        </span>
    </div>
  )
}

export default NotificationIndicator