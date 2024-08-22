'use client'


import React from 'react'
import { useAgentSignUp } from '@/lib/useModals'
import Modal from '@/components/shared/Dialog'
import SignUpForm from './AgentSignUpForm'


const AgentSignUpDialog = () => {

  const agentSignup = useAgentSignUp();

  const onClose = () => {
    agentSignup.onClose();
  }

  return (
    <Modal 
      isOpen={agentSignup.isOpen}
      title='Become an agent'
      description='Begin your personal journey with us an agent, register you details and when you login you complete your profile.'
      onClose={onClose}
      useCloseButton
    >
      <SignUpForm />
    </Modal>
  )
};

export default AgentSignUpDialog