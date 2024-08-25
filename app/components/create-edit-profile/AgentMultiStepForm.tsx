'use client'

import React from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Cropper, ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { cn } from "@/lib/utils";
import { HiOutlineCloudArrowUp, HiOutlinePhone, HiXMark } from "react-icons/hi2";
import InputWithIcon from "@/components/shared/InputWithIcon";
import { Form } from "@/components/ui/form";


const AgentMultiStepForm = () => {

  const PageOne = () => {
    const [imageCropped, setImageCropped] = React.useState<Blob | null>(null);
    const [imageFile, setImageFile] = React.useState<File>();
    
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

    const handleCancel = (event: React.MouseEvent<HTMLSpanElement>) => {
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

    const handleSubmit = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.stopPropagation();
      if (!imageCropped) {
        return;
      };

      const formData = new FormData();
      formData.append('image', imageCropped);
    };

    return (
      <Form>
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
          <div className="w-full flex sm:items-center sm:flex-row flex-col gap-3">
            <div className={cn("size-40 border hover:border-0 rounded relative flex-none mx-auto sm:mx-0 group cursor-pointer overflow-hidden", imageCropped && 'border-0')} onClick={() => fileInputRef.current?.click()}>
              <Input type="file" ref={fileInputRef} className="hidden sr-only" onChange={(e) => onImageSelection(e.target.files?.[0])}/>
              <Image src={ imageCropped ? URL.createObjectURL(imageCropped) : '/images/default_user.png'} alt="avatar" fill priority />
              <div className="p-3 text-center text-white text-sm absolute top-0 right-0 w-full h-full bg-black/30 rounded opacity-0 group-hover:opacity-100 flex justify-center items-center">
                { imageCropped ? 
                  <div className="flex items-center justify-between w-full">
                    <Button variant={'default'} onClick={handleSubmit} size={'icon'} className="rounded-full text-white">
                      <HiOutlineCloudArrowUp size={24}/>
                    </Button>
                    <Button  variant={'destructive'} size={'icon'} onClick={handleCancel} className="rounded-full text-white">
                      <HiXMark size={24}/>
                    </Button>
                  </div> : 
                  'Upload profile Image'
                }
              </div>
            </div>
            <div className="grow space-y-3">
            </div>
          </div>
        }
      </Form>
    )
  };

  return(
    <div>
      <PageOne />
    </div>
  )
}

export default AgentMultiStepForm;