'use client'

import React from 'react'
import { HiChevronUp } from 'react-icons/hi2';


const ScrollToTop = () => {
  const [showButton, setShowButton] = React.useState(false);

  React.useEffect(() => {

    const handleButtonVisibility = () => {
      window.scrollY > 500 ? setShowButton(true) : setShowButton(false)
    };

    window.addEventListener('scroll', handleButtonVisibility);
    return () => {
      window.removeEventListener('scroll', handleButtonVisibility)
    };
    
  }, []);

  const handleScrollUp = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  };

  return (
    <React.Fragment>
      {showButton && 
        <button className='fixed bottom-5 md:right-7 right-10 z-[10000] lg:p-3 p-2 rounded-full bg-neutral-700 text-white' onClick={handleScrollUp}>
          <HiChevronUp size={24}/>
        </button>}
    </React.Fragment>
  )
}

export default ScrollToTop