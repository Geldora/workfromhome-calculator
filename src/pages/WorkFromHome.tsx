
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '@/context/FormContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Euro, CalendarDays } from 'lucide-react';
import YearSelector from '@/components/YearSelector';
import InfoCard from '@/components/InfoCard';
import { getYearBreakdown } from '@/utils/workingDaysUtils';
import { cn } from '@/lib/utils';

const WorkFromHome = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormData();
  const [allowanceInput, setAllowanceInput] = useState(
    formData.remoteAllowance !== null ? formData.remoteAllowance.toString() : ''
  );
  const [vacationDays, setVacationDays] = useState(0);
  const [remoteDaysPerWeek, setRemoteDaysPerWeek] = useState(5);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [yearBreakdown, setYearBreakdown] = useState<{
    totalDays: number;
    weekendDays: number;
    publicHolidays: number;
    vacationDays: number;
    workingDays: number;
  } | null>(null);

  useEffect(() => {
    if (formData.workedFromHome) {
      const breakdown = getYearBreakdown(selectedYear, vacationDays);
      // Adjust working days based on remote days per week
      const adjustedWorkingDays = Math.round(breakdown.workingDays * (remoteDaysPerWeek / 5));
      updateFormData({ workingDays: adjustedWorkingDays });
      setYearBreakdown({
        ...breakdown,
        workingDays: adjustedWorkingDays
      });
    }
  }, [selectedYear, vacationDays, remoteDaysPerWeek, formData.workedFromHome, updateFormData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.workedFromHome === null) {
      toast.error("Please select whether you worked from home or not");
      return;
    }

    if (formData.workedFromHome) {
      const remoteAllowance = allowanceInput === '' ? 0 : parseFloat(allowanceInput);
      
      if (isNaN(remoteAllowance) || remoteAllowance < 0) {
        toast.error("Please enter a valid remote working allowance amount");
        return;
      }

      updateFormData({ remoteAllowance });
      
      const breakdown = getYearBreakdown(selectedYear, vacationDays);
      // Adjust working days based on remote days per week
      const adjustedWorkingDays = Math.round(breakdown.workingDays * (remoteDaysPerWeek / 5));
      updateFormData({ workingDays: adjustedWorkingDays });
    } else {
      updateFormData({ 
        remoteAllowance: 0,
        workingDays: 0
      });
    }
    
    navigate('/costs');
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleVacationDaysChange = (days: number) => {
    setVacationDays(days);
  };
  
  const handleRemoteDaysPerWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 0) {
      setRemoteDaysPerWeek(0);
    } else {
      // Ensure remote days per week are not more than 5
      setRemoteDaysPerWeek(Math.min(value, 5));
    }
  };

  return (
    <Layout 
      title="Remote Working" 
      subtitle="Tell us about your work-from-home situation"
    >
      <div className="space-y-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Did you work from home in the past tax year?</h3>
            
            <RadioGroup 
              value={formData.workedFromHome === null ? undefined : formData.workedFromHome.toString()} 
              onValueChange={(value) => updateFormData({ 
                workedFromHome: value === 'true'
              })}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <div className="flex-1">
                <Card className={cn(
                  "relative overflow-hidden border-2 transition-all cursor-pointer p-6 h-full",
                  formData.workedFromHome === true ? "border-primary bg-accent" : "hover:border-border"
                )}>
                  <RadioGroupItem 
                    value="true" 
                    id="wfh-yes" 
                    className="sr-only" 
                  />
                  <Label 
                    htmlFor="wfh-yes" 
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <span className="text-lg font-medium">Yes</span>
                    <span className="text-sm text-muted-foreground text-center">
                      I worked from home for some or all of the past tax year
                    </span>
                  </Label>
                </Card>
              </div>
              
              <div className="flex-1">
                <Card className={cn(
                  "relative overflow-hidden border-2 transition-all cursor-pointer p-6 h-full",
                  formData.workedFromHome === false ? "border-primary bg-accent" : "hover:border-border"
                )}>
                  <RadioGroupItem 
                    value="false" 
                    id="wfh-no" 
                    className="sr-only" 
                  />
                  <Label 
                    htmlFor="wfh-no" 
                    className="flex flex-col items-center gap-2 cursor-pointer"
                  >
                    <span className="text-lg font-medium">No</span>
                    <span className="text-sm text-muted-foreground text-center">
                      I worked exclusively at my workplace in the past tax year
                    </span>
                  </Label>
                </Card>
              </div>
            </RadioGroup>
          </div>

          {formData.workedFromHome && (
            <div className="space-y-6 pt-4 animate-slide-up">
              <div className="border-b border-border pb-6">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Calculate Your Number of Remote Working Days
                </h2>
                <p className="text-muted-foreground mb-6">
                  Use this calculator to determine how many remote working days you have in a year, 
                  accounting for weekends, public holidays, and your vacation days.
                </p>
                
                <div className="space-y-6">
                  <Card className="p-6 space-y-4 card-gradient">
                    <h3 className="text-xl font-bold">Remote Working Days Calculator</h3>
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="year" className="block text-sm font-medium">
                          Tax Year
                        </label>
                        <YearSelector 
                          selectedYear={selectedYear} 
                          onChange={(year) => {
                            setSelectedYear(year);
                          }} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="vacationDays" className="block text-sm font-medium">
                          Vacation Days
                        </label>
                        <Input
                          id="vacationDays"
                          type="number"
                          min="0"
                          value={vacationDays}
                          onChange={(e) => setVacationDays(parseInt(e.target.value) || 0)}
                          className="w-full"
                          placeholder="Enter number of vacation days"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="remoteDaysPerWeek" className="block text-sm font-medium">
                          Remote working days per week
                        </label>
                        <Input
                          id="remoteDaysPerWeek"
                          type="number"
                          min="0"
                          max="5"
                          value={remoteDaysPerWeek}
                          onChange={handleRemoteDaysPerWeekChange}
                          className="w-full"
                          placeholder="Enter remote days per week"
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-xl font-medium">How much remote working allowance did you receive from your employer?</h3>
                <p className="text-sm text-muted-foreground">Enter the total amount received for the tax year</p>
                
                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Euro className="h-4 w-4 text-gray-500" />
                  </div>
                  <Input
                    type="number"
                    id="remote-allowance"
                    value={allowanceInput}
                    onChange={(e) => setAllowanceInput(e.target.value)}
                    placeholder="0.00"
                    className="pl-9 text-lg py-6"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="pt-6 flex justify-end">
            <Button 
              type="submit" 
              size="lg" 
              className="transition-all duration-300 w-full sm:w-auto"
            >
              Continue to Costs
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default WorkFromHome;
