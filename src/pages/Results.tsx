
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '@/context/FormContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Copy, Check } from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const { formData } = useFormData();
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    // Check if user has completed the forms
    if (
      (formData.workedFromHome === null) || 
      (formData.workedFromHome === true && formData.daysPerWeek === null) ||
      (formData.workedFromHome === true && formData.remoteAllowance === null) ||
      formData.electricityCost === null || 
      formData.internetCost === null ||
      formData.heatingCost === null
    ) {
      toast.error("Please complete all steps before viewing results");
      navigate('/');
    }
  }, [formData, navigate]);

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return '€0.00';
    return new Intl.NumberFormat('de-DE', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }).format(amount);
  };

  // Calculate the result using the formula ((Y x Z) ÷ W - M) x 30%
  const calculateResult = () => {
    if (
      formData.workedFromHome === null || 
      formData.electricityCost === null || 
      formData.internetCost === null ||
      formData.heatingCost === null ||
      formData.remoteAllowance === null
    ) {
      return 0;
    }

    // If not worked from home, return 0
    if (!formData.workedFromHome || formData.daysPerWeek === null || formData.daysPerWeek === 0) {
      return 0;
    }

    const Y = formData.electricityCost + formData.internetCost + formData.heatingCost;
    const Z = formData.daysPerWeek * 52;
    const W = 365;
    const M = formData.remoteAllowance;

    const result = ((Y * Z) / W - M) * 0.3;
    return Math.max(0, result); // Ensure the result is not negative
  };

  const copyToClipboard = () => {
    const result = calculateResult();
    const formattedResult = formatCurrency(result);
    
    navigator.clipboard.writeText(formattedResult)
      .then(() => {
        setCopied(true);
        toast.success("Result copied to clipboard");
        
        // Reset the copied state after 2 seconds
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch(() => {
        toast.error("Failed to copy result");
      });
  };

  if (
    formData.workedFromHome === null || 
    (formData.workedFromHome === true && formData.daysPerWeek === null) ||
    (formData.workedFromHome === true && formData.remoteAllowance === null) ||
    formData.electricityCost === null || 
    formData.internetCost === null ||
    formData.heatingCost === null
  ) {
    return null; // Will redirect due to useEffect
  }

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
            label="Variable A"
          />

          <InfoCard 
            title="Electricity"
            value={formatCurrency(formData.electricityCost)}
            subtitle="Annual cost"
            label="Variable B"
          />
          
          <InfoCard 
            title="Internet"
            value={formatCurrency(formData.internetCost)}
            subtitle="Annual cost"
            label="Variable C"
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InfoCard 
            title="Heating"
            value={formatCurrency(formData.heatingCost)}
            subtitle="Annual cost"
            label="Variable D"
          />
          
          {formData.workedFromHome && (
            <InfoCard 
              title="Remote Allowance"
              value={formatCurrency(formData.remoteAllowance)}
              subtitle="Received from employer"
              label="Variable M"
            />
          )}
          
          <Card className="overflow-hidden border-2 border-primary/50 bg-primary/5">
            <div className="bg-primary py-2 px-4 border-b text-xs font-mono text-primary-foreground flex items-center justify-between">
              <span>CALCULATION RESULT</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5" 
                onClick={copyToClipboard}
                title="Copy result to clipboard"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </Button>
            </div>
            <div className="p-6 space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                ((B+C+D) × (A×52)) ÷ 365 - M) × 30%
              </h4>
              <p className="text-2xl font-medium">
                {formatCurrency(calculateResult())}
              </p>
              <p className="text-sm text-muted-foreground">
                Calculated tax deduction
              </p>
            </div>
          </Card>
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

interface InfoCardProps {
  title: string;
  value: string;
  subtitle: string;
  label: string;
}

const InfoCard = ({ title, value, subtitle, label }: InfoCardProps) => (
  <Card className="overflow-hidden">
    <div className="bg-primary/10 py-2 px-4 border-b text-xs font-mono text-primary-foreground/70">
      {label}
    </div>
    <div className="p-6 space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">
        {title}
      </h4>
      <p className="text-2xl font-medium">
        {value}
      </p>
      <p className="text-sm text-muted-foreground">
        {subtitle}
      </p>
    </div>
  </Card>
);

export default Results;
