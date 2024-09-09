'use client'

import React from 'react';
import DashboardLayout from './DashboardLayout';
import { userProps } from '@/lib/types';
import Notifications from './Notifications';
import Properties from './Properties';
import Posts from './Posts';
import Clients from './Clients';

const DashboardClient = ({user}:{user:userProps}) => {
  const [activeTab, setActiveTab] = React.useState('Notifications');
  return (
    <DashboardLayout user={user} setActiveTab={setActiveTab} activeTab={activeTab}>
      { activeTab === 'Notifications' && <Notifications user={user}/> }
      { activeTab === 'Properties' && <Properties user={user}/> }
      { activeTab === 'Posts' && <Posts user={user}/> }
      { activeTab === 'Clients' && <Clients user={user}/> }
    </DashboardLayout>
  );
}

export default DashboardClient;
