import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const RentoutsSchema = new Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "Users" },
  property: { type: mongoose.Schema.ObjectId, ref: "Properties" },
  agent: { type: mongoose.Schema.ObjectId, ref: "Agents" },
  paymentDate: {type: Date, default: Date.now()},
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()},
});

const Rentouts = mongoose.model("Rentouts", RentoutsSchema);

export default Rentouts;