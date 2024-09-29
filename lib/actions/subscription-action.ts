'use server'

import { revalidatePath } from "next/cache";
import Subscriptions from "../models/subscription";
import Users from "../models/users";
import { connectToMongoDB } from "../utils";
import { getCurrentUser } from "./user-actions";

export const subscribeUser = async ({email, path}:{email:string, path:string}) => {
  await connectToMongoDB();

  const user = await getCurrentUser();

  if (!email) {
    return {error: 'Email is required for subscription'}
  };

  const existingSubscription = await Subscriptions.findOne({email: email})

  if (existingSubscription) {
    return {error: 'Email already used for subscription'}
  }

  if (user) {
    const data = {user: user._id, email: email};
    try {
      await Subscriptions.create(data);
      await Users.findOneAndUpdate({_id: user._id}, {newsletterSubscriptions: true})

      revalidatePath(path)
      return {success: 'Subscription was successful'}
    } catch (error) {
      console.error(error);

      return {error: 'Internal server error'}
    }
  } else {
    try {
      const data = {email: email};
      await Subscriptions.create(data);

      revalidatePath(path)
      return {success: 'Subscription was successful'}
    } catch (error) {
      console.error(error);
  
      return {error: 'Internal server error'}
    }
  }


};

export const unSubscribeUser = async (path:string) => {
  await connectToMongoDB();

  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  try {
    await Subscriptions.deleteOne({email: user.email})
    await Users.findOneAndUpdate({_id: user._id}, {newsletterSubscriptions: false})

    revalidatePath(path)
    return {success: 'You have been removed from the Nomeo Realtors subscription list.'}
  } catch (error) {
    console.error(error);

    return {error: 'Internal server error'}
  }
}