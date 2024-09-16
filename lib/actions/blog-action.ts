'use server'

import { revalidatePath } from "next/cache";
import Agents from "../models/agents";
import Blogs from "../models/blogs";
import Users from "../models/users";
import { connectToMongoDB } from "../utils";
import { getCurrentUser } from "./user-actions";
import { ObjectId } from "mongodb";              

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
};

export const getBlog = async (id:string) => {
  await connectToMongoDB();

  try {
    const blog = await Blogs.findOne({_id: id})
    .populate({
      path: 'author',
      model: Agents,
      select: 'agencyName agentBio licenseNumber',
      populate: {
        path: 'user',
        model: Users,
        select: 'name image _id'
      }
    });

    const singleBlog = JSON.parse(JSON.stringify(blog));
    return singleBlog;
  } catch (error) {
    console.error(error)
    return {error: 'Internal server error'}
  }
};

export const likeBlog = async ({blogId, path}:{blogId:string; path:string}) => {
  await connectToMongoDB();

  const newBlogId = new ObjectId(blogId);
  const user = await getCurrentUser();

  if (!user) {
    return;
  };

  const blog = await Blogs.findOne({_id: blogId})

  if (!blog) {
    return;
  };

  const alreadyLiked = blog.likes.includes(user._id)

  try {
    if (alreadyLiked) {
      await Blogs.findOneAndUpdate({_id: blogId}, {$pull: {likes: user._id}})
      await Users.findOneAndUpdate({_id: user._id}, {$pull: {likedBlogs: blogId}});
  
      revalidatePath(path);
      return { success: "You no longer like this blog"};
    };

    await Blogs.findOneAndUpdate({_id: blogId}, {$push: {likes: user._id}})
    await Users.findOneAndUpdate({_id: user._id}, {$push: {likedBlogs: newBlogId}});

    revalidatePath(path);
    return { success: "You like this blog"};
  } catch (error) {
    return {error: 'Internal server error, try again later'}
  }
};
