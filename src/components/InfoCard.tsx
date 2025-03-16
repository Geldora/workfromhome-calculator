
import React from 'react';
import { Card } from '@/components/ui/card';

interface InfoCardProps {
  title: string;
  value: string;
  subtitle: string;
  label: string;
}

const InfoCard = ({ title, value, subtitle, label }: InfoCardProps) => (
  <Card className="overflow-hidden border-2 border-emerald-700/20 shadow-md transition-all hover:shadow-lg">
    <div className="bg-emerald-800 py-2 px-4 border-b text-xs font-mono text-emerald-50">
      {label}
    </div>
    <div className="p-6 space-y-2">
      <h4 className="text-sm font-medium text-muted-foreground">
        {title}
      </h4>
      <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-400">
        {value}
      </p>
      <p className="text-sm text-muted-foreground">
        {subtitle}
      </p>
    </div>
  </Card>
);

export default InfoCard;
