'use client'

import React from 'react'
import { blogProps, propertyProps, userProps } from '@/lib/types';
import { useLogin } from '@/lib/useModals';
import { usePathname } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { LucideHeart } from 'lucide-react';
import { likeBlog } from '@/lib/actions/blog-action';

type Props = {
  user: userProps
  blog: blogProps
}

const LikeButton = ({user, blog}: Props) => {

  const path = usePathname();
  const loginUser = useLogin();
  const { toast } = useToast();

  
  const alreadyLiked = blog.likes?.includes(user?._id);
  
  const handleLike = async () => {
    
    if (!user) {
      loginUser.onOpen();
      return;
    };               

    const likeData = { blogId: blog._id, path: path }

    try {
      await likeBlog(likeData).then(
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
    <div className={`p-2 rounded-full flex items-center justify-center ${alreadyLiked ? 'bg-red-100' : 'bg-gray-100'}`}>
      <button className='hover:opacity-80 transition cursor-pointer hidden md:block' onClick={handleLike}>
        <LucideHeart size={24} className={`${alreadyLiked ? 'fill-rose-400' : 'fill-gray-300'} text-white`}/>
      </button>
      <button className='hover:opacity-80 transition cursor-pointer md:hidden' onClick={handleLike}>
        <LucideHeart size={22} className={`${alreadyLiked ? 'fill-rose-400' : 'fill-gray-300'} text-white`}/>
      </button>
    </div>
  )
}

export default LikeButton;