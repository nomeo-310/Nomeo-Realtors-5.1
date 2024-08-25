'use client'

import React from 'react'
import AgentSignUpDialog from '@/app/components/agent-sign-up/AgentSignUpDialog';
import LoginDialog from '@/app/components/log-in/LogInDialog';
import SignUpDialog from '@/app/components/sign-up/SignUpDialog';
import { userProps } from '@/lib/types';
import AgentProfileDialog from '@/app/components/create-edit-profile/AgentProfileDialog';

const DialogProvider = ({user}: {user: userProps}) => {
  return (
    <React.Fragment>
      <SignUpDialog />
      <LoginDialog />
      <AgentSignUpDialog />
      <AgentProfileDialog user={user}/>
    </React.Fragment>
  );
};

export default DialogProvider;