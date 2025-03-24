
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Bookmark, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

export interface Author {
  id: string;
  name: string;
  avatarUrl?: string;
  role: string;
}

export interface ProjectCardProps {
  id: string;
  title: string;
  abstract: string;
  coverImage?: string;
  date: string;
  authors: Author[];
  category: string;
  commentsCount: number;
  saved?: boolean;
  tags?: string[];
  variant?: 'default' | 'featured';
  className?: string;
}

const ProjectCard = ({
  id,
  title,
  abstract,
  coverImage,
  date,
  authors,
  category,
  commentsCount,
  saved = false,
  tags = [],
  variant = 'default',
  className,
}: ProjectCardProps) => {
  const isFeatured = variant === 'featured';
  
  return (
    <div 
      className={cn(
        'group bg-white rounded-xl overflow-hidden border border-border transition-all duration-300 hover:shadow-elevation',
        isFeatured ? 'md:grid md:grid-cols-2 gap-4' : '',
        className
      )}
    >
      {coverImage && (
        <div className={cn(
          'aspect-video w-full overflow-hidden',
          isFeatured ? 'md:aspect-auto md:h-full' : ''
        )}>
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="text-xs font-medium">
            {category}
          </Badge>
          <div className="flex items-center text-muted-foreground text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{date}</span>
          </div>
        </div>
        
        <Link to={`/publications/${id}`}>
          <h3 className={cn(
            'font-display font-semibold text-balance mb-2 transition-colors hover:text-primary',
            isFeatured ? 'text-2xl' : 'text-lg'
          )}>
            {title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {abstract}
        </p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center -space-x-2">
            {authors.slice(0, 3).map((author, index) => (
              <Avatar key={author.id} className="border-2 border-white h-8 w-8">
                <AvatarImage src={author.avatarUrl} alt={author.name} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
            {authors.length > 3 && (
              <div className="h-8 w-8 flex items-center justify-center text-xs font-medium bg-muted text-muted-foreground rounded-full border-2 border-white">
                +{authors.length - 3}
              </div>
            )}
            <span className="text-muted-foreground text-xs ml-4">
              Автор: {authors[0].name}{authors.length > 1 ? ` и еще ${authors.length - 1}` : ''}
            </span>
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MessageCircle className="h-4 w-4" />
              {commentsCount > 0 && <span className="sr-only">{commentsCount} комментариев</span>}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bookmark className={saved ? "h-4 w-4 fill-primary text-primary" : "h-4 w-4"} />
              <span className="sr-only">{saved ? 'Сохранено' : 'Сохранить'}</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowUpRight className="h-4 w-4" />
              <span className="sr-only">Просмотр</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
