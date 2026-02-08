import React from 'react';
import Landing from './Landing';
import Layout from '../components/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout showBottomNav={false} showHeader={false}>
      <Landing />
    </Layout>
  );
};

export default HomePage;
