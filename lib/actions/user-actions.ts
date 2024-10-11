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
import { ObjectId } from "mongodb";
import Attachments from "../models/attachments";
import { deleteApartmentImages } from "./deleteApartmentImages";
import Properties from "../models/properties";
import Inspections from "../models/inspections";
import Rentouts from "../models/rentouts";

type createUserProps = {
  name: string,
  email: string
  password: string
  phoneNumber: string
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
  occupation?: string;
}

type updateCoverProps = {
  path: string;
  coverImage: { public_id: string, secure_url: string };
}

type changePasswordProps = {
  newPassword: string; 
  oldPassword: string;
  path: string
}

type changeEmailProps = {
  newEmail: string;
  path: string;
};

interface imageData {
  _id: string;
  public_id: string;
  secure_url: string;
}



export const createUser = async ({name, email, password, phoneNumber, role}:createUserProps) => {
  await connectToMongoDB();

  try {
    const existingUser = await Users.findOne({email: email, name: name.toLowerCase()})
    
    if (existingUser) {
      return {error: role === 'user' ? 'User already exists, go ahead and login': 'Agent already exists, go ahead and login'}
    };

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userData = {name: name.toLowerCase(), email: email, hashedPassword: hashedPassword, role: role, phoneNumber:phoneNumber};
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

  try {
    const user = await Users.findOne({email: currentUserSession.user.email})
    .select('-hashedPassword')
    .populate({
      path: 'isAgent',
      model: Agents,
      select: '_id agencyName agencyAddress agentInspectionFee agentBio agencyWebsite officeNumber phoneNumber showBookmarkUsers'
    });
    if (!user) {
      return;
    };
  
    const currentUser = JSON.parse(JSON.stringify(user))
  
    return currentUser;
    
  } catch (error) {
    console.error(error)
    return;
  }



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

export const updateUserProfile = async ({ profileImage, city, state, isNewImage, occupation }:updateUserProps) => {
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
    occupation: occupation,
    image: profileImage.secure_url,
    profileCreated: true
  };

  const userData = {
    city: city,
    profileImage: profileImage,
    state: state,
    occupation: occupation,
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

export const updateCoverImage = async ({path, coverImage}:updateCoverProps) => {
  await connectToMongoDB();

  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  try {
    const oldCoverImage = user.coverImage;
  
    if (oldCoverImage.public_id !== '') {
      deleteCloudinaryImages(oldCoverImage.public_id)
    }
  
    await Users.findOneAndUpdate({_id: user._id}, {coverImage: coverImage})
     
    revalidatePath(path)
    return {success: oldCoverImage.public_id !== '' ? 'Cover image updated successfully': 'Cover image set successfully.'}
  } catch (error) {

    return { error: 'Internal server error, try again later'}
  }
    
};

export const showProperties = async (path:string) => {
  await connectToMongoDB();

  const user = await getCurrentUser();

  if (!user) {
    return;
  }

  const alreadyShowingLikedProperties = user.showLikedProperties === true;

  if (alreadyShowingLikedProperties) {
    try {
      await Users.findOneAndUpdate({_id: user._id}, {showLikedProperties: false})
      
      revalidatePath(path)
      return {success: 'All your liked properties will be now be hidden.'}
    } catch (error) {
      console.error(error)

      return {error: 'Internal server error'}
    }
  }

  try {
    await Users.findOneAndUpdate({_id: user._id}, {showLikedProperties: true})
    
    revalidatePath(path);
    return {success: 'All your liked properties will be now be displayed.'}
  } catch (error) {
    console.error(error)

    return {error: 'Internal server error'}
  }

};

export const showBlogs = async (path:string) => {
  await connectToMongoDB();

  const user = await getCurrentUser();

  if (!user) {
    return;
  };

  const alreadyShowingLikedBlogs = user.showLikedBlogs;

  if (alreadyShowingLikedBlogs) {
    try {
      await Users.findOneAndUpdate({_id: user._id}, {showLikedBlogs: false})
  
      revalidatePath(path);
      return {success: 'All your liked blogs will be now be hidden.'}
    } catch (error) {
      console.error(error)

      return {error: 'Internal server error'}
    }
  }

  try {
    await Users.findOneAndUpdate({_id: user._id}, {showLikedBlogs: true})

    revalidatePath(path);
    return {success: 'All your liked blogs will be now be displayed on the the dashboard.'}
  } catch (error) {
    console.error(error)

    return {error: 'Internal server error'}
  }
};

export const allowNotification = async (path:string) => {
  await connectToMongoDB();

  const user = await getCurrentUser();

  if (user.role !== 'agent') {
    return;
  }

  const alreadyAllowedNotification = user.isAgent.showBookmarkUsers === true;

  if (alreadyAllowedNotification) {
    try {
      await Agents.findOneAndUpdate({_id: user.isAgent._id}, {showBookmarkUsers: false})

      revalidatePath(path);
      return {success: 'You will no longer be notified when users bookmark any of your property.'}
    } catch (error) {
      console.error(error)

      return {error: 'Internal server error'}
    }
  }

  try {
    await Agents.findOneAndUpdate({_id: user.isAgent._id}, {showBookmarkUsers: true})

    revalidatePath(path);
    return {success: 'You will now be notified when users bookmark any of your property.'}
  } catch (error) {
    console.error(error)

    return {error: 'Internal server error'}
  }
};

export const changePassword = async ({newPassword, oldPassword, path}:changePasswordProps) => {
  await connectToMongoDB();

  const user = await getCurrentUser()

  if (!user) {
    return;
  }

  const rawUserData = await Users.findOne({email: user.email})

  if (!rawUserData) {
    return;
  }

  const oldHashedPassword = rawUserData.hashedPassword;
  const passwordMatch = await bcryptjs.compare(oldPassword, oldHashedPassword);

  if (!passwordMatch) {
    return {error: 'Old password is incorrect'}
  }

  const newHashedPassword = await bcryptjs.hash(newPassword, 10);

  try {
    await Users.findOneAndUpdate({email: user.email}, {hashedPassword: newHashedPassword})

    revalidatePath(path);
    return {success: 'Password successfully changed.'}
  } catch (error) {
    console.error(error)

    return {error: 'Internal server error'}
  }
};

export const changeEmail = async ({newEmail, path}:changeEmailProps) => {
  await connectToMongoDB();

  const user = await getCurrentUser()

  if (!user) {
    return;
  }

   try {
    await Users.findOneAndUpdate({_id: user._id}, {email: newEmail})

    revalidatePath(path);
    return {success: 'Email successfully changed.'}
   } catch (error) {
    console.error(error)

    return {error: 'Internal server error'}
   }
};

export const deleteUserAccount = async () => {
  await connectToMongoDB();

  const user = await getCurrentUser()

  if (!user) {
    return;
  }

  if (user.role === 'agent') {
    try {
      const agent = await Agents.findOne({_id: user.isAgent})
  
      const agentProperties = agent?.properties;
      const attachmentsArrays = await Attachments.find({property: {$in: agentProperties}}).select('attachments');
      const attachments = JSON.parse(JSON.stringify(attachmentsArrays)).map((item: { attachments: imageData; }) => item.attachments);
      const imageArray = attachments.flatMap((arr: imageData) => arr)
  
      await deleteApartmentImages(imageArray);
      deleteCloudinaryImages(user.profileImage.public_id)
      deleteCloudinaryImages(user.coverImage.public_id)
      await Agents.deleteOne({_id: user.isAgent});
      await Properties.deleteMany({agent: user.isAgent})
      await Notifications.deleteMany({recipient: user._id})
      await Inspections.deleteMany({agent: user.isAgent})
      await Users.deleteOne({_id: user._id})
      
      return {success: 'Account successfully deleted.'}
    } catch (error) {
      console.error(error)

      return {error: 'Internal server error'}      
    }
  }

  try {
    deleteCloudinaryImages(user.profileImage.public_id)
    deleteCloudinaryImages(user.coverImage.public_id)
    await Notifications.deleteMany({recipient: user._id})
    await Inspections.deleteMany({user: user._id})
    await Users.deleteOne({_id: user._id})
    
    return {success: 'Account successfully deleted.'}
  } catch (error) {
    console.error(error)

    return {error: 'Internal server error'}      
  }

};

export const getAgent = async (licenseNumber:string) => {
  await connectToMongoDB();

  const user = await getCurrentUser();

  if (!user) {
    return;
  };

  try {
    const agent = await Agents.findOne({licenseNumber: licenseNumber})
    .populate({
      path: 'user',
      model: Users,
      select: 'name image _id coverImage createdAt'
    })
    
    const singleAgent = JSON.parse(JSON.stringify(agent))
    return singleAgent;
  } catch (error) {
    console.log(error)

    return {error: 'Internal server error'}
  }

};

export const becomeAnAgent = async (path:string) => {
  await connectToMongoDB();

  const user = await getCurrentUser();

  if (!user) {
    return;
  };

  if (user.role === 'agent') {
    return;
  };

  try {
    const agentData = {user: user._id, phoneNumber: user.phoneNumber}
    const newAgent = await Agents.create(agentData);
    newAgent.save();

    const rentedApartments = await Rentouts.findOne({user: user._id});

    if (rentedApartments) {
      await Properties.updateMany({_id: {$in: user.properties}}, {availabilityTag: 'available'})
      await Rentouts.deleteMany({user: user._id})
      await Agents.updateMany({_id: {$in: user.agents}}, {$pull: {clients: rentedApartments.user}})
      await Notifications.deleteMany({type: 'payment-alerts', recipient: user._id})
    };

    await Users.findOneAndUpdate({_id: user._id}, {occupation: '', profileCreated: false, phoneNumber: '', role: 'agent', inspections: [], agents: [], properties: [], notifications: [], isAgent: newAgent._id});

    revalidatePath(path);
    return {success: 'You are now an agent, welcome to Nomeo Realtors'}
  } catch (error) {
    console.log(error)

    return {error: 'Internal server error, try again later.'}
  };
}