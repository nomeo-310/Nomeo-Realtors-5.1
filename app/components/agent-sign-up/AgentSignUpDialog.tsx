'use client'


import React from 'react'
import { useAgentSignUp } from '@/lib/useModals'
import Modal from '@/components/shared/Dialog'
import SignUpForm from './AgentSignUpForm'


type Props = {}

const AgentSignUpDialog = (props: Props) => {

  const agentSignup = useAgentSignUp();

  const onClose = () => {
    agentSignup.onClose();
  }

  return (
    <Modal 
      isOpen={agentSignup.isOpen}
      title='Become an agent'
      onClose={onClose}
    >
      <SignUpForm />
    </Modal>
  )
};

export default AgentSignUpDialog