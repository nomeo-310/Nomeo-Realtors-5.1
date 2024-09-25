'use client'

import { termsOfService } from '@/assets/data';
import Modal from '@/components/shared/Dialog';
import { useTermsOfService } from '@/lib/useModals';
import React from 'react'


const TermsOfServiceDialog = () => {
  const serviceControl = useTermsOfService();
  return (
    <Modal
      isOpen={serviceControl.isOpen}
      useCloseButton
      onClose={serviceControl.onClose}
      title={termsOfService.title}
    >
      <p className="text-sm">{termsOfService.content}</p>
    </Modal>
  )
}

export default TermsOfServiceDialog