import ChangeEmail from '@/app/components/settings/ChangeEmail';
import ChangePassword from '@/app/components/settings/ChangePassword';
import DeleteAccount from '@/app/components/settings/DeleteAccount';
import SettingsHeader from '@/app/components/settings/SettingsHeader';
import ShowBookmarkUsers from '@/app/components/settings/ShowBookmarkUsers';
import ShowLikedBlogs from '@/app/components/settings/ShowLikedBlogs';
import ShowLikedProperties from '@/app/components/settings/ShowLikedProperties';
import UnSubscribeNewletter from '@/app/components/settings/UnSubscribeNewletter';
import { userProps } from '@/lib/types';
import React from 'react'

type Props = {
  user: userProps
}

const Settings = ({user}: Props) => {
  return (
    <div className='w-full min-h-[73.5vh] flex slide-in-left space-y-4'>
      <div className="flex flex-col gap-3 w-full lg:w-[80%] xl:w-[70%]">
        <h2 className='font-semibold md:hidden text-lg'>Settings</h2>
        <SettingsHeader user={user} />
        <hr/>
        <ChangePassword />
        <hr/>
        <ChangeEmail user={user}/>
        <hr/>
        <DeleteAccount />
        <hr/>
        <ShowLikedProperties user={user}/>
        <hr/>
        <ShowLikedBlogs user={user}/>
        { user?.role === 'agent' && 
          <React.Fragment>
            <hr/>
            <ShowBookmarkUsers user={user}/>
          </React.Fragment>
        }
        { user?.newsletterSubscriptions &&
          <React.Fragment>
            <hr/>
            <UnSubscribeNewletter user={user}/>
          </React.Fragment>
        }
      </div>
    </div>
  )
}

export default Settings