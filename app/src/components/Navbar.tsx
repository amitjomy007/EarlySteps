import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-brand-blue">EarlySteps</h1>
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
            <Button 
              asChild
              className="bg-brand-accent hover:bg-brand-accent/90 text-brand-dark font-semibold"
            >
              <a href="/login">Login</a>
            </Button>
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
                <Button 
                  asChild
                  className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-dark font-semibold"
                >
                  <a href="/login">Login</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;