'use client'

import React from 'react'
import AgentSignUpDialog from '@/app/components/agent-sign-up/AgentSignUpDialog';
import LoginDialog from '@/app/components/log-in/LogInDialog';
import SignUpDialog from '@/app/components/sign-up/SignUpDialog';

const DialogProvider = () => {
  return (
    <React.Fragment>
      <SignUpDialog />
      <LoginDialog />
      <AgentSignUpDialog />
    </React.Fragment>
  );
};

export default DialogProvider;