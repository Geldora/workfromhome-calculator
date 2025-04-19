
import React from 'react';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { IrishPublicHoliday } from '@/utils/workingDaysUtils';

interface PublicHolidaysListProps {
  holidays: IrishPublicHoliday[];
  selectedYear: number;
}

const PublicHolidaysList = ({ holidays, selectedYear }: PublicHolidaysListProps) => {
  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-medium">
        Public Holidays in {selectedYear} ({holidays.length})
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {holidays.map((holiday) => (
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
  );
};

export default PublicHolidaysList;
