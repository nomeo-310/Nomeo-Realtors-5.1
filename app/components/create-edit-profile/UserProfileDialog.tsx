'use client'


import React from 'react'
import { useUserProfile } from '@/lib/useModals'
import Modal from '@/components/shared/Dialog'
import { userProps } from '@/lib/types'
import { capitalizeName } from '@/lib/utils'
import UserProfileForm from './UserProfileForm'



const UserProfileDialog = ({user}:{user:userProps}) => {

  const userProfileControl = useUserProfile();

  const onClose = () => {
    userProfileControl.onClose();
  };

  return (
    <Modal 
      isOpen={user?.role === 'user' && user?.profileCreated ? userProfileControl.isOpen : true }
      title = {user?.profileCreated ? 'Edit Profile' : 'Create Profile'}
       description={user.profileCreated ? 'Make some changes to your profile.' : `Welcome ${capitalizeName(user?.name).fullName}, we observed you haven't created your profile yet. This will not take more a five minutes.`}
      onClose={onClose}
      useCloseButton={user?.profileCreated ? true : false}
    >
      <UserProfileForm user={user} />
    </Modal>
  )
}

export default UserProfileDialog;