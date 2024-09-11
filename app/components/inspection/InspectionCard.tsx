'use client'

import React from 'react'
import { inspectionProps } from '@/lib/types';
import ImageAvatar from '@/components/shared/ImageAvatar';
import { formatDate, formatMoney } from '@/lib/utils';
import LoadingButton from '@/components/shared/LoadingButton';
import { useRouter } from 'next/navigation';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import { createRent } from '@/lib/actions/rentout-actions';
import { useToast } from '@/components/ui/use-toast';
import { createSale } from '@/lib/actions/soldout-actions';

type Props = {
  inspection: inspectionProps
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
};

const InspectionCard = ({setActiveTab, inspection}: Props) => {
  const nairaSign:string = String.fromCodePoint(8358);
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);

  const addClient = async () => {
    const addClientData = {
      propertyId: inspection.property._id,
      inspectionId: inspection._id,
      userId: inspection.user._id,
      agentId: inspection.agent,
    };

    try {
      setIsLoading(true)
      await createRent(addClientData)
      .then((response) => {
        if (response?.success) {
          toast({
            variant: 'success',
            title: 'Success',
            description: response.success
          })
          setIsLoading(false);
          setActiveTab('all-clients')
        }

        if (response?.error) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: response.error
          })
          setIsLoading(false); 
        }
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong, try again later.'
      })
      setIsLoading(false); 
    }
  };

  const confirmSale = async () => {
    const confirmSaleData = {
      propertyId: inspection.property._id,
      inspectionId: inspection._id,
      userId: inspection.user._id,
      agentId: inspection.agent,
    };

    try {
      setIsLoading(true)
      await createSale(confirmSaleData)
      .then((response) => {
        if (response?.success) {
          toast({
            variant: 'success',
            title: 'Success',
            description: response.success
          })
          setIsLoading(false);
          setActiveTab('all-clients')
        }

        if (response?.error) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: response.error
          })
          setIsLoading(false); 
        }
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong, try again later.'
      })
      setIsLoading(false); 
    }
  };

  return (
    <div className='lg:p-4 p-3 rounded w-full bg-card flex flex-col gap-2 shadow-sm'>
      <h2 className='text-base'>Client details</h2>
      <div className='flex gap-4 lg:gap-5'>
        <ImageAvatar src={inspection.user.image} alt='user_profile_image' className='flex-none rounded-full md:size-16 size-12'/>
        <div className='w-full'>
          <p className='text-sm sm:text-base capitalize'>Name: {inspection.user.name}</p>
          <p className='text-sm sm:text-base'>Email: {inspection.user.email}</p>
          <div className='flex items-center justify-between w-full cursor-pointer' onClick={() => setShowDetails((prev) => !prev)}>
            <p className='text-sm sm:text-base capitalize'>Phone: {inspection.user.phoneNumber}</p>
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
          { inspection.property.propertyTag === 'for-rent' ? (
            <div className='flex items-center justify-end'>
              <LoadingButton loading={isLoading} disabled={isLoading} className='rounded-full' onClick={addClient}>
                <p className='sm:text-base text-sm'>{isLoading ? 'Adding client...' : 'Add client'}</p>
              </LoadingButton>
            </div>
          ) : (
            <div className='flex items-center justify-end'>
              <LoadingButton loading={isLoading} disabled={isLoading} className='rounded-full' onClick={confirmSale}>
                <p className='sm:text-base text-sm'>{isLoading ? 'Confirming sale...' : 'Confirm sale'}</p>
              </LoadingButton>
            </div>
          )
          }
        </React.Fragment>
      }
    </div>
  )
}

export default InspectionCard;