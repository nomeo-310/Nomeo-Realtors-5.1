import React from 'react'
import { Metadata } from 'next';
import Footer from '@/app/components/footer/Footer';
import { getCurrentUser } from '@/lib/actions/user-actions';
import ForSale from './components/ForSale';

type pageProps = {
  searchParams: {
    [key: string]: string | undefined
  }
}

export const metadata: Metadata = {
  title: "For Sale",
};

const page = async ({searchParams}:pageProps) => {
  const user = await getCurrentUser();
  return (
    <React.Fragment>
      <ForSale searchParams={searchParams} user={user}/>
      <Footer/>
    </React.Fragment>
  )
}

export default page