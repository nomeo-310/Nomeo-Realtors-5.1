'use client'

import React from 'react'
import AddProperty from './AddProperty';
import AddedProperties from './AddedProperties';
import { userProps } from '@/lib/types';
import Bookmarks from './Bookmarks';
import RentedProperties from './RentedProperties';
import LikedProperties from './LikedProperties';

type Props = {
  user:userProps
}

const Properties = ({user}: Props) => {

  const [agentActiveTab, setAgentActiveTab] = React.useState('added-properties');
  const [userActiveTab, setUserActiveTab] = React.useState('rented-properties');

  return (
    <React.Fragment>
      { user.role === 'agent' && (
        <React.Fragment>
          { agentActiveTab === 'add-property' && <AddProperty setActiveTab={setAgentActiveTab} /> }
          { agentActiveTab === 'added-properties' && <AddedProperties setActiveTab={setAgentActiveTab} user={user}/> }
        </React.Fragment> ) 
      }
      { user.role === 'user' && (
        <React.Fragment>
          { userActiveTab === 'liked-properties' && user.showLikedProperties && <LikedProperties user={user} setActiveTab={setUserActiveTab}/> }
          { userActiveTab === 'rented-properties' && <RentedProperties setActiveTab={setUserActiveTab} user={user}/>}
          { userActiveTab === 'bookmarks' && <Bookmarks user={user} setActiveTab={setUserActiveTab}/>}
        </React.Fragment>
        )
      }
    </React.Fragment>
  )
}

export default Properties;