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
  propertyId: string;
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
  likes: Schema.Types.ObjectId[];
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
  property: string;
  additionalPhoneNumber: string;
  createdAt: Date;
};

export interface IInspection {
  scheduledAt: Date;
  time: String;
  user: Schema.Types.ObjectId;
  property: Schema.Types.ObjectId;
  agent: Schema.Types.ObjectId; 
  additionalNumber: String;
};

export interface IBlog extends Document {
  title: string;
  intro: string;
  content: string;
  bannerImage: image;
  createdAt: Date;
  author: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  reads: Schema.Types.ObjectId[];
  readTime: string;
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

export type userProps = {
  _id: string
  name: string;
  email: string;
  hashedPassword: string;
  city: string;
  state: string;
  image: string;
  verification: boolean;
  occupation: string;
  phoneNumber: string;
  role: 'user' | 'agent';
  profileImage: { public_id: string, secure_url: string };
  newsletterSubscriptions: boolean;
  isAgent: {
    agencyName: string;
    agencyAddress: string;
    agentInspectionFee: number;
    agentBio: string;
    agencyWebsite: string;
    officeNumber: string;
    phoneNumber: string;
  }
  profileCreated: boolean;
  showLikedProperties: boolean;
  agents: string[];
  properties: string[];
  bookmarkedProperties: string[];
  likedProperties: string[];
  notifications: string[];
  inspections: string[];
  createdAt: string;
  updatedAt: string;
};

export type notificationProps = {
  _id: string
  type: string;
  message: string;
  seen: boolean;
  issuer?: {
    name: string;
    email: string;
    phoneNumber: string;
    image: string;
  },
  inspectionDate?: string;
  inspectionTime?: string;
  recipient: string;
  property?: string;
  createdAt: string;
};

export type propertyProps = {
  _id: string;
  propertyId: string;
  numberOfRooms: number;
  numberOfBath: number;
  numberOfToilets: number;
  area: number;
  agent: {
    _id: string;
    user: {
      _id: string;
      name: string;
      image: string;
    },
    agencyName: string;
    agentInspectionFee: number;
    rating: string;
    agencyWebsite: string;
    licenseNumber: string
  };
  closestLandmarks: closeLandmark[];
  images: {
    attachments: image[]
  };
  mainFees: fees[];
  optionalFees: fees[];
  annualRent: number;
  monthlyRent: number;
  fullPropertyPrice: number;
  annualPayment: number;
  address: string;
  title: string;
  description: string;
  furnitureStatus: string;
  mainAmenities: string[]; 
  optionalAmenities: string[]; 
  availabilityTag: string;
  propertyTag: string;
  city: string;
  state: string;
  bookmarks: string[];
  inspections: string[];
  likes: string[];
  createdAt: string;
  updatedAt: string;
};

export type blogProps = {
  _id: string;
  title: string;
  intro: string;
  content: string;
  bannerImage: image;
  createdAt: string;
  author: {
    agencyName: string;
    agentBio: string;
    licenseNumber: string;
    user: {
      _id: string
      name: string;
      image: string;
    }
  };
  likes: string[];
  reads: string[];
  readTime: string;
  comments: string[];
};

export type inspectionProps = {
  _id: string;
  scheduledAt:  string;
  time: string;
  user:  {
    name: string;
    image: string;
    phoneNumber: string;
    email: string;
    _id: string;
  };
  property: {
    _id: string; 
    propertyId: string;
    address: string; 
    numberOfBath: number; 
    numberOfRooms: number; 
    numberOfToilets: number; 
    annualRent: number; 
    annualPayment: number; 
    monthlyRent: number; 
    city: string; 
    state: string; 
    fullPropertyPrice: number; 
    area: number;
    propertyTag: string;
  },
  agent: string;
  additionalNumber: string;
}






