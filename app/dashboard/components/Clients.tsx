
'use client'

import { userProps } from '@/lib/types';
import { useRouter } from 'next/navigation';
import React from 'react'
import AddClient from './AddClient';
import AllClients from './AllClients';

type Props = {
  user: userProps
}

const Clients = ({user}: Props) => {
  const router = useRouter();

  React.useEffect(() => {
    if (user.role === 'user') {
      router.push('/')
    }
  },[]);

  const [activeTab, setActiveTab] = React.useState('add-client')

  return (
    <React.Fragment>
      { activeTab === 'add-client' && <AddClient setActiveTab={setActiveTab} user={user}/> }
      { activeTab === 'all-clients' && <AllClients setActiveTab={setActiveTab} /> }
    </React.Fragment>
  )
}

export default Clients