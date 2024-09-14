'use server'

import { ObjectId } from "mongodb";
import Agents from "../models/agents";
import Attachments from "../models/attachments";
import Properties from "../models/properties";
import Users from "../models/users";
import { connectToMongoDB, generatePropertyId } from "../utils";
import { getCurrentUser } from "./user-actions";
import { revalidatePath } from "next/cache";
import { deleteApartmentImages } from "./deleteApartmentImages";
import Inspections from "../models/inspections";
import Notifications from "../models/notifications";

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

export const createProperty = async ({title, address, propertyTag, furnitureStatus, description, city, state, annualRent, monthlyRent, fullPropertyPrice, annualPayment, numberOfRooms, numberOfBath, numberOfToilets, area, images, mainAmenities, optionalAmenities, mainFees, optionalFees, closestLandmarks}:createPropertyProps) => {
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
      optionalAmenities: optionalAmenities,
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
};

export const getSingleProperty = async (propertyId:string) => {
  await connectToMongoDB();

  try {
    const property = await Properties.findOne({propertyId: propertyId})
    .populate({
      path: 'agent',
      model: Agents,
      select: '_id agencyName agentInspectionFee rating agencyWebsite licenseNumber',
      populate: {
        path: 'user',
        model: Users,
        select: '_id name image'
      }
    })
    .populate({
      path: 'images',
      model: Attachments,
      select: 'attachments'
    })

    const singleProperty = JSON.parse(JSON.stringify(property))
    return singleProperty;
  } catch (error) {
    console.error(error)
    return {error: 'Internal server error'}
  }

};

export const getDeleteProperty = async (propertyId:string) => {
  await connectToMongoDB();

  try {
    const property = await Properties.findOne({_id: propertyId})
    .populate({
      path: 'agent',
      model: Agents,
      select: '_id agencyName agentInspectionFee rating agencyWebsite licenseNumber',
      populate: {
        path: 'user',
        model: Users,
        select: '_id name image'
      }
    })
    .populate({
      path: 'images',
      model: Attachments,
      select: 'attachments'
    })

    const singleProperty = JSON.parse(JSON.stringify(property))
    return singleProperty;
  } catch (error) {
    console.error(error)
    return {error: 'Internal server error'}
  }

};

export const likeProperty = async ({propertyId, path}:{propertyId:string; path:string}) => {
  const newPropertyId = new ObjectId(propertyId);
  const user = await getCurrentUser();

  if (!user) {
    return;
  };

  const property = await Properties.findOne({_id: propertyId})

  if (!property) {
    return;
  };

  const alreadyLiked = property.likes.includes(user._id)

  try {
    if (alreadyLiked) {
      await Properties.findOneAndUpdate({_id: propertyId}, {$pull: {likes: user._id}})
      await Users.findOneAndUpdate({_id: user._id}, {$pull: {likedProperties: newPropertyId}});
  
      revalidatePath(path);
      return { success: "You no longer like this property"};
    };

    await Properties.findOneAndUpdate({_id: propertyId}, {$push: {likes: user._id}})
    await Users.findOneAndUpdate({_id: user._id}, {$push: {likedProperties: newPropertyId}});

    revalidatePath(path);
    return { success: "You like this property"};
  } catch (error) {
    return {error: 'Internal server error, try again later'}
  }
};

export const bookmarkProperty = async ({propertyId, path}:{propertyId:string; path:string}) => {
  await connectToMongoDB();

  const newPropertyId = new ObjectId(propertyId);
  const user = await getCurrentUser();

  if (!user) {
    return;
  };

  const property = await Properties.findOne({_id: propertyId})

  if (!property) {
    return;
  };

  const alreadyLiked = property.bookmarks.includes(user._id)

  try {
    if (alreadyLiked) {
      await Properties.findOneAndUpdate({_id: propertyId}, {$pull: {bookmarks: user._id}})
      await Users.findOneAndUpdate({_id: user._id}, {$pull: {bookmarkedProperties: newPropertyId}});
  
      revalidatePath(path);
      return { success: "This property is removed from your bookmarks"};
    };

    await Properties.findOneAndUpdate({_id: propertyId}, {$push: {bookmarks: user._id}})
    await Users.findOneAndUpdate({_id: user._id}, {$push: {bookmarkedProperties: newPropertyId}});

    revalidatePath(path);
    return { success: "This property has been added to your bookmarks"};
  } catch (error) {
    return {error: 'Internal server error, try again later'}
  }
};

export const deleteProperty = async (id:string) => {
  await connectToMongoDB();

  const user = await getCurrentUser();
  const property = await Properties.findOne({_id: id})
  const images = await Attachments.findOne({property: id})

  if (!user) {
    return;
  }

  if (user.role === 'user') {
    return;
  }

  if (!property) {
    return;
  }

  try {
   const imageArray = JSON.parse(JSON.stringify(images)).attachments;
   
    await deleteApartmentImages(imageArray)
    await Agents.findOneAndUpdate({_id: user.isAgent}, {$pull: {property: property._id}})
    await Inspections.deleteMany({property: property._id})
    await Notifications.deleteMany({property: property._id})
    await Properties.deleteOne({_id: property._id});

    return {success: 'Property successfully deleted'}
  } catch (error) {
    console.error(error);
    
    return {error: 'Internal server error'}
  }
}