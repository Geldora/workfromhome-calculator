
import React, { useState } from 'react';
import CalculatorForm from './calculator/CalculatorForm';
import YearBreakdownStats from './calculator/YearBreakdownStats';
import PublicHolidaysList from './calculator/PublicHolidaysList';
import { useWorkingDays } from '@/hooks/useWorkingDays';

interface WorkingDaysCalculatorProps {
  onYearChange?: (year: number) => void;
  onVacationDaysChange?: (days: number) => void;
  initialYear?: number;
  initialVacationDays?: number;
  initialRemoteDaysPerWeek?: number;
}

const WorkingDaysCalculator = ({
  onYearChange,
  onVacationDaysChange,
  initialYear = 2024,
  initialVacationDays = 0,
  initialRemoteDaysPerWeek = 5
}: WorkingDaysCalculatorProps) => {
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);
  const [vacationDays, setVacationDays] = useState<number>(initialVacationDays);
  const [remoteDaysPerWeek, setRemoteDaysPerWeek] = useState<number>(initialRemoteDaysPerWeek);

  const { yearBreakdown, publicHolidays } = useWorkingDays(
    selectedYear,
    vacationDays,
    remoteDaysPerWeek,
    onYearChange,
    onVacationDaysChange
  );

  // Handle updating vacation days - Fix for leading zeros issue
  const handleVacationDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setVacationDays(0);
      return;
    }
    const value = parseFloat(inputValue);
    if (isNaN(value) || value < 0) {
      setVacationDays(0);
    } else {
      if (yearBreakdown) {
        const potentialWorkingDays = yearBreakdown.totalDays - yearBreakdown.weekendDays - yearBreakdown.publicHolidays;
        setVacationDays(Math.min(value, potentialWorkingDays));
      } else {
        setVacationDays(value);
      }
    }
  };
  
  // Handle updating remote days per week - Now supports decimal values
  const handleRemoteDaysPerWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setRemoteDaysPerWeek(0);
      return;
    }
    const value = parseFloat(inputValue);
    if (isNaN(value) || value < 0) {
      setRemoteDaysPerWeek(0);
    } else {
      setRemoteDaysPerWeek(Math.min(value, 5));
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CalculatorForm
          selectedYear={selectedYear}
          vacationDays={vacationDays}
          remoteDaysPerWeek={remoteDaysPerWeek}
          onYearChange={setSelectedYear}
          onVacationDaysChange={handleVacationDaysChange}
          onRemoteDaysChange={handleRemoteDaysPerWeekChange}
        />
        
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {yearBreakdown && (
            <YearBreakdownStats
              yearBreakdown={yearBreakdown}
              selectedYear={selectedYear}
            />
          )}
        </div>
      </div>
      
      <PublicHolidaysList 
        holidays={publicHolidays}
        selectedYear={selectedYear}
      />
    </div>
  );
};

export default WorkingDaysCalculator;
