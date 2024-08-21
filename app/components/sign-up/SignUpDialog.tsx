'use client'


import React from 'react'
import { useSignUp } from '@/lib/useModals'
import Modal from '@/components/shared/Dialog'
import SignUpForm from './SignUpForm'


type Props = {}

const SignUpDialog = (props: Props) => {

  const signupUser = useSignUp();

  const onClose = () => {
    signupUser.onClose();
  }

  return (
    <Modal 
      isOpen={signupUser.isOpen}
      title='Sign Up'
      onClose={onClose}
    >
      <SignUpForm />
    </Modal>
  )
}

export default SignUpDialog