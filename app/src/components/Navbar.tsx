import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, BarChart3 } from 'lucide-react';
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
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Check for user authentication on component mount
    const checkUserAuth = () => {
      const userNameFromCookie = Cookies.get('userName');
      setUserName(userNameFromCookie || null);
    };

    // Get current path
    const getCurrentPath = () => {
      setCurrentPath(window.location.pathname);
    };

    checkUserAuth();
    getCurrentPath();
    window.addEventListener('scroll', handleScroll);
    
    // Listen for storage changes to update navbar when user logs in/out
    const handleStorageChange = () => {
      checkUserAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);

    // Listen for route changes
    const handleLocationChange = () => {
      getCurrentPath();
    };

    // For SPA route changes
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
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
    window.location.href = '/';
  };

  const navigateToDashboard = () => {
    window.location.href = '/dashboard';
    setIsOpen(false);
  };

  const navigateToAnalyze = () => {
    window.location.href = '/analyze';
    setIsOpen(false);
  };

  const navigateToHome = () => {
    window.location.href = '/';
    setIsOpen(false);
  };

  // Show navigation sections only on home page
  const showNavSections = currentPath === '/' && !userName;

  return (
    <>
      {/* Fixed navbar with consistent positioning */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 
                className="text-2xl font-bold text-brand-blue cursor-pointer hover:text-brand-blue/80 transition-colors duration-200" 
                onClick={navigateToHome}
              >
                EarlySteps
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Show navigation sections only on home page when not logged in */}
              {showNavSections && (
                <>
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
                </>
              )}
              
              {/* Conditional rendering based on authentication */}
              {userName ? (
                <div className="flex items-center space-x-4">
                  <Button 
                    onClick={navigateToAnalyze}
                    className="bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold flex items-center space-x-2 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <BarChart3 size={16} />
                    <span>Analyze</span>
                  </Button>
                  
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="bg-yellow-300 hover:bg-yellow-100 border-yellow-100 hover:border-yellow-300 text-gray-900 font-semibold flex items-center space-x-2"
                      >
                        <User size={16} />
                        <span className="max-w-32 truncate">{userName}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="center"
                      side="bottom"
                      className="w-48"
                      sideOffset={8}
                      alignOffset={0}
                      avoidCollisions={false}
                    >
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
                </div>
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
                className="text-foreground hover:text-brand-teal transition-colors duration-200 p-1"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="fixed top-16 left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {/* Show navigation sections only on home page when not logged in */}
              {showNavSections && (
                <>
                  <button
                    onClick={() => scrollToSection('problem')}
                    className="block w-full text-left px-3 py-3 text-foreground hover:text-brand-teal hover:bg-brand-light/50 rounded-md transition-colors duration-200"
                  >
                    The Problem
                  </button>
                  <button
                    onClick={() => scrollToSection('solution')}
                    className="block w-full text-left px-3 py-3 text-foreground hover:text-brand-teal hover:bg-brand-light/50 rounded-md transition-colors duration-200"
                  >
                    Our Solution
                  </button>
                  <button
                    onClick={() => scrollToSection('team')}
                    className="block w-full text-left px-3 py-3 text-foreground hover:text-brand-teal hover:bg-brand-light/50 rounded-md transition-colors duration-200"
                  >
                    The Team
                  </button>
                  <div className="border-t border-border my-2"></div>
                </>
              )}
              
              {userName ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 px-3 py-3 bg-yellow-400 border border-yellow-50 rounded-md">
                    <User size={16} className="text-gray-700" />
                    <span className="text-sm font-medium truncate text-gray-900">{userName}</span>
                  </div>
                  
                  <Button 
                    onClick={navigateToAnalyze}
                    className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold flex items-center justify-center space-x-2 py-3"
                  >
                    <BarChart3 size={16} />
                    <span>Analyze</span>
                  </Button>
                  
                  <Button 
                    onClick={navigateToDashboard}
                    className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-dark font-semibold py-3"
                  >
                    Dashboard
                  </Button>
                  
                  <Button 
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50 flex items-center justify-center space-x-2 py-3"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <Button 
                  asChild
                  className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-dark font-semibold py-3"
                >
                  <a href="/login">Login</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
