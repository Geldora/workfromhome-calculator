
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
    if (formData.workedFromHome === null) {
      toast.error("Please complete all required steps before viewing results");
      navigate('/');
    }
  }, [formData, navigate]);

  if (formData.workedFromHome === null) {
    return null; // Will redirect due to useEffect
  }

  const result = calculateResult(formData);

  return (
    <Layout 
      title="Ireland's Remote Working Tax relief calculator: Your Results"
      subtitle="Allowable remote working costs"
    >
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InfoCard 
            title="Work From Home"
            value={formData.workedFromHome ? "Yes" : "No"}
            subtitle={formData.workedFromHome ? "Remote worker" : "Not applicable"}
            label="Status"
          />
          
          {formData.workedFromHome && formData.workingDays !== null && (
            <InfoCard 
              title="Remote Working Days"
              value={`${formData.workingDays}`}
              subtitle="Total WFH days in the tax year"
              label="Remote Working Days"
            />
          )}

          {formData.workedFromHome && (
            <InfoCard 
              title="Remote Allowance"
              value={formatCurrency(formData.remoteAllowance)}
              subtitle="Received from employer"
              label="Remote Allowance"
            />
          )}

          <InfoCard 
            title="Electricity cost"
            value={formatCurrency(formData.electricityCost)}
            subtitle="Annual cost"
            label="Electricity"
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InfoCard 
            title="Broadband cost"
            value={formatCurrency(formData.internetCost)}
            subtitle="Annual cost"
            label="Internet"
          />
          
          <InfoCard 
            title="Heating"
            value={formatCurrency(formData.heatingCost)}
            subtitle="Annual cost"
            label="Heating Cost"
          />
          

        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-3">
            <ResultCard 
              result={result}
              formatCurrency={formatCurrency}
            />
          </div>
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
