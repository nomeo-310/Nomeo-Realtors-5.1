'use client'

import React from 'react'
import { agentSignUpSchema, agentSignUpValues } from '@/lib/validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import InputWithIcon from '@/components/shared/InputWithIcon';
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlinePhone, HiOutlineUser } from 'react-icons/hi2';
import LoadingButton from '@/components/shared/LoadingButton';
import { useAgentSignUp, useLogin, useSignUp } from '@/lib/useModals';
import { createUser } from '@/lib/actions/user-actions';
import { useToast } from "@/components/ui/use-toast"


const AgentSignUpForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const { toast } = useToast();
  const loginUser = useLogin();
  const signUpUser = useSignUp();
  const signUpAgent = useAgentSignUp();

  const defaultSignupValues = {
    email: '',
    password: '',
    name: '',
    phoneNumber: ''
  };

  const form = useForm<agentSignUpValues>({
    resolver: zodResolver(agentSignUpSchema),
    defaultValues: defaultSignupValues
  });

  const onSubmitForm = async (values:agentSignUpValues) => {
    setIsLoading(true);
    const submitData = {...values, role: 'agent'}
    await createUser(submitData).then((response) => {
      if (response.error) {
        setIsLoading(false);
        return toast({
          variant: "destructive",
          title: 'Uh oh! Something went wrong.',
          description: response.error
        })
      };

      if (response.success) {
        setIsLoading(false);
        signUpAgent.onClose();
        return toast({
          variant: "success",
          title: 'This is looking good!',
          description: response.success
        })
      };
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className='flex flex-col md:gap-5 gap-4'>
        <FormField
          control={form.control}
          name='name'
          render={({field}) => (
            <FormItem>
              <FormControl>
                <InputWithIcon type='text' placeholder='full name e.g john doe' icon={HiOutlineUser} {...field} className='border rounded'/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({field}) => (
            <FormItem>
              <FormControl>
                <InputWithIcon type='email' placeholder='email address e.g johndoe@email.com' icon={HiOutlineEnvelope} {...field} className='border rounded'/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phoneNumber'
          render={({field}) => (
            <FormItem>
              <FormControl>
                <InputWithIcon type='text' placeholder='phone number e.g 0703...' icon={HiOutlinePhone} {...field} className='border rounded'/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({field}) => (
            <FormItem>
              <FormControl>
                <InputWithIcon type='password' placeholder='password' icon={HiOutlineLockClosed} {...field} className='border rounded'/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className='flex justify-end'>
          <LoadingButton type='submit' className='rounded lg:text-lg' size={'lg'} loading={isLoading}>
            <p className='text-base'>{isLoading ? 'Creating account...' : 'Create account'}</p>
          </LoadingButton>
        </div>
        <div className="flex flex-col gap-2">
          <p className='text-base'>
            Already have an account?
            <button onClick={() => {signUpAgent.onClose(), loginUser.onOpen()}} className='ml-1 underline' type='button'>
              Log in
            </button>
          </p>
          <p className='text-base'>
            Don&apos;t have an account yet? 
            <button onClick={() => {signUpAgent.onClose(), signUpUser.onOpen()}} className='ml-1 underline' type='button'>
              Create one
            </button>
          </p>
        </div>
      </form>
    </Form>
  )
};

export default AgentSignUpForm