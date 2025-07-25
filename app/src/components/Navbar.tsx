import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check for user authentication on component mount
    const checkUserAuth = () => {
      const userNameFromCookie = Cookies.get('userName');
      setUserName(userNameFromCookie || null);
    };

    checkUserAuth();
    window.addEventListener('scroll', handleScroll);
    
    // Listen for storage changes to update navbar when user logs in/out
    const handleStorageChange = () => {
      checkUserAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove('userName');
    setUserName(null);
    setIsOpen(false);
    // Optionally redirect to home page
    window.location.href = '/';
  };

  const navigateToDashboard = () => {
    window.location.href = '/dashboard';
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-brand-blue cursor-pointer" onClick={() => window.location.href = '/'}>
              EarlySteps
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('problem')}
              className="text-foreground hover:text-brand-teal transition-colors duration-200"
            >
              The Problem
            </button>
            <button
              onClick={() => scrollToSection('solution')}
              className="text-foreground hover:text-brand-teal transition-colors duration-200"
            >
              Our Solution
            </button>
            <button
              onClick={() => scrollToSection('team')}
              className="text-foreground hover:text-brand-teal transition-colors duration-200"
            >
              The Team
            </button>
            
            {/* Conditional rendering based on authentication */}
            {userName ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <User size={16} />
                    <span className="max-w-32 truncate">{userName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={navigateToDashboard} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                asChild
                className="bg-brand-accent hover:bg-brand-accent/90 text-brand-dark font-semibold"
              >
                <a href="/login">Login</a>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-brand-teal transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('problem')}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-brand-teal transition-colors duration-200"
              >
                The Problem
              </button>
              <button
                onClick={() => scrollToSection('solution')}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-brand-teal transition-colors duration-200"
              >
                Our Solution
              </button>
              <button
                onClick={() => scrollToSection('team')}
                className="block w-full text-left px-3 py-2 text-foreground hover:text-brand-teal transition-colors duration-200"
              >
                The Team
              </button>
              
              <div className="px-3 py-2">
                {userName ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 px-3 py-2 bg-brand-light rounded-md">
                      <User size={16} className="text-brand-blue" />
                      <span className="text-sm font-medium truncate">{userName}</span>
                    </div>
                    <Button 
                      onClick={navigateToDashboard}
                      className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-dark font-semibold"
                    >
                      Dashboard
                    </Button>
                    <Button 
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button 
                    asChild
                    className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-dark font-semibold"
                  >
                    <a href="/login">Login</a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
