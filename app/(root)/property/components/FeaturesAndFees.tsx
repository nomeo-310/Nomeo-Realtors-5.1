'use client'

import React from 'react'
import { propertyProps, userProps } from '@/lib/types';
import { useLogin } from '@/lib/useModals';
import { useRouter } from 'next/navigation';
type Props = {
  property: propertyProps;
  user: userProps;
}

const FeaturesAndFees = ({property, user}:Props) => {
  const nairaSign:string = String.fromCodePoint(8358);
  const router = useRouter();
  const loginUser = useLogin();

  const Amenities = () => {
    return(
      <React.Fragment>
        <div className="my-4">
          <h2 className='text-xl lg:text-2xl'>Main Amenities</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {property.mainAmenities.map((item:string, index:number) => (
              <p className='border rounded-full py-2 px-3 capitalize text-base dark:border-white/60' key={index}>{item}</p>
            ))}
          </div>
        </div>
        <hr className='dark:border-white/60'/>
        { property.optionalAmenities.length > 0 && (
          <React.Fragment>
            <div className='my-4'>
              <h2 className='text-xl lg:text-2xl'>Optional Amenities</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                { property.optionalAmenities.map((item:string, index:number) => (
                  <p className='border rounded-full py-2 px-3 capitalize text-base dark:border-white/60' key={index}>{item}</p>
                ))}
              </div>          
            </div>
            <hr className='dark:border-white/60'/>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  };

  const Fees = () => {
    return (
      <React.Fragment>
        <div className="my-4">
          <h2 className='text-xl lg:text-2xl'>Main Fees</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {property.mainFees.map((item, index:number) => (
              <p className='dark:border-white/60 border rounded-full py-2 px-3 capitalize text-base' key={index}>{item.name}:{' '} {nairaSign}{item.amount.toLocaleString()}.00</p>
            ))}
          </div>
        </div>
        <hr className='dark:border-white/60'/>
        { property.optionalFees.length > 0 && (
          <React.Fragment>
            <div className="my-4">
              <h2 className='text-xl lg:text-2xl'>Optional Fees</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                {property.optionalFees.map((item, index:number) => (
                  <p className='dark:border-white/60 border rounded-full py-2 px-3 capitalize text-base' key={index}>{item.name}:{' '} {nairaSign}{item.amount.toLocaleString()}.00</p>
                ))}
              </div>
            </div>
            <hr className='sm:hidden dark:border-white/60'/>            
          </React.Fragment>
        )}
      </React.Fragment>
    )
  };


  return (
    <React.Fragment>
      <div className="md:w-[50%] lg:w-[55%] w-full md:pr-4">
        <Amenities/>
        <Fees/>
      </div>
    </React.Fragment>
  )
};

export default FeaturesAndFees