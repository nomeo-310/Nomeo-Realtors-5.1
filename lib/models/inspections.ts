import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { IInspection } from '../types';

const InspectionsSchema = new Schema({
  scheduledAt:  {type: Date, default: Date.now()},
  time: { type: String, default: "" },
  user:  { type: mongoose.Schema.ObjectId, ref: "User" },
  property: { type: String, default: "" },
  agent: { type: mongoose.Schema.ObjectId, ref: "User" },
  additionalNumber: { type: String, default: "" }
});

const Inspections = mongoose.model<IInspection>("Inspections", InspectionsSchema);

export default Inspections;