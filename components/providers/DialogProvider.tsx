'use client'

import SignUpDialog from '@/app/components/sign-up/SignUpDialog';
import React from 'react'

const DialogProvider = () => {
  return (
    <React.Fragment>
      <SignUpDialog />
    </React.Fragment>
  );
};

export default DialogProvider;