import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
};

type Props = {}

const page = (props: Props) => {
  return (
    <div>settings page</div>
  )
}

export default page