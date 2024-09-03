import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { INotification } from '../types';

const NotificationsSchema = new Schema({
  type: {type: String, enum: ['alerts', 'payment-alerts', 'payment-reminders', 'inspections'], default: 'alerts'},
  message: {type: String, default: ""},
  inspectionDate: {type: Date, default: Date.now()},
  inspectionTime: {type: String, default: ""},
  seen:{type: Boolean, default: false},
  issuer: { type: mongoose.Schema.ObjectId, ref: "User" },
  recipient: { type: mongoose.Schema.ObjectId, ref: "User" },
  property: {type: String, default: ""},
  additionalPhoneNumber: {type: String, default: ""},
  createdAt: {type: Date, default: Date.now()},
});

const Notifications = mongoose.model<INotification>("Notifications", NotificationsSchema);

export default Notifications;