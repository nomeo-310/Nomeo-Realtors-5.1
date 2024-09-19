'use client'

import ImageAvatar from '@/components/shared/ImageAvatar';
import { agentProps } from '@/lib/types';
import Image from 'next/image';
import React from 'react'

type Props = {
  agent: agentProps
}

const ProfileHeader = ({agent}: Props) => {

  return (
    <React.Fragment>
      <div className='w-full h-44 sm:h-60 rounded overflow-hidden relative shadow-sm'>
        <Image src={agent.user.coverImage.secure_url ? agent.user.coverImage.secure_url : '/images/default_cover.png'} alt='default cover' fill className='object-cover'/>
        <div className="bg-neutral-700/30 w-full h-full absolute left-0 top-0" />
        <div className="z-10 w-full flex justify-center flex-col left-0 top-0 absolute h-full px-6 py-10">
          <div className="flex gap-4 items-center text-white">
            <ImageAvatar src={agent.user.image ? agent.user.image : '/images/default_user.png'} className='lg:size-36 md:size-28 size-24 rounded-full flex-none'/>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProfileHeader