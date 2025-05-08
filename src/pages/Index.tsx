
import React from 'react';
import WorkFromHome from './WorkFromHome';
import { Helmet } from 'react-helmet';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Ireland Remote Work Tax Calculator | Home</title>
        <meta name="description" content="Calculate your Irish Remote Working tax relief and maximize your tax benefits with our free calculator tool." />
      </Helmet>
      <WorkFromHome />
    </>
  );
};

export default Index;
