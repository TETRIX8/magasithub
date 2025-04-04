
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookText, ChevronDown, Filter, Search, SlidersHorizontal, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectCard, { ProjectCardProps } from '@/components/ui/ProjectCard';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';

// Категории фильтров
const categories = [
  'Все категории',
  'Информатика',
  'Архитектура',
  'Физика',
  'Этика',
  'Биология',
  'Психология',
  'Математика',
  'Литература',
];

const timeframes = [
  'За все время',
  'В этом году',
  'В этом месяце',
  'На этой неделе',
];

const sortOptions = [
  'Самые новые',
  'Самые цитируемые',
  'По алфавиту (А-Я)',
  'По алфавиту (Я-А)',
];

const Publications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все категории');
  const [selectedSort, setSelectedSort] = useState('Самые новые');
  const [selectedTimeframe, setSelectedTimeframe] = useState('За все время');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [publicationsData, setPublicationsData] = useState<ProjectCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Загрузка публикаций из базы данных
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        const { data: publications, error } = await supabase
          .from('publications')
          .select('*, publication_authors(*)');

        if (error) {
          throw error;
        }

        // Составляем список всех уникальных тегов для фильтров
        const tagsSet = new Set<string>();
        
        // Преобразуем данные в формат ProjectCardProps
        const formattedPublications = publications?.map(pub => {
          // Добавляем теги в общий набор
          pub.tags?.forEach(tag => tagsSet.add(tag));
          
          return {
            id: pub.id,
            title: pub.title,
            abstract: pub.abstract,
            coverImage: pub.cover_image || 'https://images.unsplash.com/photo-1581092921461-eab62e97a2d5?q=80&w=2070&auto=format&fit=crop',
            date: new Date(pub.date).toLocaleDateString('ru-RU'),
            category: pub.category,
            authors: pub.publication_authors?.map((author: any) => ({
              id: author.id,
              name: author.name,
              role: author.role || 'Исследователь',
              avatarUrl: author.avatar_url || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 20) + 1}`,
            })) || [],
            commentsCount: pub.comments_count || 0,
            tags: pub.tags || [],
            saved: pub.saved || false,
          };
        }) || [];

        setPublicationsData(formattedPublications);
        setAllTags(Array.from(tagsSet));
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке публикаций:', error);
        toast({
          title: "Ошибка загрузки",
          description: "Не удалось загрузить публикации. Пожалуйста, попробуйте позже.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  // Обработка выбора тегов
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Фильтрация публикаций по выбранным критериям
  const filteredPublications = publicationsData.filter(pub => {
    // Поиск
    if (searchQuery && !pub.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !pub.abstract.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Фильтр по категории
    if (selectedCategory !== 'Все категории' && pub.category !== selectedCategory) {
      return false;
    }
    // Фильтр по тегам
    if (selectedTags.length > 0 && !pub.tags?.some(tag => selectedTags.includes(tag))) {
      return false;
    }
    return true;
  });

  // Сортировка публикаций
  const sortedPublications = [...filteredPublications].sort((a, b) => {
    switch (selectedSort) {
      case 'Самые новые':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'По алфавиту (А-Я)':
        return a.title.localeCompare(b.title, 'ru');
      case 'По алфавиту (Я-А)':
        return b.title.localeCompare(a.title, 'ru');
      default:
        return 0;
    }
  });

  return (
    <>
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Заголовок страницы */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 animate-fade-in">
            <div>
              <div className="flex items-center">
                <BookText className="h-6 w-6 text-primary mr-2" />
                <h1 className="text-3xl font-display font-bold">Публикации</h1>
              </div>
              <p className="text-muted-foreground mt-2">
                Исследуйте научные статьи, кейсы и академические публикации.
              </p>
            </div>
            <Button size="sm" onClick={() => navigate('/publication/create')}>
              <Plus className="w-4 h-4 mr-2" />
              Отправить публикацию
            </Button>
          </div>
          {/* Поиск и фильтры */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск публикаций..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Категория" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedSort} onValueChange={setSelectedSort}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Сортировать по" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Расширенные фильтры
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4" align="end">
                    <div className="space-y-4">
                      <h4 className="font-medium">Фильтровать по</h4>
                      <div>
                        <h5 className="text-sm font-medium mb-2">Период времени</h5>
                        <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Выберите период" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeframes.map(time => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-2">Теги</h5>
                        <div className="max-h-40 overflow-y-auto space-y-2">
                          {allTags.map(tag => (
                            <div key={tag} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`tag-${tag}`} 
                                checked={selectedTags.includes(tag)}
                                onCheckedChange={() => toggleTag(tag)}
                              />
                              <label
                                htmlFor={`tag-${tag}`}
                                className="text-sm cursor-pointer"
                              >
                                {tag}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between pt-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedTags([]);
                            setSelectedTimeframe('За все время');
                          }}
                        >
                          Сбросить
                        </Button>
                        <Button size="sm">Применить фильтры</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {/* Мобильные фильтры */}
            <div className="md:hidden mt-4">
              <Collapsible
                open={filtersOpen}
                onOpenChange={setFiltersOpen}
                className="space-y-2"
              >
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    {filtersOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
                    <ChevronDown className={`h-4 w-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 pt-2">
                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Период времени" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeframes.map(time => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div>
                    <h5 className="text-sm font-medium mb-2">Популярные теги</h5>
                    <div className="flex flex-wrap gap-1">
                      {allTags.slice(0, 8).map(tag => (
                        <Badge 
                          key={tag} 
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            {/* Активные фильтры */}
            {(selectedCategory !== 'Все категории' || selectedTags.length > 0 || selectedTimeframe !== 'За все время' || searchQuery) && (
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedCategory !== 'Все категории' && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedCategory}
                    <button 
                      className="ml-1 text-xs rounded-full hover:bg-muted p-0.5"
                      onClick={() => setSelectedCategory('Все категории')}
                    >
                      &times;
                    </button>
                  </Badge>
                )}
                {selectedTimeframe !== 'За все время' && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedTimeframe}
                    <button 
                      className="ml-1 text-xs rounded-full hover:bg-muted p-0.5"
                      onClick={() => setSelectedTimeframe('За все время')}
                    >
                      &times;
                    </button>
                  </Badge>
                )}
                {selectedTags.map(tag => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button 
                      className="ml-1 text-xs rounded-full hover:bg-muted p-0.5"
                      onClick={() => toggleTag(tag)}
                    >
                      &times;
                    </button>
                  </Badge>
                ))}
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    "{searchQuery}"
                    <button 
                      className="ml-1 text-xs rounded-full hover:bg-muted p-0.5"
                      onClick={() => setSearchQuery('')}
                    >
                      &times;
                    </button>
                  </Badge>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 px-2 text-xs"
                  onClick={() => {
                    setSelectedCategory('Все категории');
                    setSelectedTags([]);
                    setSelectedTimeframe('За все время');
                    setSearchQuery('');
                  }}
                >
                  Очистить все
                </Button>
              </div>
            )}
          </div>
          {/* Раздел результатов */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-muted-foreground">
                {loading 
                  ? 'Загрузка публикаций...' 
                  : `Показано ${sortedPublications.length} из ${publicationsData.length} публикаций`
                }
              </p>
            </div>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="p-4">
                    <div className="animate-pulse">
                      <div className="bg-gray-200 h-40 w-full rounded-lg mb-4"></div>
                      <div className="bg-gray-200 h-8 w-3/4 rounded mb-2"></div>
                      <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
                      <div className="bg-gray-200 h-4 w-5/6 rounded mb-4"></div>
                      <div className="flex space-x-2">
                        <div className="bg-gray-200 h-6 w-20 rounded"></div>
                        <div className="bg-gray-200 h-6 w-20 rounded"></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : sortedPublications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPublications.map(publication => (
                  <ProjectCard key={publication.id} {...publication} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <BookText className="h-12 w-12 text-muted mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Публикации не найдены</h3>
                  <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                    Мы не смогли найти публикации, соответствующие вашим критериям поиска. 
                    Попробуйте изменить фильтры или запрос.
                  </p>
                  <Button 
                    onClick={() => {
                      setSelectedCategory('Все категории');
                      setSelectedTags([]);
                      setSelectedTimeframe('За все время');
                      setSearchQuery('');
                    }}
                  >
                    Очистить фильтры
                  </Button>
                </CardContent>
              </Card>
            )}
            {/* Пагинация (упрощенная) */}
            {sortedPublications.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Предыдущая
                  </Button>
                  <Button variant="outline" size="sm" className="bg-primary text-white">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Следующая
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Publications;
