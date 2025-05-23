
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type FormData = {
  workedFromHome: boolean | null;
  electricityCost: number | null;
  internetCost: number | null;
  heatingCost: number | null;
  remoteAllowance: number | null;
  workingDays: number | null;
};

type FormContextType = {
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
  resetFormData: () => void;
};

const initialFormData: FormData = {
  workedFromHome: null,
  electricityCost: null,
  internetCost: null,
  heatingCost: null,
  remoteAllowance: null,
  workingDays: null,
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormData = (): FormContextType => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormData must be used within a FormProvider');
  }
  return context;
};
