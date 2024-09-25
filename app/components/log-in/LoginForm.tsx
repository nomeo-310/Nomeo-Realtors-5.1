'use client'

import React from 'react'
import { logInSchema, logInValues } from '@/lib/validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import InputWithIcon from '@/components/shared/InputWithIcon';
import { HiOutlineEnvelope, HiOutlineLockClosed } from 'react-icons/hi2';
import LoadingButton from '@/components/shared/LoadingButton';
import { useAgentSignUp, useLogin, useSignUp } from '@/lib/useModals';
import { signIn } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast';


const LoginForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  
  const { toast } = useToast();
  const loginUser = useLogin();
  const signUpUser = useSignUp();
  const signUpAgent = useAgentSignUp();

  const defaultLoginValues = {
    email: '',
    password: ''
  };

  const form = useForm<logInValues>({
    resolver: zodResolver(logInSchema),
    defaultValues: defaultLoginValues
  });

  const onSubmitForm = async (values:logInValues) => {
    setIsLoading(true)
    signIn("credentials", {...values, redirect: false})
    .then((callback) => {
      if (callback?.ok) {
        setIsLoading(false);
        loginUser.onClose();
        window.location.reload();
        return toast({
          variant: "success",
          title: 'Success',
          description: 'Login was successful'
        });
      };

      if (callback?.error) {
        setIsLoading(false);
        return toast({
          variant: "destructive",
          title: 'Error',
          description: callback.error
        })
      };
      
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className='flex flex-col md:gap-5 gap-4'>
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
            <p className='sm:text-base text-sm'>{isLoading ? 'Logging in...' : 'Log In'}</p>
          </LoadingButton>
        </div>
        <div className="flex flex-col gap-2">
          <p className='sm:text-base text-sm'>
            Don&apos;t have an account yet?
            <button onClick={() => {loginUser.onClose(), signUpUser.onOpen()}} className='ml-1 underline' type='button'>
              Create one
            </button>
          </p>
          <p className='sm:text-base text-sm'>
            Interested in being an agent? 
            <button onClick={() => {loginUser.onClose(), signUpAgent.onOpen()}} className='ml-1 underline' type='button'>
              Register here
            </button>
          </p>
        </div>
      </form>
    </Form>
  )
}

export default LoginForm