'use client'

import React from 'react'
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { becomeAnAgent } from '@/lib/actions/user-actions';
import { userProps } from '@/lib/types';
import { usePathname } from 'next/navigation';

type Props = {
  user: userProps
}

const BecomeAgent = ({user}: Props) => {
  const [becomeAgent, setBecomeAgent] = React.useState(user.role === 'agent');
  const path = usePathname();
  const { toast } = useToast();

  const convertAccount = async (value:boolean) => {
    setBecomeAgent(value)
    await becomeAnAgent(path)
    .then((response) => {
      if (response?.success) {
        toast({
          variant: 'success',
          title: 'Success',
          description: response.success
        });
      };

      if (response?.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: response.error
        });
        setBecomeAgent(user.role === 'agent')
      }
    })
  };
  
  return (
    <React.Fragment>
      <h2>Become an Agent</h2>
      <div className="flex gap-3">
        <p className='text-sm'>Toggling this will delete your current account and create another one for you and make you an agent. You will be logged out and would have to create your profile afresh.</p>
        <Switch
          checked={becomeAgent}
          onCheckedChange={(value) => convertAccount(value)}
        />
      </div>
    </React.Fragment>
  )
};

export default BecomeAgent;