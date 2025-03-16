
import React from 'react';
import { Card } from '@/components/ui/card';

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

export default InfoCard;
