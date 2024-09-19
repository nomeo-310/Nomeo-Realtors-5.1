'use client'

import React from 'react'
import { agentProps } from '@/lib/types';
import ImageAvatar from '@/components/shared/ImageAvatar';
import LoadingButton from '@/components/shared/LoadingButton';
import { useRouter } from 'next/navigation';

type Props = {
  agent: agentProps;
}

const AgentCard = ({agent}: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className='lg:p-4 p-3 rounded w-full bg-card flex flex-col gap-2 shadow-sm'>
      <div className='flex gap-4'>
        <ImageAvatar src={agent.user.image} alt='user_profile_image' className='flex-none rounded-full md:size-16 size-12'/>
        <div className='w-full flex flex-col gap-2'>
          <div className="flex flex-wrap gap-2">
            <p className='text-sm sm:text-base capitalize border p-1 rounded'>Name: {agent.user.name}</p>
            <p className='text-sm sm:text-base border p-1 rounded'>Agency: {agent.agencyName}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <p className='text-sm sm:text-base border p-1 rounded'>Email: {agent.user.email}</p>
            <p className='text-sm sm:text-base border p-1 rounded'>Contacts: {agent.phoneNumber}, {agent.officeNumber}</p>
          </div>
          <p className='text-sm sm:text-base border p-1 rounded'>Address: {agent.agencyAddress}</p>
          { agent.agencyWebsite && <p><a href={`http://${agent.agencyWebsite}`} target="_blank" rel="noopener noreferrer"></a></p> }
          <div className='flex items-center justify-between w-full' >
            <LoadingButton loading={isLoading} disabled={isLoading}>
              <p className='text-sm sm:text-base'>{isLoading ? 'Sending message' : 'Send message'}</p>
            </LoadingButton>
            <p className='text-sm sm:text-base hover:border-primary hover:bg-primary border rounded p-2 cursor-pointer' onClick={() => router.push(`/profile/${agent.licenseNumber}`)}>View full profile</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentCard;