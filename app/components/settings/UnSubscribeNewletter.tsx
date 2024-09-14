'use client'

import React from 'react'
import { Switch } from '@/components/ui/switch';
import { userProps } from '@/lib/types';

type Props = {
  user: userProps;
}

const UnSubscribeNewletter = ({user}: Props) => {
  const [showUser, setShowUser] = React.useState(user.newsletterSubscriptions);
  
  return (
    <React.Fragment>
      <h2>Unsubscribe to newsletter</h2>
      <div className="flex gap-3">
        <p className='text-sm'>Toggling this will stop you from getting our monthly newsletters, latest product updates and blogpost reviews. You can always reverse this any time you please.</p>
        <Switch
          checked={showUser}
          onCheckedChange={(value) => setShowUser(value)}
         />
      </div>
    </React.Fragment>
  )
}

export default UnSubscribeNewletter