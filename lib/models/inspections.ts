import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { IInspection } from '../types';

const InspectionsSchema = new Schema({
  scheduledAt:  {type: Date, default: Date.now()},
  user:  { type: mongoose.Schema.ObjectId, ref: "User" },
  property: { type: mongoose.Schema.ObjectId, ref: "Properties" },
  agent: { type: mongoose.Schema.ObjectId, ref: "User" },
});

const Inspections = mongoose.model<IInspection>("Inspections", InspectionsSchema);

export default Inspections;