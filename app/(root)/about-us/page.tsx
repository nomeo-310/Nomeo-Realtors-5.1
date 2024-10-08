import React from 'react'
import { Metadata } from 'next';
import AboutUs from './components/AboutUs';
import Footer from '@/app/components/footer/Footer';

type Props = {}

export const metadata: Metadata = {
  title: "About Us",
};

const page = (props: Props) => {
  return (
    <React.Fragment>
      <AboutUs/>
      <Footer/>
    </React.Fragment>
  )
}

export default page