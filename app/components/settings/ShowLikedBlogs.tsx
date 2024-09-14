'use client'

import { Switch } from '@/components/ui/switch';
import { userProps } from '@/lib/types';
import React from 'react'

type Props = {
  user: userProps
}

const ShowLikedBlogs = (props: Props) => {
  
  return (
    <React.Fragment>
      <h2>Show liked blogs</h2>
      <div className="flex gap-3">
        <p className='text-sm'>Toggling this will make it possible to view all the blogs you liked while going through the website blogs. You can always switch it off if you do not want it see them any more.</p>
        <Switch/>
      </div>
    </React.Fragment>
  )
}

export default ShowLikedBlogs;