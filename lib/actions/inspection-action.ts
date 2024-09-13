'use server'

import Agents from "../models/agents";
import Inspections from "../models/inspections";
import Notifications from "../models/notifications";
import Properties from "../models/properties";
import Users from "../models/users";
import { connectToMongoDB } from "../utils";
import { getCurrentUser } from "./user-actions";

type createInspectionProps = {
  date: Date;
  time: string;
  property: string;
  additionalPhoneNumber?: string;
  agent: string;
}

type cancelInspectionProps = {
  inspectionId: string;
  agentId: string;
}

export const createInspection = async ({date, time, property, additionalPhoneNumber, agent }:createInspectionProps) => {
  await connectToMongoDB();

  const user = await getCurrentUser();

  if (!user) {
    return;
  };

  const propertyAgent = await Agents.findOne({_id: agent});

  if (!propertyAgent) {
    return;
  };

  const currentProperty = await Properties.findOne({propertyId: property})

  if (!currentProperty) {
    return;
  }

  const existingInspection = await Inspections.findOne({user: user._id, property: currentProperty._id})

  if (existingInspection) {
    return {error: 'You have schedule an inspection for this property initially, cancel it to make a new one.'}
  };

  const inspectionData = {
    user: user._id,
    scheduledAt: date,
    time: time,
    property: currentProperty._id,
    agent: agent,
    additionalNumber: additionalPhoneNumber
  };

  try {
    const newInspection = await Inspections.create(inspectionData)
    newInspection.save();

    const notificationData = {
      type: 'inspections',
      message: 'You have been scheduled for an inspection of one of your properties',
      inspectionDate: date,
      inspectionTime: time,
      issuer: user._id,
      recipient: propertyAgent.user,
      additionalPhoneNumber: additionalPhoneNumber,
      property: property,
    };

    await Users.findOneAndUpdate({_id: user._id}, {$push: {inspections: newInspection._id}})
    await Agents.findOneAndUpdate({_id: agent}, {$push: {inspections: newInspection._id}})

    const newNotification = await Notifications.create(notificationData)
    newNotification.save();

    await Users.findOneAndUpdate({_id: propertyAgent.user}, {$push: {notifications: newNotification._id}})

    return {success: 'Inspection successfully booked. You will be contacted by the agent soon.'}
  } catch (error) {
    console.error(error)
    return {error: 'Internal server error, try again later'}
  }
};

export const cancelInspection = async ({inspectionId, agentId}:cancelInspectionProps) => {
  await connectToMongoDB();

  const user = await getCurrentUser();

  if (!user) {
    return;
  };

  try {
    await Inspections.deleteOne({_id: inspectionId, user: user._id})

    await Users.findOneAndUpdate({_id: user._id}, {$pull: {inspections: inspectionId}})
    await Agents.findOneAndUpdate({_id: agentId}, {$pull: {inspections: inspectionId}})

    return {success: 'Inspection successfully cancelled.'}
  } catch (error) {
    console.error(error)
    return {error: 'Internal server error, try again later'}
  }
};

export const getCancelledInspection = async ({inspectionId, agentId}:cancelInspectionProps) => {
  await connectToMongoDB();

  const user = await getCurrentUser();

  if (!user) {
    return;
  };

  try {
    const inspection = await Inspections.findOne({_id: inspectionId, user: user._id})
    .populate({
      path: 'user',
      model: Users,
      select: 'name image phoneNumber email _id'
    })
    .populate({
      path: 'property',
      model: Properties,
      select: '_id propertyId address numberOfBath numberOfRooms numberOfToilets annualRent annualPayment monthlyRent city state fullPropertyPrice area propertyTag'      
    })
    .populate({
      path: 'agent',
      model: Agents,
      select: 'agencyName agencyAddress officeNumber phoneNumber agentInspectionFee',
      populate: {
        path: 'user',
        model: Users,
        select: 'name image'
      }
    })

    const cancelledInspection = JSON.parse(JSON.stringify(inspection));
    return cancelledInspection;

  } catch (error) {
    console.error(error)
    return {error: 'Internal server error, try again later'}
  }
}
