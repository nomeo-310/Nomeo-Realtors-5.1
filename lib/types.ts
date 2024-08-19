import { Schema } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  hashedPassword: string;
  city: string;
  state: string;
  image: string;
  verification: boolean;
  role: 'user' | 'agent';
  phoneNumber: string;
  address: string;
  newsletterSubscriptions: boolean;
  agent: Schema.Types.ObjectId[];
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

export interface IProperty {
  numberOfRooms: number;
  numberOfBath: number;
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

export interface IAgent {
  user: Schema.Types.ObjectId;
  city: string;
  state: string;
  agencyName: string;
  agencyAdress: string;
  agentInspectionFee: number;
  agentBio: string;
  agencyWebsite: string;
  licenseNumber: string;
  phoneNumber: string;
  officeNumber: string;
  ratings: number;
  properties: Schema.Types.ObjectId[];
  clients: Schema.Types.ObjectId[];
  blogs: Schema.Types.ObjectId[];
  inspections: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

export interface INotification {
  type: string;
  message: string;
  seen: boolean;
  user: Schema.Types.ObjectId;
  property: Schema.Types.ObjectId;
  createdAt: Date;
};

export interface IInspection {
  scheduledAt: Date;
  status: 'pending' | 'confirmed' | 'canceled';
  user: Schema.Types.ObjectId;
  property: Schema.Types.ObjectId;
  agent: Schema.Types.ObjectId; 
};

export interface IBlog {
  title: string;
  content: string;
  bannerImage: string;
  createdAt: Date;
  author: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  comments: Schema.Types.ObjectId[];
};

export interface IComment {
  content: string;
  createdAt: Date;
  user: Schema.Types.ObjectId;
  blog: Schema.Types.ObjectId;
};

export interface image {
  public_id: string;
  secure_url: string
};

export interface IAttachment {
  property: Schema.Types.ObjectId;
  attachments: image[];
  createdAt: Date;
};




