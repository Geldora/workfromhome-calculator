
import { isWeekend, isWithinInterval } from 'date-fns';

export type IrishPublicHoliday = {
  name: string;
  date: Date;
};

// Define Irish public holidays for different years
export const getIrishPublicHolidays = (year: number): IrishPublicHoliday[] => {
  // Define fixed date holidays
  const fixedHolidays = [
    { name: "New Year's Day", month: 0, day: 1 }, // January 1
    { name: "St. Patrick's Day", month: 2, day: 17 }, // March 17
    { name: "Christmas Day", month: 11, day: 25 }, // December 25
    { name: "St. Stephen's Day", month: 11, day: 26 }, // December 26
  ];

  // Initialize holidays array with fixed date holidays
  const holidays: IrishPublicHoliday[] = fixedHolidays.map(holiday => ({
    name: holiday.name,
    date: new Date(year, holiday.month, holiday.day)
  }));

  // Add St. Brigid's Day (first Monday in February) - started in 2023
  if (year >= 2023) {
    const firstDayOfFeb = new Date(year, 1, 1);
    const daysUntilMonday = (8 - firstDayOfFeb.getDay()) % 7;
    const firstMondayOfFeb = new Date(year, 1, 1 + daysUntilMonday);
    holidays.push({ name: "St. Brigid's Day", date: firstMondayOfFeb });
  }

  // Add Easter Monday
  // This is a simplified calculation - for a real app, you might want to use a library
  // that specifically calculates Easter dates
  const easterDates: Record<number, [number, number]> = {
    2021: [4, 5], // April 5, 2021
    2022: [4, 18], // April 18, 2022
    2023: [4, 10], // April 10, 2023
    2024: [4, 1],  // April 1, 2024
  };
  
  if (easterDates[year]) {
    const [month, day] = easterDates[year];
    holidays.push({ name: "Easter Monday", date: new Date(year, month - 1, day) });
  }

  // Add May Bank Holiday (first Monday in May)
  const firstDayOfMay = new Date(year, 4, 1);
  const daysUntilMayMonday = (8 - firstDayOfMay.getDay()) % 7;
  const firstMondayOfMay = new Date(year, 4, 1 + daysUntilMayMonday);
  holidays.push({ name: "May Bank Holiday", date: firstMondayOfMay });

  // Add June Bank Holiday (first Monday in June)
  const firstDayOfJune = new Date(year, 5, 1);
  const daysUntilJuneMonday = (8 - firstDayOfJune.getDay()) % 7;
  const firstMondayOfJune = new Date(year, 5, 1 + daysUntilJuneMonday);
  holidays.push({ name: "June Bank Holiday", date: firstMondayOfJune });

  // Add August Bank Holiday (first Monday in August)
  const firstDayOfAugust = new Date(year, 7, 1);
  const daysUntilAugustMonday = (8 - firstDayOfAugust.getDay()) % 7;
  const firstMondayOfAugust = new Date(year, 7, 1 + daysUntilAugustMonday);
  holidays.push({ name: "August Bank Holiday", date: firstMondayOfAugust });

  // Add October Bank Holiday (last Monday in October)
  const lastDayOfOctober = new Date(year, 9, 31);
  const daysFromLastOctoberMonday = (lastDayOfOctober.getDay() + 6) % 7;
  const lastMondayOfOctober = new Date(year, 9, 31 - daysFromLastOctoberMonday);
  holidays.push({ name: "October Bank Holiday", date: lastMondayOfOctober });

  // Handle special cases where holidays fall on weekends
  return holidays.map(holiday => {
    const date = holiday.date;
    // If the holiday falls on a Sunday, it's observed on the next Monday
    // except for St. Patrick's Day which has special handling
    if (date.getDay() === 0 && holiday.name !== "Easter Monday") {
      const observedDate = new Date(date);
      observedDate.setDate(date.getDate() + 1);
      return { name: `${holiday.name} (Observed)`, date: observedDate };
    }
    return holiday;
  });
};

export const calculateWorkingDays = (
  year: number,
  vacationDays: Date[] = []
): number => {
  const startDate = new Date(year, 0, 1); // January 1st of the selected year
  const endDate = new Date(year, 11, 31); // December 31st of the selected year
  const publicHolidays = getIrishPublicHolidays(year);
  
  let workingDays = 0;
  const currentDate = new Date(startDate);
  
  // Loop through each day of the year
  while (currentDate <= endDate) {
    // Skip weekends
    if (!isWeekend(currentDate)) {
      // Check if it's a public holiday
      const isPublicHoliday = publicHolidays.some(
        holiday => 
          holiday.date.getDate() === currentDate.getDate() && 
          holiday.date.getMonth() === currentDate.getMonth()
      );
      
      // Check if it's a vacation day
      const isVacationDay = vacationDays.some(
        vacation => 
          vacation.getDate() === currentDate.getDate() && 
          vacation.getMonth() === currentDate.getMonth() && 
          vacation.getFullYear() === currentDate.getFullYear()
      );
      
      // If it's not a weekend, public holiday, or vacation, count it as a working day
      if (!isPublicHoliday && !isVacationDay) {
        workingDays++;
      }
    }
    
    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return workingDays;
};

// Function to get the total number of days in a year
export const getTotalDaysInYear = (year: number): number => {
  return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 366 : 365;
};

// Function to get counts for each category of days
export const getYearBreakdown = (year: number, vacationDays: Date[] = []): {
  totalDays: number;
  weekendDays: number;
  publicHolidays: number;
  vacationDays: number;
  workingDays: number;
} => {
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);
  const publicHolidays = getIrishPublicHolidays(year);
  
  const totalDays = getTotalDaysInYear(year);
  
  let weekendDays = 0;
  let publicHolidayCount = 0;
  let vacationDaysCount = 0;
  
  const currentDate = new Date(startDate);
  
  // Loop through each day of the year
  while (currentDate <= endDate) {
    const isWeekendDay = isWeekend(currentDate);
    
    if (isWeekendDay) {
      weekendDays++;
    }
    
    // Check if it's a public holiday (not on a weekend)
    const matchingHoliday = publicHolidays.find(
      holiday => 
        holiday.date.getDate() === currentDate.getDate() && 
        holiday.date.getMonth() === currentDate.getMonth()
    );
    
    if (matchingHoliday && !isWeekendDay) {
      publicHolidayCount++;
    }
    
    // Check if it's a vacation day (not on a weekend or public holiday)
    const isVacationDay = vacationDays.some(
      vacation => 
        vacation.getDate() === currentDate.getDate() && 
        vacation.getMonth() === currentDate.getMonth() && 
        vacation.getFullYear() === currentDate.getFullYear()
    );
    
    if (isVacationDay && !isWeekendDay && !matchingHoliday) {
      vacationDaysCount++;
    }
    
    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // Calculate working days
  const workingDays = totalDays - weekendDays - publicHolidayCount - vacationDaysCount;
  
  return {
    totalDays,
    weekendDays,
    publicHolidays: publicHolidayCount,
    vacationDays: vacationDaysCount,
    workingDays
  };
};
