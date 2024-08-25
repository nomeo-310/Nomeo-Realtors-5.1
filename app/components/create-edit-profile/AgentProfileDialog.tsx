'use client'


import React from 'react'
import { useAgentProfile } from '@/lib/useModals'
import Modal from '@/components/shared/Dialog'
import { userProps } from '@/lib/types'
import AgentMultiStepForm from './AgentMultiStepForm'
import { capitalizeName } from '@/lib/utils'



const AgentProfileDialog = ({user}:{user:userProps}) => {

  const agentProfileControl = useAgentProfile();
  console.log(user);

  const onClose = () => {
    agentProfileControl.onClose();
  }

  return (
    <Modal 
      isOpen={user?.role === 'agent' && !user?.profileCreated ? true : agentProfileControl.isOpen}
      title = {user?.profileCreated ? 'Edit Profile' : 'Create Profile'}
       description={`Welcome ${capitalizeName(user?.name).fullName}, we observed you haven't created your profile yet. This will not take more a five minutes.`}
      onClose={onClose}
      useCloseButton={user?.profileCreated ? true : false}
    >
      <AgentMultiStepForm />
    </Modal>
  )
}

export default AgentProfileDialog;