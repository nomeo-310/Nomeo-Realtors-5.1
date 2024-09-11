'use client'

import React from 'react'
import Container from '@/components/shared/Container';
import { propertyProps, userProps } from '@/lib/types';
import Header from './Header';
import ImageGrid from './ImageGrid';
import FeaturesAndFees from './FeaturesAndFees';
import AgentSection from './AgentSection';
import ImageSlider from './ImageSlider';

type Props = {
  user: userProps;
  property: propertyProps
}

const Property = ({user, property}: Props) => {
  const [openImageSlider, setOpenImageSlider] = React.useState(false);

  return (
    <Container className='pt-20 pb-8 lg:pb-8'>
      <Header user={user} property={property}/>
      <ImageGrid property={property} setOpenSlider={setOpenImageSlider}/>
      <hr/>
      <React.Fragment>
        <div className="my-4">
          <h2 className='text-xl lg:text-2xl'>Property Overview</h2>
          <p className='mt-3 text-base'>{property.description}</p>
        </div>
        <hr/>
        <div className="flex flex-col md:flex-row">
          <FeaturesAndFees user={user} property={property}/>
          <AgentSection user={user} property={property}/>
        </div>
      </React.Fragment>
      {openImageSlider && <ImageSlider property={property} setOpenSlider={setOpenImageSlider}/>}
    </Container>
  )
}

export default Property;