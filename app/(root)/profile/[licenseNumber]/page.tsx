import React from 'react'
import { Metadata } from 'next';
import Profile from '../components/Profile';
import { getAgent } from '@/lib/actions/user-actions';

interface pageProps {
  params: {licenseNumber: string}
}

export const metadata: Metadata = {
  title: "Profile",
};

const page = async ({params}: pageProps) => {
  const agent = await getAgent(params.licenseNumber);

  return <Profile agent={agent}/>
};

export default page