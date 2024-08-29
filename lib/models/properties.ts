import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { IProperty } from '../types';

const PropertiesSchema = new Schema({
  numberOfRooms: {type: Number, default: 0},
  numberOfBath: {type: Number, default: 0},
  numberOfToilets: {type: Number, default: 0},
  area: {type: Number, default: 0},
  agent: { type: mongoose.Schema.ObjectId, ref: "Agents" },
  closeLandmarks: [{name: {type:String, default: ""}, distanceAway: {type: String, default: ""}}],
  images: { type: mongoose.Schema.ObjectId, ref: "Attachments" },
  mainFees: [{name: {type:String, default: ""}, amount: {type: String, default: ""}, description: {type: String, default: ""}}],
  optionalFees: [{name: {type:String, default: ""}, amount: {type: String, default: ""}, description: {type: String, default: ""}}],
  annualRent: {type: Number, default: 0},
  fullPropertyPrice: {type: Number, default: 0},
  address: {type:String, default: ""},
  title: {type:String, default: ""},
  description: {type:String, default: ""},
  furnitureStatus: {type:String, enum: ['furnished', 'not-furnished'], default: 'not-furnished'},
  mainAmenities: [{type:String, default: ""}],
  optionalAmenities: [{type:String, default: ""}],
  availabilityTag: {type:String, enum: ['available', 'not-available'], default: 'available'},
  propertyTag: {type:String, enum: ['for-rent', 'for-sale'], default: 'for-rent'},
  city: {type:String, default: ""},
  state: {type:String, default: ""},
  bookmarks: [{ type: mongoose.Schema.ObjectId, ref: "Users" }],
  likes: [{ type: mongoose.Schema.ObjectId, ref: "Users" }],
  inspections: [{ type: mongoose.Schema.ObjectId, ref: "Inspections" }],
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()},
});

const Properties = mongoose.model<IProperty>("Properties", PropertiesSchema);

export default Properties;