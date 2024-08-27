import React from 'react';
import DashboardClient from './components/DashboardClient';
import { getCurrentUser } from '@/lib/actions/user-actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const page = async () => {
  const user = await getCurrentUser();
  return <DashboardClient user={user}/>;
}

export default page;
