import React from 'react';
import { getCurrentUser } from '@/lib/actions/user-actions';
import { Metadata } from 'next';
import Footer from '../components/footer/Footer';
import DashboardClient from './components/DashboardClient';

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
