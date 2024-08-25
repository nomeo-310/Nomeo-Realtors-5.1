'use client'

import React from "react";
import { Dispatch, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

interface FormValuesType {
  formValues: {};
  updateFormValues: (x: any) => void;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

interface Props {
  children: React.ReactNode;
};

const AgentProfileContext = createContext<FormValuesType | null>(null);

export const AgentProfileProvider = ({ children }: Props) => {
  const [formValues, setFormValues] = React.useState({});
  const [currentStep, setCurrentStep] = React.useState(1);

  const updateFormValues = (updatedData: any) => {
    setFormValues((prevData) => ({ ...prevData, ...updatedData }));
  };
  
  const values = {
    formValues,
    updateFormValues,
    currentStep,
    setCurrentStep,
  };
  return <AgentProfileContext.Provider value={values}>{children}</AgentProfileContext.Provider>;
};


export const useAgentProfileContext = () => {
  const context = useContext(AgentProfileContext);
  if (context === null) {
    throw new Error("context must be used within the context provider");
  }
  return context;
};
