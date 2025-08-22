"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Star, MapPin, Linkedin, Twitter, Award, ArrowRight } from 'lucide-react';

const KeynoteSpeakers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSpeaker, setHoveredSpeaker] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Configuración del carrusel mobile
  const MOBILE_ITEM_WIDTH = 250;
  const GAP = 16;

  const keynoteSpeakers = [
    // Página 1 - Speakers 1-10
    {
      id: 1,
      name: "Gabriel Cubas Glen",
      title: "Gerente Automatizacion y Analiticas - Komatsu Mitsui Maquinaras Peru - KMMP",
      company: "Mesa redonda: Innovación en Minería: Retos, Casos y Oportunidades",
      image: "/images/keynotes/keynote-gabriel-optimized.webp",
      country: "Perú",
    },
    {
      id: 2,
      name: "Alessandra Mandriotti",
      title: "Gerente Corporativo de Transformación, Talento y Tecnología - Alpayana",
      company: "Mesa redonda: Innovación en Minería: Retos, Casos y Oportunidades",
      image: "/images/keynotes/keynote-alessandra-optimized.webp",
      country: "Perú",
    },
    {
      id: 3,
      name: "Leonardo Almeyda Tejada",
      title: "Ingeniero de Innovación & Transformación Digital Nexa Resources",
      company: "Mesa redonda: Innovación en Minería: Retos, Casos y Oportunidades",
      image: "/images/keynotes/keynote-leonardo-optimized.webp",
      country: "Perú",
    },
    {
      id: 4,
      name: "Kevin Renzo Salazar",
      title: "Senior Data Scientist Pi Data Strategy & Consulting",
      company: "Mesa redonda: Innovación en Minería: Retos, Casos y Oportunidades",
      image: "/images/keynotes/keynote-kevin-optimized.webp",
      country: "Perú",
    },
    {
      id: 5,
      name: "Cleber Da Cunha",
      title: "Expert associate - GEN AI Adoption en NTT DATA Perú",
      company: "Data-Driven Mining: Construyendo una cultura basada en datos",
      image: "/images/keynotes/keynote-cleber-optimized.webp",
      country: "Perú",
    },
    {
      id: 6,
      name: "Alexander Chacón Butron",
      title: "Superintendente de Tecnología e Innovación",
      company: "Data-Driven Mining: Construyendo una cultura basada en datos",
      image: "/images/keynotes/keynote-alexander-optimized.webp",
      country: "Perú",
    },
    {
      id: 7,
      name: "Felipe Carrillo",
      title: "Superintendente de autonomía Quellaveco",
      company: "Mesa redonda: Innovación en Minería: Retos, Casos y Oportunidades",
      image: "/images/keynotes/keynote-felipe-optimized.webp",
      country: "Perú",
    },
    {
      id: 8,
      name: "Osvaldo Bascur",
      title: "Principal and Consultant Fellow at OSB Digital, LLC",
      company: "Mesa redonda: Innovación en Minería: Retos, Casos y Oportunidades",
      image: "/images/keynotes/keynote-osvaldo-optimized.webp",
      country: "Perú",
    },
    {
      id: 9,
      name: "Juan Carlos Vásquez Marina",
      title: "Superintendente de mantenimiento planta Quellaveco",
      company: "Mesa redonda: Innovación en Minería: Retos, Casos y Oportunidades",
      image: "/images/keynotes/keynote-juan-optimized.webp",
      country: "Perú",
    }
  ];

  // Funciones del carrusel mobile
  const nextCarousel = () => {
    const maxIndex = Math.max(0, keynoteSpeakers.length - 1);
    setCarouselIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevCarousel = () => {
    setCarouselIndex(prev => Math.max(prev - 1, 0));
  };

  const canGoPrev = carouselIndex > 0;
  const canGoNext = carouselIndex < keynoteSpeakers.length - 1;

  useEffect(() => {
    // Fallback para mobile: mostrar después de 1 segundo si no se detecta intersección
    const fallbackTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          clearTimeout(fallbackTimer);
        }
      },
      { threshold: 0.1, rootMargin: '50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <section 
      id="keynotes"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/tech-circuit-pattern.png')] opacity-5" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-purple-500/3 to-yellow-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold text-sm mb-6 shadow-lg">
            <Award className="w-5 h-5 mr-2" />
            CONFERENCIAS MAGISTRALES
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
            Conferencistas{' '}
            <span className="text-gradient">magistrales</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Los expertos más reconocidos en minería, tecnología e innovación que lideraron las conferencias principales
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Mobile Carousel */}
        <div className={`lg:hidden relative transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Carousel Controls */}
          <div className="flex items-center justify-between mb-6 px-4">
            <h3 className="text-lg font-semibold text-white">Conoce a nuestros speakers</h3>
            <div className="flex space-x-2">
              <button
                onClick={prevCarousel}
                disabled={!canGoPrev}
                className="w-10 h-10 bg-slate-800/50 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-slate-700/50 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <button
                onClick={nextCarousel}
                disabled={!canGoNext}
                className="w-10 h-10 bg-slate-800/50 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-slate-700/50 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Carousel Container */}
          <div className="w-full px-4">
            <div 
              className="overflow-hidden py-4"
              style={{ 
                width: '100%',
                maxWidth: `${MOBILE_ITEM_WIDTH + 1}px`,
                margin: '0 auto'
              }}
            >
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ 
                  transform: `translateX(-${carouselIndex * (MOBILE_ITEM_WIDTH + GAP)}px)`,
                  gap: `${GAP}px`
                }}
              >
                {keynoteSpeakers.map((speaker, index) => (
                  <div
                    key={speaker.id}
                    className="group relative transform transition-all duration-700 flex-shrink-0"
                    style={{ 
                      width: `${MOBILE_ITEM_WIDTH}px`,
                      transitionDelay: `${index * 100}ms` 
                    }}
                    onMouseEnter={() => setHoveredSpeaker(speaker.id)}
                    onMouseLeave={() => setHoveredSpeaker(null)}
                  >
                    {/* Card Container */}
                    <div className="relative bg-slate-800/40 backdrop-blur-sm border-2 border-white/10 rounded-2xl overflow-hidden group-hover:border-yellow-500/50 transition-all duration-500 h-full flex flex-col">
                      
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                      
                      {/* Speaker Image */}
                      <div className="relative h-60 overflow-hidden rounded-t-2xl">
                        <Image
                          src={speaker.image}
                          alt={speaker.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        
                        {/* Country Badge */}
                        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full">
                          <MapPin className="w-3 h-3 text-yellow-400" />
                          <span className="text-white text-xs font-medium">{speaker.country}</span>
                        </div>

                        {/* Social Icons - Appear on Hover */}
                        <div className={`absolute bottom-3 left-3 flex space-x-2 transform transition-all duration-300 ${
                          hoveredSpeaker === speaker.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}>
                          <button className="w-6 h-6 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                            <Linkedin className="w-3 h-3 text-white" />
                          </button>
                          <button className="w-6 h-6 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                            <Twitter className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      </div>

                      {/* Speaker Info */}
                      <div className="relative p-4 flex-1 flex flex-col justify-between">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
                          {speaker.name}
                        </h3>
                        
                        <p className="text-yellow-400 font-semibold text-xs mb-2 line-clamp-2">
                          {speaker.title}
                        </p>
                        
                        <p className="text-blue-400 font-medium text-xs mb-3 line-clamp-1">
                          {speaker.company}
                        </p>

                        {/* Hover line effect */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {keynoteSpeakers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCarouselIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  carouselIndex === index 
                    ? 'bg-yellow-400 w-6' 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className={`hidden lg:block relative transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {keynoteSpeakers.slice(0, 10).map((speaker, index) => (
              <div
                key={speaker.id}
                className={`group relative transform transition-all duration-700 hover:scale-105 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredSpeaker(speaker.id)}
                onMouseLeave={() => setHoveredSpeaker(null)}
              >
                {/* Card Container */}
                <div className="relative bg-slate-800/40 backdrop-blur-sm border-2 border-white/10 rounded-2xl overflow-hidden group-hover:border-yellow-500/50 transition-all duration-500 h-full flex flex-col">
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  
                  {/* Speaker Image */}
                  <div className="relative h-60 overflow-hidden rounded-t-2xl">
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Country Badge */}
                    <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full">
                      <MapPin className="w-3 h-3 text-yellow-400" />
                      <span className="text-white text-xs font-medium">{speaker.country}</span>
                    </div>

                    {/* Social Icons - Appear on Hover */}
                    <div className={`absolute bottom-3 left-3 flex space-x-2 transform transition-all duration-300 ${
                      hoveredSpeaker === speaker.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}>
                      <button className="w-6 h-6 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                        <Linkedin className="w-3 h-3 text-white" />
                      </button>
                      <button className="w-6 h-6 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                        <Twitter className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Speaker Info */}
                  <div className="relative p-4 flex-1 flex flex-col justify-between">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
                      {speaker.name}
                    </h3>
                    
                    <p className="text-yellow-400 font-semibold text-xs mb-2 line-clamp-2">
                      {speaker.title}
                    </p>
                    
                    <p className="text-blue-400 font-medium text-xs mb-3 line-clamp-1">
                      {speaker.company}
                    </p>

                    {/* Hover line effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeynoteSpeakers;