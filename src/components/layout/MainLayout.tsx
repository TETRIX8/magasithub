
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { FileText, Calendar, Home, Users } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showNavigation?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  showHeader = true, 
  showFooter = true,
  showNavigation = true 
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && <Header />}
      
      {showNavigation && (
        <div className="sticky top-16 z-30 w-full bg-white/80 backdrop-blur-sm border-b border-border/50">
          <div className="container mx-auto">
            <NavigationMenu className="mx-auto my-2">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/dashboard">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "gap-2")}>
                      <Home className="w-4 h-4" /> 
                      Главное
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/publications">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "gap-2")}>
                      <FileText className="w-4 h-4" /> 
                      Публикации
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/events">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "gap-2")}>
                      <Calendar className="w-4 h-4" /> 
                      События
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/people">
                    <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "gap-2")}>
                      <Users className="w-4 h-4" /> 
                      Люди
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      )}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
