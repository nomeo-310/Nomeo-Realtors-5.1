'use client'

import React from 'react'
import { userProps } from '@/lib/types';
import { useRouter } from 'next/navigation';
import CreatePost from './CreatePost';
import AddedPosts from './AddedPosts';
import AgentLikedPosts from './AgentLikedPosts';

type Props = {
  user: userProps
}

const Posts = ({user}: Props) => {
  const router = useRouter();

  React.useEffect(() => {
    if (user.role === 'user') {
      router.push('/')
    }
  },[]);

  const [activeTab, setActiveTab] = React.useState('added-posts')

  return (
    <React.Fragment>
      { activeTab === 'create-post' && <CreatePost setActiveTab={setActiveTab} user={user}/> }
      { activeTab === 'added-posts' && <AddedPosts setActiveTab={setActiveTab} user={user} />}
      { activeTab === 'liked-posts' && <AgentLikedPosts setActiveTab={setActiveTab} user={user} />}
    </React.Fragment>
  )
}

export default Posts