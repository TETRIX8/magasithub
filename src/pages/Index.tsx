
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';

const Index = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            АкадемХаб
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Платформа для академического сотрудничества, обмена публикациями и
            развития научного сообщества
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/dashboard">Начать работу</Link>
            </Button>
            <Button size="lg" variant="outline">
              Узнать больше
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
