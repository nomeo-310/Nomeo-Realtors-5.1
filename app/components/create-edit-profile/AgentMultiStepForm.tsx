'use client'

import React from "react";

import { agentProfileSchema, agentProfileValues } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Cropper, ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { cn, uploadImage } from "@/lib/utils";
import { HiLink, HiOutlineBriefcase, HiOutlineCloudArrowUp, HiOutlineMapPin, HiOutlinePhone, HiOutlineTrash, HiOutlineWallet, HiXMark } from "react-icons/hi2";
import InputWithIcon from "@/components/shared/InputWithIcon";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { userProps } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { updateAgentProfile } from "@/lib/actions/user-actions";
import { useAgentProfile } from "@/lib/useModals";
import LoadingButton from "@/components/shared/LoadingButton";
import { LucideImagePlus } from "lucide-react";

const fieldNames = [
  {
    name: 'step 1',
    fields: ['city', 'state', 'agencyName']
  },
  {
    name: 'Step 2',
    fields: ['agencyAddress', 'officeNumber', 'agencyWebsite', 'agentInspectionFee',  ]
  },
  {
    name: 'Step 3',
    fields: ['agentBio']
  }
];

const AgentMultiStepForm = ({user}:{user:userProps}) => {
  const agentProfile = useAgentProfile();

  const [currentStep, setCurrentStep] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const profilePageDefaultValues = {
    city: user.city,
    state: user.state,
    agencyName: user.isAgent.agencyName,
    agencyAddress: user.isAgent.agencyAddress,
    agentInspectionFee: user.isAgent.agentInspectionFee.toString() || "",
    agencyWebsite: user.isAgent.agencyWebsite,
    officeNumber: user.isAgent.officeNumber,
    agentBio: user.isAgent.agentBio,
  };

  const form = useForm<agentProfileValues>({
    resolver: zodResolver(agentProfileSchema),
    defaultValues: profilePageDefaultValues
  });

  const { toast } = useToast();

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
        title: "Success",
        description: 'Profile image succesfully uploaded!'
      })
      setImageUploaded(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: 'Error while uploading profile image, try again later.'
      })
    }

  };

  const resetField = () => {
    form.reset(profilePageDefaultValues);
    setCurrentStep(0);
    setImageCropped(null);
    setImageFile(undefined);
    setImageUrls({public_id: '', secure_url: ''});
    setImageUploaded(false);
    form.reset();
  };

  const onSubmit = async (values: agentProfileValues) => {
    setIsLoading(true)
    const fullValues = { ...values, profileImage: imageUploaded ? imageUrls : user.profileImage, isNewImage: imageUploaded ? true : false };
    await updateAgentProfile(fullValues).then((response) => {
      if (response.success) {
        resetField();
        agentProfile.onClose();
        window.location.reload();
        return toast({
          title: user.profileCreated ? 'Agent profile updated!' : 'Agent profile created!',
          description: user.profileCreated ? 'You have successfully updated your profile.': 'You have successfully created your profile.',
          variant: 'success'
        })
      }

      if (response.error) {
        toast({
          title: user.profileCreated ? 'Agent profile not updated!' : 'Agent profile not created!',
          description: user.profileCreated ? 'Your profile was not updated. Try again later': 'Your profile was not created. Try again later',
          variant: 'destructive'
        })
        setIsLoading(false)
      }
    })
  };

  type FieldName = keyof agentProfileValues;


  const nextStep = async () => {
    const fields = fieldNames[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], {shouldFocus: true})

    if (!output) {
      return;
    };

    if (currentStep < fieldNames.length - 1) {
      if (currentStep === 0 && imageCropped && !imageUploaded) {
        return;
      };
      setCurrentStep((current) => current + 1);
    }
  };

  const previousStep = () => {
    setCurrentStep((current) => current - 1);
  };

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        { currentStep === 0 && (
          <React.Fragment>
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
                  <Button variant={'secondary'} onClick={onClose} className='rounded' type="button">Cancel</Button>
                  <Button onClick={crop} className='rounded' type="button">Crop</Button>
                </div>
              </div> :
              <React.Fragment>
                <div className="w-full flex sm:flex-row flex-col sm:gap-2 gap-3">
                  <div className={cn("size-36 sm:size-40 shadow-sm hover:border-0 rounded relative flex-none group cursor-pointer overflow-hidden", imageCropped && 'border-0')} onClick={() => fileInputRef.current?.click()}>
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
                        (<LucideImagePlus size={48} className="text-white"/>)
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
                      name='agencyName'
                      render={({field}) => (
                        <FormItem>
                          <FormControl className="-mb-1">
                            <InputWithIcon type='text' placeholder='name of your agency' icon={HiOutlineBriefcase} {...field} className='border rounded'/>
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </React.Fragment>
            }        
          </React.Fragment>            
        ) }
        { currentStep === 1 && (
          <React.Fragment>
            <div className="w-full flex flex-col gap-3">
              <FormField
                control={form.control}
                name='agencyAddress'
                render={({field}) => (
                  <FormItem>
                    <FormControl className="-mb-1">
                      <InputWithIcon type='text' placeholder='address of agency' icon={HiOutlineMapPin} {...field} className='border rounded'/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='officeNumber'
                render={({field}) => (
                  <FormItem>
                    <FormControl className="-mb-1">
                      <InputWithIcon type='text' placeholder='office number' icon={HiOutlinePhone} {...field} className='border rounded'/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='agencyWebsite'
                render={({field}) => (
                  <FormItem>
                    <FormControl className="-mb-1">
                      <InputWithIcon type='text' placeholder='agency website' icon={HiLink} {...field} className='border rounded'/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='agentInspectionFee'
                render={({field}) => (
                  <FormItem>
                    <FormControl className="-mb-1">
                      <InputWithIcon type='text' placeholder='agent inspection fee per hour' icon={HiOutlineWallet} {...field} className='border rounded'/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
          </React.Fragment>      
        ) }
        { currentStep === 2 && (
          <React.Fragment>
            <div className="w-full flex flex-col gap-3">
              <FormField
                control={form.control}
                name='agentBio'
                render={({field}) => (
                  <FormItem>
                    <FormControl className="-mb-1">
                      <Textarea placeholder="add your bio (short words to describe you to your clients)" className="border rounded focus-visible:ring-0 focus-visible:ring-none focus-visible:ring-offset-0 outline-none sm:text-base text-sm resize-none min-h-[250px]" {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
          </React.Fragment>      
        ) }
        <div className="mt-3 flex items-center justify-between">
          { currentStep > 0 && <Button className="rounded" type="button" onClick={previousStep}>Previous</Button> }
          { currentStep === 2 ?   
            <LoadingButton loading={isLoading} disabled={isLoading} className="rounded" type="submit">
              { isLoading ? 'Submitting...' : 'Submit' }
            </LoadingButton> : 
            <Button className="rounded" type="button" onClick={nextStep}>Next</Button>
          }
        </div>
      </form>
    </Form>
  )
}

export default AgentMultiStepForm;