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
    <div className='lg:p-4 p-3 rounded w-full bg-card flex flex-col sm:gap-2 gap-1 shadow-sm'>
      <h2 className='text-base'>Client details</h2>
      <div className='flex gap-4 lg:gap-5'>
        <ImageAvatar src={inspection.user.image} alt='user_profile_image' className='flex-none rounded-full md:size-16 size-12'/>
        <div className='w-full'>
          <div className="flex flex-wrap sm:gap-2 gap-1">
            <p className='text-sm sm:text-base capitalize border p-1 rounded'>Name: {inspection.user.name}</p>
            <p className='text-sm sm:text-base border p-1 rounded'>Email: {inspection.user.email}</p>
          </div>
          <div className='flex items-center justify-between w-full cursor-pointer sm:mt-2 mt-1' onClick={() => setShowDetails((prev) => !prev)}>
            <p className='text-sm sm:text-base capitalize border p-1 rounded'>Phone: {inspection.user.phoneNumber}</p>
            <div className='flex items-center gap-2 text-sm sm:text-base'>{showDetails ? 'Hide more': 'Show more'} {showDetails ? <HiChevronUp className='size-4 sm:size-5'/> : <HiChevronDown className='size-4 sm:size-5' />}</div>
          </div>
        </div>
      </div>
      { showDetails &&
        <React.Fragment>
          <hr/>
          <h2 className='text-base'>Inspection details</h2>
          <div className='flex flex-wrap sm:gap-2 gap-1'>
            <p className='text-sm sm:text-base capitalize border p-1 rounded'>Date: {formatDate(inspection.scheduledAt)}</p>
            <p className='text-sm sm:text-base capitalize border p-1 rounded'>Time: {inspection.time}</p>
          </div>
          <hr/>
          <h2 className='text-base'>Property details</h2>
          <div className='flex flex-wrap sm:gap-2 gap-1'>
            <p className='text-sm sm:text-base capitalize border p-1 rounded cursor-pointer hover:underline' onClick={() => router.push(`/property/${inspection.property.propertyId}`)}>Address: {inspection.property.address}.</p>
            <span className='border p-1 rounded text-sm sm:text-base'>{inspection.property.numberOfBath} baths</span>
            <span className='border p-1 rounded text-sm sm:text-base'>{inspection.property.numberOfRooms} beds</span>
            <span className='border p-1 rounded text-sm sm:text-base'>{inspection.property.numberOfToilets} toilets</span>
            <span className='border p-1 rounded text-sm sm:text-base'>{inspection.property.area.toLocaleString()} sqft</span>
            <div>
              <div className='sm:text-base text-sm flex flex-wrap gap-2'>
              </div>
              {inspection.property.propertyTag === 'for-rent' ? (
                <div className='sm:text-base text-sm flex flex-wrap gap-2'>
                  <span className='border p-1 rounded'>Annual rent: {nairaSign}{formatMoney(inspection.property.annualRent)} annually</span>
                  { inspection.property.monthlyRent !== 0 && <span className='border p-1 rounded'>{nairaSign}{formatMoney(inspection.property.monthlyRent)} monthly</span>}
                </div>) : (
                <div className='sm:text-base text-sm flex flex-wrap gap-2'>
                  <span className='border p-1 rounded'>Full price: {nairaSign}{formatMoney(inspection.property.fullPropertyPrice)}</span>
                  { inspection.property.annualPayment !== 0 && <span className='border p-1 rounded'>{nairaSign}{formatMoney(inspection.property.annualPayment)} annually</span> }
                </div>
              )
            }
            </div>
          </div>
          { inspection.property.propertyTag === 'for-rent' ? (
            <div className='flex items-center justify-end mt-2'>
              <LoadingButton loading={isLoading} disabled={isLoading} className='rounded' onClick={addClient}>
                <p className='sm:text-base text-sm'>{isLoading ? 'Adding client...' : 'Add client'}</p>
              </LoadingButton>
            </div>
          ) : (
            <div className='flex items-center justify-end mt-2'>
              <LoadingButton loading={isLoading} disabled={isLoading} className='rounded' onClick={confirmSale}>
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