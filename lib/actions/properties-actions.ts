'use server'

import Agents from "../models/agents";
import Attachments from "../models/attachments";
import Properties from "../models/properties";
import { connectToMongoDB, generatePropertyId } from "../utils";
import { getCurrentUser } from "./user-actions";

type imageProps = {
  public_id:string;
  secure_url:string;
};

type feesProps = {
  name: string;
  amount: number;
};

type landmarkProps = {
  name: string;
  distanceAway: string;
};

type createPropertyProps = {
  title: string;
  address: string;
  propertyTag: string;
  furnitureStatus: string;
  description: string;
  city: string; 
  state: string;
  annualRent?: number;
  monthlyRent?: number
  fullPropertyPrice?: number;
  annualPayment?: number;
  numberOfRooms: number;
  numberOfBath: number;
  numberOfToilets: number;
  area: number;
  images: imageProps[];
  mainAmenities: string[];
  optionalAmenities?: string[];
  mainFees: feesProps[];
  optionalFees: feesProps[];
  closestLandmarks: landmarkProps[]
};

export const createProperty = async ({title, address, propertyTag, furnitureStatus, description, city, state, annualRent, monthlyRent, fullPropertyPrice, annualPayment, numberOfRooms, numberOfBath, numberOfToilets, area, images, mainAmenities, mainFees, optionalFees, closestLandmarks}:createPropertyProps) => {
  await connectToMongoDB();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {error: 'Unauthorized!'}
  };

  if (currentUser.role !== 'agent') {
    return {error: 'Unauthorized!'}
  };

  try {
    const newAttachmentData = {
      attachments: images
    };

    const newAttachment = await Attachments.create(newAttachmentData)
    newAttachment.save();

    const propertyId = generatePropertyId();

    const newPropertyData = {
      propertyId: propertyId,
      title: title,
      address: address,
      propertyTag: propertyTag,
      furnitureStatus: furnitureStatus,
      description: description,
      city: city, 
      state: state,
      annualRent: annualRent,
      monthlyRent: monthlyRent,
      fullPropertyPrice: fullPropertyPrice,
      annualPayment: annualPayment,
      numberOfRooms: numberOfRooms,
      numberOfBath: numberOfBath,
      numberOfToilets: numberOfToilets,
      area: area,
      images: newAttachment._id,
      mainAmenities: mainAmenities,
      mainFees: mainFees,
      optionalFees: optionalFees,
      closestLandmarks: closestLandmarks,
      agent: currentUser.isAgent,
    };

    const newProperty = await Properties.create(newPropertyData)
    newProperty.save();

    await Attachments.findOneAndUpdate({_id: newAttachment._id}, {property: newProperty._id});
    await Agents.findOneAndUpdate({user: currentUser._id}, {$push: {properties: newProperty._id}});

    return {success: 'Property successfully created'}
  } catch (error) {
    return {error: 'Internal server error, try again later'}
  }
}