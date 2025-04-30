
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Home, FileText, Calendar, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 lg:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent purple-gradient">
            АкадемХаб
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Платформа для академического сотрудничества, обмена публикациями и
            развития научного сообщества
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 purple-glow" asChild>
              <Link to="/dashboard">Начать работу</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Узнать больше
            </Button>
          </div>
        </div>

        {/* Main Navigation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {/* Главное */}
          <Card className="card-hover">
            <CardContent className="flex flex-col items-center p-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Home className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Главное</h3>
              <p className="text-muted-foreground text-center mb-4">Основная информация и последние обновления</p>
              <Button asChild variant="outline" className="w-full mt-auto">
                <Link to="/dashboard">Перейти</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Публикации */}
          <Card className="card-hover">
            <CardContent className="flex flex-col items-center p-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Публикации</h3>
              <p className="text-muted-foreground text-center mb-4">Научные статьи и публикации сообщества</p>
              <Button asChild variant="outline" className="w-full mt-auto">
                <Link to="/publications">Перейти</Link>
              </Button>
            </CardContent>
          </Card>

          {/* События */}
          <Card className="card-hover">
            <CardContent className="flex flex-col items-center p-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">События</h3>
              <p className="text-muted-foreground text-center mb-4">Мероприятия, конференции и семинары</p>
              <Button asChild variant="outline" className="w-full mt-auto">
                <Link to="/events">Перейти</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Люди */}
          <Card className="card-hover">
            <CardContent className="flex flex-col items-center p-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Люди</h3>
              <p className="text-muted-foreground text-center mb-4">Исследователи, преподаватели и студенты</p>
              <Button asChild variant="outline" className="w-full mt-auto">
                <Link to="/people">Перейти</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
