'use server'

import Agents from "../models/agents";
import Inspections from "../models/inspections";
import Properties from "../models/properties";
import Soldouts from "../models/soldouts";
import Users from "../models/users";
import { connectToMongoDB } from "../utils";
import { getCurrentUser } from "./user-actions";

type createRentProps = {
  propertyId: string;
  inspectionId: string;
  userId: string;
  agentId: string;
}

export const createSale = async ({propertyId, inspectionId, userId, agentId}:createRentProps) => {
  await connectToMongoDB();

  const user = await getCurrentUser();

  if (!user) {
    return;
  };

  if (user && user.role === 'user') {
    return;
  };

  const currentInspection = await Inspections.findOne({_id: inspectionId})

  if (!currentInspection) {
    return;
  }

  const property = await Properties.findOne({_id: propertyId})

  if (!property) {
    return;
  };

  try {
    const soldOutData = {
      user: userId,
      property: propertyId,
      agent: agentId
    };
  
    const newSoldOut = await Soldouts.create(soldOutData)
    newSoldOut.save();
  
    await Agents.findOneAndUpdate({_id: agentId}, {$pull: {inspections: currentInspection._id}})
    await Users.findOneAndUpdate({_id: userId}, {$pull: {inspections: currentInspection._id}})
    await Inspections.deleteOne({_id: inspectionId})
    await Properties.findOneAndUpdate({_id: propertyId}, {availabilityTag: 'not-available'})
    
    return {success: ''}
  } catch (error) {
    return {error: 'Internal server error'}
  }
}