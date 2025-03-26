
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { CalendarDays } from 'lucide-react';

interface YearSelectorProps {
  selectedYear: number;
  onChange: (year: number) => void;
}

const YearSelector = ({ selectedYear, onChange }: YearSelectorProps) => {
  const years = [2024, 2023, 2022, 2021];
  
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-muted-foreground">
        Select Year
      </label>
      <Select
        value={selectedYear.toString()}
        onValueChange={(value) => onChange(parseInt(value))}
      >
        <SelectTrigger className="w-full">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Select a year" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default YearSelector;
