import React from 'react';
import { getCurrentUser } from '@/lib/actions/user-actions';
import Notifications from './components/Notifications';
import { redirect } from 'next/navigation';

const page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/')
  };
  
  return <Notifications user={user}/>;
}

export default page;