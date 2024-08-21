'use client'


import React from 'react'
import { useLogin } from '@/lib/useModals'
import Modal from '@/components/shared/Dialog'
import LoginForm from './LoginForm'


type Props = {}

const LoginDialog = (props: Props) => {

  const loginUser = useLogin();

  const onClose = () => {
    loginUser.onClose();
  }

  return (
    <Modal 
      isOpen={loginUser.isOpen}
      title='Log In'
      onClose={onClose}
    >
      <LoginForm/>
    </Modal>
  )
}

export default LoginDialog