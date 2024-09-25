import React from 'react'
import { Metadata } from 'next';
import Contact from './components/Contact';
import Footer from '@/app/components/footer/Footer';

export const metadata: Metadata = {
  title: "Contact Us",
};

type Props = {}

const page = (props: Props) => {
  return (
    <React.Fragment>
      <Contact/>
      <Footer/>
    </React.Fragment>
  )
}

export default page