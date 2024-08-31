import { z } from 'zod';
import { validatePhoneNumber } from './utils';

const requiredString = z.string().trim().min(1, 'Required field');
const nameRegex = /^\s*\w+\s+\w+\s*$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/

export const signUpSchema = z.object({
  email: requiredString.email('Invalid email address'),
  name: requiredString.regex(nameRegex, 'Only letters and minimum of 3 characters is allowed'),
  password: requiredString.regex(passwordRegex, 'It should contain atleast one uppercase, lowercases, special characters excluding # and not less than 6' ),
  phoneNumber: requiredString.refine(validatePhoneNumber, {message: 'Phone number should be 11 digits and must be a valid one'})
});

export type signUpValues = z.infer<typeof signUpSchema>

export const agentSignUpSchema = z.object({
  email: requiredString.email('Invalid email address'),
  name: requiredString.regex(nameRegex, 'Only letters and minimum of 3 characters is allowed'),
  password: requiredString.regex(passwordRegex, 'It should contain atleast one uppercase, lowercases, special characters excluding # and not less than 6' ),
  phoneNumber: requiredString.refine(validatePhoneNumber, {message: 'Phone number should be 11 digits and must be a valid one'})
});

export type agentSignUpValues = z.infer<typeof agentSignUpSchema>


export const logInSchema = z.object({
  email: requiredString,
  password: requiredString
});

export type logInValues = z.infer<typeof logInSchema>

export const agentProfileSchema = z.object({
  city: requiredString,
  state: requiredString,
  agencyName: requiredString,
  agencyAddress: requiredString,
  agentInspectionFee: requiredString,
  agencyWebsite: z.string().optional(),
  officeNumber: requiredString.refine(validatePhoneNumber, {message: 'Phone number should be 11 digits and must be a valid one'}),
  agentBio: requiredString,
})

export type agentProfileValues = z.infer<typeof agentProfileSchema>

export const userProfileSchema = z.object({
  city: requiredString,
  state: requiredString,
  occupation: z.string().optional()
})

export type userProfileValues = z.infer<typeof userProfileSchema>

const numberSchema = z.string().transform((value) => {
  const parsedNumber = Number(value);

  if (isNaN(parsedNumber)) {
    throw new Error('Invalid number format');
  };

  return parsedNumber;
})


export const addPropertySchema = z.object({
  title: requiredString,
  address: requiredString,
  propertyTag: requiredString,
  furnitureStatus: requiredString,
  description: requiredString.max(600, 'Maximum of 600 characters'),
  city: requiredString,
  state: requiredString,
  numberOfRooms: z.string().transform((value) => {
  const parsedNumber = Number(value);

  if (isNaN(parsedNumber)) {
    throw new Error('Invalid number format');
  };

  return parsedNumber;
}),
  numberOfBath: z.string().transform((value) => {
  const parsedNumber = Number(value);

  if (isNaN(parsedNumber)) {
    throw new Error('Invalid number format');
  };

  return parsedNumber;
}),
  numberOfToilets: z.string().transform((value) => {
  const parsedNumber = Number(value);

  if (isNaN(parsedNumber)) {
    throw new Error('Invalid number format');
  };

  return parsedNumber;
}),
  area: z.string().transform((value) => {
  const parsedNumber = Number(value);

  if (isNaN(parsedNumber)) {
    throw new Error('Invalid number format');
  };

  return parsedNumber;
}),
})

export type addPropertyValues = z.infer<typeof addPropertySchema>
