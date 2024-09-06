import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { IBlog } from '../types';

const BlogsSchema = new Schema({
  title: {type: String, default: ''},
  intro: {type: String, default: ''},
  content: {type: String, default: ''},
  bannerImage: {public_id: {type: String, default: ''}, secure_url: {type: String, default: ''}},
  author: { type: mongoose.Schema.ObjectId, ref: "Agents" },
  likes: [{ type: mongoose.Schema.ObjectId, ref: "Users" }],
  reads: [{ type: mongoose.Schema.ObjectId, ref: "Users" }],
  readTime: {type: String, default: ""},
  comments: { type: mongoose.Schema.ObjectId, ref: "Comments" },
  createdAt: {type: Date, default: Date.now()},
});

const Blogs = mongoose.model<IBlog>("Blogs", BlogsSchema);

export default Blogs;