'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { HiXMark } from 'react-icons/hi2'

type modalProps = {
  children: React.ReactNode
  isOpen: boolean
  title: string
  description: string
  onClose: () => void
}

const Modal = ({description, children, isOpen, title, onClose}: modalProps) => {
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
          <div className={cn("relative w-[92%] md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-auto md:h-auto lg:h-auto")}>
            <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
              <div className="translate h-full lg:h-auto md:h-auto border-0 rounded shadow-lg relative flex flex-col w-full bg-card outline-none focus:outline-none">
                <div className="flex sm:p-5 p-4 rounded-t justify-between w-full">
                  <div className="flex flex-col gap-2">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-semibold">{title}</div>
                    <div className="text-base sm:text-lg text-muted">{description}</div>
                  </div>
                  <button onClick={handleClose} className='p-1 border rounded hover:opacity-70 transition '>
                    <HiXMark size={25}/>
                  </button>
                </div>
                <div className='sm:p-5 p-4'>
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