'use client'

import React from 'react';
import MobileMenuDropdown from './MobileMenuDropdown';
import Link from 'next/link';
import { HiOutlineHomeModern, HiOutlineUser } from 'react-icons/hi2';
import DesktopMenu from './DesktopMenu';
import NotificationIndicator from './NotificationIndicator';

type Props = {
  currentUser: boolean
  notification: boolean
}

const NavigationClient = ({currentUser, notification}: Props) => {

  const navbarAbsolute = 'pt-4 absolute left-0 top-0 w-full lg:h-[75px] md:h-[70px] z-[200] h-[60px] z-[40000]';
  const navbarFixed = 'pt-4 z-[4000] fixed w-full lg:h-[75px] md:h-[70px] h-[60px] lg:-top-[75px] bg-card md:-top-[70px] -top-[60px] transform lg:translate-y-[65px] md:translate-y-[60px] translate-y-[50px] transition-all ease-out duration-200 shadow shadow-[4px_4px_4px_0_rgba(0, 0, 0, 0.3)]';

  const [navbarState, setNavbarState] = React.useState(navbarAbsolute);

  const toggleNavbarState = React.useCallback(() => {
    if (window.scrollY >= 120) {
      setNavbarState(navbarFixed);
    } else {
      setNavbarState(navbarAbsolute);
    }

  }, [navbarAbsolute]);

  React.useEffect(() => {
    toggleNavbarState();
    
    window.addEventListener('scroll', toggleNavbarState)
  }, [toggleNavbarState]);

  const LoginButton = () => {
    return (
      <React.Fragment>
        { currentUser ?
          <button className='flex lg:px-5 px-3 py-2 rounded-full bg-primary/70 text-white items-center'>
            { currentUser && notification ? <NotificationIndicator/> : <HiOutlineUser size={22} className='lg:mr-3 mr-2' />}
            <div className='border-l-white lg:text-lg text-base lg:pl-3 pl-2 font-semibold'>Salomi</div>
          </button> : 
          <button className='flex lg:px-5 px-3 py-2 rounded-full bg-primary/70 text-white items-center' onClick={() => console.log('login')}>
            <HiOutlineUser size={22} className='lg:mr-3 mr-2' />
            <div className='border-l lg:text-lg text-base lg:pl-3 pl-2 font-semibold'>Login</div>
          </button> 
        }
      </React.Fragment>
    )
  };

  return (
    <div className={navbarState}>
      <div className="w-full h-full flex lg:px-[4%] md:px-[3%] px-[5%] py-3 items-center md:justify-between gap-4">
        <MobileMenuDropdown currentUser={currentUser}/>
        <div className='lg:min-w-[30%] md:min-w-[35%] w-full flex justify-between items-center h-[40px]'>
          <Link href={'/'} className='flex items-center gap-4'>
            <HiOutlineHomeModern size={26}/>
            <p className='lg:text-2xl md:text-xl text-lg font-semibold'>Nomeo Realtors</p>
          </Link>
        </div>
        <DesktopMenu currentUser={currentUser} notification={notification}/>
        <div className='md:hidden'>
          <LoginButton />
        </div>
      </div>
    </div>
  )
}

export default NavigationClient