import React from 'react'
import { Metadata } from 'next';
import { getCurrentUser } from '@/lib/actions/user-actions';
import Clients from '../components/Clients';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Clients',
};


const page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/')
  };
  
  return (
    <Clients user={user} />
  )
}

export default page