
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import YearSelector from './YearSelector';
import InfoCard from './InfoCard';
import { 
  getYearBreakdown, 
  getIrishPublicHolidays,
  IrishPublicHoliday 
} from '@/utils/workingDaysUtils';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const WorkingDaysCalculator = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [vacationDays, setVacationDays] = useState<Date[]>([]);
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
    setVacationDays([]);
    
    // Calculate year breakdown
    const breakdown = getYearBreakdown(selectedYear, []);
    setYearBreakdown(breakdown);
  }, [selectedYear]);

  // Update year breakdown when vacation days change
  useEffect(() => {
    const breakdown = getYearBreakdown(selectedYear, vacationDays);
    setYearBreakdown(breakdown);
  }, [vacationDays, selectedYear]);

  // Handle adding vacation days
  const handleAddVacation = (date: Date | undefined) => {
    if (!date) return;

    // Check if the date is already in the vacation days
    const alreadyExists = vacationDays.some(
      (d) => d.toDateString() === date.toDateString()
    );

    if (!alreadyExists) {
      setVacationDays([...vacationDays, date]);
    }
  };

  // Handle removing vacation days
  const handleRemoveVacation = (dateToRemove: Date) => {
    setVacationDays(
      vacationDays.filter((date) => date.toDateString() !== dateToRemove.toDateString())
    );
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
          
          <div className="mt-6">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>Add vacation days</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  onSelect={handleAddVacation}
                  disabled={(date) => {
                    // Disable weekends and public holidays
                    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                    const isHoliday = publicHolidays.some(
                      (holiday) => 
                        holiday.date.getDate() === date.getDate() && 
                        holiday.date.getMonth() === date.getMonth()
                    );
                    
                    // Also disable dates outside the selected year
                    const isWrongYear = date.getFullYear() !== selectedYear;
                    
                    return isWeekend || isHoliday || isWrongYear;
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
                title="Working Days"
                value={yearBreakdown.workingDays.toString()}
                subtitle="Business days in Ireland"
                label="Result"
              />
            </>
          )}
        </div>
      </div>
      
      {/* Vacation days list */}
      {vacationDays.length > 0 && (
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-medium">Your Vacation Days ({vacationDays.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {vacationDays.map((date) => (
              <div 
                key={date.toISOString()} 
                className="flex items-center justify-between p-2 bg-muted/50 rounded-md"
              >
                <span>{format(date, 'MMMM d, yyyy')}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveVacation(date)}
                  className="h-8 w-8 p-0"
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
      
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
