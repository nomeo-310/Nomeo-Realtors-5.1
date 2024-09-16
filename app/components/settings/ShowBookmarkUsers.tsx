'use client'

import React from 'react'
import { Switch } from '@/components/ui/switch';
import { userProps } from '@/lib/types';
import { usePathname } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { allowNotification } from '@/lib/actions/user-actions';

type Props = {
  user: userProps
};

const ShowBookmarkUsers = ({user}:Props) => {
  const [showBookmarkUser, setShowBookmarkUser] = React.useState(user.isAgent.showBookmarkUsers);
  const path = usePathname();
  const { toast } = useToast();

  const allowBookmarkNotification = async (value:boolean) => {
    setShowBookmarkUser(value)
    await allowNotification(path)
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
        setShowBookmarkUser(user.isAgent.showBookmarkUsers)
      }
    })
  };

  return (
    <React.Fragment>
      <h2>Get bookmark notification</h2>
      <div className="flex gap-3">
        <p className='text-sm'>Toggling this as an agent means that you get notfied everytime someone bookmarks your property. This can help you advertise to them and give them more information about the property. You can switch this off if you like.</p>
        <Switch
          checked={showBookmarkUser}
          onCheckedChange={(value) => allowBookmarkNotification(value)}
        />
      </div>
    </React.Fragment>
  )
}

export default ShowBookmarkUsers