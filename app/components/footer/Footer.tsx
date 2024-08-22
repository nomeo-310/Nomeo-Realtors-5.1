import Container from '@/components/shared/Container'
import React from 'react'
import FooterTop from './FooterTop'
import FooterBottom from './FooterBottom'

const Footer = () => {
  return (
    <div className='bg-primary'>
      <Container className='lg:pt-20 pt-16 '>
        <FooterTop/>
        <hr className='border-white'/>
        <FooterBottom/>
      </Container>
    </div>
  )
}

export default Footer