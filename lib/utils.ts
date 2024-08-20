import React from "react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import localGovernmentAreas from '../assets/localGovernmentAreas.json'
import crypto from 'crypto'
import mongoose from 'mongoose'

type stateProps = {
  state: string
  lgas: string[]
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export const getNigerianStates = () => {
  const lgasArray:stateProps[] = JSON.parse(JSON.stringify(localGovernmentAreas))
  const states = (lgasArray.map((item) => item.state))

  return states;
};


export const getNigerianLgas = (state:string) => {
  const lgasArray:stateProps[] = JSON.parse(JSON.stringify(localGovernmentAreas))
  const lgas = (lgasArray.filter((item) => item.state === state)).flatMap((item) => item.lgas)

  return lgas;
};

export const generateLicenseNumber = () => {
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  const randomPart = random.substring(0, 5);
  const licenseNumber = `Agent-${randomPart}`

  return licenseNumber;
};

export const connectToMongoDB = async () => {
  const MONGODB_URI=process.env.MONGODB_URI as string;

  if (mongoose.connections[0].readyState) {
    return;
  };

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('mongodb connection is successful');
  } catch (error) {
    console.log("Error connecting to mongodb");
  }
};

export const useCountdownTimer = (date:string) => {
  
  const [days, setDays] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    const timeInterval = setInterval(() => {
      const now = new Date();
      const targetDate = new Date(date);
      const difference = targetDate.getTime() - now.getTime();

      const days  = Math.floor(difference / (1000*60*60*24));
      const hours  = Math.floor((difference / (1000*60*60)) % 24);
      const minutes  = Math.floor((difference / (1000*60)) % 60);
      const seconds  = Math.floor((difference / (1000)) % 60);

      setDays(days);
      setHours(hours)
      setMinutes(minutes)
      setSeconds(seconds)
    }, 1000);

    return () => clearInterval(timeInterval)
  },[date]);

  return { days, hours, minutes, seconds }
};

export const formatTargetDate = (value:string) => {
    const targetDate = new Date(value);
    targetDate.setFullYear(targetDate.getFullYear() + 1);
  return targetDate;
};



