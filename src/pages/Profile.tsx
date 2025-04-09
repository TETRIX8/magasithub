
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import UserDisciplines from '@/components/UserDisciplines';

const Profile = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Профиль</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <UserDisciplines />
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
