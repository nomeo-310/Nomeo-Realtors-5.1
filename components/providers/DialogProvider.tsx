'use client'

import React from 'react'
import AgentSignUpDialog from '@/app/components/agent-sign-up/AgentSignUpDialog';
import LoginDialog from '@/app/components/log-in/LogInDialog';
import SignUpDialog from '@/app/components/sign-up/SignUpDialog';
import { userProps } from '@/lib/types';
import AgentProfileDialog from '@/app/components/create-edit-profile/AgentProfileDialog';
import UserProfileDialog from '@/app/components/create-edit-profile/UserProfileDialog';
import DeleteAccountModal from '@/app/components/modals/DeleteAccountModal';
import TermsAndConditionDialog from '@/app/components/modals/TermsAndConditionDialog';
import TermsOfServiceDialog from '@/app/components/modals/TermsOfServiceDialog';
import PrivacayPolicyDialog from '@/app/components/modals/PrivacayPolicyDialog';
import CookiesDialog from '@/app/components/modals/CookiesDialog';

const DialogProvider = ({user}: {user: userProps}) => {
  return (
    <React.Fragment>
      <SignUpDialog />
      <LoginDialog />
      <AgentSignUpDialog />
      { user && user.role === 'agent' && <AgentProfileDialog user={user}/> }
      { user && user.role === 'user' && <UserProfileDialog user={user}/> }
      <DeleteAccountModal />
      <TermsAndConditionDialog/>
      <TermsOfServiceDialog />
      <PrivacayPolicyDialog />
      <CookiesDialog />
    </React.Fragment>
  );
};

export default DialogProvider;