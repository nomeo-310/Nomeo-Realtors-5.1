import React from 'react'
import { Metadata } from 'next';
import Properties from '../components/Properties';
import { getCurrentUser } from '@/lib/actions/user-actions';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Properties',
};

const page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/')
  };

  return (
    <Properties user={user}/>
  )
}

export default page