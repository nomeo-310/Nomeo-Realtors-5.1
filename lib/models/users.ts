import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const UsersSchema = new Schema({
  name: {type: String, default: ''},
  email: {type: String, default: '', unique: true},
  hashedPassword: {type: String, default: ''},
  city: {type: String, default: ''},
  state: {type: String, default: ''},
  profileImage: {public_id: {type: String, default: ''}, secure_url: {type: String, default: ''}},
  image: {type: String, default: ''},
  verification: {type: Boolean, default: false},
  role: {type: String, enum: ['user', 'agent'], default: 'user'},
  newsletterSubscriptions: {type: Boolean, default: false},
  agents:  [{ type: mongoose.Schema.ObjectId, ref: "Agents" }],
  properties:  [{ type: mongoose.Schema.ObjectId, ref: "Properties" }],
  bookmarkedProperties: [{ type: mongoose.Schema.ObjectId, ref: "Properties" }],
  notifications: [{ type: mongoose.Schema.ObjectId, ref: "Notifications" }],
  inspections: [{ type: mongoose.Schema.ObjectId, ref: "Inspections" }],
  createdAt: {type: Date, default: Date.now()},
  updatedAt: {type: Date, default: Date.now()},
});

(mongoose.models as any) = {};

const Users = mongoose.model("Users", UsersSchema);

export default Users;