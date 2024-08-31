import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import { IAttachment } from '../types';

const AttachmentsSchema = new Schema({
  property:  [{ type: mongoose.Schema.ObjectId, ref: "Properties" }],
  attachments:  [{ public_id: {type: String, default: "" }, secure_url: {type: String, default: "" } }],
  createdAt: {type: Date, default: Date.now()},
});

const Attachments = mongoose.model<IAttachment>("Attachments", AttachmentsSchema);

export default Attachments;