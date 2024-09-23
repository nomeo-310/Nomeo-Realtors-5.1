import React from 'react'
import { Metadata } from 'next';
import { getCurrentUser } from '@/lib/actions/user-actions';
import UserAgents from '../components/UserAgents';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Agents',
};


const page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/')
  };

  return (
    <UserAgents user={user}/>
  )
}

export default page;