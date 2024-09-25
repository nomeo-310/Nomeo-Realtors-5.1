'use client'


import React from 'react'
import Modal from '@/components/shared/Dialog';
import { privacyPolicy } from '@/assets/data';
import { usePrivacyPolicy } from '@/lib/useModals';

const PrivacayPolicyDialog = () => {
  const privacyPolicyControl = usePrivacyPolicy();

  return (
    <Modal
      useCloseButton
      title={privacyPolicy.title}
      isOpen={privacyPolicyControl.isOpen}
      onClose={privacyPolicyControl.onClose}
    >
      <p className='text-sm'>{privacyPolicy.content}</p>
    </Modal>
  )
};

export default PrivacayPolicyDialog;