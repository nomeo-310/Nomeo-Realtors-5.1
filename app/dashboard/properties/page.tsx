import React from 'react'
import { Metadata } from 'next';
import Properties from '../components/Properties';
import { getCurrentUser } from '@/lib/actions/user-actions';

export const metadata: Metadata = {
  title: 'Properties',
};

const page = async () => {
  const user = await getCurrentUser();
  return (
    <Properties user={user}/>
  )
}

export default page