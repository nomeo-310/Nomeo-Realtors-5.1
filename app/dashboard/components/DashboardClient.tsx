'use client'

import React from 'react';
import DashboardLayout from './DashboardLayout';
import { userProps } from '@/lib/types';
import Notifications from './Notifications';
import Properties from './Properties';

const DashboardClient = ({user}:{user:userProps}) => {
  const [activeTab, setActiveTab] = React.useState('Notifications');
  return (
    <DashboardLayout user={user} setActiveTab={setActiveTab} activeTab={activeTab}>
      { activeTab === 'Notifications' && <Notifications user={user}/> }
      { activeTab === 'Properties' && <Properties user={user}/> }
    </DashboardLayout>
  );
}

export default DashboardClient;
