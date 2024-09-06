import React from 'react'
import Blogs from './components/Blogs';
import Footer from '../components/footer/Footer';
import { getCurrentUser } from '@/lib/actions/user-actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blogs",
};

const page = async () => {
  const user = await getCurrentUser();
  return (
    <React.Fragment>
      <Blogs user={user}/>
      <Footer/>
    </React.Fragment>
  )
}

export default page