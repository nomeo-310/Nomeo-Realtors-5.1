import React from 'react'
import { Metadata } from 'next';
import ForRent from './components/ForRent';
import Footer from '@/app/components/footer/Footer';
import { getCurrentUser } from '@/lib/actions/user-actions';

type pageProps = {
  searchParams: {
    [key: string]: string | undefined
  }
}

export const metadata: Metadata = {
  title: "For Rent",
};

const page = async ({searchParams}:pageProps) => {
  const user = await getCurrentUser();

  return (
    <React.Fragment>
      <ForRent searchParams={searchParams} user={user}/>
      <Footer/>
    </React.Fragment>
  )
}

export default page