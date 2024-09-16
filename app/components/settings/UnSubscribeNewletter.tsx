'use client'

import React from 'react'
import { Switch } from '@/components/ui/switch';
import { userProps } from '@/lib/types';
import { unSubscribeUser } from '@/lib/actions/subscription-action';
import { useToast } from '@/components/ui/use-toast';
import { usePathname } from 'next/navigation';

type Props = {
  user: userProps;
}

const UnSubscribeNewletter = ({user}: Props) => {
  const [subscribeUser, setSubscribeUser] = React.useState(user.newsletterSubscriptions);
  const { toast } = useToast();
  const path = usePathname()

  const unSubscribe = async (value:boolean) => {
    setSubscribeUser(value)
    await unSubscribeUser(path)
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
        setSubscribeUser(user.newsletterSubscriptions)
      }
    })
  };

  return (
    <React.Fragment>
      <h2>Unsubscribe to newsletter</h2>
      <div className="flex gap-3">
        <p className='text-sm'>Toggling this will stop you from getting our monthly newsletters, latest product updates and blogpost reviews. You can always reverse this any time you please.</p>
        <Switch
          checked={subscribeUser}
          onCheckedChange={(value) => unSubscribe(value)}
         />
      </div>
    </React.Fragment>
  )
}

export default UnSubscribeNewletter;