import React from 'react'
import { Metadata } from 'next';
import Settings from '../components/Settings';
import { getCurrentUser } from '@/lib/actions/user-actions';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Settings',
};

const page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/')
  };

  return (
    <Settings user={user}/>
  )
}

export default page