
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ResultCardProps {
  result: number;
  formatCurrency: (amount: number | null) => string;
}

const ResultCard = ({ result, formatCurrency }: ResultCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
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

  return (
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
          ((Electricity + Internet + Heating) × Working Days) ÷ Total Days in the year - Remote Allowance) × 30%
        </h4>
        <p className="text-2xl font-medium">
          {formatCurrency(result)}
        </p>
        <p className="text-sm text-muted-foreground">
          Calculated tax deduction
        </p>
      </div>
    </Card>
  );
};

export default ResultCard;
