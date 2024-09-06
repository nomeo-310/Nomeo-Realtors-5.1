'use client'

import React from 'react'
import { propertyProps, userProps } from '@/lib/types';
import ImageAvatar from '@/components/shared/ImageAvatar';
import { useRouter } from 'next/navigation';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import CustomSelect from '@/components/shared/CustomSelect';
import InputWithIcon from '@/components/shared/InputWithIcon';
import { HiOutlinePhone } from 'react-icons/hi2';
import LoadingButton from '@/components/shared/LoadingButton';
import { useForm } from 'react-hook-form';
import { scheduleSchema, scheduleValues } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { createInspection } from '@/lib/actions/inspection-action';

type Props = {
  user:userProps;
  property: propertyProps
}

const AgentSection = ({user, property}: Props) => {

  const { toast } = useToast();                   

  const defaultScheduleValues = {
    date: undefined,
    time: '',
    additionalNumber: ''
  }

  const form = useForm<scheduleValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: defaultScheduleValues
  });

  const router = useRouter();
  const nairaSign:string = String.fromCodePoint(8358);

  const timeList = ['8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm']

  const [isLoading, setIsLoading] = React.useState(false);

  const AgentDetails = () => {
    return (
      <React.Fragment>
        <div className="my-4">
          <h2 className='text-xl lg:text-2xl'>Nearby Places</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {property.closestLandmarks.map((item, index:number) => (
              <p className='border rounded-full py-2 px-3 capitalize text-base' key={index}>{item.name}: {item.distanceAway} <span className='lowercase'>away</span></p>
            ))}
          </div>
        </div>
        <hr/>
        <div className="my-4">
          <h2 className='text-xl lg:text-2xl'>About Agent</h2>
          <div className="flex mt-3 gap-3 ">
            <div className='w-fit'>
              <ImageAvatar className={`md:size-24 size-16 rounded-full bg-gray-200 overflow-hidden ${property.agent.user.image === '' && 'border'}`} src={property.agent.user.image}/>
            </div>
            <div className='w-full'>
              <p className='capitalize text-base'>Name: {property.agent.user.name}</p>
              <p className='text-base'>Agency: {property.agent.agencyName}</p>
              <p className='text-base'>Inspection Fee: {nairaSign}{property.agent.agentInspectionFee.toLocaleString()} per hour.</p>
              <div className='w-full mt-3'>
                <div>
                  <button className='underline text-sm sm:text-base' onClick={() => router.push(`/profile/${property.agent.licenseNumber}`)}>Checkout profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        { user.role === 'user' && <hr/> }
      </React.Fragment>
    )
  };

  const onSubmit = async (value:scheduleValues) => {

    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You are not logged in, login to schedule property inspection.'
      })

      return;
    }

    const updatedValues = { ...value, agent: property.agent._id, property: property.propertyId };

    try {
      setIsLoading(true)
      await createInspection(updatedValues).then((response) => {
        if (response?.success) {
          setIsLoading(false)
          toast({
            variant: 'success',
            title: 'Success',
            description: response.success
          })
          form.reset();
        }
        if (response?.error) {
          setIsLoading(false)
          toast({
            variant: 'destructive',
            title: 'Error',
            description: response.error
          }) 
        }
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong, try again later.'
      })      
    }

    
  };

  const ScheduleInspection = () => {
    return (
      <React.Fragment>
        <Form {...form}>
          <form className="my-4" onSubmit={form.handleSubmit(onSubmit)}>
            <h2 className='text-xl lg:text-2xl'>Schedule Inspection</h2>
            <div className="flex flex-col gap-3">
              <div className="flex mt-3 gap-3 flex-col md:flex-row">
                <div className="lg:w-3/5 md:w-3/4 w-full">
                  <FormField
                    control={form.control}
                    name='date'
                    render={({field}) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal rounded bg-inherit h-12 text-base",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 size-5" />
                                {field.value ? format(field.value, "PPP") : <span className='text-base'>Select date</span>}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 rounded lg:text-lg text-base">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              className=''
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage/>
                      </FormItem>
                    )}
                  >
                  </FormField>
                </div>
                <div className='rounded lg:w-2/5 md:w-1/4 w-full'>
                  <FormField
                    control={form.control}
                    name='time'
                    render={({field}) => (
                      <FormItem>
                        <FormControl>
                          <CustomSelect 
                            data={timeList}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder='Select time'
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  >
                  </FormField>
                </div>
              </div>
              <FormField
                control={form.control}
                name='additionalPhoneNumber'
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <InputWithIcon placeholder='additional phone number' icon={HiOutlinePhone} className='border rounded' {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              >
              </FormField>
            </div>
            <div className='mt-8 flex items-center justify-end'>
              <LoadingButton loading={isLoading} disabled={isLoading} className='rounded'>
                <p className='text-base'>Schedule Inspection</p>
              </LoadingButton>
            </div>
          </form>
        </Form>
      </React.Fragment>
    )
  };

  return (
    <div className="md:w-[50%] lg:w-[45%] w-full md:border-l md:pl-4">
      <AgentDetails/>
      { user.role === 'user' && <ScheduleInspection /> }
    </div>
  )
}

export default AgentSection
