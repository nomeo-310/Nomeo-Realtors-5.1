'use client'

import React from 'react'
import { Switch } from '@/components/ui/switch';
import { userProps } from '@/lib/types';

type Props = {
  user: userProps
};

const ShowBookmarkUsers = ({user}:Props) => {
  const [showUser, setShowUser] = React.useState(user.isAgent.showBookmarkUsers);

  return (
    <React.Fragment>
      <h2>Get bookmark notification</h2>
      <div className="flex gap-3">
        <p className='text-sm'>Toggling this as an agent means that you get notfied everytime someone bookmarks your property. This can help you advertise to them and give them more information about the property. You can switch this off if you like.</p>
        <Switch
          checked={showUser}
          onCheckedChange={(value) => setShowUser(value)}
        />
      </div>
    </React.Fragment>
  )
}

export default ShowBookmarkUsers