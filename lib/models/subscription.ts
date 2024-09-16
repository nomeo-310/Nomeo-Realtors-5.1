import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { ISubscription } from '../types';

const SubscriptionSchema = new Schema({
  user:  { type: mongoose.Schema.ObjectId, ref: "Users" },
  email: {type: String, default: '', unique: true},
  createdAt: {type: Date, default: Date.now()},
});

const Subscriptions = mongoose.model<ISubscription>("Subscriptions", SubscriptionSchema);

export default Subscriptions;