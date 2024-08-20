import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { INotification } from '../types';

const NotificationsSchema = new Schema({
  type: {type: String, enum: ['reminders', 'alerts'], default: 'alerts'},
  message: {type: String, default: ""},
  seen:{type: Boolean, default: false},
  issuer: { type: mongoose.Schema.ObjectId, ref: "User" },
  recipient: { type: mongoose.Schema.ObjectId, ref: "User" },
  property: { type: mongoose.Schema.ObjectId, ref: "Properties" },
  createdAt: {type: Date, default: Date.now()},
});

const Notifications = mongoose.model<INotification>("Notifications", NotificationsSchema);

export default Notifications;