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

export const capitalizeName = (name:string) => {
  if (name !== undefined) {
    const separatedNames = name.split(' ');
    const firstName = separatedNames[0].charAt(0).toUpperCase() + separatedNames[0].slice(1);
    const lastName = separatedNames[1].charAt(0).toUpperCase() + separatedNames[1].slice(1);
    const fullName = firstName + ' ' + lastName;

    return { fullName, firstName, lastName }
  }

  return { fullName: undefined, firstName: undefined, lastName: undefined }
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

export const validatePhoneNumber = (phoneNumber:string) => {
  const phoneRegex = /^\d{11}$/;
  const phoneNumberStartValue = phoneNumber.slice(0,4);
  const startValueList = [
    '0701', '0703', '0704', '0705', '0706', '0707', '0708', '0802','0803','0804','0805','0806','0807','0808','0809','0810','0811','0812','0813',
    '0814','0815','0816','0817','0818','0819','0909','0908','0901','0902','0903','0904','0905','0906','0907','0915','0913','0912','0916','0911'];

  const isElevenDigits = phoneRegex.test(phoneNumber);
  const isValidPhoneNumber = startValueList.includes(phoneNumberStartValue) && !Number.isNaN(Number(phoneNumber));

  return isElevenDigits && isValidPhoneNumber
};

export const uploadImage = async ({image, uploadPreset}:{image: File | null, uploadPreset:string}) => {
  if (!image) return;

  const formData = new FormData();
  formData.append('file', image as File);
  formData.append('upload_preset', `${uploadPreset}`);
  const data = await fetch('https://api.cloudinary.com/v1_1/dqj9nko02/image/upload', {
    method: 'POST',
    body: formData
  })
  .then((response) => response.json());

  return data;
};

export const formatTime = ({date, time}:{date:Date, time:string}) => {

  if (date as Date && time !== '') {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const dateValue = newDate.getDate();
    const month = newDate.getMonth();
    let hour = parseInt(time.split(':')[0]);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const ampm = hour >= 12 ? "PM" : "AM";
  
    hour = hour % 12;
    hour = hour ? hour : 12;

    const formatedDate = dateValue + ' ' + months[month]+',' + ' ' + year;
    const formatedTimeString = dateValue + ' ' + months[month] + ' ' + year + ' ' + 'by' + ' ' + hour + '' + ampm;
   return { formatedTimeString, formatedDate };
  };

  return;
};

export const formatDate = (date:string) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const dateValue = newDate.getDate();
  const month = newDate.getMonth();

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const formatedDate = dateValue + ' ' + months[month]+',' + ' ' + year;

  return formatedDate;
};



