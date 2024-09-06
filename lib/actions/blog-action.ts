'use server'

import Agents from "../models/agents";
import Blogs from "../models/blogs";
import { connectToMongoDB } from "../utils";
import { getCurrentUser } from "./user-actions";

type imageProps ={
  public_id: string;
  secure_url: string;
};

type postData = {
  title: string;
  intro: string;
  content: string;
  bannerImage: imageProps;
  readTime: string;
};

export const createPost = async ({title, intro, content, bannerImage, readTime}:postData) => {
  await connectToMongoDB();

  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  if (user.role !== 'agent') {
    return;
  }

  const blogData = {
    title: title,
    intro: intro,
    content: content,
    bannerImage: bannerImage,
    author: user.isAgent,
    readTime: readTime,
  };

  try {
    const newBlog = await Blogs.create(blogData);
    newBlog.save();
    await Agents.findOneAndUpdate({_id: user.isAgent}, {$push: {blogs: newBlog._id}})
    return {success: 'Blog post successfully created'}
  } catch (error) {
    console.error(error)
    return {error: 'Internal server error, try again later'}
  }
}