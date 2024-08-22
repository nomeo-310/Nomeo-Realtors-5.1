'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Agents from "../models/agents";
import Users from "../models/users"
import { connectToMongoDB } from "../utils"
import bcryptjs from "bcryptjs";
import { getServerSession } from "next-auth";

type createUserProps = {
  name: string,
  email: string
  password: string
  phoneNumber?: string
  role: string
};


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

  if (!user) {
    return;
  };

  const currentUser = JSON.parse(JSON.stringify(user))

  return currentUser;
}