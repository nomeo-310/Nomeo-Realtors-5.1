'use client'

import React from 'react'
import { clientProps, userProps } from '@/lib/types';
import ImageAvatar from '@/components/shared/ImageAvatar';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import { formatMoney, formatTargetDate, useCountdownTimer } from '@/lib/utils';
import LoadingButton from '@/components/shared/LoadingButton';
import { useRemoveClient } from '@/lib/hooks/useRemoveClient';

type Props = {
  client: clientProps
  user: userProps
}

const ClientCard = ({client, user}: Props) => {

  const nairaSign:string = String.fromCodePoint(8358);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const futureDate = formatTargetDate(client.createdAt);
  const { days, hours, minutes, seconds } = useCountdownTimer(futureDate.toISOString());

  const data = {
    userId: user._id,
    rentoutId: client._id
  }

  const mutation = useRemoveClient(data);

  const removeClient = () => {
    mutation.mutate(client._id)
  };

  return (
    <div className='lg:p-4 p-3 rounded w-full bg-card flex flex-col sm:gap-2 gap-1 shadow-sm'>
      <h2 className='text-base'>Client details</h2>
      <div className='flex gap-4 lg:gap-5'>
        <ImageAvatar src={client.user.image} alt='user_profile_image' className='flex-none rounded-full md:size-16 size-12'/>
        <div className='w-full flex flex-col sm:gap-2 gap-1'>
          <div className="flex flex-wrap sm:gap-2 gap-1">
            <p className='text-sm sm:text-base capitalize border p-1 rounded'>Name: {client.user.name}</p>
            <p className='text-sm sm:text-base border p-1 rounded'>Occupation: {client.user.occupation}</p>
          </div>
          <div className='flex items-center justify-between w-full cursor-pointer' onClick={() => setShowDetails((prev) => !prev)}>
            <p className='text-sm sm:text-base capitalize border p-1 rounded'>Phone: {client.user.phoneNumber}</p>
            <div className='flex items-center gap-2 text-sm sm:text-base p-1 rounded'>{showDetails ? 'Hide more': 'Show more'} {showDetails ? <HiChevronUp className='size-4 sm:size-5'/> : <HiChevronDown className='size-4 sm:size-5' />}</div>
          </div>
        </div>
      </div>
      { showDetails &&
        <React.Fragment>
          <hr/>
          <h2 className='text-base'>Property details</h2>
          <div className='flex flex-wrap sm:gap-2 gap-1'>
            <p className='text-sm sm:text-base capitalize border p-1 rounded cursor-pointer'>Address: {client.property.address}.</p>
            <span className='border p-1 rounded text-sm sm:text-base'>{client.property.numberOfBath} baths</span>
            <span className='border p-1 rounded text-sm sm:text-base'>{client.property.numberOfRooms} beds</span>
            <span className='border p-1 rounded text-sm sm:text-base'>{client.property.numberOfToilets} toilets</span>
            <span className='border p-1 rounded text-sm sm:text-base'>{client.property.area.toLocaleString()} sqft</span>
            <div className='sm:text-base text-sm flex flex-wrap gap-2'>
              <span className='border p-1 rounded'>Annual rent: {nairaSign}{formatMoney(client.property.annualRent)} annually</span>
              { client.property.monthlyRent !== 0 && <span className='border p-1 rounded'>{nairaSign}{formatMoney(client.property.monthlyRent)} monthly</span>}
            </div>
          </div>
          <hr/>
          <h2 className='text-base'>Countdown to next rent</h2>
          <div className="grow">
            <span className='lg:text-4xl md:text-3xl text-lg font-bold'>{days} days : {hours} hrs : {minutes} mins : {seconds} secs</span>
          </div>
          <div className='flex items-center justify-between mt-2 w-full'>
            <LoadingButton loading={isLoading} disabled={isLoading} className='rounded'>
              <p className='sm:text-base text-sm'>{isLoading ? 'Sending message...' : 'Send client a message'}</p>
            </LoadingButton>
            <LoadingButton loading={mutation.isPending} disabled={mutation.isPending} className='rounded' onClick={removeClient}>
              <p className='sm:text-base text-sm'>{mutation.isPending ? 'Removing client...' : 'Remove client'}</p>
            </LoadingButton>
          </div>
        </React.Fragment>
      }
    </div>
  )
}

export default ClientCard;