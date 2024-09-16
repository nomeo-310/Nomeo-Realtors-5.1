'use client'

import React from 'react'
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { showBlogs } from '@/lib/actions/user-actions';
import { userProps } from '@/lib/types';
import { usePathname } from 'next/navigation';

type Props = {
  user: userProps
}

const ShowLikedBlogs = ({user}: Props) => {
  const [showLikedBlogs, setShowLikedBlogs] = React.useState(user.showLikedBlogs);
  const path = usePathname();
  const { toast } = useToast();

  const displayLikedBlogs = async (value:boolean) => {
    setShowLikedBlogs(value)
    await showBlogs(path)
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
        setShowLikedBlogs(user.showLikedBlogs)
      }
    })
  };
  
  return (
    <React.Fragment>
      <h2>Show liked blogs</h2>
      <div className="flex gap-3">
        <p className='text-sm'>Toggling this will make it possible to view all the blogs you liked while going through the website blogs. You can always switch it off if you do not want it see them any more.</p>
        <Switch
          checked={showLikedBlogs}
          onCheckedChange={(value) => displayLikedBlogs(value)}
        />
      </div>
    </React.Fragment>
  )
}

export default ShowLikedBlogs;