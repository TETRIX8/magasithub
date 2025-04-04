
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookText, Calendar, Edit, Trash2, ChevronLeft, MessageCircle, Share, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';

const PublicationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [publication, setPublication] = useState<any>(null);
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchPublicationDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Получаем данные публикации
        const { data: publicationData, error: publicationError } = await supabase
          .from('publications')
          .select('*')
          .eq('id', id)
          .single();
        
        if (publicationError) throw publicationError;
        
        // Получаем авторов публикации
        const { data: authorsData, error: authorsError } = await supabase
          .from('publication_authors')
          .select('*')
          .eq('publication_id', id);
        
        if (authorsError) throw authorsError;
        
        setPublication(publicationData);
        setAuthors(authorsData || []);
        setSaved(publicationData.saved || false);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке данных публикации:', error);
        toast({
          title: "Ошибка загрузки",
          description: "Не удалось загрузить публикацию. Пожалуйста, попробуйте позже.",
          variant: "destructive",
        });
        setLoading(false);
        navigate('/publications');
      }
    };
    
    fetchPublicationDetails();
  }, [id, navigate]);

  const toggleSaved = async () => {
    try {
      const { error } = await supabase
        .from('publications')
        .update({ saved: !saved })
        .eq('id', id);
      
      if (error) throw error;
      
      setSaved(!saved);
      toast({
        title: saved ? "Удалено из сохраненных" : "Добавлено в сохраненные",
        description: saved 
          ? "Публикация удалена из списка избранных" 
          : "Публикация добавлена в список избранных",
      });
    } catch (error) {
      console.error('Ошибка при обновлении статуса сохранения:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус сохранения. Пожалуйста, попробуйте позже.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('publications')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Публикация удалена",
        description: "Публикация была успешно удалена",
      });
      navigate('/publications');
    } catch (error) {
      console.error('Ошибка при удалении публикации:', error);
      toast({
        title: "Ошибка удаления",
        description: "Не удалось удалить публикацию. Пожалуйста, попробуйте позже.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-6">
              <div className="h-10 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-full"></div>
              <div className="h-64 bg-gray-200 rounded w-full"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!publication) {
    return (
      <>
        <Header />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="p-8 text-center">
                <BookText className="h-12 w-12 text-muted mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Публикация не найдена</h3>
                <p className="text-muted-foreground mb-4">
                  Данная публикация не существует или была удалена.
                </p>
                <Button onClick={() => navigate('/publications')}>
                  Вернуться к публикациям
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Навигация */}
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate('/publications')}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Вернуться к публикациям
          </Button>
          
          {/* Заголовок и действия */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center">
                <BookText className="h-6 w-6 text-primary mr-2" />
                <h1 className="text-2xl md:text-3xl font-display font-bold">{publication.title}</h1>
              </div>
              <div className="flex items-center mt-2 text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {new Date(publication.date).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
                <Badge variant="outline" className="ml-4">
                  {publication.category}
                </Badge>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleSaved}
              >
                {saved ? (
                  <>
                    <BookmarkCheck className="h-4 w-4 mr-2 text-primary" />
                    Сохранено
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4 mr-2" />
                    Сохранить
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Поделиться
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Редактировать
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Удалить
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Это действие нельзя отменить. Публикация будет удалена безвозвратно.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Удалить
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          
          {/* Основной контент */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-8">
              {/* Изображение публикации */}
              {publication.cover_image && (
                <div className="w-full rounded-lg overflow-hidden">
                  <img 
                    src={publication.cover_image} 
                    alt={publication.title}
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092921461-eab62e97a2d5?q=80&w=2070&auto=format&fit=crop';
                    }}
                  />
                </div>
              )}
              
              {/* Аннотация */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Аннотация</h2>
                <p className="text-muted-foreground">{publication.abstract}</p>
              </div>
              
              <Separator />
              
              {/* Содержание публикации */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Содержание публикации</h2>
                <div className="prose max-w-none">
                  {publication.content.split('\n').map((paragraph: string, index: number) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
              
              {/* Теги */}
              {publication.tags?.length > 0 && (
                <div className="pt-4">
                  <h3 className="text-lg font-semibold mb-2">Теги</h3>
                  <div className="flex flex-wrap gap-2">
                    {publication.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Комментарии */}
              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Комментарии ({publication.comments_count || 0})
                </h3>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">
                      Функция комментирования будет добавлена в ближайшее время
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Боковая информация */}
            <div className="space-y-6">
              {/* Авторы */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Авторы</h3>
                  <div className="space-y-4">
                    {authors.length > 0 ? (
                      authors.map((author) => (
                        <div key={author.id} className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={author.avatar_url} alt={author.name} />
                            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{author.name}</p>
                            <p className="text-sm text-muted-foreground">{author.role || 'Исследователь'}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Автор" />
                          <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Анонимный автор</p>
                          <p className="text-sm text-muted-foreground">Исследователь</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Похожие публикации */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Похожие публикации</h3>
                  <p className="text-center text-muted-foreground">
                    Функция рекомендаций будет добавлена в ближайшее время
                  </p>
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

export default PublicationDetails;
