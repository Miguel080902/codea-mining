"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Menu, X, Calendar, Sparkles } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: '¿Qué es el CMF?', href: '#que-es' },
    { label: 'Lo que pasó', href: '#lo-que-paso' },
    { label: 'Próxima edición', href: '#proxima-edicion' },
    { label: 'Ponentes destacados', href: '#ponentes' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass border-b border-primary-500/20 shadow-glow-primary' 
        : 'bg-black/60 backdrop-blur-sm border-b border-white/5'
    }`}>
      <div className="container">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-18 lg:h-20' : 'h-20 lg:h-24'
        }`}>
          
          {/* Logo with Golden Fill */}
          <div className="flex items-center space-x-3 group">
            <div className={`relative transition-all duration-300 ${
              isScrolled ? 'w-12 h-12 lg:w-16 lg:h-16' : 'w-16 h-16 lg:w-20 lg:h-20'
            }`}>
              {/* Logo image with golden fill */}
              <div className="relative z-10 w-full h-full">
                <Image
                  src="/images/LOGO-CODEAMININGFEST-WEB.png"
                  alt="CODEa Mining Fest"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  priority
                  style={{
                    filter: 'brightness(0) saturate(100%) invert(60%) sepia(90%) saturate(2000%) hue-rotate(15deg) brightness(1.2) contrast(1.1)',
                  }}
                />
                
                {/* Golden gradient overlay for the fill effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 opacity-90"
                  style={{
                    maskImage: 'url(/images/LOGO-CODEAMININGFEST-WEB.png)',
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskImage: 'url(/images/LOGO-CODEAMININGFEST-WEB.png)',
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className="relative group text-gray-300 hover:text-white px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium whitespace-nowrap hover:glass-light"
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600/0 to-mining-600/0 group-hover:from-primary-600/10 group-hover:to-mining-600/10 rounded-xl transition-all duration-300" />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Enhanced CTA Button with Golden Accent */}
          <div className="hidden lg:block">
            <Button variant="primary" size="md" className="relative overflow-hidden bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-semibold shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 group">
              <span className="relative z-10 flex items-center">
                <Calendar className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Próximo evento
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 group-hover:from-white/10 group-hover:to-white/30 transition-all duration-300" />
            </Button>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            className="lg:hidden glass-light p-3 rounded-xl text-white hover:text-yellow-400 transition-all duration-300 hover:scale-110 border border-yellow-500/20 hover:border-yellow-400/40"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/0 to-amber-500/0 hover:from-yellow-400/20 hover:to-amber-500/20 rounded-lg transition-all duration-300" />
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-yellow-500/20 glass-light backdrop-blur-xl">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group relative text-gray-300 hover:text-white hover:glass-light rounded-xl transition-all duration-300 px-4 py-3 text-sm font-medium"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center">
                    <Sparkles className="w-4 h-4 mr-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <span>{item.label}</span>
                  </div>
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-6 bg-gradient-to-r from-yellow-400 to-amber-500 group-hover:w-1 transition-all duration-300 rounded-r" />
                </a>
              ))}
              
              <div className="pt-6 px-4">
                <Button 
                  variant="primary" 
                  size="md" 
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-semibold justify-center group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calendar className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Próximo evento
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Professional Accent Line with Golden Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
      
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(100%) skewX(-12deg); }
        }
        .animate-shine {
          animation: shine 1.5s ease-in-out;
        }
      `}</style>
    </header>
  );
};

export default Header;