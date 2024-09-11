import React from 'react'
import { Metadata } from 'next';
import Posts from '../components/Posts';
import { getCurrentUser } from '@/lib/actions/user-actions';

export const metadata: Metadata = {
  title: 'Posts',
};


const page = async () => {
  const user = await getCurrentUser();
  
  return (
    <Posts user={user}/>
  )
}

export default page