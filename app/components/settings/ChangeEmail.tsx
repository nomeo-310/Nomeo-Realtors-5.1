'use client'

import InputWithIcon from '@/components/shared/InputWithIcon';
import LoadingButton from '@/components/shared/LoadingButton';
import { userProps } from '@/lib/types';
import React from 'react'
import { HiOutlineEnvelope } from 'react-icons/hi2';

type Props = {
  user: userProps
}

const ChangeEmail = ({user}: Props) => {
  const [newEmail, setNewEmail] = React.useState(user.email);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <React.Fragment>
      <div>
        <h2>Change email</h2>
        <p className='text-sm'>Change your email You can do this as many times as you like but it takes immediate effect as you will be logged out on submission.</p>
      </div>
      <InputWithIcon
        type='email'
        icon={HiOutlineEnvelope}
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        placeholder='enter new email'
        className='border rounded'
      />
      <div className="mt-2 flex items-center justify-end">
        <LoadingButton loading={isLoading} disabled={isLoading}>
          <p>{isLoading ? 'Updating email': 'Update email'}</p>
        </LoadingButton>
      </div>
    </React.Fragment>
  )
}

export default ChangeEmail