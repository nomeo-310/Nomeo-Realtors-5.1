import { Metadata } from 'next';
import React from 'react'
import Inspections from '../components/Inspections';
import { getCurrentUser } from '@/lib/actions/user-actions';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Inspections',
};

const page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/')
  };

  return <Inspections user={user} />;
}

export default page;