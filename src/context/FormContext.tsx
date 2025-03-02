
import React, { createContext, useState, useContext, ReactNode } from 'react';

type FormData = {
  workedFromHome: boolean | null;
  daysPerWeek: number | null;
  electricityCost: number | null;
  internetCost: number | null;
};

type FormContextType = {
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
  resetFormData: () => void;
};

const initialFormData: FormData = {
  workedFromHome: null,
  daysPerWeek: null,
  electricityCost: null,
  internetCost: null,
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
