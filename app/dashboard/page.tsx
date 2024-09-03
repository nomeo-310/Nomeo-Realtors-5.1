import React from 'react';
import DashboardClient from './components/DashboardClient';
import { getCurrentUser } from '@/lib/actions/user-actions';
import { Metadata } from 'next';
import Footer from '../components/footer/Footer';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const page = async () => {
  const user = await getCurrentUser();
  
  return (
    <React.Fragment>
      <DashboardClient user={user}/>
      <Footer/>
    </React.Fragment>
  );
}

export default page;
