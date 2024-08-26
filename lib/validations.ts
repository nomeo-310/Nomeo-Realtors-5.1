import { z } from 'zod';
import { validatePhoneNumber } from './utils';

const requiredString = z.string().trim().min(1, 'Required field');
const nameRegex = /^\s*\w+\s+\w+\s*$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/

export const signUpSchema = z.object({
  email: requiredString.email('Invalid email address'),
  name: requiredString.regex(nameRegex, 'Only letters and minimum of 3 characters is allowed'),
  password: requiredString.regex(passwordRegex, 'It should contain atleast one uppercase, lowercases, special characters excluding # and not less than 6' )
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
  officeNumber: requiredString,
  agentBio: requiredString,
})

export type agentProfileValues = z.infer<typeof agentProfileSchema>

export const userProfileSchema = z.object({
  city: requiredString,
  state: requiredString,
})

export type userProfileValues = z.infer<typeof userProfileSchema>
