import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { INewsletter } from '../types';

const NewsletterSchema = new Schema({
  email: {type: String, default: ''},
  user: { type: mongoose.Schema.ObjectId, ref: "Users" },
  createdAt: {type: Date, default: Date.now()},
});

const Newsletter = mongoose.model<INewsletter>("Newsletter", NewsletterSchema);

export default Newsletter;