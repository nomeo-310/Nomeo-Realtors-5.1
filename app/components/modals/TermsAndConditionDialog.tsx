'use client'

import { termsAndConditions } from '@/assets/data';
import Modal from '@/components/shared/Dialog';
import { useTermsAndConditions } from '@/lib/useModals';
import React from 'react'

const TermsAndConditionDialog = () => {
  const termsControl = useTermsAndConditions();

  return (
    <Modal
      useCloseButton
      title={termsAndConditions.title}
      isOpen={termsControl.isOpen}
      onClose={termsControl.onClose}
    >
      <p className='text-sm'>{termsAndConditions.content}</p>
    </Modal>
  )
}

export default TermsAndConditionDialog;