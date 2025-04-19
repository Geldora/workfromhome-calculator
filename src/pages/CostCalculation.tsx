
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormData } from '@/context/FormContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Euro } from 'lucide-react';

const CostCalculation = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormData();
  
  const [electricityInput, setElectricityInput] = useState(
    formData.electricityCost !== null ? formData.electricityCost.toString() : ''
  );
  const [internetInput, setInternetInput] = useState(
    formData.internetCost !== null ? formData.internetCost.toString() : ''
  );
  const [heatingInput, setHeatingInput] = useState(
    formData.heatingCost !== null ? formData.heatingCost.toString() : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const electricityCost = electricityInput === '' ? 0 : parseFloat(electricityInput);
    const internetCost = internetInput === '' ? 0 : parseFloat(internetInput);
    const heatingCost = heatingInput === '' ? 0 : parseFloat(heatingInput);
    
    if (electricityInput !== '' && (isNaN(electricityCost) || electricityCost < 0)) {
      toast.error("Please enter a valid electricity cost");
      return;
    }
    
    if (internetInput !== '' && (isNaN(internetCost) || internetCost < 0)) {
      toast.error("Please enter a valid internet cost");
      return;
    }
    
    if (heatingInput !== '' && (isNaN(heatingCost) || heatingCost < 0)) {
      toast.error("Please enter a valid heating cost");
      return;
    }
    
    updateFormData({
      electricityCost,
      internetCost,
      heatingCost
    });
    
    navigate('/results');
  };

  return (
    <Layout 
      title="Allowable utility bills" 
      subtitle="Enter your yearly household expenses"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Annual Electricity Cost</h3>
            <p className="text-sm text-muted-foreground">How much do you spend on electricity in a year?</p>
            
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Euro className="h-4 w-4 text-gray-500" />
              </div>
              <Input
                type="number"
                id="electricity-cost"
                value={electricityInput}
                onChange={(e) => setElectricityInput(e.target.value)}
                placeholder="0.00"
                className="pl-7 text-lg py-6"
                step="0.01"
                min="0"
              />
            </div>
          </div>
          
          <div className="space-y-4 pt-2">
            <h3 className="text-xl font-medium">Annual Internet Cost</h3>
            <p className="text-sm text-muted-foreground">How much do you spend on internet in a year?</p>
            
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Euro className="h-4 w-4 text-gray-500" />
              </div>
              <Input
                type="number"
                id="internet-cost"
                value={internetInput}
                onChange={(e) => setInternetInput(e.target.value)}
                placeholder="0.00"
                className="pl-7 text-lg py-6"
                step="0.01"
                min="0"
              />
            </div>
          </div>
          
          <div className="space-y-4 pt-2">
            <h3 className="text-xl font-medium">Annual Heating Cost</h3>
            <p className="text-sm text-muted-foreground">How much do you spend on heating in a year?</p>
            
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Euro className="h-4 w-4 text-gray-500" />
              </div>
              <Input
                type="number"
                id="heating-cost"
                value={heatingInput}
                onChange={(e) => setHeatingInput(e.target.value)}
                placeholder="0.00"
                className="pl-7 text-lg py-6"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="text-xl font-medium">Cost shared by more than one person</h3>
            <p className="text-sm text-muted-foreground">
              If the cost is shared between two or more people, it can be apportioned based on the amount each paid.
            </p>
          </div>
        </div>

        <div className="pt-8 flex justify-between items-center">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate('/')}
            className="transition-all duration-300"
          >
            Back
          </Button>
          
          <Button 
            type="submit" 
            size="lg" 
            className="transition-all duration-300"
          >
            View Results
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default CostCalculation;

