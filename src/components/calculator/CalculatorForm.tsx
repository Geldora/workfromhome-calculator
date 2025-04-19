
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import YearSelector from '../YearSelector';

interface CalculatorFormProps {
  selectedYear: number;
  vacationDays: number;
  remoteDaysPerWeek: number;
  onYearChange: (year: number) => void;
  onVacationDaysChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoteDaysChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CalculatorForm = ({
  selectedYear,
  vacationDays,
  remoteDaysPerWeek,
  onYearChange,
  onVacationDaysChange,
  onRemoteDaysChange
}: CalculatorFormProps) => {
  return (
    <Card className="col-span-1 md:col-span-1 p-6 space-y-4 card-gradient">
      <h3 className="text-xl font-bold">Remote Working Days Calculator</h3>
      <p className="text-sm text-muted-foreground">
        Calculate remote working days in the Republic of Ireland for a specific year, 
        excluding weekends, public holidays, and your vacation days.
      </p>
      
      <YearSelector 
        selectedYear={selectedYear} 
        onChange={onYearChange}
      />
      
      <div className="mt-6 space-y-2">
        <label htmlFor="vacationDays" className="block text-sm font-medium">
          Vacation Days
        </label>
        <Input
          id="vacationDays"
          type="number"
          min="0"
          defaultValue={vacationDays.toString()}
          onChange={onVacationDaysChange}
          className="w-full"
          placeholder="Enter number of vacation days"
        />
      </div>
      
      <div className="mt-6 space-y-2">
        <label htmlFor="remoteDaysPerWeek" className="block text-sm font-medium">
          Remote working days per week
        </label>
        <Input
          id="remoteDaysPerWeek"
          type="number"
          min="0"
          max="5"
          step="0.5"
          defaultValue={remoteDaysPerWeek.toString()}
          onChange={onRemoteDaysChange}
          className="w-full"
          placeholder="Enter remote days per week"
        />
      </div>
    </Card>
  );
};

export default CalculatorForm;
