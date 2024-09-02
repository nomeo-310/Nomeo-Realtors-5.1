'use client'

import CustomSelect from '@/components/shared/CustomSelect';
import InputWithIcon from '@/components/shared/InputWithIcon';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { addPropertySchema, addPropertyValues } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { HiAtSymbol, HiOutlineCreditCard, HiOutlineMapPin, HiOutlineSquaresPlus, HiOutlineStar, HiOutlineXCircle, HiPlus, HiXMark } from 'react-icons/hi2';
import { PiBathtub, PiBed, PiMapPinArea, PiToilet } from 'react-icons/pi'
import { CldUploadWidget } from 'next-cloudinary'
import { LucideImagePlus } from 'lucide-react';
import Image from 'next/image';
import { deleteCloudinaryImages } from '@/lib/actions/deleteProfileImage';
import { cn, getNigerianLgas, getNigerianStates } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/shared/LoadingButton';
import { createProperty } from '@/lib/actions/properties-actions';

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
};

type imageProps = {
  public_id:string;
  secure_url:string;
};

type feesProps = {
  name: string;
  amount: number;
};

type landmarkProps = {
  name: string;
  distanceAway: string;
};

const AddProperty = ({setActiveTab}: Props) => {

  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const defaultLoginValues = {
    title: '',
    address: '',
    propertyTag: '',
    furnitureStatus: '',
    description: '',
    city: '', 
    state: '',
    numberOfRooms: parseInt(0 || ''),
    numberOfBath: parseInt(0 || ''),
    numberOfToilets: parseInt(0 || ''),
    area: parseInt(0 || ''),
  };

  const form = useForm<addPropertyValues>({
    resolver: zodResolver(addPropertySchema),
    defaultValues: defaultLoginValues
  });

  const watchedState = form.watch('state');
  const watchedPropertyTag = form.watch('propertyTag')

  const nigerianStates = getNigerianStates();
  const localGovernmentAreas = getNigerianLgas(watchedState);
  const maxAmenities = 10;

  const nairaSign:string = String.fromCodePoint(8358);

  const [uploadedImages, setUploadedImages] = React.useState<imageProps[]>([]);

  const [mainAmenity, setMainAmenity] = React.useState('');
  const [mainAmenities, setMainAmenities] = React.useState<string[]>([]);

  const [optionalAmenity, setOptionalAmenity] = React.useState('');
  const [optionalAmenities, setOptionalAmenities] = React.useState<string[]>([]);

  const [mainFeeName, setMainFeeName] = React.useState('');
  const [mainFeeAmount, setMainFeeAmount] = React.useState(0);
  const [mainFees, setMainFees] = React.useState<feesProps[]>([]);

  const [optionalFeeName, setOptionalFeeName] = React.useState('');
  const [optionalFeeAmount, setOptionalFeeAmount] = React.useState(0);
  const [optionalFees, setOptionalFees] = React.useState<feesProps[]>([]);

  const [landmarkName, setLandmarkName] = React.useState('');
  const [distanceAway, setDistanceAway] = React.useState('');
  const [closestLandmarks, setClosestLandmarks] = React.useState<landmarkProps[]>([]);

  const [annualRent, setAnnualRent] = React.useState(0);
  const [monthlyRent, setMonthRent] = React.useState(0);
  const [fullPropertyPrice, setFullPropertyPrice] = React.useState(0);
  const [annualPayment, setAnnualPayment] = React.useState(0);


  const uploadOptions = {
    cloudName:process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
    multiple:true,
    maxFiles:16,
    uploadPreset: 'apartmentImages',
  };

  const handleUploadPropertyImages = (result:{info?: any}) => {
    const images = Array.isArray(result.info) ? result.info : [result.info];

    const newImage = images.map((image) => ({
      public_id: image.public_id as string,
      secure_url: image.secure_url as string,
    }));
    setUploadedImages((prevImages) => [...prevImages, ...newImage]);
  };

  const handleDeleteImages = async(publicId:string) => {
    try {
      deleteCloudinaryImages(publicId);
      const newImages = uploadedImages.filter((item) => item.public_id !== publicId);
      setUploadedImages(newImages);
    } catch (error) {
      return;
    }
  };

  const moveImageToFirst = (array:imageProps[], id: string) => {
    const index = array.findIndex((item) => item.public_id === id);

    if (index < 0 || index >= array.length) {
      return array;
    };

    const itemToMove = array.splice(index, 1);
    const remainingItems = array;
    const newArray = itemToMove.concat(remainingItems)
  
    return newArray;
  };

  const moveImageFirst = (id:string) => {
    const newRenderedUploadedImages = moveImageToFirst(uploadedImages, id);
    setUploadedImages(newRenderedUploadedImages);
  };

  const ImageHolder = ({public_id, secure_url, index}:{public_id:string, secure_url:string, index:number}) => {
    return (
      <div className="rounded bg-gray-200 overflow-hidden relative cursor-pointer group">
        <Image src={secure_url} priority alt={`preview-image_${index}`} className='size-fit object-cover text-sm bg-black/40' width={500} height={600}/>
        <div className="w-full bg-black/40 absolute left-0 top-0 w-full h-full z-10 text-white flex flex-col items-end justify-end p-2 opacity-0 group-hover:opacity-100">
          <div className="flex justify-between w-full">
            <HiOutlineStar size={32} onClick={() => moveImageFirst(public_id)} className={cn('', index === 0 && 'fill-primary text-primary')}/>
            <HiOutlineXCircle size={32} onClick={() => handleDeleteImages(public_id)}/>
          </div>
        </div>
      </div>
    )
  };

  const createMainAmenities = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();

      if (mainAmenities.length < maxAmenities) {
        if (!mainAmenities.includes(mainAmenity) && mainAmenity.length > 0) {
          setMainAmenities([...mainAmenities, mainAmenity])
        } 
        setMainAmenity('');
      } else {
        toast({
          title:'Maximum number of amenities',
          description:'You have gotten to maximum number of amenities, to add more remove some.',
          variant: 'destructive'
        })
        return;
      };
    };
  };

  const createOptionalAmenities = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();

      if (optionalAmenities.length < maxAmenities) {
        if (!optionalAmenities.includes(optionalAmenity) && optionalAmenity.length > 0) {
          setOptionalAmenities([...optionalAmenities, optionalAmenity])
        } 
        setOptionalAmenity('');
      } else {
        toast({
          title:'Maximum number of amenities',
          description:'You have gotten to maximum number of amenities, to add more remove some.',
          variant: 'destructive'
        })
        return;
      };
    };
  };

  const createMainFees = React.useCallback(() => {
    const singleMainFee = { name: mainFeeName, amount: mainFeeAmount };

    if (mainFeeName && mainFeeAmount || mainFeeName !== '' && mainFeeAmount !== 0) {
      setMainFees([...mainFees, singleMainFee].filter((item) => item.amount !== 0));
      setMainFeeName('');
      setMainFeeAmount(0);
    }
    return;
  },[mainFees, mainFeeAmount, mainFeeName]);

  const createOptionalFees = React.useCallback(() => {
    const singleOptionalFee = { name: optionalFeeName, amount: optionalFeeAmount };

    if (optionalFeeName && optionalFeeAmount || optionalFeeName !== '' && optionalFeeAmount !== 0) {
      setOptionalFees([...optionalFees, singleOptionalFee].filter((item) => item.amount !== 0));
      setOptionalFeeName('');
      setOptionalFeeAmount(0);
    }
    return;
  },[optionalFees, optionalFeeAmount, optionalFeeName]);

  const createClosestLandmarks = React.useCallback(() => {
    const singleClosestLandmark = { name: landmarkName, distanceAway: distanceAway }

    if (landmarkName && distanceAway || landmarkName !== '' && distanceAway !== '') {
      setClosestLandmarks([...closestLandmarks, singleClosestLandmark].filter((item) => item.distanceAway !== ''));
      setLandmarkName('')
      setDistanceAway('');
    }
    return;
  },[closestLandmarks, distanceAway, landmarkName])

  const removeMainAmenity = (value:string) => {
    const renderedAmenities = mainAmenities.filter((item) => item !== value);
    setMainAmenities(renderedAmenities)
  };

  const removeOptionalAmenity = (value:string) => {
    const renderedAmenities = optionalAmenities.filter((item) => item !== value);
    setOptionalAmenities(renderedAmenities)
  };

  const removeSingleMainFee = (value:string) => {
    const renderedMainFees = mainFees.filter((item) => item.name !== value);
    setMainFees(renderedMainFees);
  };

  const removeSingleOptionalFee = (value:string) => {
    const renderedOptionalFees = optionalFees.filter((item) => item.name !== value);
    setOptionalFees(renderedOptionalFees);
  };

  const removeLandmark = (value:string) => {
    const renderedLandmarks = closestLandmarks.filter((item) => item.name !== value);
    setClosestLandmarks(renderedLandmarks)
  };

  const onSubmitForm = async (values: addPropertyValues) => {

    if (uploadedImages.length < 1) {
      toast({
        title: 'No apartment images',
        description: 'Upload the apartment images, it is necessary',
        variant: 'destructive'
      });
      return;
    };

    if (watchedPropertyTag === 'for-rent' && annualRent === 0 || '') {
      toast({
        title: 'No annual rent',
        description: 'Include the annual rent, it is necessary',
        variant: 'destructive'
      });
      return;
    }

    if (watchedPropertyTag === 'for-sale' && fullPropertyPrice === 0 || '') {
      toast({
        title: 'No property price',
        description: 'Include the full price of property, it is necessary',
        variant: 'destructive'
      });
      return;
    }

    if (mainAmenities.length < 1) {
      toast({
        title: 'No main amenities',
        description: 'Add main amenities at least 5 and maximum of 10',
        variant: 'destructive'
      });
      return;
    };

    if (mainFees.length < 1) {
      toast({
        title: 'No main fees',
        description: 'Add main fess related to the apartments',
        variant: 'destructive'
      });
      return;
    };

    if (closestLandmarks.length < 1) {
      toast({
        title: 'No close landmarks',
        description: 'Add some close landmarks at least 5 and maximum of 10',
        variant: 'destructive'
      });
      return;
    };

    setIsLoading(true);
    const updatedValues = {...values, images: uploadedImages, mainAmenities: mainAmenities, closestLandmarks: closestLandmarks, mainFees: mainFees, optionalFees: optionalFees, annualRent: annualRent, monthlyRent: monthlyRent, fullPropertyPrice: fullPropertyPrice, annualPayment: annualPayment, optionalAmenities: optionalAmenities }
    await createProperty(updatedValues).then((response) => {
      if (response.success) {
        setIsLoading(false);
        toast({
          variant: "success",
          title: 'Success',
          description: 'Property successfully created!'
        });
        setActiveTab('added-properties')
      };

      if (response.error) {
        setIsLoading(false);
        return toast({
          variant: "destructive",
          title: 'Uh oh! Something went wrong.',
          description: response.error
        })
      };
    })
  };


  return (
    <div className='w-full h-full flex slide-in-left'>
      <Form {...form}>
        <form className="flex flex-col lg:gap-4 gap-3 w-full lg:w-[85%] xl:w-[75%]" onSubmit={form.handleSubmit(onSubmitForm)}>
          <div className='flex gap-4 lg:gap-6 cursor-pointer'>
            <h2 className='text-xl md:text-3xl font-semibold'>Add Property</h2>
            <h2 className='text-xl md:text-3xl font-semibold text-gray-400' onClick={() =>setActiveTab('added-properties')}>Added Properties</h2>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className='text-xl md:text-2xl mb-2'>Property Description</h2>
            <FormField
              control={form.control}
              name='title'
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <InputWithIcon
                      {...field}
                      type='text'
                      icon={HiAtSymbol}
                      placeholder='title of property description'
                      className='border rounded'
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address'
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <InputWithIcon
                      {...field}
                      type='text'
                      icon={HiOutlineMapPin}
                      placeholder='full address of property'
                      className='border rounded'
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              <FormField
                control={form.control}
                name='propertyTag'
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <CustomSelect
                        data={['for-rent', 'for-sale']}
                        placeholder='Select property tag'
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='furnitureStatus'
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <CustomSelect
                        data={['furnished', 'not-furnished']}
                        placeholder='Select furniture status'
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='description'
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='describe the property (keep it simple and short)'
                      className='text-base h-[12rem] resize-none rounded border bg-inherit placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none focus-visible:ring-offset-0'
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <hr/>
            <h2 className='text-xl md:text-2xl mb-2'>Property Images</h2>
            <div className="flex flex-col gap-2 w-full">
              <CldUploadWidget options={uploadOptions} onSuccess={handleUploadPropertyImages}>
                {({ open }) => {
                  return (
                    <div onClick={() => open?.()} className="w-full h-[12rem] md:h-[15rem] border rounded flex items-center justify-center flex-col lg:text-lg cursor-pointer p-4">
                      <LucideImagePlus size={100} className='lg:block hidden'/>
                      <LucideImagePlus size={80} className='hidden md:block lg:hidden'/>
                      <LucideImagePlus size={60} className='md:hidden'/>
                      <span className='text-gray-400'>Add images of the property, not more than 16.</span>
                    </div>
                  )
                }}
              </CldUploadWidget>
              { uploadedImages.length > 0 &&
              <React.Fragment>
                <div className="w-full h-auto columns-2 md:columns-4 lg:columns-5 space-y-2 mx-auto gap-2">
                  { uploadedImages.map((item, index:number) => (
                    <ImageHolder key={index} secure_url={item.secure_url} public_id={item.public_id} index={index}/>
                  ))}
                </div>
              </React.Fragment> }
            </div>
            <hr/>
            <h2 className='text-xl md:text-2xl mb-2'>Property Details</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
              <FormField
                control={form.control}
                name='state'
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <CustomSelect
                        data={nigerianStates}
                        placeholder='Select the state of location'
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='city'
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <CustomSelect
                        data={localGovernmentAreas}
                        placeholder='Select local govt. area'
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            { watchedPropertyTag === 'for-rent' ?
              (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                  <InputWithIcon
                    type='number'
                    value={annualRent || ''}
                    icon={HiOutlineCreditCard}
                    placeholder={`annual rent (${nairaSign})`}
                    className='border rounded'
                    onChange={(e) => setAnnualRent(parseInt(e.target.value) || 0)}
                  />
                  <InputWithIcon
                    type='number'
                    value={monthlyRent || ''}
                    icon={HiOutlineCreditCard}
                    placeholder={`monthly rent (${nairaSign})`}
                    className='border rounded'
                    onChange={(e) => setMonthRent(parseInt(e.target.value) || 0)}
                  />
                </div>
              ) : watchedPropertyTag === 'for-sale' ? (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                  <InputWithIcon
                    type='number'
                    value={fullPropertyPrice || ''}
                    icon={HiOutlineCreditCard}
                    placeholder={`full price (${nairaSign})`}
                    className='border rounded'
                    onChange={(e) => setFullPropertyPrice(parseInt(e.target.value) || 0)}
                  />
                  <InputWithIcon
                    type='number'
                    value={annualPayment || ''}
                    icon={HiOutlineCreditCard}
                    placeholder={`least annual payment (${nairaSign})`}
                    className='border rounded'
                    onChange={(e) => setAnnualPayment(parseInt(e.target.value) || 0)}
                  />
                </div>
              ) : ''
            }
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name='numberOfRooms'
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <InputWithIcon
                        {...field}
                        type='number'
                        icon={PiBed}
                        placeholder='no of rooms'
                        className='border rounded'
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />            
              <FormField
                control={form.control}
                name='numberOfBath'
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <InputWithIcon
                        {...field}
                        type='number'
                        icon={PiBathtub}
                        placeholder='no of baths'
                        className='border rounded'
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />            
              <FormField
                control={form.control}
                name='numberOfToilets'
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <InputWithIcon
                        {...field}
                        type='number'
                        icon={PiToilet}
                        placeholder='no of toilets'
                        className='border rounded'
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />            
              <FormField
                control={form.control}
                name='area'
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <InputWithIcon
                        {...field}
                        type='number'
                        icon={PiMapPinArea}
                        placeholder='area in sqft'
                        className='border rounded'
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />            
            </div>
            <hr/>
            <h2 className='text-xl md:text-2xl mb-2'>Main Ameninities</h2>
            <InputWithIcon
              placeholder='enter names of amenities and separate with a comma'
              onChange={(e) => setMainAmenity(e.target.value)}
              icon={HiOutlineSquaresPlus}
              onKeyDown={createMainAmenities}
              className='border rounded'
              value={mainAmenity}
            />
            <div className='flex flex-wrap gap-1 md:gap-2 mt-1'>
              {mainAmenities.length > 0 && mainAmenities.map((item:string, index:number) => (
                <div key={index} className='capitalize border text-base py-2 px-4 rounded-full flex items-center md:gap-3 gap-2'>
                  {item}
                  <HiXMark size={24} onClick={() =>removeMainAmenity(item)} className='cursor-pointer hidden lg:block'/>
                  <HiXMark size={22} onClick={() =>removeMainAmenity(item)} className='cursor-pointer lg:hidden'/>
                </div>
              ))}
            </div>
            <hr/>
            <h2 className='text-xl md:text-2xl mb-2'>Optional Ameninities</h2>
            <InputWithIcon
              placeholder='enter names of amenities and separate with a comma'
              onChange={(e) => setOptionalAmenity(e.target.value)}
              icon={HiOutlineSquaresPlus}
              onKeyDown={createOptionalAmenities}
              className='border rounded'
              value={optionalAmenity}
            />
            <div className='flex flex-wrap gap-1 md:gap-2 mt-1'>
              {optionalAmenities.length > 0 && optionalAmenities.map((item:string, index:number) => (
                <div key={index} className='capitalize border text-base py-2 px-4 rounded-full flex items-center md:gap-3 gap-2'>
                  {item}
                  <HiXMark size={24} onClick={() =>removeOptionalAmenity(item)} className='cursor-pointer hidden lg:block'/>
                  <HiXMark size={22} onClick={() =>removeOptionalAmenity(item)} className='cursor-pointer lg:hidden'/>
                </div>
              ))}
            </div>
            <hr/>
            <h2 className='text-xl md:text-2xl mb-2'>Main Fees</h2>
            <div className="flex flex-col gap-2">
              <div className="grid gap-3 grid-cols-2">
                <InputWithIcon
                  type='text'
                  placeholder='name'
                  value={mainFeeName}
                  icon={HiAtSymbol}
                  onChange={(e) => setMainFeeName(e.target.value)}
                  className='border rounded'
                />
                <InputWithIcon
                  type='number'
                  placeholder={`amount (${nairaSign})`}
                  value={mainFeeAmount || ''}
                  icon={HiOutlineCreditCard}
                  onChange={(e) => setMainFeeAmount(parseInt(e.target.value) || 0)}
                  className='border rounded'
                />
              </div>
              <div className='flex items-center justify-end'>
                <Button className='py-2 px-4 md:px-6 flex items-center gap-2 mt-1 justify-end rounded-full text-base' type='button' onClick={createMainFees}>
                  <HiPlus size={24}/>
                  { mainFees.length === 0 ? 'Add fee': 'Add more'}
                </Button>
              </div>
              <div className='flex flex-wrap gap-1 md:gap-2 mt-1'>
                { mainFees.length > 0 && mainFees.filter((item) => item.amount !== 0).map((item:feesProps, index:number) => (
                  <div key={index} className='border capitalize lg:py-2.5 py-2 px-4 rounded-full flex items-center md:gap-3 gap-2'>
                    {item.name}: {nairaSign}{item.amount.toLocaleString()}.00
                    <HiXMark size={24} onClick={() =>removeSingleMainFee(item.name)} className='cursor-pointer hidden lg:block'/>
                    <HiXMark size={22} onClick={() =>removeSingleMainFee(item.name)} className='cursor-pointer lg:hidden'/>
                  </div>
                ))}
              </div>
            </div>
            <hr/>
            <h2 className='text-xl md:text-2xl mb-2'>Optional Fees</h2>
            <div className="flex flex-col gap-2">
              <div className="grid gap-3 grid-cols-2">
                <InputWithIcon
                  type='text'
                  placeholder='name'
                  value={optionalFeeName}
                  icon={HiAtSymbol}
                  onChange={(e) => setOptionalFeeName(e.target.value)}
                  className='border rounded'
                />
                <InputWithIcon
                  type='number'
                  placeholder={`amount (${nairaSign})`}
                  value={optionalFeeAmount || ''}
                  icon={HiOutlineCreditCard}
                  onChange={(e) => setOptionalFeeAmount(parseInt(e.target.value) || 0)}
                  className='border rounded'
                />
              </div>
              <div className='flex items-center justify-end'>
                <Button className='text-base py-2 px-4 md:px-6 flex items-center gap-2 mt-1 justify-end rounded-full text-base' type='button' onClick={createOptionalFees}>
                  <HiPlus size={24}/>
                  { optionalFees.length === 0 ? 'Add fee': 'Add more'}
                </Button>
              </div>
              <div className='flex flex-wrap gap-1 md:gap-2 mt-1'>
                { optionalFees.length > 0 && optionalFees.filter((item) => item.amount !== 0).map((item:feesProps, index:number) => (
                  <div key={index} className='border capitalize lg:py-2.5 py-2 px-4 rounded-full flex items-center md:gap-3 gap-2'>
                    {item.name}: {nairaSign}{item.amount.toLocaleString()}.00
                    <HiXMark size={24} onClick={() =>removeSingleOptionalFee(item.name)} className='cursor-pointer hidden lg:block'/>
                    <HiXMark size={22} onClick={() =>removeSingleOptionalFee(item.name)} className='cursor-pointer lg:hidden'/>
                  </div>
                ))}
              </div>
            </div>
            <hr/>
            <h2 className='text-xl md:text-2xl mb-2'>Closest Landmarks</h2>
            <div className="flex flex-col gap-2">
              <div className="grid gap-3 grid-cols-2">
                <InputWithIcon
                  type='text'
                  placeholder='name'
                  value={landmarkName}
                  icon={HiAtSymbol}
                  onChange={(e) => setLandmarkName(e.target.value)}
                  className='border rounded'
                />
                <InputWithIcon
                  type='text'
                  placeholder='distance away (km)'
                  value={distanceAway}
                  icon={HiAtSymbol}
                  onChange={(e) => setDistanceAway(e.target.value)}
                  className='border rounded'
                />
              </div>
              <div className='flex items-center justify-end'>
                <Button className='text-base py-2 px-4 md:px-6 flex items-center gap-2 mt-1 justify-end rounded-full' type='button' onClick={createClosestLandmarks}>
                  <HiPlus size={24}/>
                  { optionalFees.length === 0 ? 'Add close landmark': 'Add more close landmarks'}
                </Button>
              </div>
              <div className='flex flex-wrap gap-1 md:gap-2 mt-1'>
                { closestLandmarks.length > 0 && closestLandmarks.filter((item) => item.distanceAway !== '').map((item:landmarkProps, index:number) => (
                  <div key={index} className='border capitalize lg:py-2.5 py-2 px-4 rounded-full flex items-center md:gap-3 gap-2 text-base'>
                    {item.name}: {item.distanceAway}
                    <HiXMark size={24} onClick={() =>removeLandmark(item.name)} className='cursor-pointer hidden lg:block'/>
                    <HiXMark size={22} onClick={() =>removeLandmark(item.name)} className='cursor-pointer lg:hidden'/>
                  </div>
                ))}
              </div>
            </div>
            <hr/>
          </div>
          <div className='mt-8 flex items-center'>
            <LoadingButton type='submit' disabled={isLoading} loading={isLoading} className='rounded-full text-base'>
              { isLoading ? 'Creating property...' : 'Create property' }
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddProperty;