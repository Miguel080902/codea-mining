"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Menu, X, Calendar, Sparkles, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isEventosDropdownOpen, setIsEventosDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: '¿Qué es el CMF?', href: '#que-es' },
    { label: 'Lo que pasó', href: '#lo-que-paso' },
    { label: 'Entrevistas', href: '#entrevistas' }
  ];

  const eventosItems = [
    { label: 'Agenda', href: '#agenda' },
    { label: 'Ponentes', href: '#ponentes' },
    { label: 'Keynotes', href: '#keynotes' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Solo detectar sección activa si estamos en la página principal
      if (pathname === '/') {
        const sections = ['que-es', 'lo-que-paso', 'estadisticas', 'entrevistas', 'agenda', 'ponentes', 'keynotes', 'sponsors', 'testimonios', 'proxima-edicion'];
        
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    
    if (href.startsWith('#')) {
      // Si estamos en la página de galería, primero navegar a home
      if (pathname === '/galeria') {
        router.push('/');
        // Esperar un poco para que la página cargue antes de hacer scroll
        setTimeout(() => {
          const element = document.getElementById(href.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // Si ya estamos en home, solo hacer scroll
        const element = document.getElementById(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Para enlaces externos como /galeria
      router.push(href);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 max-w-screen w-full ${
      isScrolled 
        ? 'bg-black/90 backdrop-blur-md border-b border-yellow-500/20 shadow-lg shadow-yellow-500/10' 
        : 'bg-black/60 backdrop-blur-sm border-b border-white/5'
    }`} style={{ maxWidth: '100vw' }}>
      {/* Container con padding mejorado para móviles */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between lg:justify-center lg:gap-16 transition-all duration-300 ${
          isScrolled ? 'h-16 lg:h-20' : 'h-18 lg:h-24'
        }`}>
          
          {/* Logo responsivo - favicon en móvil, logo completo en desktop */}
          <div className="flex items-center space-x-3 group flex-shrink-0">
            <div className={`relative transition-all duration-300 ${
              isScrolled ? 'w-10 h-10 lg:w-14 lg:h-14' : 'w-12 h-12 lg:w-16 lg:h-16'
            }`}>
              {/* Logo para móvil - favicon */}
              <Image
                src="/images/FAVICON-CODEAMININGFEST.png"
                alt="CODEa Mining Fest"
                fill
                sizes="(max-width: 768px) 48px, 64px"
                className="object-contain group-hover:scale-105 transition-transform duration-300 lg:hidden"
                priority
              />
              {/* Logo para desktop - logo completo */}
              <Image
                src="/images/LOGO-CODEAMININGFEST-WEB.png"
                alt="CODEa Mining Fest"
                fill
                sizes="(max-width: 1024px) 200px, 250px"
                className="object-contain group-hover:scale-105 transition-transform duration-300 hidden lg:block"
                priority
                style={{
                  filter: 'brightness(0) saturate(100%) invert(60%) sepia(90%) saturate(2000%) hue-rotate(15deg) brightness(1.2) contrast(1.1)',
                }}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item, index) => {
              const isActive = pathname === '/' && item.href.startsWith('#') && activeSection === item.href.substring(1);
              const isGalleryActive = pathname === '/galeria' && item.href === '/galeria';
              
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative group px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium whitespace-nowrap hover:bg-white/5 ${
                    isActive || isGalleryActive 
                      ? 'text-yellow-400 bg-yellow-500/10' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-300 ${
                    isActive || isGalleryActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              );
            })}
            
            {/* Eventos Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setIsEventosDropdownOpen(!isEventosDropdownOpen)}
                onMouseEnter={() => setIsEventosDropdownOpen(true)}
                className={`relative group px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium whitespace-nowrap hover:bg-white/5 flex items-center ${
                  eventosItems.some(item => pathname === '/' && item.href.startsWith('#') && activeSection === item.href.substring(1))
                    ? 'text-yellow-400 bg-yellow-500/10' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <span className="relative z-10">Eventos</span>
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${
                  isEventosDropdownOpen ? 'rotate-180' : ''
                }`} />
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-300 ${
                  eventosItems.some(item => pathname === '/' && item.href.startsWith('#') && activeSection === item.href.substring(1)) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
              
              {/* Dropdown Menu */}
              {isEventosDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-xl border border-yellow-500/20 rounded-xl shadow-2xl z-50"
                  onMouseLeave={() => setIsEventosDropdownOpen(false)}
                >
                  {eventosItems.map((item, index) => {
                    const isActive = pathname === '/' && item.href.startsWith('#') && activeSection === item.href.substring(1);
                    
                    return (
                      <button
                        key={item.label}
                        onClick={() => {
                          handleNavClick(item.href);
                          setIsEventosDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 transition-all duration-300 text-sm font-medium hover:bg-white/10 first:rounded-t-xl last:rounded-b-xl ${
                          isActive 
                            ? 'text-yellow-400 bg-yellow-500/10' 
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center">
                          <Sparkles className={`w-4 h-4 mr-3 text-yellow-400 transition-all duration-300 ${
                            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`} />
                          <span>{item.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Testimonios item */}
            <button
              onClick={() => handleNavClick('#testimonios')}
              className={`relative group px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium whitespace-nowrap hover:bg-white/5 ${
                pathname === '/' && activeSection === 'testimonios'
                  ? 'text-yellow-400 bg-yellow-500/10' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <span className="relative z-10">Testimonios</span>
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-300 ${
                pathname === '/' && activeSection === 'testimonios' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>
            
            {/* Galería item */}
            <button
              onClick={() => handleNavClick('/galeria')}
              className={`relative group px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium whitespace-nowrap hover:bg-white/5 ${
                pathname === '/galeria'
                  ? 'text-yellow-400 bg-yellow-500/10' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <span className="relative z-10">Galería</span>
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-300 ${
                pathname === '/galeria' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>
          </nav>

          {/* CTA Button mejorado */}
          <div className="hidden lg:block flex-shrink-0">
            <Button 
              variant="primary" 
              size="md" 
              onClick={() => handleNavClick('#proxima-edicion')}
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-semibold shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 group"
            >
              <Calendar className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Próximo evento
            </Button>
          </div>

          {/* Mobile Menu Button mejorado */}
          <button
            className="lg:hidden p-2 rounded-lg text-white hover:text-yellow-400 transition-all duration-300 hover:bg-white/5 border border-yellow-500/20 hover:border-yellow-400/40 flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation mejorado */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-yellow-500/20 bg-black/95 backdrop-blur-xl rounded-b-lg mx-[-1rem] px-4">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item, index) => {
                const isActive = pathname === '/' && item.href.startsWith('#') && activeSection === item.href.substring(1);
                const isGalleryActive = pathname === '/galeria' && item.href === '/galeria';
                
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className={`group relative rounded-lg transition-all duration-300 px-4 py-3 text-sm font-medium ${
                      isActive || isGalleryActive 
                        ? 'text-yellow-400 bg-yellow-500/10' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center">
                      <Sparkles className={`w-4 h-4 mr-3 text-yellow-400 transition-all duration-300 ${
                        isActive || isGalleryActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`} />
                      <span>{item.label}</span>
                    </div>
                    <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 h-6 bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-300 rounded-r ${
                      isActive || isGalleryActive ? 'w-1' : 'w-0 group-hover:w-1'
                    }`} />
                  </button>
                );
              })}
              
              {/* Eventos Section en Mobile */}
              <div className="mt-2">
                <div className="px-4 py-2 text-xs font-semibold text-yellow-400 uppercase tracking-wider">
                  Eventos
                </div>
                {eventosItems.map((item, index) => {
                  const isActive = pathname === '/' && item.href.startsWith('#') && activeSection === item.href.substring(1);
                  
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      className={`group relative rounded-lg transition-all duration-300 px-4 py-3 text-sm font-medium ml-4 w-[calc(100%-1rem)] ${
                        isActive 
                          ? 'text-yellow-400 bg-yellow-500/10' 
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                      style={{ animationDelay: `${(navItems.length + index + 1) * 100}ms` }}
                    >
                      <div className="flex items-center">
                        <Sparkles className={`w-4 h-4 mr-3 text-yellow-400 transition-all duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`} />
                        <span>{item.label}</span>
                      </div>
                      <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 h-6 bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-300 rounded-r ${
                        isActive ? 'w-1' : 'w-0 group-hover:w-1'
                      }`} />
                    </button>
                  );
                })}
              </div>
              
              {/* Testimonios item en Mobile */}
              <button
                onClick={() => handleNavClick('#testimonios')}
                className={`group relative rounded-lg transition-all duration-300 px-4 py-3 text-sm font-medium ${
                  pathname === '/' && activeSection === 'testimonios'
                    ? 'text-yellow-400 bg-yellow-500/10' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                style={{ animationDelay: `${(navItems.length + eventosItems.length + 1) * 100}ms` }}
              >
                <div className="flex items-center">
                  <Sparkles className={`w-4 h-4 mr-3 text-yellow-400 transition-all duration-300 ${
                    pathname === '/' && activeSection === 'testimonios' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`} />
                  <span>Testimonios</span>
                </div>
                <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 h-6 bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-300 rounded-r ${
                  pathname === '/' && activeSection === 'testimonios' ? 'w-1' : 'w-0 group-hover:w-1'
                }`} />
              </button>
              
              {/* Galería item en Mobile */}
              <button
                onClick={() => handleNavClick('/galeria')}
                className={`group relative rounded-lg transition-all duration-300 px-4 py-3 text-sm font-medium ${
                  pathname === '/galeria'
                    ? 'text-yellow-400 bg-yellow-500/10' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                style={{ animationDelay: `${(navItems.length + eventosItems.length + 2) * 100}ms` }}
              >
                <div className="flex items-center">
                  <Sparkles className={`w-4 h-4 mr-3 text-yellow-400 transition-all duration-300 ${
                    pathname === '/galeria' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`} />
                  <span>Galería</span>
                </div>
                <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 h-6 bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-300 rounded-r ${
                  pathname === '/galeria' ? 'w-1' : 'w-0 group-hover:w-1'
                }`} />
              </button>
              
              <div className="pt-4 px-0">
                <Button 
                  variant="primary" 
                  size="md" 
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-semibold justify-center group"
                  onClick={() => handleNavClick('#proxima-edicion')}
                >
                  <Calendar className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Próximo evento
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Accent Line */}
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