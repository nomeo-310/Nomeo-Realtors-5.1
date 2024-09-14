import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const AgentsSchema = new Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "Users" },
  agencyName: {type: String, default: ''},
  agencyAddress: {type: String, default: ''},
  agentInspectionFee: {type: Number, default: 0},
  agentBio: {type: String, default: ''},
  agencyWebsite: {type: String, default: ''},
  licenseNumber: {type: String, default: ''},
  officeNumber: {type: String, default: ''},
  phoneNumber: {type: String, default: ''},
  ratings: {type: String, default: ''},
  showBookmarkUsers: {type: Boolean, default: false},
  clients:  [{ type: mongoose.Schema.ObjectId, ref: "Users" }],
  properties:  [{ type: mongoose.Schema.ObjectId, ref: "Properties" }],
  blogs: [{ type: mongoose.Schema.ObjectId, ref: "Blogs" }],
  inspections: [{ type: mongoose.Schema.ObjectId, ref: "Inspections" }],
});

(mongoose.models as any) = {};

const Agents = mongoose.model("Agents", AgentsSchema);

export default Agents;