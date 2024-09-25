'use client'

import { cookiesSettings } from '@/assets/data';
import Modal from '@/components/shared/Dialog';
import { useCookies } from '@/lib/useModals';
import React from 'react'

const CookiesDialog = () => {
  const cookieControl = useCookies();
  return (
    <Modal
      isOpen={cookieControl.isOpen}
      onClose={cookieControl.onClose}
      useCloseButton
      title={cookiesSettings.title}
    >
      <p className="text-sm">{cookiesSettings.content}</p>
    </Modal>
  )
}

export default CookiesDialog