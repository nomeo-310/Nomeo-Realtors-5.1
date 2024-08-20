import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { IBlog } from '../types';

const BlogsSchema = new Schema({
  title: {type: String, default: ''},
  content: {type: String, default: ''},
  bannerImage: {type: String, default: ''},
  author: { type: mongoose.Schema.ObjectId, ref: "Agents" },
  likes: [{ type: mongoose.Schema.ObjectId, ref: "Users" }],
  comments: { type: mongoose.Schema.ObjectId, ref: "Comments" },
  createdAt: {type: Date, default: Date.now()},
});

const Blogs = mongoose.model<IBlog>("Blogs", BlogsSchema);

export default Blogs;