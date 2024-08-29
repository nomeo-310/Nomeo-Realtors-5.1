'use client'

import React from 'react'
import AddProperty from './AddProperty';
import AddedProperties from './AddedProperties';
import { userProps } from '@/lib/types';

type Props = {
  user:userProps
}

const Properties = ({user}: Props) => {
  const [activeTab, setActiveTab] = React.useState('add-property');

  return (
    <React.Fragment>
      { user.role === 'agent' ? (
        <React.Fragment>
          { activeTab === 'add-property' && <AddProperty setActiveTab={setActiveTab} /> }
          { activeTab === 'added-properties' && <AddedProperties setActiveTab={setActiveTab}/> }
        </React.Fragment> ) : ''
      }
    </React.Fragment>
  )
}

export default Properties;