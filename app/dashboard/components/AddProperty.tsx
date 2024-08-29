import CustomSelect from '@/components/shared/CustomSelect';
import InputWithIcon from '@/components/shared/InputWithIcon';
import { Textarea } from '@/components/ui/textarea';
import React from 'react'
import { HiAtSymbol, HiOutlineMapPin } from 'react-icons/hi2';

type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

const AddProperty = ({setActiveTab}: Props) => {
  const [title, setTitle] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [propertyTag, setPropertyTag] = React.useState('');
  const [furnitureStatus, setFurnitureStatus] = React.useState('');
  const [description, setDescription] = React.useState('');

  return (
    <div className='w-full h-full flex slide-in-left'>
      <form className="flex flex-col lg:gap-4 gap-3 w-full lg:w-[85%] xl:w-[75%]">
        <div className='flex gap-4 lg:gap-6 cursor-pointer'>
          <h2 className='text-xl md:text-3xl font-semibold'>Add Property</h2>
          <h2 className='text-xl md:text-3xl font-semibold text-gray-400' onClick={() =>setActiveTab('added-properties')}>Added Properties</h2>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className='text-xl md:text-2xl mb-2'>Property Description</h2>
          <InputWithIcon
            type='text'
            icon={HiAtSymbol}
            placeholder='title of property description'
            className='border rounded'
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputWithIcon
            type='text'
            icon={HiOutlineMapPin}
            placeholder='full address of property'
            className='border rounded'
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            <CustomSelect
              data={['for-rent', 'for-sale']}
              placeholder='Select property tag'
              value={propertyTag}
              setValue={setPropertyTag}
            />
            <CustomSelect
              data={['furnished', 'not-furnished']}
              placeholder='Select furniture status'
              value={furnitureStatus}
              setValue={setFurnitureStatus}
            />
          </div>
          <Textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder='describe the property (keep it simple and short)'
            className='text-base lg:h-[18rem] h-[16rem] resize-none rounded border bg-inherit placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none focus-visible:ring-offset-0'
          />
        </div>
      </form>
    </div>
  )
}

export default AddProperty;