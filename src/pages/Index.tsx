import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookText, GraduationCap, Users, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectCard, { ProjectCardProps } from '@/components/ui/ProjectCard';
// Пример данных для избранных публикаций
const featuredPublications: ProjectCardProps[] = [
  {
    id: '1',
    title: 'Машинное обучение для прогнозной аналитики в высшем образовании',
    abstract: 'В этом исследовании рассматривается, как алгоритмы машинного обучения могут использоваться для прогнозирования успеваемости студентов и улучшения образовательных результатов в колледжах.',
    coverImage: 'https://images.unsplash.com/photo-1581092921461-eab62e97a2d5?q=80&w=2070&auto=format&fit=crop',
    date: '15 мая 2023',
    category: 'Компьютерные науки',
    authors: [
      { id: '1', name: 'Алекс Джонсон', role: 'Профессор', avatarUrl: 'https://i.pravatar.cc/150?img=11' },
      { id: '2', name: 'Мария Гарсия', role: 'Студент', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
      { id: '3', name: 'Дэвид Ким', role: 'Исследователь', avatarUrl: 'https://i.pravatar.cc/150?img=8' },
    ],
    commentsCount: 12,
    tags: ['Машинное обучение', 'Образование', 'Наука о данных'],
    saved: true,
  },
  {
    id: '2',
    title: 'Влияние изменения климата на городскую архитектуру: новые принципы устойчивого дизайна',
    abstract: 'Анализ того, как изменение климата вынуждает архитекторов пересматривать традиционные принципы проектирования и внедрять более устойчивые подходы.',
    coverImage: 'https://images.unsplash.com/photo-1518005068251-37900150dfca?q=80&w=2071&auto=format&fit=crop',
    date: '3 апреля 2023',
    category: 'Архитектура',
    authors: [
      { id: '4', name: 'Сара Чен', role: 'Профессор', avatarUrl: 'https://i.pravatar.cc/150?img=20' },
      { id: '5', name: 'Джамал Уилсон', role: 'Студент', avatarUrl: 'https://i.pravatar.cc/150?img=12' },
    ],
    commentsCount: 8,
    tags: ['Устойчивость', 'Архитектура', 'Изменение климата'],
    saved: false,
  },
  {
    id: '3',
    title: 'Квантовые вычисления: практическое применение в криптографии и системах баз данных',
    abstract: 'Эта работа исследует потенциальные реальные применения квантовых вычислений в области криптографии и управления базами данных.',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop',
    date: '21 июня 2023',
    category: 'Физика',
    authors: [
      { id: '6', name: 'Роберт Смит', role: 'Профессор', avatarUrl: 'https://i.pravatar.cc/150?img=15' },
      { id: '7', name: 'Эмма Паркер', role: 'Исследователь', avatarUrl: 'https://i.pravatar.cc/150?img=23' },
      { id: '8', name: 'Майкл Джонсон', role: 'Студент', avatarUrl: 'https://i.pravatar.cc/150?img=30' },
      { id: '9', name: 'Лиза Вонг', role: 'Студент', avatarUrl: 'https://i.pravatar.cc/150?img=32' },
    ],
    commentsCount: 15,
    tags: ['Квантовые вычисления', 'Криптография', 'Компьютерные науки'],
    saved: false,
  },
];
const Index = () => {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-white py-16 sm:py-24">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[10%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0,rgba(59,130,246,0)_50%)]"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-slide-in">
                <div>
                  <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600 mb-6">
                    <span className="font-medium">Академическая социальная сеть</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-foreground">
                    Делитесь знаниями, <span className="text-primary">исследуйте</span> исследования
                  </h1>
                  <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                    MagasitHub объединяет студентов и преподавателей в совместной академической среде.
                    Делитесь своими исследованиями, открывайте новые проекты и стройте профессиональную сеть.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link to="/dashboard">
                      Начать <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/publications">
                      Просмотр публикаций
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                  <div className="flex flex-col">
                    <div className="font-display text-2xl font-bold">2.5K+</div>
                    <div className="text-sm text-muted-foreground">Публикации</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-display text-2xl font-bold">500+</div>
                    <div className="text-sm text-muted-foreground">Исследователи</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-display text-2xl font-bold">50+</div>
                    <div className="text-sm text-muted-foreground">Области исследований</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="font-display text-2xl font-bold">100%</div>
                    <div className="text-sm text-muted-foreground">Академическая направленность</div>
                  </div>
                </div>
              </div>
              <div className="relative animate-blur-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] shadow-elevation">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                    alt="Студенты сотрудничают над исследованиями"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <span className="text-white font-display text-xl font-semibold">
                      Соединяйтесь. Сотрудничайте. Инновируйте.
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 rounded-xl bg-white p-4 shadow-subtle">
                  <div className="flex items-center gap-2">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Академический фокус</div>
                      <div className="text-xs text-muted-foreground">Строго модерируемый контент</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl font-display font-bold">
                Все необходимое для академического взаимодействия
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                MagasitHub предоставляет все инструменты, необходимые для обмена исследованиями, сотрудничества с коллегами и создания академического профиля.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-subtle hover-lift">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <BookText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">Публикация исследований</h3>
                <p className="text-muted-foreground">
                  Делитесь своей академической работой с сообществом. Публикуйте статьи, кейсы и результаты исследований.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-subtle hover-lift">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">Академическое взаимодействие</h3>
                <p className="text-muted-foreground">
                  Общайтесь с другими студентами, профессорами и исследователями. Стройте профессиональные отношения.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-subtle hover-lift">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">События и дискуссии</h3>
                <p className="text-muted-foreground">
                  Будьте в курсе академических событий и участвуйте в осмысленных дискуссиях по темам исследований.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Featured Publications */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-display font-bold">Избранные публикации</h2>
                <p className="mt-3 text-lg text-muted-foreground">
                  Исследуйте последние работы нашего академического сообщества
                </p>
              </div>
              <Button variant="ghost" asChild className="mt-4 md:mt-0">
                <Link to="/publications">
                  Посмотреть все публикации <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPublications.map((publication) => (
                <ProjectCard key={publication.id} {...publication} />
              ))}
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-500 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display font-bold text-white mb-6">
                Готовы присоединиться к академическому сообществу?
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                Создайте свой профиль сегодня и начните делиться своими исследованиями с коллегами и преподавателями.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/dashboard">
                  Начать <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default Index;
