'use client'

import React from 'react'
import Container from '@/components/shared/Container'
import Header from '../Header'
import FrequentlyAskedQuestion from './FrequentlyAskedQuestion'
import Link from 'next/link'
import { useAgentSignUp } from '@/lib/useModals'
import { userProps } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';

type Props = {
  user: userProps
}
const FrequentyAskedQuestions = ({user}:Props) => {

  const { toast } = useToast();
  const signUpAgent = useAgentSignUp();

  const handleClick = () => {
    if (user && user.role === 'agent') {
      toast({
        variant: 'default',
        title: 'Already an agent',
        description: 'You are already an agent and do not need to create an account'
      })

      return;
    };

    if (user && user.role === 'user') {
      toast({
        variant: 'default',
        title: 'Want to become an agent?',
        description: 'Go to your dashboard to convert to agent account'
      })

      return;
    };

    signUpAgent.onOpen();
  };

  return (
    <Container>
      <React.Fragment>
        <Header
          mainTitle='Frequently Asked Questions'
          subTitle='At Nomeo Suites, we understand that navigating the real estate market can bring up a lot of questions.  Whether you&apos;re a first-time homebuyer, a seasoned investor, or a curious renter, we&apos;re here to help!  We&apos;ve compiled a list of frequently asked questions to shed some light on the process and empower you to make informed decisions.'
        />
        <FrequentlyAskedQuestion/>
        <div className='mt-8 md:mt-10'>
          <p className='lg:text-xl text-lg'>Still have questions? Feel free to <Link href={'/contact-us'} className='text-primary underline'>Contact us</Link></p>
          <p className='lg:text-xl text-lg'>Are you interested in being one of our real estate agents? Go ahead and  <button className='text-primary underline' onClick={handleClick}>Create an account</button> with us.</p>
        </div>
      </React.Fragment>
    </Container>
  )
}

export default FrequentyAskedQuestions