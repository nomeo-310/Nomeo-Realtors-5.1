import React from 'react'
import { Metadata } from 'next';
import { getCurrentUser } from '@/lib/actions/user-actions';
import UserAgents from '../components/UserAgents';

export const metadata: Metadata = {
  title: 'Agents',
};


const page = async () => {
  const user = await getCurrentUser();

  return (
    <UserAgents user={user}/>
  )
}

export default page;