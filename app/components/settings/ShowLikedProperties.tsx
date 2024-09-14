'use client'

import { Switch } from '@/components/ui/switch';
import { userProps } from '@/lib/types';
import React from 'react'

type Props = {
  user: userProps
}

const ShowLikedProperties = ({user}: Props) => {
  const [showUser, setShowUser] = React.useState(user.showLikedProperties);
  
  return (
    <React.Fragment>
      <h2>Show liked properties</h2>
      <div className="flex gap-3">
        <p className='text-sm'>Toggling this will make it possible to view all the properties you liked while going through the website. You can always switch it off if you do not want it any more.</p>
        <Switch
          checked={showUser}
          onCheckedChange={(value) => setShowUser(value)}
        />
      </div>
    </React.Fragment>
  )
}

export default ShowLikedProperties;