'use client'

import ImageAvatar from '@/components/shared/ImageAvatar';
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { propertyProps, userProps } from '@/lib/types';
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { LucideBed } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { HiEllipsisHorizontal, HiOutlineMapPin, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2';
import { LiaBathSolid, LiaToiletSolid } from 'react-icons/lia';
import { AiOutlineHeart } from 'react-icons/ai';
import { SlSizeFullscreen } from "react-icons/sl";
import { CiBookmarkCheck } from "react-icons/ci";
import { formatMoney } from '@/lib/utils';

type Props = {
  property: propertyProps;
  user: userProps;
  agentMode: boolean;
  agentProfileMode: boolean;
};

const PropertyCard = ({property, user, agentMode, agentProfileMode}: Props) => {

  const nairaSign:string = String.fromCodePoint(8358);
  const userId = user && user?._id;
  const liked = property.likes.includes(userId);
  const bookmarked = property.bookmarks.includes(userId);
  const router = useRouter();

  const PropertyMenu = () => {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button className='rounded-full border'>
            <HiEllipsisHorizontal size={26} className='text-white'/>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-20 rounded z-10 bg-card p-1 md:mr-12 mr-8 mt-2">
          <DropdownMenuItem className='rounded cursor-pointer'>
            <p className='text-sm'>Delete</p>
          </DropdownMenuItem>
          <DropdownMenuItem className='rounded cursor-pointer'>
            <p className='text-sm'>Edit</p>
          </DropdownMenuItem>
          <DropdownMenuItem className='rounded cursor-pointer' onClick={() => router.push(`/property/${property.propertyId.toLowerCase()}`)}>
            <p className='text-sm'>View</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  };

  return (
    <div className='w-full flex flex-col gap-2 cursor-pointer group' onClick={!agentMode || !agentProfileMode ? () => router.push(`/property/${property.propertyId.toLowerCase()}`) : () => {}}>
      <div className="bg-gray-300 relative md:aspect-square aspect-video xl:h-[15rem] lg:h-[14rem] md:h-[13rem] h-[14rem] flex items-center justify-center overflow-hidden rounded">
        <Image alt='property_image' src={property.images.attachments[0].secure_url} className='object-cover' fill priority/>
        { !agentMode && <div className="bg-white py-1 px-2 rounded absolute left-3 top-3 capitalize text-sm text-black">{ property.propertyTag.split('-').join(' ')}</div> }
        { !agentMode && 
          <div className="bg-black/30 left-0 bottom-0 w-full p-4 absolute text-white flex items-center justify-between lg:-translate-x-[100vw] duration-500 lg:group-hover:translate-x-0 ease-in-out">
            <div>
              <div className='flex items-center gap-2'>
                <SlSizeFullscreen size={13} className='lg:hidden'/>
                <SlSizeFullscreen size={16} className='hidden lg:block'/>
                <p className='text-sm lg:text-base'>{ property.area.toLocaleString() }ft<sup>2</sup></p>
              </div>
              <div className='flex items-center gap-2'>
                <LucideBed size={15} className='lg:hidden'/> 
                <LucideBed size={18} className='hidden lg:block'/> 
                <p className='text-sm lg:text-base'>{ property.numberOfRooms } Bedrooms</p>
              </div>
              <div className='flex items-center gap-2'>
                <LiaBathSolid size={15} className='lg:hidden'/> 
                <LiaBathSolid size={18} className='hidden lg:block'/> 
                <p className='text-sm lg:text-base'>{ property.numberOfBath } Bathrooms</p>
              </div>
              <div className='flex items-center gap-2'>
                <LiaToiletSolid size={15} className='lg:hidden'/> 
                <LiaToiletSolid size={18} className='hidden lg:block' /> 
                <p className='text-sm lg:text-base'>{ property.numberOfToilets } Toilets</p>
              </div>
            </div>
              { !agentProfileMode &&
                <div className='flex flex-col justify-center gap-2 items-center'>
                  <ImageAvatar className='rounded-full overflow-hidden lg:w-12 lg:h-12 w-11 h-11' src={property.agent.user.image}/>
                  <p className='text-base capitalize'>{property.agent.user.name}</p>
                </div>
              }
          </div>
        }
        { agentMode ? (
          <div className="right-3 top-3 absolute flex items-center gap-4">
            <PropertyMenu/>
          </div>
          ) : (
          <div className="right-3 top-3 absolute flex items-center gap-4">
            { liked &&
              <div className='relative hover:opacity-80 transition cursor-pointer mt-1'>
                <AiOutlineHeart size={26} className='fill-rose-500'/>
              </div>
            }
            { bookmarked &&
              <div className='relative hover:opacity-80 transition cursor-pointer mt-1'>
                <CiBookmarkCheck size={26} className='fill-blue-500'/>
              </div>
            }
          </div> )
          }
      </div>
      <div>
        <p className='text-lg line-clamp-1 mb-1 font-semibold'>{property.title}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HiOutlineMapPin size={20}/>
            <p className='line-clamp-1 text-base'>{property.city}, {property.state}.</p>
          </div>
          <div className='text-yellow-400 line-clamp-1'>
            {nairaSign}{ property.propertyTag === 'for-rent' ? `${formatMoney(property.monthlyRent > 0 ? property.monthlyRent : property.annualRent as number)}` : `${formatMoney(property.fullPropertyPrice as number)}`} {property.propertyTag === 'for-rent' ? <span>{property.monthlyRent > 0 ? 'monthly' : 'yearly'}</span> : '' }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard;