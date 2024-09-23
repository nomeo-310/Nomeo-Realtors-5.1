import { agentProps } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import React from 'react'
import { HiLink, HiOutlineBriefcase, HiOutlineCreditCard, HiOutlineDocumentText, HiOutlineHome, HiOutlineMapPin, HiOutlinePhone, HiOutlineUser, HiOutlineUsers } from 'react-icons/hi2';

type Props = {
  agent: agentProps
}

const AgentInfo = ({agent}: Props) => {
  const nairaSign:string = String.fromCodePoint(8358);
  return (
    <div className='space-y-1'>
      <div className='flex items-center gap-2'>
        <HiOutlineUser size={20} className='md:hidden'/>
        <p className='capitalize text-base md:block hidden'>full name: {agent.user.name}</p>
        <p className='capitalize text-base md:hidden'>full name: {agent.user.name}</p>
      </div>
      <div className='flex items-center gap-2'>
        <HiOutlineBriefcase size={20} className='md:hidden'/>
        <p className='capitalize text-base md:block hidden'>agency name: {agent.agencyName}</p>
        <p className='capitalize text-base md:hidden'>{agent.agencyName}</p>
      </div>
      <div className='flex items-center gap-2'>
        <HiOutlineMapPin size={20} className='md:hidden'/>
        <p className='capitalize text-base md:block hidden'>address: {agent.agencyAddress}</p>
        <p className='capitalize text-base md:hidden'>{agent.agencyAddress}</p>
      </div>
      <div className='flex gap-2'>
        <HiLink size={20} className='md:hidden'/>
        <p className='text-base hidden md:block'>Agency Website: {agent.agencyWebsite ? agent.agencyWebsite : 'not available'}</p>
        <p className='text-base md:hidden'>{agent.agencyWebsite ? agent.agencyWebsite : 'not available'}</p>
      </div>
      <div className='flex items-center gap-2'>
        <HiOutlineCreditCard size={20} className='md:hidden'/>
        <p className='capitalize text-base hidden md:block'>inspection fee: {nairaSign}{agent.agentInspectionFee.toLocaleString()}.00 <span className='text-sm lowercase'>per hour</span></p>
        <p className='capitalize text-base md:hidden'>{nairaSign}{agent.agentInspectionFee.toLocaleString()}.00 <span className='text-sm lowercase'>per hour</span></p>
      </div>
      <div className='flex items-center gap-2'>
        <HiOutlinePhone size={20} className='md:hidden'/>
        <p className='capitalize text-base hidden md:block'>contacts: {agent.phoneNumber}, {agent.officeNumber}</p>
        <p className='capitalize text-base md:hidden'>{agent.phoneNumber}, {agent.officeNumber}</p>
      </div>
      <div className='flex items-center gap-2'>
        <HiOutlineUsers size={20} className='md:hidden'/>
        <p className='capitalize text-base hidden md:block'>clients: {agent.clients.length > 0 ? agent.clients.length : 'still seeking'} clients</p>
        <p className='capitalize text-base md:hidden'>{agent.clients.length > 0 ? agent.clients.length : 'still seeking'} clients</p>
      </div>
      <div className='flex items-center gap-2'>
        <HiOutlineHome size={20} className='md:hidden'/>
        <p className='capitalize text-base hidden md:block'>properties: {agent.properties.length > 0 ? agent.properties.length : 'have not added'} properties</p>
        <p className='capitalize text-base md:hidden'>{agent.properties.length > 0 ? agent.properties.length : 'have not added'} properties</p>
      </div>
      <div className='flex items-center gap-2'>
        <HiOutlineDocumentText size={20} className='md:hidden'/>
        <p className='capitalize text-base hidden md:block'>blogposts: {agent.blogs.length > 0 ? agent.blogs.length : 'have not added'} blog posts</p>
        <p className='capitalize text-base md:hidden'>{agent.blogs.length > 0 ? agent.blogs.length : 'have not added'} blog posts</p>
      </div>
      <div className='flex items-center gap-2'>
        <p className='capitalize text-base hidden md:block my-4'>{agent.agentBio ? agent.agentBio : 'have not added bio'}</p>
        <p className='capitalize text-base md:hidden my-4'>{agent.agentBio ? agent.agentBio : 'have not added bio'}</p>
      </div>
      <p className='mt-3'>Joined: {formatDate(agent.user.createdAt)}</p>
    </div>
  )
}

export default AgentInfo