import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import localGovernmentAreas from '../assets/localGovernmentAreas.json'

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


