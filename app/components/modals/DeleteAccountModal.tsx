'use client'

import React from 'react'
import Modal from '@/components/shared/Dialog';
import { useDeleteAccount } from '@/lib/useModals';
import LoadingButton from '@/components/shared/LoadingButton';
import { Button } from '@/components/ui/button';
import { deleteUserAccount } from '@/lib/actions/user-actions';

const DeleteAccountModal = () => {
  const [isLoading, setIsLoading] = React.useState(false)

  const useDelete = useDeleteAccount()

  const onClose = () => {
    useDelete.onClose();
  };

  const onClick = async () => {
    setIsLoading(true)
    await deleteUserAccount();
  };

  return (
    <Modal
      isOpen={useDelete.isOpen}
      onClose={onClose}
      useCloseButton
      title='Delete account'
      description='Are you sure you want to take this action? Once taken it cannot be reversed, you will loose all the data created on the app'
    >
      <div className="flex w-full justify-between">
        <Button variant={'secondary'} onClick={() => useDelete.onClose()}>
          Cancel
        </Button>
        <LoadingButton loading={isLoading} disabled={isLoading} onClick={() => onClick()}>
          <p>{isLoading ? 'Deleting account...' : 'Delete account'}</p>
        </LoadingButton>
      </div>
    </Modal>
  )
}

export default DeleteAccountModal;