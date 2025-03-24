
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, BookOpen, Download, Edit, FileText, GraduationCap, 
  Link as LinkIcon, Mail, MapPin, Share2, User
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectCard, { ProjectCardProps } from '@/components/ui/ProjectCard';

// Sample publications data
const userPublications: ProjectCardProps[] = [
  {
    id: '1',
    title: 'Методы машинного обучения для предиктивной аналитики в высшем образовании',
    abstract: 'Это исследование изучает, как алгоритмы машинного обучения могут применяться для прогнозирования успеваемости студентов и улучшения образовательных результатов в вузах.',
    coverImage: 'https://images.unsplash.com/photo-1581092921461-eab62e97a2d5?q=80&w=2070&auto=format&fit=crop',
    date: '15 мая 2023',
    category: 'Информатика',
    authors: [
      { id: '1', name: 'Полный Ахматтт', role: 'Студент', avatarUrl: 'https://i.pravatar.cc/150?img=68' },
      { id: '2', name: 'Мария Иванова', role: 'Профессор', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
    ],
    commentsCount: 12,
    tags: ['Машинное обучение', 'Образование', 'Наука о данных'],
    saved: true,
  },
  {
    id: '2',
    title: 'Оптимизация производительности баз данных для масштабных академических данных',
    abstract: 'Исследование по оптимизации систем баз данных для обработки больших объемов академических данных при сохранении производительности и доступности.',
    date: '10 марта 2023',
    category: 'Информатика',
    authors: [
      { id: '1', name: 'Полный Ахмат', role: 'Студент', avatarUrl: 'https://i.pravatar.cc/150?img=68' },
    ],
    commentsCount: 5,
    tags: ['Базы данных', 'Оптимизация производительности', 'Большие данные'],
    saved: false,
  },
];

// Sample user data
const userData = {
  name: 'Полный ахматтт',
  role: 'Студент факультета информатики',
  year: '3 курс',
  email: 'ivan.petrov@university.edu',
  location: 'Технологический университет',
  website: 'ivanpetrov.io',
  bio: 'Студент факультета информатики, специализирующийся на машинном обучении и оптимизации баз данных. Увлечен образовательными технологиями и улучшением результатов обучения с помощью анализа данных.',
  education: [
    {
      id: '1',
      degree: 'Бакалавр информатики',
      institution: 'Технологический университет',
      year: '2021 - настоящее время',
    },
    {
      id: '2',
      degree: 'Среднее профессиональное образование, Разработка ПО',
      institution: 'Колледж информационных технологий',
      year: '2019 - 2021',
    },
  ],
  experience: [
    {
      id: '1',
      position: 'Научный ассистент',
      organization: 'Лаборатория ИИ и науки о данных',
      duration: 'Июнь 2022 - настоящее время',
      description: 'Участие в исследовательских проектах, направленных на применение методов машинного обучения к образовательным данным. Разработка прогнозных моделей успеваемости студентов.',
    },
    {
      id: '2',
      position: 'Ассистент преподавателя',
      organization: 'Кафедра информатики',
      duration: 'Сен 2021 - Май 2022',
      description: 'Помощь в преподавании вводных курсов программирования. Проведение лабораторных занятий и оказание поддержки студентам.',
    },
  ],
  skills: [
    'Python', 'Машинное обучение', 'Анализ данных', 'SQL', 'Проектирование баз данных',
    'JavaScript', 'React', 'Git', 'Методология исследований', 'Академическое письмо'
  ],
  publications: 12,
  citations: 87,
  projects: 8,
  awards: [
    {
      id: '1',
      title: 'Выдающийся студент-исследователь',
      issuer: 'Кафедра информатики',
      year: '2022',
    },
    {
      id: '2',
      title: 'Лучшая научная работа',
      issuer: 'Студенческий исследовательский симпозиум',
      year: '2021',
    },
  ],
};

const Profile = () => {
  const [resumeDownloaded, setResumeDownloaded] = useState(false);
  
  const handleDownloadResume = () => {
    // Здесь была бы логика загрузки PDF
    setResumeDownloaded(true);
    setTimeout(() => setResumeDownloaded(false), 3000);
  };
  
  return (
    <>
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Шапка профиля */}
            <div className="bg-white rounded-xl shadow-subtle overflow-hidden animate-fade-in">
              <div className="h-32 sm:h-40 bg-gradient-to-r from-blue-600 to-blue-400"></div>
              <div className="px-4 sm:px-6 pb-6 relative">
                <div className="flex flex-col sm:flex-row sm:items-end -mt-12 sm:-mt-16 mb-6 sm:mb-4 gap-4 sm:gap-6">
                  <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white shadow-md">
                    <AvatarImage src="https://i.pravatar.cc/150?img=68" alt={userData.name} />
                    <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h1 className="text-2xl sm:text-3xl font-display font-bold">{userData.name}</h1>
                    <p className="text-muted-foreground">{userData.role} • {userData.year}</p>
                  </div>
                  <div className="flex gap-2 self-end">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Поделиться
                    </Button>
                    <Button size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Редактировать
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <div className="flex items-center text-sm mb-2">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{userData.location}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center text-sm mb-2">
                      <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                      <a href="#" className="text-primary hover:underline">{userData.website}</a>
                    </div>
                    <div className="flex items-center text-sm">
                      <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Кафедра информатики</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">О себе</h3>
                  <p className="text-sm text-muted-foreground">{userData.bio}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-6">
                  {userData.skills.slice(0, 5).map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                  {userData.skills.length > 5 && (
                    <Badge variant="outline">+{userData.skills.length - 5} ещё</Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-6">
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-display font-bold">{userData.publications}</div>
                    <div className="text-xs text-muted-foreground">Публикаций</div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-display font-bold">{userData.citations}</div>
                    <div className="text-xs text-muted-foreground">Цитирований</div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-display font-bold">{userData.projects}</div>
                    <div className="text-xs text-muted-foreground">Проектов</div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-display font-bold">{userData.awards.length}</div>
                    <div className="text-xs text-muted-foreground">Наград</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Вкладки */}
            <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Tabs defaultValue="publications">
                <TabsList className="mb-6">
                  <TabsTrigger value="publications">Публикации</TabsTrigger>
                  <TabsTrigger value="resume">Резюме</TabsTrigger>
                  <TabsTrigger value="projects">Проекты</TabsTrigger>
                </TabsList>
                
                {/* Вкладка публикаций */}
                <TabsContent value="publications" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-display font-semibold">Публикации</h2>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/publications">Смотреть все</Link>
                    </Button>
                  </div>
                  
                  {userPublications.map(publication => (
                    <ProjectCard key={publication.id} {...publication} />
                  ))}
                </TabsContent>
                
                {/* Вкладка резюме */}
                <TabsContent value="resume">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Академическое резюме</CardTitle>
                        <CardDescription>
                          Автоматически сгенерированное академическое резюме
                        </CardDescription>
                      </div>
                      <Button 
                        onClick={handleDownloadResume}
                        disabled={resumeDownloaded}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {resumeDownloaded ? 'Загружено' : 'Скачать PDF'}
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Личная информация */}
                      <div>
                        <div className="flex items-center mb-4">
                          <User className="h-5 w-5 mr-2 text-primary" />
                          <h3 className="text-lg font-display font-semibold">Личная информация</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-sm pl-7">
                          <div>
                            <span className="font-medium">Имя:</span> {userData.name}
                          </div>
                          <div>
                            <span className="font-medium">Должность:</span> {userData.role}
                          </div>
                          <div>
                            <span className="font-medium">Email:</span> {userData.email}
                          </div>
                          <div>
                            <span className="font-medium">Местоположение:</span> {userData.location}
                          </div>
                          <div>
                            <span className="font-medium">Веб-сайт:</span> {userData.website}
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Образование */}
                      <div>
                        <div className="flex items-center mb-4">
                          <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                          <h3 className="text-lg font-display font-semibold">Образование</h3>
                        </div>
                        <div className="space-y-4 pl-7">
                          {userData.education.map(edu => (
                            <div key={edu.id}>
                              <h4 className="text-base font-medium">{edu.degree}</h4>
                              <p className="text-sm text-muted-foreground">
                                {edu.institution} • {edu.year}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Опыт */}
                      <div>
                        <div className="flex items-center mb-4">
                          <BookOpen className="h-5 w-5 mr-2 text-primary" />
                          <h3 className="text-lg font-display font-semibold">Исследовательский опыт</h3>
                        </div>
                        <div className="space-y-4 pl-7">
                          {userData.experience.map(exp => (
                            <div key={exp.id}>
                              <h4 className="text-base font-medium">{exp.position}</h4>
                              <p className="text-sm text-muted-foreground">
                                {exp.organization} • {exp.duration}
                              </p>
                              <p className="text-sm mt-1">
                                {exp.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Сводка публикаций */}
                      <div>
                        <div className="flex items-center mb-4">
                          <FileText className="h-5 w-5 mr-2 text-primary" />
                          <h3 className="text-lg font-display font-semibold">Публикации</h3>
                        </div>
                        <div className="pl-7">
                          <p className="text-sm mb-4">
                            Автор {userData.publications} академических публикаций с общим количеством {userData.citations} цитирований.
                            Области исследований включают машинное обучение, образовательные технологии и оптимизацию баз данных.
                          </p>
                          
                          <div className="space-y-3">
                            {userPublications.map(pub => (
                              <div key={pub.id} className="text-sm">
                                <p className="font-medium">{pub.title}</p>
                                <p className="text-muted-foreground text-xs">
                                  {pub.authors.map(a => a.name).join(', ')} • {pub.date} • {pub.category}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Навыки */}
                      <div>
                        <div className="flex items-center mb-4">
                          <Award className="h-5 w-5 mr-2 text-primary" />
                          <h3 className="text-lg font-display font-semibold">Навыки и награды</h3>
                        </div>
                        <div className="pl-7">
                          <h4 className="text-base font-medium mb-2">Навыки</h4>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {userData.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                          
                          <h4 className="text-base font-medium mb-2">Награды и отличия</h4>
                          <div className="space-y-2">
                            {userData.awards.map(award => (
                              <div key={award.id} className="text-sm">
                                <p className="font-medium">{award.title}</p>
                                <p className="text-muted-foreground text-xs">
                                  {award.issuer} • {award.year}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Вкладка проектов */}
                <TabsContent value="projects">
                  <div className="flex items-center justify-center h-40 bg-muted rounded-lg">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">
                        Проекты пока не добавлены.
                      </p>
                      <Button>Добавить проект</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
