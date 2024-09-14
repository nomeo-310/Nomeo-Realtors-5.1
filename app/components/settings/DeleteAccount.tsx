'use client'

import React from 'react'
import { Switch } from '@/components/ui/switch';

const DeleteAccount = () => {
  const [deleteAccount, setDeleteAccount] = React.useState(false);
  
  return (
    <React.Fragment>
      <h2>Delete account</h2>
      <div className="flex gap-3">
        <p className='text-sm'>Deleting your account means you will loose all your contacts and all form of details you have on this app. Be sure you want to make this decision before toggling the switch because it cannot be reversed.</p>
        <Switch
          checked={deleteAccount}
          onCheckedChange={(value) => setDeleteAccount(value)}
        />
      </div>
    </React.Fragment>
  )
}

export default DeleteAccount