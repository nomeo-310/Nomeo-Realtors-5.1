'use client'

import CustomSelect from '@/components/shared/CustomSelect';
import InputWithIcon from '@/components/shared/InputWithIcon';
import LoadingButton from '@/components/shared/LoadingButton';
import { formatRoomToilet, getNigerianLgas, getNigerianStates } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React from 'react'
import { HiOutlineBanknotes } from 'react-icons/hi2';

type Props = {
  isLoading: boolean;
}

const SearchForm = ({isLoading}: Props) => {
  const router = useRouter();
  
  const [state, setState] = React.useState('');
  const [city, setCity] = React.useState('');
  const [numberOfRooms, setNumberOfRooms] = React.useState(''); 
  const [numberOfToilets, setNumberOfToilets] = React.useState(''); 
  const [minimumPrice, setMinimumPrice] = React.useState(0);
  const [maximumPrice, setMaximumPrice] = React.useState(0);

  const nigerianStates = getNigerianStates();
  const localGovernmentAreas = getNigerianLgas(state);

  const nairaSign:string = String.fromCodePoint(8358);

  const roomList = [
    'one bedroom',
    'two bedroom',
    'three bedroom',
    'four bedroom',
    'five bedroom',
  ];

  const toiletList = [
    'one toilet',
    'two toilets',
    'three toilets',
    'four toilets',
    'five toilets'
  ];

  const resetField = () => {
    setState('');
    setCity('');
    setNumberOfRooms('');
    setNumberOfToilets('');
    setMinimumPrice(0);
    setMaximumPrice(0);      
  }

  const handleSearch = () => {
    if (!state || !city || minimumPrice === 0 || maximumPrice === 0) {
      return;
    };

    const newUrl = `/for-sale?state=${state}&city=${city}&minimumPrice=${minimumPrice}&maximumPrice=${maximumPrice}&numberOfRooms=${formatRoomToilet(numberOfRooms)}&numberOfToilets=${formatRoomToilet(numberOfToilets)}`;
    resetField()

    router.push(newUrl);
  };

  return (
    <React.Fragment>
      <CustomSelect
        data={nigerianStates}
        placeholder='Select the state'
        value={state}
        onChange={(value) => setState(value)}
      />
      <CustomSelect
        data={localGovernmentAreas}
        placeholder='Select the city'
        value={city}
        onChange={(value) => setCity(value)}
      />
      <InputWithIcon
        className='border rounded'
        placeholder={`minimum rent (${nairaSign})`}
        icon={HiOutlineBanknotes}
        value={minimumPrice || ''}
        onChange={(e) => setMinimumPrice(parseInt(e.target.value) || 0)}
      />
      <InputWithIcon
        className='border rounded'
        placeholder={`maximum rent (${nairaSign})`}
        icon={HiOutlineBanknotes}
        value={maximumPrice || ''}
        onChange={(e) => setMaximumPrice(parseInt(e.target.value) || 0)}
      />
      <CustomSelect
        data={roomList}
        placeholder='Select no of rooms'
        value={numberOfRooms}
        onChange={(value) => setNumberOfRooms(value)}
      />
      <CustomSelect
        data={toiletList}
        placeholder='Select no of toilets'
        value={numberOfToilets}
        onChange={(value) => setNumberOfToilets(value)}
      />
      <div className="mt-6">
        <LoadingButton loading={isLoading} disabled={isLoading} className='w-full rounded' onClick={handleSearch}>
          {isLoading ? 'Searching...' : 'Search'}
        </LoadingButton>
      </div>
    </React.Fragment>
  )
}

export default SearchForm