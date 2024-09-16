'use client'

import Link from 'next/link';
import React from 'react'
import { HiOutlineHomeModern } from 'react-icons/hi2';
import { BsFacebook, BsInstagram, BsThreads, BsTwitter } from 'react-icons/bs'
import { subscribeUser } from '@/lib/actions/subscription-action';
import { useToast } from '@/components/ui/use-toast';
import { usePathname } from 'next/navigation';



const FooterTop = () => {

  const Subscription = () => {
    const { toast } = useToast();
    const [email, setEmail] = React.useState('');
    const path = usePathname()

    const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      const input = event.target.value
      setEmail(input)
    };

    const handleSubscribe = async (event:React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = {email: email, path: path};

      await subscribeUser(data)
      .then ((response) => {
        if (response.success) {
          toast({
            variant: 'success',
            title: 'Success',
            description: response.success
          });
          setEmail('')
        };

        if (response.error) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: response.error
          });
        }
      })
    }
    return (
      <div className="w-full  flex gap-6 flex-col">
        <p className='lg:text-xl text-lg font-semibold'>Subscribe to our newsletter:</p>
        <div>
          <form className='flex rounded-full overflow-hidden border border-white' onSubmit={handleSubscribe} noValidate>
            <div className="grow flex items-center">
              <input type="email" placeholder='enter your email address' className='w-full pl-5 p-3 outline-none bg-inherit placeholder:text-white text-base' onChange={onChange} value={email}/>
            </div>
            <div className="w-fit">
              <button className='py-3 px-8 bg-white text-primary lg:text-lg' type='submit'>Subscribe</button>
            </div>
          </form> 
          <div className="mt-1 text-sm lg:text-base ml-8">
            By subscribing you agree to our <button className='underline' onClick={() =>{}}>Terms And Conditions</button>.
          </div>
        </div>
        <div>
          <p className='lg:text-xl text-lg font-semibold'>Follow us on:</p>
          <div className='flex gap-6 items-center mt-6'>
            <a href="https://wwww.instagram.com/nomeosuites" className='hover:scale-110'>
              <BsInstagram size={26} className='lg:hidden'/>
              <BsInstagram size={32} className='hidden lg:block'/>
            </a>
            <a href="https://wwww.facebook.com/nomeosuites" className='hover:scale-110'>
              <BsFacebook size={26} className='lg:hidden'/>
              <BsFacebook size={32} className='hidden lg:block'/>
            </a>
            <a href="https://wwww.twitter.com/nomeosuites" className='hover:scale-110'>
              <BsTwitter size={26} className='lg:hidden'/>
              <BsTwitter size={32} className='hidden lg:block'/>
            </a>
            <a href="https://wwww.threads.com/nomeosuites" className='hover:scale-110'>
              <BsThreads size={26} className='lg:hidden' />
              <BsThreads size={32} className='hidden lg:block'/>
            </a>
          </div>
        </div>
      </div>
    )
  };

  const MainFooter = () => {
    return (
      <div className='w-full md:w-[60%] pb-6 md:pb-0 flex flex-col gap-6'>
        <div className='w-full'>
          <Link href={'/'} className='flex items-center gap-4'>
            <HiOutlineHomeModern size={26}/>
            <p className='lg:text-2xl md:text-xl text-lg font-semibold'>Nomeo Realtors</p>
          </Link>
          <div className='flex flex-col gap-1 mt-6'>
            <p className='lg:text-lg'>+ Block 12B, Omo-Disu Street, Owutu Estate, Ikeja, Lagos State.</p>
            <p className='lg:text-lg'>+ Block 12B, Omo-Disu Street, Owutu Estate, Ikeja, Oyo State.</p>
            <p className='lg:text-lg'>+ Block 12B, Omo-Disu Street, Owutu Estate, Ikeja, Ogun State.</p>
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <h2 className='text-lg lg:text-xl font-semibold'>+Company:</h2>
          <div className='flex items-center gap-4 lg:text-lg'>
            <Link href={'/about-us'} className='hover:underline'>About</Link>
            <Link href={'/blogs'} className='hover:underline'>Blog</Link>
            <Link href={'/contact'} className='hover:underline'>Contact</Link>
            <Link href={'/#testimonials'} className='hover:underline'>Testimonials</Link>
            <Link href={'/#faq'} className='hover:underline'>FAQs</Link>
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <h2 className='text-lg lg:text-xl font-semibold'>+Real Estate:</h2>
          <div className='flex items-center gap-4 lg:text-lg'>
            <Link href={'/buy'} className='hover:underline'>Buy</Link>
            <Link href={'/rent'} className='hover:underline'>Rent</Link>
            <Link href={'/sell'} className='hover:underline'>Sell</Link>
            <Link href={'/#featuredProperties'} className='hover:underline'>Featured</Link>
            <Link href={'/#latestBlogs'} className='hover:underline'>Latest Blogs</Link>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="flex lg:gap-8 md:flex-row md:items-start flex-col gap-3 mb-10">
      <div className="w-full flex md:flex-row flex-col md:gap-8 gap-4">
        <MainFooter/>
        <hr className='md:hidden'/>
        <div className="md:w-[40%] w-full">
          <Subscription/>
        </div>
      </div>
    </div>
  )
}

export default FooterTop