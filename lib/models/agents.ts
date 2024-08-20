import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { IAgent } from '../types';

const AgentsSchema = new Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "Users" },
  agencyName: {type: String, default: ''},
  agencyAddress: {type: String, default: ''},
  agentInspectionFee: {type: Number, default: 0},
  agentBio: {type: String, default: ''},
  agencyWebsite: {type: String, default: ''},
  licenseNumber: {type: String, default: ''},
  officeNumber: {type: Boolean, default: false},
  phoneNumber: {type: Boolean, default: false},
  ratings: {type: String, default: ''},
  newsletterSubscriptions: {type: Boolean, default: false},
  clients:  [{ type: mongoose.Schema.ObjectId, ref: "Users" }],
  properties:  [{ type: mongoose.Schema.ObjectId, ref: "Properties" }],
  blogs: [{ type: mongoose.Schema.ObjectId, ref: "Blogs" }],
  inspections: [{ type: mongoose.Schema.ObjectId, ref: "Inspections" }],
});

const Agents = mongoose.model<IAgent>("Agents", AgentsSchema);

export default Agents;