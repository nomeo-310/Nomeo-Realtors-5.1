'use client'

import Container from '@/components/shared/Container';
import React from 'react'
import SearchForm from './SearchForm';
import AllSale from './AllSale'
import { HiArrowUturnLeft } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import { userProps } from '@/lib/types';

type pageProps = {
  searchParams: {[key: string]: string | undefined};
  user: userProps
}

const ForSale = ({searchParams, user}:pageProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Container className='pt-24 lg:pt-28 min-h-screen'>
      <React.Fragment>
        { searchParams.state ? 
          <div className="flex items-center justify-center lg:gap-6 gap-4">
            <div className="p-1 rounded cursor-pointer bg-primary text-white" onClick={() => router.push('/for-rent')}>
              <HiArrowUturnLeft className='size-4 lg:size-5'/>
            </div>
            <h2 className='lg:text-2xl text-xl'>Search result for {searchParams.state}, {searchParams.city}</h2>
          </div> :
          <h2 className="lg:text-2xl text-xl text-center">For Sale</h2>
        }
        <div className="flex md:gap-5 lg:gap-7 flex-col md:flex-row gap-3.5 mt-8">
          <div className="top-[78px] h-full lg:w-[24%] md:w-[30%] flex flex-col gap-2.5 md:sticky md:top-[78px]">
            <SearchForm isLoading={isLoading}/>
          </div>
          <div className='lg:w-[76%] md:w-[70%] w-full'>
            <AllSale searchParams={searchParams} user={user} setIsLoading={setIsLoading}/>
          </div>
        </div>
      </React.Fragment>
    </Container>
  )
}

export default ForSale