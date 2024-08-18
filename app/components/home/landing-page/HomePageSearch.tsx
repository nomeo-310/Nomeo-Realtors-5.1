import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import React from 'react'
import SearchRent from './SearchRent'
import SearchSale from './SearchSale'

type Props = {}

const HomePageSearch = (props: Props) => {
  return (
    <Tabs defaultValue="for-rent" className='p-3 bg-inherit'>
      <TabsList className='md:w-[250px] w-full flex mb-3'>
        <TabsTrigger value="for-rent"className='flex-1 rounded font-semibold'>FOR RENT</TabsTrigger>
        <TabsTrigger value="for-sale"className='flex-1 rounded font-semibold'>FOR SALE</TabsTrigger>
      </TabsList>
      <TabsContent value="for-rent" className='md:w-[733px] w-[316px]'>
        <SearchRent />
      </TabsContent>
      <TabsContent value="for-sale" className='md:w-[733px] w-[316px]'>
        <SearchSale />
      </TabsContent>
    </Tabs>
  )
}

export default HomePageSearch