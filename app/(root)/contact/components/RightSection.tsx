'use client'

import InputWithIcon from '@/components/shared/InputWithIcon';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { contactSchema, contactValues } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { HiAtSymbol, HiOutlineEnvelope, HiOutlinePhone, HiOutlineUser } from 'react-icons/hi2'
import emailjs from '@emailjs/browser';
import { useToast } from '@/components/ui/use-toast';
import LoadingButton from '@/components/shared/LoadingButton';

const RightSection = () => {
  const { toast } = useToast();
  const [isSending, setIsSending] = React.useState(false);

  const defaultContactValues = {
    fullName: '',
    email: '',
    message: '',
    phoneNumber: '',
    title: '',
  };

  const form = useForm<contactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: defaultContactValues
  });

  const submitForm = async (values:contactValues) => {

    const { fullName, title, message, email, phoneNumber } = values;

    const messageData = {
      name: fullName,
      title: title,
      message: `My phone number is ${phoneNumber} in case you want to reach me on my mobile. ` + message,
      email: email,
    };

      setIsSending(true);
      await emailjs
      .send(
        "service_b0nf99i",
        "template_7hxpoxh",
        messageData,
        "Z07lRblwfF0EUzty_",
      )
      .then((response) => {
        toast({
          variant: 'success',
          title: 'Success',
          description: 'Message sent successfully.'
        })
        form.reset();
      })
      .catch((error) => {
        console.log('Failed', error)
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to send message. Please try again later.'
        })
      })
      .finally(() => {
        setIsSending(false)
      })
  };

  return (
    <Form {...form}>
      <div className="h-full">
        <hr className='md:hidden mb-8'/>
        <form className="flex flex-col justify-between h-full" onSubmit={form.handleSubmit(submitForm)}>
          <div>
            <h2 className='mb-6 md:mb-8 text-2xl md:text-3xl lg:text-4xl font-semibold'>Send Us A Message</h2>
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name='fullName'
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <InputWithIcon 
                        type='text' 
                        placeholder='full name e.g john doe' 
                        icon={HiOutlineUser} 
                        {...field} className='border rounded'/>
                    </FormControl>
                    <FormMessage className='mt-2'/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <InputWithIcon 
                        type='email' 
                        placeholder='enter your email e.g youremail@email.com' 
                        icon={HiOutlineEnvelope} 
                        {...field} 
                        className='border rounded'
                      />
                    </FormControl>
                    <FormMessage className='mt-2'/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='title'
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <InputWithIcon 
                        type='text' 
                        placeholder='enter title of message' 
                        icon={HiAtSymbol} 
                        {...field} 
                        className='border rounded'
                      />
                    </FormControl>
                    <FormMessage className='mt-2'/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <InputWithIcon 
                        type='text' 
                        placeholder='enter your phone number e.g +23412345678910' 
                        icon={HiOutlinePhone} 
                        {...field} 
                        className='border rounded'
                      />
                    </FormControl>
                    <FormMessage className='mt-2'/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='message'
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className='h-48 bg-inherit rounded resize-none focus-visible:ring-0 focus-visible:ring-none focus-visible:ring-offset-0 outline-none'
                        placeholder='type your message here'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='mt-2'/>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className=''>
            <LoadingButton type='submit' className='rounded-md disabled:bg-neutral-500' loading={isSending} disabled={isSending}>
              <p className='sm:text-base text-sm'>{isSending ? '...Sending Message' : 'Send Message'}</p>
            </LoadingButton>
          </div>
        </form>
      </div>
    </Form>
  )
}

export default RightSection;