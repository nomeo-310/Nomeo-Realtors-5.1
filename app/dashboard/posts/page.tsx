import React from 'react'
import { Metadata } from 'next';
import Posts from '../components/Posts';
import { getCurrentUser } from '@/lib/actions/user-actions';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Posts',
};


const page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/')
  };
  
  return (
    <Posts user={user} />
  )
}

export default page