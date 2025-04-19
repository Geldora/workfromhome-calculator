
import React from 'react';
import InfoCard from '../InfoCard';

interface YearBreakdownStatsProps {
  yearBreakdown: {
    totalDays: number;
    weekendDays: number;
    publicHolidays: number;
    vacationDays: number;
    workingDays: number;
  };
  selectedYear: number;
}

const YearBreakdownStats = ({ yearBreakdown, selectedYear }: YearBreakdownStatsProps) => {
  return (
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
        subtitle="Remote working days in Ireland"
        label="Result"
      />
    </>
  );
};

export default YearBreakdownStats;
