'use client'

import React from 'react';
import DashboardLayout from './DashboardLayout';
import { userProps } from '@/lib/types';

const DashboardClient = ({user}:{user:userProps}) => {
  const [activeTab, setActiveTab] = React.useState('Notifications');
  return (
    <DashboardLayout user={user} setActiveTab={setActiveTab} activeTab={activeTab}>
      { activeTab && <p>{activeTab}</p> }
    </DashboardLayout>
  );
}

export default DashboardClient;
