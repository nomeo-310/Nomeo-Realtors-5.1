import React from 'react'
import { Metadata } from 'next';
import { getSingleProperty } from '@/lib/actions/properties-actions';
import Property from '../components/Property';
import { getCurrentUser } from '@/lib/actions/user-actions';
import Footer from '@/app/components/footer/Footer';

interface pageProps {
  params: {propertyId: string}
}

export const metadata: Metadata = {
  title: "Property",
};

const page = async ({params}: pageProps) => {

const property = await getSingleProperty(params.propertyId);
const user = await getCurrentUser();

  return (
    <React.Fragment>
      <Property user={user} property={property}/>;
      <Footer />
    </React.Fragment>
  )
}

export default page;