
import React, { useState } from 'react';
import { BookText, ChevronDown, Filter, Search, SlidersHorizontal } from 'lucide-react';
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

// Sample publications data
const publicationsData: ProjectCardProps[] = [
  {
    id: '1',
    title: 'Machine Learning Approaches for Predictive Analytics in Higher Education',
    abstract: 'This research explores how machine learning algorithms can be applied to predict student performance and improve educational outcomes in college settings.',
    coverImage: 'https://images.unsplash.com/photo-1581092921461-eab62e97a2d5?q=80&w=2070&auto=format&fit=crop',
    date: 'May 15, 2023',
    category: 'Computer Science',
    authors: [
      { id: '1', name: 'Alex Johnson', role: 'Professor', avatarUrl: 'https://i.pravatar.cc/150?img=11' },
      { id: '2', name: 'Maria Garcia', role: 'Student', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
      { id: '3', name: 'David Kim', role: 'Researcher', avatarUrl: 'https://i.pravatar.cc/150?img=8' },
    ],
    commentsCount: 12,
    tags: ['Machine Learning', 'Education', 'Data Science'],
    saved: true,
  },
  {
    id: '2',
    title: 'The Impact of Climate Change on Urban Architecture: New Sustainable Design Principles',
    abstract: 'An analysis of how climate change is forcing architects to reconsider traditional design principles and adopt more sustainable approaches.',
    coverImage: 'https://images.unsplash.com/photo-1518005068251-37900150dfca?q=80&w=2071&auto=format&fit=crop',
    date: 'April 3, 2023',
    category: 'Architecture',
    authors: [
      { id: '4', name: 'Sarah Chen', role: 'Professor', avatarUrl: 'https://i.pravatar.cc/150?img=20' },
      { id: '5', name: 'Jamal Wilson', role: 'Student', avatarUrl: 'https://i.pravatar.cc/150?img=12' },
    ],
    commentsCount: 8,
    tags: ['Sustainability', 'Architecture', 'Climate Change'],
    saved: false,
  },
  {
    id: '3',
    title: 'Quantum Computing: Practical Applications in Cryptography and Database Systems',
    abstract: 'This paper examines the potential real-world applications of quantum computing in the fields of cryptography and database management.',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop',
    date: 'June 21, 2023',
    category: 'Physics',
    authors: [
      { id: '6', name: 'Robert Smith', role: 'Professor', avatarUrl: 'https://i.pravatar.cc/150?img=15' },
      { id: '7', name: 'Emma Parker', role: 'Researcher', avatarUrl: 'https://i.pravatar.cc/150?img=23' },
    ],
    commentsCount: 15,
    tags: ['Quantum Computing', 'Cryptography', 'Computer Science'],
    saved: false,
  },
  {
    id: '4',
    title: 'The Ethics of Artificial Intelligence in Academic Research',
    abstract: 'An exploration of ethical considerations when implementing AI systems for educational research and academic purposes.',
    date: 'July 2, 2023',
    category: 'Ethics',
    authors: [
      { id: '10', name: 'Thomas Wilson', role: 'Professor', avatarUrl: 'https://i.pravatar.cc/150?img=16' },
      { id: '11', name: 'Sophia Lee', role: 'Student', avatarUrl: 'https://i.pravatar.cc/150?img=25' },
    ],
    commentsCount: 7,
    tags: ['AI Ethics', 'Research', 'Education'],
    saved: false,
  },
  {
    id: '5',
    title: 'Renewable Energy Integration in Campus Architecture',
    abstract: 'Case study on implementing renewable energy solutions in college campus buildings and infrastructure.',
    coverImage: 'https://images.unsplash.com/photo-1522162363424-d29ded2ad958?q=80&w=2071&auto=format&fit=crop',
    date: 'June 28, 2023',
    category: 'Architecture',
    authors: [
      { id: '12', name: 'Elena Rodriguez', role: 'Professor', avatarUrl: 'https://i.pravatar.cc/150?img=29' },
    ],
    commentsCount: 3,
    tags: ['Renewable Energy', 'Architecture', 'Sustainability'],
    saved: true,
  },
  {
    id: '6',
    title: 'Advancements in Natural Language Processing for Academic Text Analysis',
    abstract: 'This paper reviews recent advancements in NLP techniques specifically designed for academic text analysis and knowledge extraction.',
    coverImage: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=2070&auto=format&fit=crop',
    date: 'May 5, 2023',
    category: 'Computer Science',
    authors: [
      { id: '13', name: 'Michael Zhang', role: 'Professor', avatarUrl: 'https://i.pravatar.cc/150?img=40' },
      { id: '14', name: 'Jennifer Lopez', role: 'Researcher', avatarUrl: 'https://i.pravatar.cc/150?img=45' },
    ],
    commentsCount: 9,
    tags: ['NLP', 'Text Analysis', 'Machine Learning'],
    saved: false,
  },
];

// Filter categories
const categories = [
  'All Categories',
  'Computer Science',
  'Architecture',
  'Physics',
  'Ethics',
  'Biology',
  'Psychology',
  'Mathematics',
  'Literature',
];

const tags = [
  'Machine Learning',
  'Education',
  'Data Science',
  'Sustainability',
  'Architecture',
  'Climate Change',
  'Quantum Computing',
  'Cryptography',
  'AI Ethics',
  'Research',
  'Renewable Energy',
  'NLP',
  'Text Analysis',
];

const timeframes = [
  'All Time',
  'This Year',
  'This Month',
  'This Week',
];

const sortOptions = [
  'Most Recent',
  'Most Cited',
  'Alphabetical (A-Z)',
  'Alphabetical (Z-A)',
];

const Publications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSort, setSelectedSort] = useState('Most Recent');
  const [selectedTimeframe, setSelectedTimeframe] = useState('All Time');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Handle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Filter publications based on selected criteria
  const filteredPublications = publicationsData.filter(pub => {
    // Search filter
    if (searchQuery && !pub.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !pub.abstract.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedCategory !== 'All Categories' && pub.category !== selectedCategory) {
      return false;
    }
    
    // Tags filter
    if (selectedTags.length > 0 && !pub.tags?.some(tag => selectedTags.includes(tag))) {
      return false;
    }
    
    return true;
  });
  
  return (
    <>
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 animate-fade-in">
            <div>
              <div className="flex items-center">
                <BookText className="h-6 w-6 text-primary mr-2" />
                <h1 className="text-3xl font-display font-bold">Publications</h1>
              </div>
              <p className="text-muted-foreground mt-2">
                Explore research papers, case studies, and academic publications.
              </p>
            </div>
            <Button size="sm">
              Submit a Publication
            </Button>
          </div>
          
          {/* Search & Filters */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search publications..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
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
                    <SelectValue placeholder="Sort by" />
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
                      Advanced Filters
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4" align="end">
                    <div className="space-y-4">
                      <h4 className="font-medium">Filter by</h4>
                      
                      <div>
                        <h5 className="text-sm font-medium mb-2">Time Period</h5>
                        <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select timeframe" />
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
                        <h5 className="text-sm font-medium mb-2">Tags</h5>
                        <div className="max-h-40 overflow-y-auto space-y-2">
                          {tags.map(tag => (
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
                            setSelectedTimeframe('All Time');
                          }}
                        >
                          Reset
                        </Button>
                        <Button size="sm">Apply Filters</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            {/* Mobile filters */}
            <div className="md:hidden mt-4">
              <Collapsible
                open={filtersOpen}
                onOpenChange={setFiltersOpen}
                className="space-y-2"
              >
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    {filtersOpen ? 'Hide Filters' : 'Show Filters'}
                    <ChevronDown className={`h-4 w-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 pt-2">
                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Time period" />
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
                    <h5 className="text-sm font-medium mb-2">Popular Tags</h5>
                    <div className="flex flex-wrap gap-1">
                      {tags.slice(0, 8).map(tag => (
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
            
            {/* Active filters */}
            {(selectedCategory !== 'All Categories' || selectedTags.length > 0 || selectedTimeframe !== 'All Time' || searchQuery) && (
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedCategory !== 'All Categories' && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedCategory}
                    <button 
                      className="ml-1 text-xs rounded-full hover:bg-muted p-0.5"
                      onClick={() => setSelectedCategory('All Categories')}
                    >
                      &times;
                    </button>
                  </Badge>
                )}
                
                {selectedTimeframe !== 'All Time' && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedTimeframe}
                    <button 
                      className="ml-1 text-xs rounded-full hover:bg-muted p-0.5"
                      onClick={() => setSelectedTimeframe('All Time')}
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
                    setSelectedCategory('All Categories');
                    setSelectedTags([]);
                    setSelectedTimeframe('All Time');
                    setSearchQuery('');
                  }}
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
          
          {/* Results Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-muted-foreground">
                Showing {filteredPublications.length} of {publicationsData.length} publications
              </p>
            </div>
            
            {filteredPublications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPublications.map(publication => (
                  <ProjectCard key={publication.id} {...publication} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <BookText className="h-12 w-12 text-muted mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No publications found</h3>
                  <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                    We couldn't find any publications matching your search criteria. 
                    Try adjusting your filters or search term.
                  </p>
                  <Button 
                    onClick={() => {
                      setSelectedCategory('All Categories');
                      setSelectedTags([]);
                      setSelectedTimeframe('All Time');
                      setSearchQuery('');
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
            
            {/* Pagination (simplified) */}
            {filteredPublications.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
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
                    Next
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
