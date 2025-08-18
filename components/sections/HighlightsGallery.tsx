"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Eye } from 'lucide-react';

const HighlightsGallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      id: 1,
      title: "Panel de Expertos",
      description: "Mesa redonda con líderes de la industria minera",
      image: "/images/highlights/panel-discussion.jpg",
      type: "panel"
    },
    {
      id: 2,
      title: "Presentación Magistral",
      description: "Conferencia sobre el futuro de la minería digital",
      image: "/images/keynotes/keynote-gabriel.png",
      type: "keynote"
    },
    {
      id: 3,
      title: "Networking Session",
      description: "Intercambio de ideas entre profesionales",
      image: "/images/contact/conference-audience.webp",
      type: "networking"
    },
    {
      id: 4,
      title: "Demo Tecnológica",
      description: "Presentación de soluciones innovadoras",
      image: "/images/about/about-1.jpg",
      type: "demo"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % highlights.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + highlights.length) % highlights.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section 
      id="lo-que-paso"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
            Revive los momentos más{' '}
            <span className="text-gradient">impactantes</span> del evento
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Una colección de los highlights más memorables del CODEa Mining Fest 2025
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-600 mx-auto mt-6 rounded-full" />
        </div>

        {/* Main Gallery */}
        <div className={`relative transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Main Image Display */}
          <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden mb-8 group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
            
            <Image
              src={highlights[currentSlide].image}
              alt={highlights[currentSlide].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay Content */}
            <div className="absolute bottom-8 left-8 z-20 text-white">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-500/90 text-black text-sm font-medium mb-4">
                <Eye className="w-4 h-4 mr-2" />
                Momento destacado
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-2">{highlights[currentSlide].title}</h3>
              <p className="text-lg text-gray-300 max-w-md">{highlights[currentSlide].description}</p>
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-15">
              <button className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 group-hover:scale-125">
                <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
              </button>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((highlight, index) => (
              <button
                key={highlight.id}
                onClick={() => goToSlide(index)}
                className={`relative h-32 lg:h-40 rounded-xl overflow-hidden transition-all duration-300 ${
                  currentSlide === index 
                    ? 'ring-2 ring-yellow-400 scale-105 shadow-2xl shadow-yellow-400/25' 
                    : 'hover:scale-105 opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={highlight.image}
                  alt={highlight.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 text-white">
                  <p className="text-sm font-medium truncate">{highlight.title}</p>
                </div>
                
                {/* Active indicator */}
                {currentSlide === index && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {highlights.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-yellow-400 w-8' 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsGallery;