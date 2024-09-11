import React from 'react'
import { Metadata } from 'next';
import { getCurrentUser } from '@/lib/actions/user-actions';
import Clients from '../components/Clients';

export const metadata: Metadata = {
  title: 'Clients',
};


const page = async () => {
  const user = await getCurrentUser();
  
  return (
    <Clients user={user} />
  )
}

export default page