
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, GraduationCap, LogIn, LogOut, Menu, Search, User, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Check if user has scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Navigation links
  const navLinks = [
    { name: 'Главная', path: '/dashboard' },
    { name: 'Публикации', path: '/publications' },
    { name: 'События', path: '/events' },
    { name: 'Исследования', path: '/research' },
    { name: 'Люди', path: '/people' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-subtle' : 'bg-white/0'
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 animate-fade-in">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-display font-semibold tracking-tight">АкадемХаб</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-all hover-lift',
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-foreground'
                )}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search and User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative w-64 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск..."
                className="pl-10 h-9 rounded-full bg-secondary/80"
              />
            </div>
            
            {user ? (
              <>
                <Button variant="ghost" size="icon" className="animate-fade-in" style={{ animationDelay: '0.25s' }}>
                  <Bell className="h-5 w-5" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full animate-fade-in" style={{ animationDelay: '0.3s' }}>
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={user.firstName} />
                        <AvatarFallback>{user.firstName?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 glass-effect">
                    <DropdownMenuLabel>{user.firstName}</DropdownMenuLabel>
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">{user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Профиль</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings">Настройки</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/my-publications">Мои публикации</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button variant="default" size="sm" onClick={() => navigate('/auth')} className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <LogIn className="mr-2 h-4 w-4" />
                Войти
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="inline-flex md:hidden items-center justify-center p-2 rounded-md text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'block px-3 py-2 rounded-md text-base font-medium transition-all',
                  location.pathname === link.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-secondary hover:text-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200">
              {user ? (
                <>
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.firstName} />
                        <AvatarFallback>{user.firstName?.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-foreground">{user.firstName}</div>
                      <div className="text-sm font-medium text-muted-foreground">{user.email}</div>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <Bell className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary">
                      Профиль
                    </Link>
                    <Link to="/settings" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary">
                      Настройки
                    </Link>
                    <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-secondary">
                      <LogOut className="w-4 h-4 mr-2 inline" />
                      Выйти
                    </button>
                  </div>
                </>
              ) : (
                <div className="px-5 py-3">
                  <Button onClick={() => navigate('/auth')} className="w-full">
                    <LogIn className="mr-2 h-4 w-4" />
                    Войти
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
