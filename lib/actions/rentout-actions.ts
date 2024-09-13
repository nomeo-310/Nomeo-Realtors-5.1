'use server'

import Agents from "../models/agents";
import Inspections from "../models/inspections";
import Notifications from "../models/notifications";
import Properties from "../models/properties";
import Rentouts from "../models/rentouts";
import Users from "../models/users";
import { connectToMongoDB } from "../utils";
import { getCurrentUser } from "./user-actions";

type createRentProps = {
  propertyId: string;
  inspectionId: string;
  userId: string;
  agentId: string;
}

export const createRent = async ({propertyId, inspectionId, userId, agentId}:createRentProps) => {
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
    const rentOutData = {
      user: userId,
      property: propertyId,
      agent: agentId
    };
  
    const newRentOut = await Rentouts.create(rentOutData)
    newRentOut.save();

    const notificationData = {
      type: 'payment-alerts',
      message: 'You rent payment has been documented and your rent has started reading',
      issuer: user._id,
      recipient: userId,
      property: propertyId,
    };

    const newNotification = await Notifications.create(notificationData)
    newNotification.save();
  
    await Agents.findOneAndUpdate({_id: agentId}, {$pull: {inspections: currentInspection._id}, $push: {clients: userId}})
    await Users.findOneAndUpdate({_id: userId}, {$pull: {inspections: currentInspection._id}, $push: {agents: agentId, properties: propertyId, notifications: newNotification._id}})
    await Inspections.deleteOne({_id: inspectionId})
    await Properties.findOneAndUpdate({_id: propertyId}, {availabilityTag: 'not-available'})
    
    return {success: 'Client successfully added'}
  } catch (error) {
    console.error(error)
    return {error: 'Internal server error'}
  }
};

export const terminateRent = async ({rentoutId}:{rentoutId: string;}) => {
  await connectToMongoDB();

  const user = await getCurrentUser();

  if (!user) {
    return;
  };

  if (user && user.role === 'user') {
    return;
  };

  const rentout = await Rentouts.findOne({_id: rentoutId})

  if (!rentout) {
    return;
  };

  try {
    await Agents.findOneAndUpdate({_id: rentout.agent}, {$pull: {clients: rentout.user}});
    await Properties.findOneAndUpdate({_id: rentout.property}, {availabilityTag: 'available'});
    await Users.findOneAndUpdate({_id: rentout.user}, {$pull: {agents: rentout.agent, properties: rentout.property}});
    await Rentouts.deleteOne(rentout._id);

    return {success: 'Client successfully removed'}
  } catch (error) {
    console.error(error)
    return {error: 'Internal server error'}   
  }

};

