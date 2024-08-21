import { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  hashedPassword: string;
  city: string;
  state: string;
  image: string;
  verification: boolean;
  role: 'user' | 'agent';
  profileImage: {public_id: string, secure_url: string};
  newsletterSubscriptions: boolean;
  agents: Schema.Types.ObjectId[];
  properties: Schema.Types.ObjectId[];
  bookmarkedProperties: Schema.Types.ObjectId[];
  notifications: Schema.Types.ObjectId[];
  inspections: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

interface closeLandmark {
  name: string
  distanceAway: string
};

interface fees { 
  name: string; 
  amount: number; 
  description?: string 
};

export interface IProperty extends Document {
  numberOfRooms: number;
  numberOfBath: number;
  numberOfToilets: number;
  area: number;
  agent: Schema.Types.ObjectId;
  closeLandmarks: closeLandmark[];
  images: Schema.Types.ObjectId;
  mainFees: fees[];
  optionalFees: fees[];
  annualRent: number;
  fullPropertyPrice: number;
  address: string;
  title: string;
  furnitureStatus: 'furnished' | 'not-furnished';
  mainAmenities: string[]; 
  optionalAmenities: string[]; 
  availabilityTag: 'available' | 'not-available';
  propertyTag: 'for-rent' | 'for-sale';
  city: string;
  state: string;
  bookmarks: Schema.Types.ObjectId[];
  inspections: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

export interface IAgent extends Document {
  user: Schema.Types.ObjectId;
  agencyName: string;
  agencyAdress: string;
  agentInspectionFee: number;
  agentBio: string;
  agencyWebsite?: string;
  licenseNumber: string;
  officeNumber: string;
  phoneNumber: string;
  ratings: number;
  profileCreated: boolean;
  properties: Schema.Types.ObjectId[];
  clients: Schema.Types.ObjectId[];
  blogs: Schema.Types.ObjectId[];
  inspections: Schema.Types.ObjectId[];
};

export interface INotification extends Document {
  type: string;
  message: string;
  seen: boolean;
  issuer: Schema.Types.ObjectId;
  recipient: Schema.Types.ObjectId;
  property: Schema.Types.ObjectId;
  createdAt: Date;
};

export interface IInspection {
  scheduledAt: Date;
  user: Schema.Types.ObjectId;
  property: Schema.Types.ObjectId;
  agent: Schema.Types.ObjectId; 
};

export interface IBlog extends Document {
  title: string;
  content: string;
  bannerImage: string;
  createdAt: Date;
  author: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  comments: Schema.Types.ObjectId[];
};

export interface IComment extends Document {
  content: string;
  createdAt: Date;
  user: Schema.Types.ObjectId;
  blog: Schema.Types.ObjectId;
};

export interface image {
  public_id: string;
  secure_url: string
};

export interface IAttachment extends Document {
  property: Schema.Types.ObjectId;
  attachments: image[];
  createdAt: Date;
};

export interface INewsletter extends Document {
  user?: Schema.Types.ObjectId;
  email: string;
  createdAt: Date;
};






