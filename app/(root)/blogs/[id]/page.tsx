import { getBlog } from '@/lib/actions/blog-action';
import { Metadata } from 'next';
import React from 'react'
import Blog from '../components/Blog';
import Footer from '@/app/components/footer/Footer';
import { getCurrentUser } from '@/lib/actions/user-actions';

interface Props {
  params: { id: string };
}

export const metadata: Metadata = {
  title: "Blog",
};

const page = async ({params}: Props) => {
  const blog = await getBlog(params.id);
  const user = await getCurrentUser()

  return (
    <React.Fragment>
      <Blog blog={blog} user={user}/>
      <Footer/>
    </React.Fragment>
  )
}

export default page