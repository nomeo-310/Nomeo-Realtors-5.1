'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Agents from "../models/agents";
import Users from "../models/users"
import { connectToMongoDB, generateLicenseNumber } from "../utils"
import bcryptjs from "bcryptjs";
import { getServerSession } from "next-auth";
import Notifications from "../models/notifications";
import { revalidatePath } from "next/cache";
import { deleteCloudinaryImages } from "./deleteProfileImage";

type createUserProps = {
  name: string,
  email: string
  password: string
  phoneNumber?: string
  role: string
};

type updateAgentProps = {
  profileImage: { public_id: string, secure_url: string };
  isNewImage: boolean;
  city: string;
  state: string;
  agencyName: string;
  agencyAddress: string;
  agentInspectionFee: string;
  agencyWebsite?: string;
  officeNumber: string;
  agentBio: string;
}

type updateUserProps = {
  profileImage: { public_id: string, secure_url: string };
  isNewImage: boolean;
  city: string;
  state: string;
}



export const createUser = async ({name, email, password, phoneNumber, role}:createUserProps) => {
  await connectToMongoDB();

  try {
    const existingUser = await Users.findOne({email: email, name: name.toLowerCase()})
    
    if (existingUser) {
      return {error: role === 'user' ? 'User already exists, go ahead and login': 'Agent already exists, go ahead and login'}
    };

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userData = {name: name.toLowerCase(), email: email, hashedPassword: hashedPassword, role: role};
    const newUser = await Users.create(userData);
    newUser.save();

    if (role === 'agent') {
      const agentData = {user: newUser._id, phoneNumber: phoneNumber}
      const newAgent = await Agents.create(agentData);
      newAgent.save();

      await Users.findOneAndUpdate({_id: newUser._id}, {isAgent: newAgent._id})
    }

    return { success: role === 'user' ? 'User successfully created' : 'Agent successfully created' }
  } catch (error) {
    console.error(error);
    return { error: 'Internal server error' }
  }
};

export const getUserByEmail = async (email:string) => {
  await connectToMongoDB();

  const user = await Users.findOne({email: email})

  if (!user) {
    return;
  }

  const userData = JSON.parse(JSON.stringify(user))

  return userData;
};

export const getUserSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
  await connectToMongoDB();

  const currentUserSession = await getUserSession();

  if (!currentUserSession?.user?.email) {
    return;
  };

  const user = await Users.findOne({email: currentUserSession.user.email})
  .select('-hashedPassword')
  .populate({
    path: 'isAgent',
    model: Agents,
    select: '_id agencyName agencyAddress agentInspectionFee agentBio agencyWebsite officeNumber phoneNumber'
  })

  if (!user) {
    return;
  };

  const currentUser = JSON.parse(JSON.stringify(user))

  return currentUser;
};

export const updateAgentProfile = async ({ profileImage, city, state, agencyName, agencyAddress, agentInspectionFee, officeNumber, agentBio, agencyWebsite, isNewImage }:updateAgentProps) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {error: 'Unauthorized!'}
  };

  if (currentUser.role !== 'agent') {
    return {error: 'Unauthorized!'}
  };

  const oldPublicId = currentUser.profileImage.public_id;

  if (isNewImage) {
    deleteCloudinaryImages(oldPublicId)
  }

  const licenseNumber = generateLicenseNumber();

  const updateUserData = {
    city: city,
    profileImage: profileImage,
    state: state,
    image: profileImage.secure_url,
    profileCreated: true
  };

  const userData = {
    city: city,
    profileImage: profileImage,
    state: state,
    image: profileImage.secure_url,
  };

  const updateAgentData = {
    agencyName: agencyName,
    agencyAddress: agencyAddress,
    agentInspectionFee: parseInt(agentInspectionFee),
    agentBio: agentBio,
    agencyWebsite: agencyWebsite,
    licenseNumber: licenseNumber,
    officeNumber: officeNumber,
  };

  const updateData = {
    agencyName: agencyName,
    agencyAddress: agencyAddress,
    agentInspectionFee: parseInt(agentInspectionFee),
    agentBio: agentBio,
    agencyWebsite: agencyWebsite,
    officeNumber: officeNumber,
  }

  const notificationData = {
    message: `Welcome to Nomeo Realtors, we are glad to have you around and your license number is ${licenseNumber}`,
    recipient: currentUser._id,
  };

  try {

    if (currentUser.profileCreated === false) {
      await Users.findOneAndUpdate({_id: currentUser._id}, updateUserData);
      await Agents.findOneAndUpdate({user: currentUser._id}, updateAgentData);
  
      const newNotification = await Notifications.create(notificationData)
      newNotification.save();
    };

    await Users.findOneAndUpdate({_id: currentUser._id}, userData);
    await Agents.findOneAndUpdate({user: currentUser._id}, updateData);

    revalidatePath('/')
    return {success: 'Profile successfully updated!'}
  } catch (error) {
    return {error: 'Internal server error'}
  }
};

export const updateUserProfile = async ({ profileImage, city, state, isNewImage }:updateUserProps) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {error: 'Unauthorized!'}
  };

  if (currentUser.role !== 'user') {
    return {error: 'Unauthorized!'}
  };

  const oldPublicId = currentUser.profileImage.public_id;

  if (isNewImage) {
    deleteCloudinaryImages(oldPublicId)
  }

  const updateUserData = {
    city: city,
    profileImage: profileImage,
    state: state,
    image: profileImage.secure_url,
    profileCreated: true
  };

  const userData = {
    city: city,
    profileImage: profileImage,
    state: state,
    image: profileImage.secure_url,
  };

  const notificationData = {
    message: 'Welcome to Nomeo Realtors, we are glad to have you around. You have successfully created your profile',
    recipient: currentUser._id,
  };

  try {
    if (currentUser.profileCreated === false) {
      await Users.findOneAndUpdate({_id: currentUser._id}, updateUserData);
  
      const newNotification = await Notifications.create(notificationData)
      newNotification.save();
    }

    await Users.findOneAndUpdate({_id: currentUser._id}, userData);

    revalidatePath('/')
    return {success: 'Profile successfully updated!'}
  } catch (error) {
    return {error: 'Internal server error'}
  }
};