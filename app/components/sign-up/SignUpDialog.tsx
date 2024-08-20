'use client'


import React from 'react'
import { useSignUp } from '@/lib/useModals'
import Modal from '@/components/shared/Dialog'


type Props = {}

const SignUpDialog = (props: Props) => {

  const signupUser = useSignUp();

  const onClose = () => {
    console.log('closed')
  }

  return (
    <Modal 
      isOpen
      title='Sign Up'
      description='Create your account and enjoy a whole new world without hassle.'
      onClose={onClose}
    >
      Sign up modal
    </Modal>
  )
}

export default SignUpDialog