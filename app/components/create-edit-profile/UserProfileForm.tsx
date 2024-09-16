'use client'

import { useToast } from '@/components/ui/use-toast';
import React from 'react';
import { userProps } from '@/lib/types';
import { Cropper, ReactCropperElement } from 'react-cropper'
import { cn, uploadImage } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userProfileSchema, userProfileValues } from '@/lib/validations';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HiOutlineBriefcase, HiOutlineCloudArrowUp, HiOutlineMapPin, HiOutlineTrash, HiXMark } from 'react-icons/hi2';
import InputWithIcon from '@/components/shared/InputWithIcon';
import { updateUserProfile } from '@/lib/actions/user-actions';
import { useUserProfile } from '@/lib/useModals';
import LoadingButton from '@/components/shared/LoadingButton';



const UserProfileForm = ({user}:{user:userProps}) => {

  const userProfile = useUserProfile();
  const profilePageDefaultValues = {
    city: user.city,
    state: user.state,
    occupation: user.occupation
  };

  const form = useForm<userProfileValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: profilePageDefaultValues
  });

  const { toast } = useToast();

  const [isLoading, setIsLoading] = React.useState(false)

  const [imageCropped, setImageCropped] = React.useState<File | null>(null);
  const [imageFile, setImageFile] = React.useState<File>();
  const [imageUrls, setImageUrls] = React.useState({public_id: '', secure_url: ''});
  const [imageUploaded, setImageUploaded] = React.useState(false);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const cropperRef = React.useRef<ReactCropperElement>(null);

  const onImageSelection = (image: File | undefined) => {
    if (!image) {
      return;
    }

    setImageFile(image);
  };

  const onClose = () => {
    setImageFile(undefined);
    if (fileInputRef.current?.value) {
      fileInputRef.current.value = "";
    }
  };

  const handleCancelUpload = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setImageFile(undefined);
    setImageCropped(null);

    if (fileInputRef.current?.value) {
      fileInputRef.current.value = "";
    }
  };

  const crop = () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) {
      return;
    }

    cropper.getCroppedCanvas().toBlob((blob) => {
      if (blob) {
        const reader = new FileReader();
        reader.onload = () => {
          const arrayBuffer = new Uint8Array(reader.result as ArrayBuffer);
          const file = new File([arrayBuffer], 'cropped_image.jpg', { type: 'image/jpeg' });
          setImageCropped(file);
        };
        reader.readAsArrayBuffer(blob);
      }
    },
      "image/jpeg");
      onClose();
  };

  const handleUploadImage = async (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    if (!imageCropped) {
      return;
    };

    const data = {image: imageCropped, uploadPreset: 'profileImages'}

    try {
      const imageData = await uploadImage(data)
      const imageUrls = { public_id: imageData?.public_id, secure_url: imageData?.secure_url };
      setImageUrls(imageUrls);
      toast({
        variant: "success",
        description: 'Profile image succesfully uploaded!'
      })
      setImageUploaded(true);
    } catch (error) {
      toast({
        variant: "destructive",
        description: 'Error while uploading profile image, try again later.'
      })
    }
  };

  const resetField = () => {
    form.reset(profilePageDefaultValues);
    setImageCropped(null);
    setImageFile(undefined);
    setImageUrls({public_id: '', secure_url: ''});
    setImageUploaded(false);
    form.reset();
  };

  const onSubmit = async (values: userProfileValues) => {
    setIsLoading(true)
    const fullValues = { ...values, profileImage: imageUploaded ? imageUrls : user.profileImage, isNewImage: imageUploaded ? true : false };
    await updateUserProfile(fullValues).then((response) => {
      if (response.success) {
        resetField();
        userProfile.onClose();
        toast({
          title: user.profileCreated ? 'User profile updated!' : 'User profile created!',
          description: user.profileCreated ? 'You have successfully updated your profile.': 'You have successfully created your profile.',
          variant: 'success'
        })
        window.location.reload();
      }

      if (response.error) {
        toast({
          title: user.profileCreated ? 'User profile not updated!' : 'User profile not created!',
          description: user.profileCreated ? 'Your profile was not updated. Try again later': 'Your profile was not created. Try again later',
          variant: 'destructive'
        })
        setIsLoading(false)
      }
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        { imageFile ? 
          <div className="w-full size-fit rounded overflow-hidden">
            <Cropper 
              src={URL.createObjectURL(imageFile)} 
              aspectRatio={1} 
              guides={false} 
              zoomable={false} 
              ref={cropperRef}
              className='mx-auto size-fit'
            />
            <div className="flex items-center justify-end gap-3 mt-4">
              <Button variant={'secondary'} onClick={onClose} className='rounded-full' type="button">Cancel</Button>
              <Button onClick={crop} className='rounded-full' type="button">Crop</Button>
            </div>
          </div> :
          <React.Fragment>
            <div className="w-full flex sm:flex-row flex-col sm:gap-2 gap-3 sm:items-center">
              <div className={cn("size-36 sm:size-40 border hover:border-0 rounded relative flex-none group cursor-pointer overflow-hidden", imageCropped && 'border-0')} onClick={() => fileInputRef.current?.click()}>
                <Input type="file" ref={fileInputRef} className="hidden sr-only" onChange={(e) => onImageSelection(e.target.files?.[0])}/>
                <Image src={ imageCropped ? URL.createObjectURL(imageCropped) : user.image || '/images/default_user.png' } alt="avatar" fill priority />
                <div className="p-3 text-center text-white text-sm absolute top-0 right-0 w-full h-full bg-black/30 rounded opacity-0 group-hover:opacity-100 flex justify-center items-center">
                  { imageCropped && !imageUploaded ? 
                    <div className="flex items-center justify-between w-full">
                      <Button type="button" variant={'default'} onClick={handleUploadImage} size={'icon'} className="rounded-full text-white">
                        <HiOutlineCloudArrowUp size={24}/>
                      </Button>
                      <Button  type="button" variant={'destructive'} size={'icon'} onClick={handleCancelUpload} className="rounded-full text-white">
                        <HiXMark size={24}/>
                      </Button>
                    </div> : imageCropped && imageUploaded ? 
                    <div className="flex items-center justify-center w-full">
                      <Button  type="button" variant={'destructive'} size={'icon'} onClick={handleCancelUpload} className="rounded-full text-white">
                        <HiOutlineTrash size={24}/>
                      </Button>
                    </div> :
                    'Upload profile Image'
                  }
                </div>
              </div>
              <div className="grow space-y-3">
                <FormField
                  control={form.control}
                  name='city'
                  render={({field}) => (
                    <FormItem>
                      <FormControl className="-mb-1">
                        <InputWithIcon type='text' placeholder='city of residence' icon={HiOutlineMapPin} {...field} className='border rounded'/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='state'
                  render={({field}) => (
                    <FormItem>
                      <FormControl className="-mb-1">
                        <InputWithIcon type='text' placeholder='state of residence' icon={HiOutlineMapPin} {...field} className='border rounded'/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='occupation'
                  render={({field}) => (
                    <FormItem>
                      <FormControl className="-mb-1">
                        <InputWithIcon type='text' placeholder='what you do for a living' icon={HiOutlineBriefcase} {...field} className='border rounded'/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end">
              <LoadingButton loading={isLoading} disabled={isLoading} className="rounded" type="submit">
                { isLoading ? 'Submitting...' : 'Submit' }
              </LoadingButton> 
            </div>
          </React.Fragment>
        }
      </form>        
    </Form>  
  );
}

export default UserProfileForm;
