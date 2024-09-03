'use client'

import React from 'react'
import { propertyProps, userProps } from '@/lib/types';
import { useLogin } from '@/lib/useModals';
import { usePathname } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { bookmarkProperty } from '@/lib/actions/properties-actions';
import { LucideBookmark } from 'lucide-react';

type Props = {
  user: userProps
  property: propertyProps
}

const BookmarkButton = ({user, property}: Props) => {

  const path = usePathname();
  const loginUser = useLogin();
  const { toast } = useToast();

  
  const alreadyLiked = property.bookmarks.includes(user?._id);
  
  const handleLike = async () => {

    if (!user) {
      loginUser.onOpen();
      return;
    };
    
    const bookmarkData = { propertyId: property._id, path: path }

    try {
      await bookmarkProperty(bookmarkData).then(
        (response) => {
          if (response?.success) {
            toast({
              title: 'Success',
              description: response.success,
              variant: 'success'
            })
          }

          if (response?.error) {
            toast({
              title: 'Error',
              description: response.error,
              variant: 'destructive'
            })
          }
        }
      )
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Something went wrong, try again later.',
        variant: 'destructive'
      })
    }
  }


  return (
    <div className={`p-2 rounded-full flex items-center justify-center ${alreadyLiked ? 'bg-blue-100' : 'bg-gray-100'}`}>
      <button className='relative hover:opacity-80 transition cursor-pointer hidden md:block' onClick={handleLike}>
        <LucideBookmark size={24} className={`${alreadyLiked ? 'fill-blue-400' : 'fill-gray-300'} text-white`}/>
      </button>
      <button className='relative hover:opacity-80 transition cursor-pointer md:hidden' onClick={handleLike}>
        <LucideBookmark size={22} className={`${alreadyLiked ? 'fill-blue-400' : 'fill-gray-300'} text-white`}/>
      </button>
    </div>
  )
}

export default BookmarkButton;