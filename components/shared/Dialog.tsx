'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { HiXMark } from 'react-icons/hi2'

type modalProps = {
  children: React.ReactNode
  isOpen: boolean
  title: string
  description?: string
  onClose: () => void
  useCloseButton?: boolean
}

const Modal = ({useCloseButton, description, children, isOpen, title, onClose}: modalProps) => {
  const [showModal, setShowModal] = React.useState(isOpen);

  React.useEffect(() => {
    setShowModal(isOpen)
  },[isOpen]);

  const handleClose = React.useCallback(() => {
    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300)
  }, [onClose]);

  return (
    <React.Fragment>
      { isOpen &&
        <div className='fixed inset-0 overflow-hidden flex items-center justify-center outline-none focus:outline-none z-[80000] bg-neutral-800/70'>
          <div className={cn("relative sm:max-w-[480px] max-w-[390px] xl:w-2/5 my-6 mx-auto h-auto md:h-auto lg:h-auto")}>
            <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
              <div className="translate h-full lg:h-auto md:h-auto border-0 rounded shadow-lg relative flex flex-col w-full bg-card outline-none focus:outline-none">
                <div className="flex sm:p-5 p-4 justify-between w-full items-start">
                  <div className="text-2xl md:text-3xl font-semibold">{title}</div>
                  <button onClick={handleClose} className={cn('p-1 border rounded hover:opacity-70 transition', !useCloseButton && 'invisible')}>
                    <HiXMark size={25}/>
                  </button>
                </div>
                <div className='sm:p-5 p-4 sm:pt-0 pt-0'>
                  <div className="text-base mb-4 w-full">{description}</div>
                  {description && <hr className='my-4 -mx-4 md:-mx-5'/>}
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </React.Fragment>
  )
}

export default Modal;