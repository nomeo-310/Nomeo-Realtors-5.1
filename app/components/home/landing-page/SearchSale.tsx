'use client'

import React from 'react'
import { CustomSelect } from './CustomSelect'
import { getNigerianLgas, getNigerianStates } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const SearchSale = () => {
  const router = useRouter();

  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [minimumPrice, setMinimumPrice] = React.useState(0);
  const [maximumPrice, setMaximumPrice] = React.useState(0);

  const nigerianStates = getNigerianStates();
  const localGovernmentAreas = getNigerianLgas(state);

  const handleSearch = () => {
    if (!state || !city || minimumPrice === 0 || maximumPrice === 0) {
      return;
    }

    const newUrl = `/for-sale?state=${state}&city=${city}&minimumPrice=${minimumPrice}&maximumPrice=${maximumPrice}`;
    router.push(newUrl);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className='w-full flex md:flex-wrap flex-col flex-nowrap md:flex-row gap-3'>
        <CustomSelect 
          name='state'
          value={state}
          setValue={setState}
          stringArray={nigerianStates}
        />
        <CustomSelect 
          name='city'
          value={city}
          setValue={setCity}
          stringArray={localGovernmentAreas}
        />
        <div className="md:w-[236px] w-[316px]">
          <Input className='outline-none focus-within:ring-0 focus-visible:ring-0 focus:outline-0 rounded text-base'
            placeholder='Enter minimum price...'
            value={minimumPrice || ''}
            onChange={(evt) => setMinimumPrice(parseInt(evt.target.value) || 0)}
          />
        </div>
        <div className="md:w-[236px] w-[316px]">
          <Input className='outline-none focus-within:ring-0 focus-visible:ring-0 focus:outline-0 rounded text-base'
            placeholder='Enter maximum price...'
            value={maximumPrice || ''}
            onChange={(evt) => setMaximumPrice(parseInt(evt.target.value) || 0)}
          />
        </div>
        <div className="grow">
          <Button className='w-full rounded' onClick={handleSearch}>
            <p className='text-base'>Search for sellable apartments</p>
          </Button>
        </div>
      </div>
    </div>
  )
};

export default SearchSale;