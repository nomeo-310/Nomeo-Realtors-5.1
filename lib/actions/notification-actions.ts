'use server'

import Notifications from "../models/notifications";
import { connectToMongoDB } from "../utils";
import { getCurrentUser } from "./user-actions";

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
}