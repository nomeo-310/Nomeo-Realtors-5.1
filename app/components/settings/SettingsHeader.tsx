'use client'

import React from 'react'
import Image from 'next/image';
import ImageAvatar from '@/components/shared/ImageAvatar';
import { LucideImagePlus, LucideLoader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { HiOutlineCloudArrowUp, HiXMark } from 'react-icons/hi2';
import { cn, uploadImage } from '@/lib/utils';
import { userProps } from '@/lib/types';
import { usePathname } from 'next/navigation';
import { updateCoverImage } from '@/lib/actions/user-actions';
import { useToast } from '@/components/ui/use-toast';

type Props = {
  user: userProps
}

const SettingsHeader = ({user}: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [newProfileImage, setNewProfileImage] = React.useState({public_id: '', secure_url: ''});

  const path = usePathname();
  const { toast } = useToast();                  

  const onChangeImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfileImage({...newProfileImage, secure_url: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  const resetImageFile = () => {
    setImageFile(null)
    setNewProfileImage({...newProfileImage, secure_url: ''})
  };

  const uploadCoverImage = async() => {
    setIsLoading(true)
    try {
      const data = {image: imageFile, uploadPreset: 'profileImages'}
      const imageData = await uploadImage(data)
      const imageUrls = { public_id: imageData?.public_id, secure_url: imageData?.secure_url };
      const updateData = { path: path, coverImage: imageUrls }
      await updateCoverImage(updateData)
      .then((response) => {
        if (response?.success) {
          toast({
            variant: 'success',
            title: 'Sucess',
            description: response.success
          })
          setIsLoading(false)
          resetImageFile();
        };

        if (response?.error) {
          toast({
            variant: 'destructive',
            title: 'error',
            description: response.error
          })
          setIsLoading(false)
        };

      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'error',
        description: 'Error uploading image'
      })
      setIsLoading(false)
    }
  };

  return (
    <React.Fragment>
       <h2>Edit profile & cover image</h2>
      <div className='w-full h-48 sm:h-60 rounded overflow-hidden relative shadow-sm'>
        { newProfileImage.secure_url ? (
          <React.Fragment>
            <Image src={newProfileImage.secure_url} alt='default cover' fill className='object-cover'/>
            <div className="bg-neutral-700/30 w-full h-full absolute left-0 top-0" />
            <div className="z-10 w-full h-full flex flex-col items-center justify-center absolute left-0 top-0">
              <div className="flex items-center justify-center gap-6">
                <button className={cn('size-9 sm:size-11 flex items-center justify-center text-white rounded-full focus:outline-none', isLoading ? 'bg-orange-400': 'bg-green-600')} onClick={uploadCoverImage} disabled={isLoading}>
                  <HiOutlineCloudArrowUp className="sm:block hidden" size={32}/>
                  <HiOutlineCloudArrowUp className="sm:hidden" size={28}/>
                </button>
                <button className='size-9 sm:size-11 flex items-center justify-center bg-red-600 text-white rounded-full focus:outline-none' onClick={resetImageFile}>
                  <HiXMark className="sm:block hidden" size={32}/>
                  <HiXMark className="sm:hidden" size={28}/>
                </button>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Image src={user.coverImage.secure_url ? user.coverImage.secure_url : '/images/default_cover.png'} alt='default cover' fill className='object-cover'/>
            <div className="bg-neutral-700/30 w-full h-full absolute left-0 top-0" />
            <div className="z-10 w-full flex justify-center flex-col left-0 top-0 absolute h-full px-6 py-10">
              <div className="flex gap-4 items-center">
                <ImageAvatar src='/images/profile_12.jpg' className='lg:size-36 md:size-28 size-20 rounded-full flex-none'/>
                <div className="flex flex-col font-semibold">
                  <p className='text-sm sm:text-base'>Name: {user.name}</p>
                  <p className='text-sm sm:text-base'>Email: {user.email}</p>
                  <p className='text-sm sm:text-base'>Phone number: {user.phoneNumber}</p>
                </div>
              </div>
              <Input type="file" ref={fileInputRef} className="hidden sr-only" onChange={onChangeImageFile}/>
              <div className="mt-10 sm:mt-6 flex w-full justify-between items-center">
                <span className='bg-primary py-1 px-2 rounded text-sm sm:text-base cursor-pointer' onClick={() => console.log('i clicked')}>Edit profile</span>
                <div className='bg-primary py-1 px-2 rounded text-sm sm:text-base cursor-pointer flex items-center gap-2' onClick={() => fileInputRef.current?.click()}>
                  <LucideImagePlus size={22}/>
                  Change cover image
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}

export default SettingsHeader