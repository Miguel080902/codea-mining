"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Users, Network, Target } from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Array de imágenes
  const images = [
    '/images/about/about-1.jpg',
    '/images/about/about-2.jpg',
    '/images/about/about-3.jpg',
    '/images/about/about-4.jpg'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Efecto para el carrusel de imágenes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3500); // Cambia cada 2 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  const features = [
    {
      icon: Users,
      title: "Aprender",
      description: "Conocimiento en minería y tecnología"
    },
    {
      icon: Network,
      title: "Colaborar", 
      description: "Networking con líderes de la industria"
    },
    {
      icon: Target,
      title: "Transformar",
      description: "Impulsar la innovación en el sector minero"
    }
  ];

  return (
    <section 
      id="que-es"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/tech-pattern.png')] opacity-5" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content Side */}
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
          }`}>
            {/* Section title */}
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
                ¿Qué es el{' '}
                <span className="text-gradient">CODEa Mining Fest</span>?
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full" />
            </div>

            {/* Main description */}
            <div className="mb-8 space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed">
                El <span className="text-yellow-400 font-semibold">CODEa Mining Fest</span> es el punto de encuentro donde la 
                comunidad minera y tecnológica se conecta para{' '}
                <span className="text-blue-400 font-semibold">aprender, colaborar y transformar</span>.
              </p>
              
              <p className="text-lg text-gray-400 leading-relaxed">
                Un evento de un día, con múltiples espacios de formación, intercambio de ideas y construcción de redes.
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index}
                    className={`transform transition-all duration-700 delay-${index * 100} ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                  >
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-4 hover:border-yellow-500/40 transition-all duration-300 group hover:scale-105">
                      <Icon className="w-8 h-8 text-yellow-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-sm leading-tight">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className={`transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <Button variant="primary" size="lg" className="group">
                Conoce más sobre el evento
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>

          {/* Image Side with Carousel */}
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}>
            <div className="relative group">
              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                
                {/* Image carousel */}
                <div className="relative w-full h-[400px]">
                  {images.map((imageSrc, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <Image
                        src={imageSrc}
                        alt={`CODEa Mining Fest ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 z-20 bg-slate-900/90 backdrop-blur-md rounded-xl px-4 py-3 border border-yellow-500/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white font-medium">CMF 2025</span>
                  </div>
                </div>

                {/* Image indicators */}
                <div className="absolute bottom-6 right-6 z-20 flex space-x-2">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-yellow-400 w-6' 
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-yellow-500/30 rounded-full animate-spin-slow" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500/20 rounded-lg rotate-45 animate-float" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-blue-500/20 rounded-2xl blur-xl scale-110 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;