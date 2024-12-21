'use client'

import { propertyProps } from '@/lib/types';
import { formatMoney } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import { HiChevronRight } from 'react-icons/hi2';
import { twMerge } from 'tailwind-merge';

type Props = {
  property:propertyProps;
  setOpenSlider: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageGrid = ({ property, setOpenSlider }:Props) => {

  const nairaSign:string = String.fromCodePoint(8358);

  const ViewAllButton = ({className}:{className?:string}) => {
    return (
      <button className={twMerge("absolute right-3 bottom-3 dark:text-black bg-white py-2 pl-3 pr-1 rounded flex items-center", className)} onClick={() => setOpenSlider(true)}>
        <h2 className='text-sm lg:text-base'>View all {property.images.attachments.length} photos</h2>
        <div>
          <HiChevronRight size={22}/>
        </div>
      </button>
    )
  };

  return (
    <React.Fragment>
      <div className='w-full rounded overflow-hidden xl:h-[30rem] lg:h-[28rem] md:h-[22rem] h-[20rem] grid md:grid-cols-2 gap-2 grid-cols-1'>
        <div className="w-full h-full rounded flex justify-center items-center relative overflow-hidden bg-gray-300">
          <Image src={property.images.attachments[0].secure_url} alt='property_image_1' priority className='object-cover' fill/>
          <ViewAllButton  className='md:hidden'/>
        </div>
        <div className="w-full h-full md:grid grid-rows-2 overflow-hidden gap-2 hidden">
            <div className="w-full flex h-full justify-center items-center rounded relative overflow-hidden bg-gray-300">
              <Image src={property.images.attachments[1].secure_url} alt='property_image_2' priority className='object-cover' fill/>
            </div>
            <div className="grid grid-cols-2 w-full h-full gap-2 overflow-hidden">
              <div className="w-full h-full rounded flex items-center justify-center relative overflow-hidden bg-gray-3000">
                <Image src={property.images.attachments[2].secure_url} alt='property_image_3' priority className='object-cover' fill/>
              </div>
              <div className="w-full h-full rounded flex items-center justify-center overflow-hidden relative bg-gray-300 cursor-pointer">
                <Image src={property.images.attachments[3].secure_url} alt='property_image_4' priority className='object-cover' fill/>
                <ViewAllButton />
              </div>
            </div>
        </div>
      </div>
      <div className='my-4 flex justify-between items-start md:items-center flex-col md:flex-row'>
        <p className='text-xl mb-2 md:mb-0'>{property.propertyTag === 'for-rent' ? `${property.monthlyRent > 0 ? 'Monthly Rent' : 'Annual Rent'}` : 'Price'}: <span className='text-yellow-400'>{nairaSign} {property.propertyTag === 'for-rent' ? formatMoney(property.monthlyRent > 0 ? property.monthlyRent : property.annualRent)  : formatMoney(property.fullPropertyPrice)}</span></p>
        <div className="py-2.5 px-5 rounded bg-neutral-700 text-white flex w-fit gap-2 lg:gap-3 items-center">
          <div className='dark:border-r-white/60 border-r pr-2.5 lg:pr-3.5 capitalize'>{property.numberOfRooms} beds</div>
          <div className='dark:border-r-white/60 border-r pr-2.5 lg:pr-3.5 capitalize'>{property.numberOfBath} baths</div>
          <div className='dark:border-r-white/60 border-r pr-2.5 lg:pr-3.5 capitalize'>{property.numberOfToilets} toilets</div>
          <div className=''>{property.area} sqft</div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default ImageGrid
