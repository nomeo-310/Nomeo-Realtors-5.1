import React from 'react'
import { Metadata } from 'next';
import { getCurrentUser } from '@/lib/actions/user-actions';
import UserLikedPosts from '../components/UserLikedPosts';
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
    <UserLikedPosts user={user}/>
  )
}

export default page