
import { FormData } from '@/context/FormContext';
import { getTotalDaysInYear } from './workingDaysUtils';

export const formatCurrency = (amount: number | null) => {
  if (amount === null) return '€0.00';
  return new Intl.NumberFormat('de-DE', { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  }).format(amount);
};

// Calculate the result using the formula ((Costs × Working Days) ÷ Total Days in the year - Remote Allowance) × 30%
export const calculateResult = (formData: FormData) => {
  if (formData.workedFromHome === null) {
    return 0;
  }

  // If not worked from home, return 0
  if (!formData.workedFromHome) {
    return 0;
  }

  // Ensure all cost values are at least 0 (not null)
  const electricityCost = formData.electricityCost ?? 0;
  const internetCost = formData.internetCost ?? 0;
  const heatingCost = formData.heatingCost ?? 0;
  const remoteAllowance = formData.remoteAllowance ?? 0;
  
  // Use working days from the calculator
  const workingDays = formData.workingDays ?? 0;

  const costs = electricityCost + internetCost + heatingCost;

  // Get the total days in the year (365 or 366 for leap year)
  const totalDaysInYear = getTotalDaysInYear(new Date().getFullYear());

  // Formula: ((Costs × Working Days) ÷ Total Days in the year - Remote Allowance) × 30%
  const result = ((costs * workingDays) / totalDaysInYear - remoteAllowance) * 0.3;
  return Math.max(0, result); // Ensure the result is not negative
};
