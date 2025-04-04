
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookText, Plus, X, Upload, Tags } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";

// Категории публикаций
const categories = [
  'Информатика',
  'Архитектура',
  'Физика',
  'Этика',
  'Биология',
  'Психология',
  'Математика',
  'Литература',
];

// Временные данные автора для демонстрации
const authorData = {
  id: '1',
  name: 'Текущий пользователь',
  role: 'Автор',
  avatarUrl: 'https://i.pravatar.cc/150?img=1'
};

const PublicationCreate = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Функция для добавления тега
  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  // Функция для удаления тега
  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  // Обработка нажатия клавиши Enter при вводе тега
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  // Загрузка изображения (в этой версии просто сохраняем URL)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrl = e.target.value;
    setCoverImage(imageUrl);
  };

  // Отправка данных публикации
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !abstract || !content || !category) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Сохраняем публикацию в базе данных
      const { data: publicationData, error: publicationError } = await supabase
        .from('publications')
        .insert({
          title,
          abstract,
          content,
          category,
          cover_image: coverImage,
          tags,
        })
        .select('id')
        .single();

      if (publicationError) {
        throw publicationError;
      }

      // Если публикация успешно создана, добавляем автора
      if (publicationData?.id) {
        const { error: authorError } = await supabase
          .from('publication_authors')
          .insert({
            publication_id: publicationData.id,
            name: authorData.name,
            role: authorData.role,
            avatar_url: authorData.avatarUrl,
          });

        if (authorError) {
          throw authorError;
        }
      }

      toast({
        title: "Успех!",
        description: "Публикация успешно создана",
      });
      
      // Перенаправляем на страницу публикаций
      navigate('/publications');
    } catch (error) {
      console.error("Ошибка при создании публикации:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать публикацию. Пожалуйста, попробуйте снова.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <h1 className="text-3xl font-display font-bold">Создать публикацию</h1>
              </div>
              <p className="text-muted-foreground mt-2">
                Поделитесь своей научной работой, исследованием или статьей с сообществом
              </p>
            </div>
          </div>

          {/* Форма создания публикации */}
          <Card className="animate-fade-in mb-8" style={{ animationDelay: '0.1s' }}>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Информация о публикации</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Заголовок */}
                <div className="space-y-2">
                  <Label htmlFor="title">Заголовок <span className="text-destructive">*</span></Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Введите название вашей публикации"
                    required
                  />
                </div>

                {/* Аннотация */}
                <div className="space-y-2">
                  <Label htmlFor="abstract">Аннотация <span className="text-destructive">*</span></Label>
                  <Textarea
                    id="abstract"
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    placeholder="Краткое описание вашей публикации (100-200 слов)"
                    className="h-24"
                    required
                  />
                </div>

                {/* Категория */}
                <div className="space-y-2">
                  <Label htmlFor="category">Категория <span className="text-destructive">*</span></Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Обложка */}
                <div className="space-y-2">
                  <Label htmlFor="coverImage">Ссылка на изображение обложки</Label>
                  <div className="flex gap-2">
                    <Input
                      id="coverImage"
                      type="text"
                      value={coverImage}
                      onChange={handleImageChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  {coverImage && (
                    <div className="mt-2 relative aspect-video w-full max-w-md overflow-hidden rounded-lg border border-border">
                      <img 
                        src={coverImage} 
                        alt="Предпросмотр обложки" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092921461-eab62e97a2d5?q=80&w=2070&auto=format&fit=crop';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Теги */}
                <div className="space-y-2">
                  <Label htmlFor="tags">Теги</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button 
                          type="button"
                          className="ml-1 text-xs rounded-full hover:bg-muted p-0.5"
                          onClick={() => removeTag(tag)}
                        >
                          &times;
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="tagInput"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      placeholder="Добавить тег"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={addTag}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Основной контент */}
                <div className="space-y-2">
                  <Label htmlFor="content">Содержание публикации <span className="text-destructive">*</span></Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Подробное содержание вашей публикации"
                    className="min-h-[300px]"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/publications')}
                >
                  Отмена
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Сохранение...' : 'Опубликовать'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PublicationCreate;
