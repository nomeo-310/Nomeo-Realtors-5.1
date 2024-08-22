'use client'


import React from 'react'
import { useSignUp } from '@/lib/useModals'
import Modal from '@/components/shared/Dialog'
import SignUpForm from './SignUpForm'


const SignUpDialog = () => {

  const signupUser = useSignUp();

  const onClose = () => {
    signupUser.onClose();
  }

  return (
    <Modal 
      isOpen={signupUser.isOpen}
      title='Sign Up'
      description='Begin your personal journey with us as a user, register you details and when you login you complete your profile.'
      onClose={onClose}
      useCloseButton
    >
      <SignUpForm />
    </Modal>
  )
}

export default SignUpDialog