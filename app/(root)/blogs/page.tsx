import React from 'react'
import Blogs from './components/Blogs';
import { getCurrentUser } from '@/lib/actions/user-actions';
import { Metadata } from 'next';
import Footer from '@/app/components/footer/Footer';

export const metadata: Metadata = {
  title: "Blogs",
};

const page = async () => {
  const user = await getCurrentUser();
  
  return (
    <React.Fragment>
      <Blogs user={user}/>
      <Footer />
    </React.Fragment>
  )
}

export default page