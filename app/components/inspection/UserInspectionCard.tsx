'use client'

import React from 'react'
import { userInspectionProps, userProps } from '@/lib/types';
import ImageAvatar from '@/components/shared/ImageAvatar';
import { formatDate, formatMoney } from '@/lib/utils';
import LoadingButton from '@/components/shared/LoadingButton';
import { useRouter } from 'next/navigation';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import { useToast } from '@/components/ui/use-toast';
import { cancelInspection } from '@/lib/actions/inspection-action';
import { useCancelInspection } from '@/lib/hooks/useCancelInspection';

type Props = {
  inspection: userInspectionProps
  user: userProps
};

const UserInspectionCard = ({inspection, user}: Props) => {
  const nairaSign:string = String.fromCodePoint(8358);
  const router = useRouter();
  const [showDetails, setShowDetails] = React.useState(false);

  const cancelData = {
    inspectionId: inspection._id,
    agentId: inspection.agent._id,
    userId: user._id
  };

  const mutation = useCancelInspection(cancelData)

  const cancel = () => {
    const data  = {
      inspectionId: inspection._id,
      agentId: inspection.agent._id,
    };

    mutation.mutate(data)
  }

  return (
    <div className='lg:p-4 p-3 rounded w-full bg-card flex flex-col gap-2 shadow-sm'>
      <h2 className='text-base'>Agent details</h2>
      <div className='flex gap-4 lg:gap-5'>
        <ImageAvatar src={inspection.agent.user.image} alt='user_profile_image' className='flex-none rounded-full md:size-16 size-12'/>
        <div className='w-full'>
          <p className='text-sm sm:text-base capitalize'>Name: {inspection.agent.user.name}</p>
          <p className='text-sm sm:text-base'>Agency: {inspection.agent.agencyName}</p>
          <div className='flex items-center justify-between w-full cursor-pointer' onClick={() => setShowDetails((prev) => !prev)}>
            <p className='text-sm sm:text-base capitalize'>Phone: {inspection.agent.officeNumber}</p>
            <div className='flex items-center gap-2 text-sm sm:text-base'>{showDetails ? 'Hide more': 'Show more'} {showDetails ? <HiChevronUp className='size-4 sm:size-5'/> : <HiChevronDown className='size-4 sm:size-5' />}</div>
          </div>
        </div>
      </div>
      { showDetails &&
        <React.Fragment>
          <hr/>
          <h2 className='text-base'>Inspection details</h2>
          <div>
            <p className='text-sm sm:text-base capitalize'>Date: {formatDate(inspection.scheduledAt)}</p>
            <p className='text-sm sm:text-base capitalize'>Time: {inspection.time}</p>
            <p className='text-sm sm:text-base'>Fee: {nairaSign}{inspection.agent.agentInspectionFee.toLocaleString()} per hour</p>
          </div>
          <hr/>
          <h2 className='text-base'>Property details</h2>
          <div>
            <p className='text-sm sm:text-base capitalize border py-1 px-3 rounded-full inline-block mb-1.5 cursor-pointer underline' onClick={() => router.push(`/property/${inspection.property.propertyId}`)}>Address: {inspection.property.address}.</p>
            <div>
              <div className='sm:text-base text-sm flex flex-wrap gap-2'>
                <span className='border py-1 px-2 rounded-full'>{inspection.property.numberOfBath} baths</span>
                <span className='border py-1 px-2 rounded-full'>{inspection.property.numberOfRooms} beds</span>
                <span className='border py-1 px-2 rounded-full'>{inspection.property.numberOfToilets} toilets</span>
                <span className='border py-1 px-2 rounded-full'>{inspection.property.area.toLocaleString()} sqft</span>
              </div>
              {inspection.property.propertyTag === 'for-rent' ? (
                <div className='sm:text-base text-sm flex flex-wrap gap-2 mt-1.5'>
                  <span className='border py-1 px-2 rounded-full'>Annual rent: {nairaSign}{formatMoney(inspection.property.annualRent)} annually</span>
                  { inspection.property.monthlyRent !== 0 && <span className='border py-1 px-2 rounded-full'>{nairaSign}{formatMoney(inspection.property.monthlyRent)} monthly</span>}
                </div>) : (
                <div className='sm:text-base text-sm flex flex-wrap gap-2 mt-1.5'>
                  <span className='border py-1 px-2 rounded-full'>Full price: {nairaSign}{formatMoney(inspection.property.fullPropertyPrice)}</span>
                  { inspection.property.annualPayment !== 0 && <span className='border py-1 px-2 rounded-full'>{nairaSign}{formatMoney(inspection.property.annualPayment)} annually</span> }
                </div>
              )
            }
            </div>
          </div>
          <div className='flex items-center justify-end'>
            <LoadingButton loading={mutation.isPending} disabled={mutation.isPending} className='rounded' onClick={cancel}>
              <p className='sm:text-base text-sm'>{mutation.isPending ? 'Cancelling inspection...' : 'Cancel inspection'}</p>
            </LoadingButton>
          </div>
        </React.Fragment>
      }
    </div>
  )
}

export default UserInspectionCard;