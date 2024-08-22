'use client'


import React from 'react'
import { useLogin } from '@/lib/useModals'
import Modal from '@/components/shared/Dialog'
import LoginForm from './LoginForm'


const LoginDialog = () => {

  const loginUser = useLogin();

  const onClose = () => {
    loginUser.onClose();
  }

  return (
    <Modal 
      isOpen={loginUser.isOpen}
      title='Log In'
       description='Welcome back, check your dashboard for notifications and get access to your agents.'
      onClose={onClose}
      useCloseButton
    >
      <LoginForm/>
    </Modal>
  )
}

export default LoginDialog