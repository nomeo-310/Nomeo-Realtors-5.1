'use client'

import ImageAvatar from '@/components/shared/ImageAvatar';
import { notificationProps } from '@/lib/types';
import { cn, formatDate, formatTargetDate, useCountdownTimer } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React from 'react'
import { CiAlarmOn } from 'react-icons/ci';
import { HiOutlineBellAlert } from 'react-icons/hi2';

type Props = {
  notification: notificationProps
}

type mapItemType = {
  icon: React.ReactNode,
  message: string
}

const NotificationCard = ({notification}: Props) => {
  const router = useRouter();

  const [showClient, setShowClient] = React.useState(false);

  const futureDate = formatTargetDate(notification.createdAt);
  const { days, hours, minutes, seconds } = useCountdownTimer(futureDate.toISOString());

  const notificationTypeMap: Record<string, mapItemType> = {
    "alerts": {
      icon:<div className="size-10 rounded-full flex items-center justify-center bg-blue-300 dark:bg-blue-600"><HiOutlineBellAlert size={24} /></div>,
      message: notification.message,
    },
    "payment-alerts": {
      icon: <div className="size-10 rounded-full flex items-center justify-center bg-blue-300 dark:bg-blue-600"><HiOutlineBellAlert size={24} /></div>,
      message: notification.message
    },
    "payment-reminders": {
      icon: <div className="size-10 rounded-full flex items-center justify-center bg-green-300 dark:bg-green-600"><CiAlarmOn size={24} /></div>,
      message: notification.message
    },
    "inspections": {
      icon:<div className="size-10 rounded-full flex items-center justify-center bg-blue-300 dark:bg-blue-600"><HiOutlineBellAlert size={24} /></div>,
      message: `${notification.message} on ${formatDate(notification.inspectionDate?.toString() as string)} at ${notification.inspectionTime}`
    }
  };

  const { icon, message } = notificationTypeMap[notification.type];

  return (
    <div className={cn('lg:p-4 p-3 rounded shadow-sm', notification.seen ? 'bg-card': 'bg-primary/30')}>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          {icon}
          <div>
            <p className='text-base capitalize'>{notification.type.split('-').join(' ')}</p>
            <p className='text-xs sm:text-sm'>{formatDate(notification.createdAt)}</p>
          </div>
        </div>
        <div className='sm:text-base text-sm'>{message}</div>
        { notification.type === 'inspections' && 
          <div className='flex items-center gap-3 cursor-pointer'>
            <p className='underline text-sm sm:text-base' onClick={() =>setShowClient(!showClient)}>View client details</p>
            <p className='underline text-sm sm:text-base' onClick={() =>router.push(`/property/${notification.property}`)}>View property</p>
          </div>
        }
        { showClient && notification.issuer &&
          <div className='flex gap-2 items-center'>
            <ImageAvatar src={ notification.issuer.image && notification.issuer.image} alt='issuer_image' className='flex-none md:size-16 size-12 rounded-full'/>
            <div>
              <p className='text-sm sm:text-base'>Name: {notification.issuer.name}</p>
              <p className='text-sm sm:text-base'>Phone: {notification.issuer.phoneNumber}</p>
              <p className='text-sm sm:text-base'>Email: {notification.issuer.email}</p>
            </div>
          </div>
        }
        { notification.type === 'payment-alerts' ? '' : notification.type === 'payment-reminders' ? '' : 
          <div className='flex justify-end'>
            <p className='text-destructive text-sm font-semibold hover:underline'>Delete</p>
          </div>
        }
        { notification.type === 'payment-alerts' &&
          <div className="grow">
            <span className='lg:text-4xl md:text-3xl text-lg font-bold'>{days} days : {hours} hrs : {minutes} mins : {seconds} secs</span>
          </div>
        }
        {  notification.type === 'payment-reminders' &&
          <div className="grow">
            <span className='lg:text-4xl md:text-3xl text-lg font-bold'>{days} days : {hours} hrs : {minutes} mins : {seconds} secs</span>
          </div>
        }
      </div>
    </div>
  )
}

export default NotificationCard