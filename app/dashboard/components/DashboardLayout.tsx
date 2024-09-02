'use client'

import Container from '@/components/shared/Container';
import React from 'react';
import DashboardMenu from './DashboardMenu';
import { userProps } from '@/lib/types';
import { useRouter } from 'next/navigation';

type layoutProps = {
  children: React.ReactNode
  user: userProps
  activeTab:string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
};

const DashboardLayout = ({children, user, activeTab, setActiveTab}:layoutProps) => {
  const router = useRouter();
  
  const agentLoggedIn = user?.role === 'agent';

  React.useEffect(() => {
    if (!agentLoggedIn) {
      router.push('/')
    }
  }, []);
  
  return (
    <Container className='pt-24 lg:pt-28 flex md:gap-5 lg:gap-7 gap-3.5 min-h-screen'>
      <div className="sticky top-[78px] h-full lg:w-[22%] md:w-[32%] flex flex-col gap-2 w-[10.5%]">
        <DashboardMenu agentLoggedIn={agentLoggedIn} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className='lg:w-[78%] md:w-[68%] w-[89.5%]'>
        {children}
      </div>
    </Container>
  );
} 

export default DashboardLayout;
