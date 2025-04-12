
import React from 'react';
import Layout from '@/components/Layout';
import WorkingDaysCalculator from '@/components/WorkingDaysCalculator';

const WorkingDaysCalculatorPage = () => {
  return (
    <Layout
      title="Remote Working Days Calculator"
      subtitle="Calculate remote working days in the Republic of Ireland"
    >
      <WorkingDaysCalculator />
    </Layout>
  );
};

export default WorkingDaysCalculatorPage;
