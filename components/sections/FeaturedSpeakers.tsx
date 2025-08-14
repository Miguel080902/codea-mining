"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Award, MapPin, Linkedin, Twitter, Users, Star } from 'lucide-react';

const FeaturedSpeakers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSpeaker, setHoveredSpeaker] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const speakers = [
    {
      id: 1,
      name: "Christa Quiroz Cotrina",
      title: "Ingeniera en Minas",
      subtitle: "Líder de planificación, supervisión y desarrollo de planes mineros",
      company: "Minera ABC",
      image: "/images/speakers/speaker-christa.png",
      rating: 4.9,
      talks: 3,
      country: "Perú"
    },
    {
      id: 2,
      name: "Hyder Mamani",
      title: "Sub Grte. Técnico en procesos metalúrgicos",
      subtitle: "MEPSA Aceros Chilea SAC",
      company: "MEPSA",
      image: "/images/speakers/speaker-hyder.png",
      rating: 4.8,
      talks: 2,
      country: "Chile"
    },
    {
      id: 3,
      name: "Christian Osorio",
      title: "Gerente General IMSS",
      subtitle: "by Latam",
      company: "IMSS Latam",
      image: "/images/speakers/speaker-christian.png",
      rating: 4.9,
      talks: 4,
      country: "Colombia"
    },
    {
      id: 4,
      name: "Leonardo Almeyda Tejada",
      title: "Ingeniero de Innovación & Transformación Digital",
      subtitle: "Nexa Resources",
      company: "Nexa Resources",
      image: "/images/speakers/speaker-leonardo.png",
      rating: 4.7,
      talks: 2,
      country: "Brasil"
    },
    {
      id: 5,
      name: "Leonardo Almeyda Tejada",
      title: "Ingeniero de Innovación & Transformación Digital",
      subtitle: "Nexa Resources",
      company: "Nexa Resources",
      image: "/images/speakers/speaker-leonardo.png",
      rating: 4.7,
      talks: 2,
      country: "Brasil"
    },
    {
      id: 6,
      name: "Leonardo Almeyda Tejada",
      title: "Ingeniero de Innovación & Transformación Digital",
      subtitle: "Nexa Resources",
      company: "Nexa Resources",
      image: "/images/speakers/speaker-leonardo.png",
      rating: 4.7,
      talks: 2,
      country: "Brasil"
    },
    {
      id: 7,
      name: "Leonardo Almeyda Tejada",
      title: "Ingeniero de Innovación & Transformación Digital",
      subtitle: "Nexa Resources",
      company: "Nexa Resources",
      image: "/images/speakers/speaker-leonardo.png",
      rating: 4.7,
      talks: 2,
      country: "Brasil"
    },
    {
      id: 8,
      name: "Leonardo Almeyda Tejada",
      title: "Ingeniero de Innovación & Transformación Digital",
      subtitle: "Nexa Resources",
      company: "Nexa Resources",
      image: "/images/speakers/speaker-leonardo.png",
      rating: 4.7,
      talks: 2,
      country: "Brasil"
    }
  ];

  return (
    <section 
      id="ponentes"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/3 to-yellow-500/3 rounded-full blur-3xl" />
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <Users className="w-4 h-4 text-yellow-400 animate-float" />
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-6">        
        {/* Section Header */}
        <div className={`text-center mb-12 md:mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold text-sm mb-6 shadow-lg">
            <Award className="w-5 h-5 mr-2" />
            SPEAKERS DE CLASE MUNDIAL
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light md:font-bold text-white mb-4 md:mb-6 px-4">
            Ponentes{' '}
            <span className="text-gradient font-medium md:font-bold">destacados</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 md:mb-8 px-4 font-light">
            Conoce a los expertos líderes en minería y tecnología que compartieron su conocimiento en el evento
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Speakers Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {speakers.map((speaker, index) => (
            <div
              key={speaker.id}
              className={`group relative transform transition-all duration-700 hover:scale-105 h-full ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredSpeaker(speaker.id)}
              onMouseLeave={() => setHoveredSpeaker(null)}
            >
              {/* Card Container - Altura fija */}
              <div className="relative bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/30 transition-all duration-500 h-full flex flex-col">
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                
                {/* Speaker Image - Altura fija */}
                <div className="relative h-64 overflow-hidden flex-shrink-0">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Country Badge */}
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full">
                    <MapPin className="w-3 h-3 text-yellow-400" />
                    <span className="text-white text-xs font-medium">{speaker.country}</span>
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 left-4 flex items-center space-x-1 bg-yellow-500/90 px-3 py-1 rounded-full">
                    <Star className="w-3 h-3 text-black" />
                    <span className="text-black text-xs font-bold">{speaker.rating}</span>
                  </div>

                  {/* Hover Social Icons */}
                  <div className={`absolute bottom-4 right-4 flex space-x-2 transform transition-all duration-300 ${
                    hoveredSpeaker === speaker.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    <button className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                      <Linkedin className="w-4 h-4 text-white" />
                    </button>
                    <button className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                      <Twitter className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Speaker Info - Flex-grow para ocupar espacio restante */}
                <div className="relative p-6 flex-grow flex flex-col justify-between">
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2 min-h-[1.5rem]">
                      {speaker.name}
                    </h3>
                    
                    <p className="text-yellow-400 font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                      {speaker.title}
                    </p>
                    
                    <p className="text-gray-400 text-sm leading-tight mb-4 line-clamp-2 min-h-[2.5rem]">
                      {speaker.subtitle}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-blue-400 font-medium text-sm truncate mr-2">
                      {speaker.company}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-400 text-sm flex-shrink-0">
                      <Users className="w-4 h-4" />
                      <span>{speaker.talks} charlas</span>
                    </div>
                  </div>

                  {/* Hover line effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl" />
                </div>

                {/* Floating number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center text-black font-bold text-sm shadow-lg">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className={`mt-16 grid grid-cols-1 sm:grid-cols-4 gap-6 transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="text-3xl font-bold text-yellow-400 mb-2">25+</div>
            <div className="text-gray-300">Speakers Internacionales</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="text-3xl font-bold text-blue-400 mb-2">8</div>
            <div className="text-gray-300">Países Representados</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="text-3xl font-bold text-green-400 mb-2">4.8</div>
            <div className="text-gray-300">Rating Promedio</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="text-3xl font-bold text-purple-400 mb-2">25</div>
            <div className="text-gray-300">Años de Experiencia</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSpeakers;