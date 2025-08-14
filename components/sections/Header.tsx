"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Menu, X, Calendar, Sparkles } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: '¿Qué es el CMF?', href: '#que-es' },
    { label: 'Lo que pasó', href: '#lo-que-paso' },
    { label: 'Entrevistas', href: '#entrevistas' },
    { label: 'Agenda', href: '#agenda' },
    { label: 'Ponentes', href: '#ponentes' },
    { label: 'Keynotes', href: '#keynotes' },
    { label: 'Testimonios', href: '#testimonios' },
    { label: 'Galería', href: '/galeria' }
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
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-16 lg:h-20' : 'h-18 lg:h-24'
        }`}>
          
          {/* Logo simplificado y optimizado */}
          <div className="flex items-center space-x-3 group flex-shrink-0">
            <div className={`relative transition-all duration-300 ${
              isScrolled ? 'w-10 h-10 lg:w-14 lg:h-14' : 'w-12 h-12 lg:w-16 lg:h-16'
            }`}>
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