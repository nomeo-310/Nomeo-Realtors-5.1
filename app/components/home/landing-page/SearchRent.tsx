'use client'

import React from 'react'
import { CustomSelect } from './CustomSelect'
import { getNigerianLgas, getNigerianStates } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const SearchRent = () => {
  const router = useRouter();

  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [minimumRent, setMinimumRent] = React.useState(0);
  const [maximumRent, setMaximumRent] = React.useState(0);

  const nigerianStates = getNigerianStates();
  const localGovernmentAreas = getNigerianLgas(state);

  const handleSearch = () => {
    if (!state || !city || minimumRent === 0 || maximumRent === 0) {
      return;
    }

    const newUrl = `/for-rent?state=${state}&city=${city}&minimumRent=${minimumRent}&maximumRent=${maximumRent}`;
    router.push(newUrl)
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
            placeholder='Enter minimum rent...'
            value={minimumRent || ''}
            onChange={(evt) => setMinimumRent(parseInt(evt.target.value) || 0)}
          />
        </div>
        <div className="md:w-[236px] w-[316px]">
          <Input className='outline-none focus-within:ring-0 focus-visible:ring-0 focus:outline-0 rounded text-base'
            placeholder='Enter maximum rent...'
            value={maximumRent || ''}
            onChange={(evt) => setMaximumRent(parseInt(evt.target.value) || 0)}
          />
        </div>
        <div className="grow">
          <Button className='w-full rounded' onClick={handleSearch}>
            <p className='text-base'>Search for rentable apartments</p>
          </Button>
        </div>
      </div>
    </div>
  )
};

export default SearchRent;