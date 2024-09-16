'use client'

import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { showProperties } from '@/lib/actions/user-actions';
import { userProps } from '@/lib/types';
import { usePathname } from 'next/navigation';
import React from 'react'

type Props = {
  user: userProps
}

const ShowLikedProperties = ({user}: Props) => {
  const [showLiked, setShowLiked] = React.useState(user.showLikedProperties);
  const path = usePathname();
  const { toast } = useToast();

  const displayLikedProperties = async (value:boolean) => {
    setShowLiked(value)
    await showProperties(path)
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
        setShowLiked(user.showLikedProperties)
      }
    })
  };

  return (
    <React.Fragment>
      <h2>Show liked properties</h2>
      <div className="flex gap-3">
        <p className='text-sm'>Toggling this will make it possible to view all the properties you liked while going through the website. You can always switch it off if you do not want it any more.</p>
        <Switch
          checked={showLiked}
          onCheckedChange={(value) => displayLikedProperties(value)}
        />
      </div>
    </React.Fragment>
  )
}

export default ShowLikedProperties;