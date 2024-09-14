'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { agentProps, userProps } from '@/lib/types';
import AgentCard from '@/app/components/rent-out/AgentCard';
import AgentLoadingSkeleton from '@/app/components/rent-out/AgentsLoadingSkeleton';

type Props = {
  user: userProps
}

const UserAgents = ({user}: Props) => {

  const { data, status } = useQuery({
    queryKey: ['agents', user._id],
    queryFn: () => fetch('/api/getUserAgents').then((res) => res.json()),
  });

  if (status === 'pending') {
    return <AgentLoadingSkeleton/>
  };

  if (status === 'error') {
    return (
      <p className='lg:text-xl md:text-lg text-center text-red-400 mt-8 lg:mt-10 font-semibold w-full'>
        Error while loading agents list.
      </p>
    )
  };

  const agents:agentProps[] = data;

  if (status === 'success' && !agents.length ) {
    return (
      <p className='lg:text-xl md:text-lg text-center mt-8 lg:mt-10 w-full text-red-400'>
       You have no involvement with any agent yet.
      </p>
    )
  };
  return (
    <div className='w-full min-h-[73.5vh] flex slide-in-left space-y-4'>
      <div className="flex flex-col gap-4 w-full lg:w-[80%] xl:w-[70%]">
        <h2 className='font-semibold md:hidden text-lg'>Agents</h2>
        { agents && agents.length > 0 && agents.map((agent:agentProps) => (
          <AgentCard key={agent._id} agent={agent} />
        ))}
      </div>
    </div>
  )
}

export default UserAgents