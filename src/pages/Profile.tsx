
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import UserDisciplines from '@/components/UserDisciplines';
import StudentDiary from '@/components/StudentDiary';
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Профиль</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          {user?.teacher && (
            <UserDisciplines />
          )}
          
          <StudentDiary />
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
