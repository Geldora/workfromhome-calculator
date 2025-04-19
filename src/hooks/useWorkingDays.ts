
import { useState, useEffect } from 'react';
import { getYearBreakdown, getIrishPublicHolidays, IrishPublicHoliday } from '@/utils/workingDaysUtils';

export interface WorkingDaysState {
  yearBreakdown: {
    totalDays: number;
    weekendDays: number;
    publicHolidays: number;
    vacationDays: number;
    workingDays: number;
  } | null;
  publicHolidays: IrishPublicHoliday[];
}

export const useWorkingDays = (
  selectedYear: number,
  vacationDays: number,
  remoteDaysPerWeek: number,
  onYearChange?: (year: number) => void,
  onVacationDaysChange?: (days: number) => void
): WorkingDaysState => {
  const [publicHolidays, setPublicHolidays] = useState<IrishPublicHoliday[]>([]);
  const [yearBreakdown, setYearBreakdown] = useState<WorkingDaysState['yearBreakdown']>(null);

  useEffect(() => {
    const holidays = getIrishPublicHolidays(selectedYear);
    setPublicHolidays(holidays);
    
    const breakdown = getYearBreakdown(selectedYear, vacationDays);
    const adjustedBreakdown = {
      ...breakdown,
      workingDays: Math.round(breakdown.workingDays * (remoteDaysPerWeek / 5))
    };
    
    setYearBreakdown(adjustedBreakdown);

    if (onYearChange) {
      onYearChange(selectedYear);
    }
  }, [selectedYear, remoteDaysPerWeek, onYearChange, vacationDays]);

  useEffect(() => {
    const breakdown = getYearBreakdown(selectedYear, vacationDays);
    const adjustedBreakdown = {
      ...breakdown,
      workingDays: Math.round(breakdown.workingDays * (remoteDaysPerWeek / 5))
    };
    
    setYearBreakdown(adjustedBreakdown);

    if (onVacationDaysChange) {
      onVacationDaysChange(vacationDays);
    }
  }, [vacationDays, selectedYear, remoteDaysPerWeek, onVacationDaysChange]);

  return { yearBreakdown, publicHolidays };
};
