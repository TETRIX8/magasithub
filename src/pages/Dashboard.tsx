import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, BookText, Calendar, FileText, MessageCircle, 
  TrendingUp, Users, BookOpen, Bookmark, Clock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectCard, { ProjectCardProps } from '@/components/ui/ProjectCard';
// Пример недавних публикаций
const recentPublications: ProjectCardProps[] = [
  {
    id: '4',
    title: 'Этика искусственного интеллекта в академических исследованиях',
    abstract: 'Исследование этических аспектов внедрения систем ИИ для образовательных исследований и академических целей.',
    date: '2 июля 2023',
    category: 'Этика',
    authors: [
      { id: '10', name: 'Томас Уилсон', role: 'Профессор', avatarUrl: 'https://i.pravatar.cc/150?img=16' },
      { id: '11', name: 'София Ли', role: 'Студент', avatarUrl: 'https://i.pravatar.cc/150?img=25' },
    ],
    commentsCount: 7,
    tags: ['Этика ИИ', 'Исследования', 'Образование'],
    saved: false,
  },
  {
    id: '5',
    title: 'Интеграция возобновляемых источников энергии в архитектуру кампуса',
    abstract: 'Кейс-стади по внедрению решений на основе возобновляемой энергии в зданиях и инфраструктуре университетских кампусов.',
    coverImage: 'https://images.unsplash.com/photo-1522162363424-d29ded2ad958?q=80&w=2071&auto=format&fit=crop',
    date: '28 июня 2023',
    category: 'Архитектура',
    authors: [
      { id: '12', name: 'Елена Родригес', role: 'Профессор', avatarUrl: 'https://i.pravatar.cc/150?img=29' },
    ],
    commentsCount: 3,
    tags: ['Возобновляемая энергия', 'Архитектура', 'Устойчивость'],
    saved: true,
  },
];
// Пример предстоящих событий
const upcomingEvents = [
  {
    id: '1',
    title: 'Ежегодный симпозиум по исследованиям',
    date: '15 августа 2023',
    time: '9:00 - 17:00',
    location: 'Главный аудиторий',
    organizer: 'Департамент исследований',
  },
  {
    id: '2',
    title: 'Мастер-класс по ИИ в образовании',
    date: '22 июля 2023',
    time: '14:00 - 16:00',
    location: 'Лаборатория компьютерных наук',
    organizer: 'Департамент компьютерных наук',
  },
  {
    id: '3',
    title: 'Защита диссертации: Приложения квантовых вычислений',
    date: '25 июля 2023',
    time: '11:00 - 12:30',
    location: 'Департамент физики, комната 302',
    organizer: 'Офис аспирантуры',
  },
];
// Пример уведомлений
const notifications = [
  {
    id: '1',
    type: 'comment',
    message: 'Мария Гарсия прокомментировала вашу публикацию',
    time: '2 часа назад',
    read: false,
  },
  {
    id: '2',
    type: 'publication',
    message: 'Новая публикация в вашей области: "Прогресс в квантовых вычислениях"',
    time: '1 день назад',
    read: true,
  },
  {
    id: '3',
    type: 'event',
    message: 'Напоминание: Регистрация на симпозиум закрывается завтра',
    time: '2 дня назад',
    read: true,
  },
];
// Пример активных исследователей
const activeResearchers = [
  {
    id: '1',
    name: 'Доктор Алекс Джонсон',
    role: 'Профессор, Компьютерные науки',
    publications: 45,
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: '2',
    name: 'Доктор Сара Чен',
    role: 'Профессор, Архитектура',
    publications: 37,
    avatarUrl: 'https://i.pravatar.cc/150?img=20',
  },
  {
    id: '3',
    name: 'Мария Гарсия',
    role: 'Аспирант, Наука о данных',
    publications: 12,
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: '4',
    name: 'Дэвид Ким',
    role: 'Ассистент исследователя, Биология',
    publications: 8,
    avatarUrl: 'https://i.pravatar.cc/150?img=8',
  },
];
const Dashboard = () => {
  return (
    <>
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold animate-fade-in">Панель управления</h1>
            <p className="text-muted-foreground mt-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Добро пожаловать обратно! Вот что происходит в вашем академическом сообществе.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Основной контент */}
            <div className="lg:col-span-2 space-y-8">
              {/* Статистика */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <BookText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-2xl font-display font-bold">12</div>
                    <p className="text-sm text-muted-foreground">Публикации</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-2xl font-display font-bold">87</div>
                    <p className="text-sm text-muted-foreground">Цитирования</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-2xl font-display font-bold">24</div>
                    <p className="text-sm text-muted-foreground">Контакты</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-2xl font-display font-bold">36</div>
                    <p className="text-sm text-muted-foreground">Комментарии</p>
                  </CardContent>
                </Card>
              </div>
              {/* Недавняя активность */}
              <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <CardHeader>
                  <CardTitle>Недавняя активность</CardTitle>
                  <CardDescription>
                    Последние обновления из вашей сети и публикаций
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="publications">
                    <TabsList className="mb-4">
                      <TabsTrigger value="publications">Публикации</TabsTrigger>
                      <TabsTrigger value="discussions">Обсуждения</TabsTrigger>
                      <TabsTrigger value="saved">Сохраненные</TabsTrigger>
                    </TabsList>
                    <TabsContent value="publications" className="space-y-4">
                      {recentPublications.map(publication => (
                        <ProjectCard key={publication.id} {...publication} />
                      ))}
                      <div className="text-center mt-6">
                        <Button variant="outline" asChild>
                          <Link to="/publications">Посмотреть все публикации</Link>
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="discussions">
                      <div className="p-6 text-center">
                        <MessageCircle className="h-12 w-12 text-muted mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Нет недавних обсуждений</h3>
                        <p className="text-muted-foreground mb-4">
                          Присоединяйтесь к разговорам или начните новую тему для обсуждения.
                        </p>
                        <Button>Начать обсуждение</Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="saved">
                      <div className="p-6 text-center">
                        <Bookmark className="h-12 w-12 text-muted mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Ваши сохраненные материалы</h3>
                        <p className="text-muted-foreground mb-4">
                          У вас есть 1 сохраненная публикация. Сохраняйте больше, чтобы создать свою библиотеку исследований.
                        </p>
                        <Button variant="outline" asChild>
                          <Link to="/publications">Просмотр публикаций</Link>
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            {/* Боковая панель */}
            <div className="space-y-8">
              {/* Краткая информация профиля */}
              <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src="https://i.pravatar.cc/150?img=68" alt="Ваш профиль" />
                      <AvatarFallback>ВП</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-medium">Джеймс Уилсон</h3>
                    <p className="text-muted-foreground">Компьютерные науки, 3 курс</p>
                    <div className="grid grid-cols-3 gap-4 w-full mt-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold">12</div>
                        <div className="text-xs text-muted-foreground">Статей</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">87</div>
                        <div className="text-xs text-muted-foreground">Цитирований</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">24</div>
                        <div className="text-xs text-muted-foreground">Контактов</div>
                      </div>
                    </div>
                    <div className="mt-6 w-full">
                      <Button className="w-full" asChild>
                        <Link to="/profile">Посмотреть профиль</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Предстоящие события */}
              <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Предстоящие события
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-md bg-primary/10 text-xs font-medium">
                            {event.date.split(' ')[1].slice(0, 3)}
                            <div className="text-xl font-bold">{event.date.split(' ')[0]}</div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">{event.title}</h4>
                            <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {event.time}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {event.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/events">Посмотреть все события</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              {/* Уведомления */}
              <Card className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Уведомления
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`flex items-start gap-3 p-3 rounded-lg border ${notification.read ? 'border-border' : 'border-primary/20 bg-primary/5'}`}
                      >
                        <div className={`p-2 rounded-full ${notification.read ? 'bg-muted' : 'bg-primary/20'}`}>
                          {notification.type === 'comment' && <MessageCircle className="h-4 w-4 text-primary" />}
                          {notification.type === 'publication' && <FileText className="h-4 w-4 text-primary" />}
                          {notification.type === 'event' && <Calendar className="h-4 w-4 text-primary" />}
                        </div>
                        <div>
                          <p className="text-sm">{notification.message}</p>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {/* Активные исследователи */}
              <Card className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Активные исследователи
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeResearchers.map(researcher => (
                      <div key={researcher.id} className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={researcher.avatarUrl} alt={researcher.name} />
                          <AvatarFallback>{researcher.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{researcher.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{researcher.role}</p>
                        </div>
                        <Badge variant="outline" className="ml-auto">
                          {researcher.publications} статей
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Dashboard;
