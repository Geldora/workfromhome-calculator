
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import YearSelector from './YearSelector';
import InfoCard from './InfoCard';
import { 
  getYearBreakdown, 
  getIrishPublicHolidays,
  IrishPublicHoliday 
} from '@/utils/workingDaysUtils';
import { format } from 'date-fns';

const WorkingDaysCalculator = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [vacationDays, setVacationDays] = useState<number>(0);
  const [publicHolidays, setPublicHolidays] = useState<IrishPublicHoliday[]>([]);
  const [yearBreakdown, setYearBreakdown] = useState<{
    totalDays: number;
    weekendDays: number;
    publicHolidays: number;
    vacationDays: number;
    workingDays: number;
  } | null>(null);

  // Update public holidays and year breakdown when selected year changes
  useEffect(() => {
    const holidays = getIrishPublicHolidays(selectedYear);
    setPublicHolidays(holidays);
    
    // Reset vacation days when year changes
    setVacationDays(0);
    
    // Calculate year breakdown
    const breakdown = getYearBreakdown(selectedYear, vacationDays);
    setYearBreakdown(breakdown);
  }, [selectedYear]);

  // Update year breakdown when vacation days change
  useEffect(() => {
    const breakdown = getYearBreakdown(selectedYear, vacationDays);
    setYearBreakdown(breakdown);
  }, [vacationDays, selectedYear]);

  // Handle updating vacation days
  const handleVacationDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 0) {
      setVacationDays(0);
    } else {
      // Ensure vacation days are not more than potential working days
      if (yearBreakdown) {
        const potentialWorkingDays = yearBreakdown.totalDays - yearBreakdown.weekendDays - yearBreakdown.publicHolidays;
        setVacationDays(Math.min(value, potentialWorkingDays));
      } else {
        setVacationDays(value);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-1 p-6 space-y-4 card-gradient">
          <h3 className="text-xl font-bold">Working Days Calculator</h3>
          <p className="text-sm text-muted-foreground">
            Calculate working days in the Republic of Ireland for a specific year, 
            excluding weekends, public holidays, and your vacation days.
          </p>
          
          <YearSelector 
            selectedYear={selectedYear} 
            onChange={setSelectedYear} 
          />
          
          <div className="mt-6 space-y-2">
            <label htmlFor="vacationDays" className="block text-sm font-medium">
              Vacation Days
            </label>
            <Input
              id="vacationDays"
              type="number"
              min="0"
              value={vacationDays}
              onChange={handleVacationDaysChange}
              className="w-full"
              placeholder="Enter number of vacation days"
            />
          </div>
        </Card>
        
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {yearBreakdown && (
            <>
              <InfoCard
                title="Total Days"
                value={yearBreakdown.totalDays.toString()}
                subtitle={`Days in ${selectedYear}`}
                label="Calendar"
              />
              <InfoCard
                title="Weekend Days"
                value={yearBreakdown.weekendDays.toString()}
                subtitle="Saturdays and Sundays"
                label="Weekends"
              />
              <InfoCard
                title="Public Holidays"
                value={yearBreakdown.publicHolidays.toString()}
                subtitle="Irish bank holidays (excluding weekends)"
                label="Holidays"
              />
              <InfoCard
                title="Vacation Days"
                value={yearBreakdown.vacationDays.toString()}
                subtitle="Your time off from work"
                label="Personal"
              />
              <InfoCard
                title="Working Days"
                value={yearBreakdown.workingDays.toString()}
                subtitle="Business days in Ireland"
                label="Result"
              />
            </>
          )}
        </div>
      </div>
      
      {/* Public holidays list */}
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-medium">
          Public Holidays in {selectedYear} ({publicHolidays.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {publicHolidays.map((holiday) => (
            <div 
              key={holiday.name} 
              className="flex items-center justify-between p-2 bg-muted/50 rounded-md"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium">{holiday.name}</span>
                <span className="text-xs text-muted-foreground">
                  {format(holiday.date, 'MMMM d, yyyy')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default WorkingDaysCalculator;
