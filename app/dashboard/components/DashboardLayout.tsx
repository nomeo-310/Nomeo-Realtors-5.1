'use client'

import Container from '@/components/shared/Container';
import React from 'react';
import DashboardMenu from './DashboardMenu';
import { userProps } from '@/lib/types';
import { useRouter } from 'next/navigation';
import Footer from '@/app/components/footer/Footer';

type layoutProps = {
  children: React.ReactNode
  user: userProps
};

const DashboardLayout = ({children, user}:layoutProps) => {
  const router = useRouter();
  
  const agentLoggedIn = user?.role === 'agent';

  React.useLayoutEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])
  
  return (
    <React.Fragment>
      <Container className='pt-24 lg:pt-28 flex md:gap-5 lg:gap-7 gap-3.5 min-h-screen'>
        <div className="sticky top-[78px] h-full lg:w-[22%] md:w-[32%] flex flex-col gap-2 w-[10.5%]">
          <DashboardMenu agentLoggedIn={agentLoggedIn} user={user}/>
        </div>
        <div className='lg:w-[78%] md:w-[68%] w-[89.5%]'>
          {children}
        </div>
      </Container>
      <Footer/>
    </React.Fragment>
  );
} 

export default DashboardLayout;
