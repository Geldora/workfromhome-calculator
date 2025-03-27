
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '@/context/FormContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import InfoCard from '@/components/InfoCard';
import ResultCard from '@/components/ResultCard';
import { formatCurrency, calculateResult } from '@/utils/calculationUtils';

const Results = () => {
  const navigate = useNavigate();
  const { formData } = useFormData();
  
  useEffect(() => {
    // Check if user has completed the forms
    // Only required fields are workedFromHome and daysPerWeek if workedFromHome is true
    if (
      (formData.workedFromHome === null) || 
      (formData.workedFromHome === true && formData.daysPerWeek === null)
    ) {
      toast.error("Please complete all required steps before viewing results");
      navigate('/');
    }
  }, [formData, navigate]);

  if (
    formData.workedFromHome === null || 
    (formData.workedFromHome === true && formData.daysPerWeek === null)
  ) {
    return null; // Will redirect due to useEffect
  }

  const result = calculateResult(formData);

  return (
    <Layout 
      title="Your Results" 
      subtitle="Summary of your work habits and annual costs"
    >
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InfoCard 
            title="Work From Home"
            value={formData.workedFromHome ? "Yes" : "No"}
            subtitle={formData.workedFromHome ? `${formData.daysPerWeek} days per week` : "Not applicable"}
            label="Days Per Week"
          />

          <InfoCard 
            title="Electricity"
            value={formatCurrency(formData.electricityCost)}
            subtitle="Annual cost"
            label="Electricity Cost"
          />
          
          <InfoCard 
            title="Internet"
            value={formatCurrency(formData.internetCost)}
            subtitle="Annual cost"
            label="Internet Cost"
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InfoCard 
            title="Heating"
            value={formatCurrency(formData.heatingCost)}
            subtitle="Annual cost"
            label="Heating Cost"
          />
          
          {formData.workedFromHome && (
            <InfoCard 
              title="Remote Allowance"
              value={formatCurrency(formData.remoteAllowance)}
              subtitle="Received from employer"
              label="Remote Allowance"
            />
          )}
          
          <ResultCard 
            result={result}
            formatCurrency={formatCurrency}
          />
        </div>

        <div className="pt-8 flex justify-between">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate('/costs')}
            className="transition-all duration-300"
          >
            Back
          </Button>
          
          <Button 
            type="button" 
            onClick={() => navigate('/')}
            className="transition-all duration-300"
          >
            Start Over
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
