'use server'

import Notifications from "../models/notifications";
import Users from "../models/users";
import { connectToMongoDB } from "../utils";
import { getCurrentUser } from "./user-actions";
import { ObjectId } from 'mongodb';

export const getUserNotification = async () => {
  await connectToMongoDB();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  };

  try {
    const notificationCount = await Notifications.countDocuments({recipient: currentUser?._id, seen: false});

    return notificationCount;
  } catch (error) {
    console.error(error);
    
    return;
  }
};

export const deleteNotification = async (notificationId: string) => {
  await connectToMongoDB();

  const currentUser = await getCurrentUser();

  const newNotificationId = new ObjectId(notificationId)

  if (!currentUser) {
    return;
  }

  try {
    await Users.findOneAndUpdate({_id: currentUser._id}, {$pull: {notifications: newNotificationId}})
    await Notifications.deleteOne({_id: newNotificationId});

    return {success: 'Notification deleted successfully'}
  } catch (error) {
    console.error(error);

    return {error: 'Internal server error'}
  }

};

export const getSingleNotification = async (notificationId: string) => {
  await connectToMongoDB();

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return;
  }

  try {
    const notification = await Notifications.findOne({_id: notificationId})
    .populate({
      path: 'issuer',
      model: Users,
      select: 'name email phoneNumber image'
    })

    const returnedNotification = JSON.parse(JSON.stringify(notification))
    return returnedNotification;
  } catch (error) {
    
  }
};