
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '@/context/FormContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Euro, CalendarDays } from 'lucide-react';
import WorkingDaysCalculator from '@/components/WorkingDaysCalculator';

const WorkFromHome = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormData();
  const [allowanceInput, setAllowanceInput] = useState(
    formData.remoteAllowance !== null ? formData.remoteAllowance.toString() : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.workedFromHome === null) {
      toast.error("Please select whether you worked from home or not");
      return;
    }
    
    if (formData.workedFromHome && formData.daysPerWeek === null) {
      toast.error("Please select how many days per week you worked from home");
      return;
    }

    if (formData.workedFromHome) {
      const remoteAllowance = allowanceInput === '' ? 0 : parseFloat(allowanceInput);
      
      if (isNaN(remoteAllowance) || remoteAllowance < 0) {
        toast.error("Please enter a valid remote working allowance amount");
        return;
      }

      updateFormData({ remoteAllowance });
    } else {
      updateFormData({ remoteAllowance: 0 });
    }
    
    navigate('/costs');
  };

  return (
    <Layout 
      title="Work Habits" 
      subtitle="Tell us about your work-from-home situation in 2024"
    >
      <div className="space-y-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Did you work from home in 2024?</h3>
            
            <RadioGroup 
              value={formData.workedFromHome === null ? undefined : formData.workedFromHome.toString()} 
              onValueChange={(value) => updateFormData({ 
                workedFromHome: value === 'true',
                daysPerWeek: value === 'false' ? 0 : formData.daysPerWeek
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
                      I worked from home for some or all of 2024
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
                      I worked exclusively at my workplace in 2024
                    </span>
                  </Label>
                </Card>
              </div>
            </RadioGroup>
          </div>

          {formData.workedFromHome && (
            <div className="space-y-4 pt-4 animate-slide-up">
              <h3 className="text-xl font-medium">How many days per week did you typically work from home?</h3>
              <div className="px-4 py-8">
                <Slider
                  value={formData.daysPerWeek !== null ? [formData.daysPerWeek] : [0]}
                  onValueChange={(value) => updateFormData({ daysPerWeek: value[0] })}
                  max={7}
                  step={0.5}
                  className="py-4"
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>0</span>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                </div>
                {formData.daysPerWeek !== null && (
                  <p className="text-center mt-8 text-lg">
                    <span className="font-medium text-2xl">{formData.daysPerWeek}</span> days per week
                  </p>
                )}
              </div>

              <div className="space-y-4 pt-4 animate-slide-up">
                <h3 className="text-xl font-medium">How much remote working allowance did you receive from your employer?</h3>
                <p className="text-sm text-muted-foreground">Enter the total amount received for 2024</p>
                
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

        {/* Working Days Calculator Section */}
        <div className="pt-6 border-t border-border">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Calculate Your Working Days
          </h2>
          <p className="text-muted-foreground mb-6">
            Use this calculator to determine how many working days you have in a year, 
            accounting for weekends, public holidays, and your vacation days.
          </p>
          <WorkingDaysCalculator />
        </div>
      </div>
    </Layout>
  );
};

// Import utility for conditional classnames
import { cn } from '@/lib/utils';

export default WorkFromHome;
