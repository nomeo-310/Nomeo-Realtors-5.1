'use client'

import React from 'react'
import { HiXMark } from 'react-icons/hi2';
import { LiaArrowLeftSolid, LiaArrowRightSolid } from 'react-icons/lia';
import Image from 'next/image';
import { propertyProps } from '@/lib/types';

type Props = {
  property: propertyProps;
  setOpenSlider: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageSlider = ({property, setOpenSlider}:Props) => {

  const { images } = property;
  const lastImageIndex = images && images.attachments.length - 1;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    if (!images) {
      return
    }

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  const prevSlide = () => {
    if (!images) {
      return
    }

    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  return (
    <div className='slide-in-left fixed left-0 top-0 w-full h-full bg-neutral-800/70 z-[300000] overflow-hidden lg:p-8 md:p-12 p-6'>
      <div className='absolute right-6 top-6 lg:py-2.5 lg:px-5 p-2 flex gap-3 bg-white rounded-full items-center dark:text-black'>
        <div className='text-lg border-r pr-3 hidden lg:block'>{currentIndex + 1} of {images.attachments.length}</div>
        <button>
          <HiXMark size={22} onClick={() =>{setOpenSlider(false), setCurrentIndex(0)}} />
        </button>
      </div>
      <div className="flex items-center gap-2 md:gap-4 lg:gap-5 h-full w-full justify-center">
        <div>
          {currentIndex > 0 &&
            <button className='bg-white hover:scale-110 md:w-11 md:h-11 w-10 h-10 flex items-center justify-center rounded-full dark:text-black' onClick={prevSlide}>
              <LiaArrowLeftSolid size={22} />
            </button>
          }
        </div>
        <div className="h-full text-white overflow-hidden flex items-center justify-center relative w-full">
          <Image src={images && images.attachments[currentIndex].secure_url} alt={`image_${currentIndex + 1}`} fill className='size-fit object-contain rounded-md'/>
        </div>
        <div>
          { currentIndex < lastImageIndex! &&
            <button className='bg-white hover:scale-110 md:w-11 md:h-11 w-10 h-10 flex items-center justify-center rounded-full dark:text-black' onClick={nextSlide}>
              <LiaArrowRightSolid size={22} />
            </button>
          }
        </div>
      </div>
    </div>
  )
};

export default ImageSlider