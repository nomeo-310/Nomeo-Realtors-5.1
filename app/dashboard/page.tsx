import React from 'react';
import { getCurrentUser } from '@/lib/actions/user-actions';
import Notifications from './components/Notifications';

const page = async () => {
  const user = await getCurrentUser();
  
  return <Notifications user={user}/>;
}

export default page;