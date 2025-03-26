
import React from 'react';
import Layout from '@/components/Layout';
import WorkingDaysCalculator from '@/components/WorkingDaysCalculator';

const WorkingDaysCalculatorPage = () => {
  return (
    <Layout
      title="Working Days Calculator"
      subtitle="Calculate working days in the Republic of Ireland"
    >
      <WorkingDaysCalculator />
    </Layout>
  );
};

export default WorkingDaysCalculatorPage;
