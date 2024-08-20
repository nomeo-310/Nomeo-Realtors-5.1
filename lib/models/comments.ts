import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { IComment } from '../types';

const CommentsSchema = new Schema({
  content:  {type: String, default: ''},
  user: { type: mongoose.Schema.ObjectId, ref: "Users" },
  blog: { type: mongoose.Schema.ObjectId, ref: "Blogs" },
  createdAt: {type: Date, default: Date.now()},
});

const Comments = mongoose.model<IComment>("Comments", CommentsSchema);

export default Comments;