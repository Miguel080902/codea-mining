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
      id: 0,
      name: "Christa Quiroz Cotrina",
      title: "Ingeniera en Minas | Lider de planificación, supervisión y desarrollo de planes mineros",
      subtitle: "Integración de nuevas tecnologías de gestión de relaves y desmonte en la Planificación en minería a tajo abierto",
      image: "/images/speakers/speaker-christa-optimized.webp",
      country: "Perú"
    },
    {
      id: 1,
      name: "Hyder Mamani",
      title: "Sub Grte. Técnico en procesos metalúrgicos MEPSA Aceros Chilca SAC",
      subtitle: "Redefinición de la IA en la conexión Mina-Planta",
      image: "/images/speakers/speaker-hyder-optimized.webp",
      country: "Perú"
    },
    {
      id: 2,
      name: "Christian Osorio",
      title: "Gerente General IMSS by Latam",
      subtitle: "Análisis de riesgo aplicado a la planificación minera",
      image: "/images/speakers/speaker-christian-optimized.webp",
      country: "Perú"
    },
    {
      id: 3,
      name: "Enrique Paredes",
      title: "Operations Mining Executive",
      subtitle: "Gestión integrada de operaciones mineras",
      image: "/images/speakers/speaker-enrique-optimized.webp",
      country: "Perú"
    },
    {
      id: 4,
      name: "Luis Eduardo Rojas",
      title: "Gerente de Tecnologías de Información en Hudbay Peru S.A.C.",
      subtitle: "OT para soportar la operación minera",
      image: "/images/speakers/speaker-luis-e-optimized.webp",
      country: "Perú"
    },
    {
      id: 5,
      name: "José Chimaico",
      title: "Gerente de operaciones FLANDERS",
      subtitle: "Futuro autónomo: Tecnología de Perforación agnóstica",
      image: "/images/speakers/speaker-jose-optimized.webp",
      country: "Perú"
    },
    {
      id: 6,
      name: "Giovanna Tito",
      title: "CEO SILTZ | Directora Independiente MS4M",
      subtitle: "Minería 5.0: Operaciones Integradas, Seguras y Colaborativas",
      image: "/images/speakers/speaker-giovanna-optimized.webp",
      country: "Perú"
    },
    {
      id: 7,
      name: "Yair Camborda Morocho",
      title: "Machine learning Engineer | Data Scientist",
      subtitle: "IA en acción: Casos de éxito que están revolucionando  la minería",
      image: "/images/speakers/speaker-yair-optimized.webp",
      country: "Perú"
    },
    {
      id: 8,
      name: "Hilario Gorvenia",
      title: "Gerente de procesos y planta en Metso",
      subtitle: "El valor agregado de la Conminución y la Variabilidad como Enemigo Silencioso en la Eficiencia del Proceso.",
      image: "/images/speakers/speaker-hilario-optimized.webp",
      country: "Perú"
    },
    {
      id: 9,
      name: "Luis Martinez",
      title: "Asociado Estratégico IMSS-Consultores",
      subtitle: "Análisis de riesgo aplicado a la planificación minera",
      image: "/images/speakers/speaker-luis-m-optimized.webp",
      country: "Perú"
    },
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
        {[...Array(15)].map((_, i) => {
          // Valores fijos para evitar hydration mismatch
          const positions = [
            { left: 15, top: 25, delay: 1.2 }, { left: 85, top: 15, delay: 3.8 },
            { left: 45, top: 75, delay: 2.1 }, { left: 75, top: 55, delay: 4.2 },
            { left: 25, top: 35, delay: 0.8 }, { left: 65, top: 85, delay: 2.9 },
            { left: 95, top: 45, delay: 1.7 }, { left: 35, top: 65, delay: 3.4 },
            { left: 55, top: 25, delay: 0.5 }, { left: 20, top: 85, delay: 4.6 },
            { left: 80, top: 35, delay: 2.3 }, { left: 50, top: 95, delay: 1.9 },
            { left: 10, top: 55, delay: 3.1 }, { left: 70, top: 15, delay: 0.9 },
            { left: 40, top: 45, delay: 4.8 }
          ];
          const pos = positions[i];
          
          return (
            <div
              key={i}
              className="absolute opacity-10"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDelay: `${pos.delay}s`
              }}
            >
              <Users className="w-4 h-4 text-yellow-400 animate-float" />
            </div>
          );
        })}
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
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 transform transition-all duration-1000 delay-300 ${
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
              <div className="relative bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/30 transition-all duration-500 h-full flex flex-col min-h-[380px]">
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                
                {/* Speaker Image - Altura fija */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
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
                <div className="relative p-3 flex-grow flex flex-col">
                  <div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300 leading-tight">
                      {speaker.name}
                    </h3>
                    
                    <p className="text-yellow-400 font-medium text-xs mb-1 leading-tight">
                      {speaker.title}
                    </p>
                    
                    <p className="text-gray-400 text-xs leading-tight font-light">
                      {speaker.subtitle}
                    </p>
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
      </div>
    </section>
  );
};

export default FeaturedSpeakers;