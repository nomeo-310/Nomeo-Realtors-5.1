'use client'

import React from 'react'
import NotificationCard from './NotificationCard';
import InfiniteScrollClient from '@/components/shared/InfiniteScrollClient';
import { notificationProps, userProps } from '@/lib/types';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import NotificationLoadingSkeleton from './NotificationLoadingSkeleton';
import { Loader2 } from 'lucide-react';

type Props = {
  user: userProps
}

const notificationList = [
  {
    type: 'inspections',
    message: 'Salomi Afolabi booked you for an inspection',
    seen: true,
    issuer: {
      name: 'Salomi Afolabi',
      email: 'onomesalomi@gmail.com',
      image: '/images/profile_1.jpg',
      phoneNumber: '07037575894'
    },
    inspectionDate: '28th August, 2024',
    inspectionTime: '10:30am',
    recipient: '3',
    property: '5',
    createdAt: '2024-02-27T11:30:00.000Z',
  },
  {
    type: 'alerts',
    message: 'You are welcomed to Nomeo Realtors, It is a pleasure to have you here.',
    seen: false,
    inspectionDate: '',
    inspectionTime: '',
    recipient: '3',
    property: '5',
    createdAt: '2024-02-27T11:30:00.000Z',
  },
  {
    type: 'alerts',
    message: 'You are welcomed to Nomeo Realtors, It is a pleasure to have you here. Your license number is Agent-3AE9',
    seen: false,
    inspectionDate: '',
    inspectionTime: '',
    recipient: '3',
    property: '5',
    createdAt: '2024-02-27T11:30:00.000Z',
  },
  {
    type: 'payment-alerts',
    message: 'You have paid your rent and it has started reading.',
    seen: false,
    inspectionDate: '',
    inspectionTime: '',
    recipient: '3',
    property: '5',
    createdAt: '2024-02-27T11:30:00.000Z',
  },
  {
    type: 'payment-reminders',
    message: 'Olatunde Olajide has paid her rent and it has started reading.',
    seen: true,
    inspectionDate: '',
    inspectionTime: '',
    recipient: '3',
    property: '5',
    createdAt: '2024-02-27T11:30:00.000Z',
  },

]

const Notifications = ({user}: Props) => {

  const getNotifications = async ({pageParam}: {pageParam: number}) => {
    const response = await fetch('/api/getNotifications', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({page: pageParam})
    });
    
    if (!response.ok) {
      throw new Error('Something went wrong, try again later');
    }

    const data = await response.json();
    return data;
  };

  const readNotifications = async () => {
    try {
      const response = await fetch('/api/readNotifications', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
      });

      if (!response.ok) {
        throw new Error('Something went wrong, try again later');
      }
    } catch (error) {
      console.error(error)
      throw new Error('Internal server error, try again later');
    }
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: readNotifications,
    onSuccess: () => {
      queryClient.setQueryData(['unread-notification-count'], { unreadCounts: 0 })
    },
    onError(error) {
      console.error('Failed to mark notifications as read', error)
    }
  });

  React.useEffect(() => {
    mutate();
  }, [mutate]);

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage
  });

  const notifications:notificationProps[] = data?.pages.flatMap(page => page.notifications) || [];

  if (status === 'pending') {
    return <NotificationLoadingSkeleton/>
  };

  if (status === 'success' && !notifications.length && !hasNextPage) {
    return  (
      <p className='text-base lg:text-lg text-center text-muted-foreground'>
        You don&apos;t have any notifications yet
      </p>
    )
  };

  if (status === 'error') {
    return (
      <p className='text-base lg:text-lg text-center text-destructive'>
        An error occur while loading notifications
      </p>
    )
  };

  return (
    <InfiniteScrollClient className='w-full min-h-[73.5vh] flex slide-in-left space-y-4' onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}>
      <div className="flex flex-col gap-4 w-full lg:w-[80%] xl:w-[70%]">
        <h2 className='font-semibold md:hidden text-lg'>Notifications</h2>
        { notifications && notifications.length > 0 && notifications.map((notification:notificationProps, index: number) => (
          <NotificationCard key={notification._id} notification={notification}/>
        ))}
        { isFetchingNextPage && <Loader2 className='mx-auto animate-spin my-3'/> }
      </div>
    </InfiniteScrollClient>
  )
}

export default Notifications;