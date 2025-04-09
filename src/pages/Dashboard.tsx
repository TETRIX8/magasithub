import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Панель управления</h1>
        {/* Dashboard content here */}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
