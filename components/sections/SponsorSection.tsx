"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Crown, Star, Award, Sparkles } from 'lucide-react';

const SponsorsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const diamondSponsors = [
    {
      id: 1,
      name: "Micromine",
      logo: "/images/sponsors/micromine-logo.png",
      description: "Software líder en planificación minera"
    },
    {
      id: 2,
      name: "Komatsu Mitsui",
      logo: "/images/sponsors/komatsu-mitsui-logo.png",
      description: "Maquinaria y tecnología minera"
    },
    {
      id: 3,
      name: "Geodrone",
      logo: "/images/sponsors/geodrone-logo.png",
      description: "Soluciones de mapeo y topografía"
    },
    {
      id: 4,
      name: "EDF Energy",
      logo: "/images/sponsors/edf-logo.png",
      description: "Energía y sostenibilidad"
    },
    {
      id: 5,
      name: "CorePlan",
      logo: "/images/sponsors/coreplan-logo.png",
      description: "Planificación y optimización minera"
    },
    {
      id: 6,
      name: "IMSS",
      logo: "/images/sponsors/imss.png",
      description: "Consultoría en Ingeniería de Minas"
    }
  ];

  // Duplicar sponsors para efecto infinito sin cortes
  const infiniteSponsors = [...diamondSponsors, ...diamondSponsors];

  return (
    <section 
      id="sponsors"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => {
          // Valores fijos para evitar hydration mismatch
          const positions = [
            { left: 12, top: 18, delay: 0.8 }, { left: 88, top: 22, delay: 3.2 },
            { left: 35, top: 78, delay: 1.9 }, { left: 72, top: 62, delay: 4.1 },
            { left: 18, top: 42, delay: 2.6 }, { left: 68, top: 88, delay: 0.4 },
            { left: 92, top: 38, delay: 3.7 }, { left: 42, top: 68, delay: 1.3 },
            { left: 58, top: 28, delay: 4.5 }, { left: 22, top: 82, delay: 2.2 },
            { left: 78, top: 32, delay: 0.9 }, { left: 48, top: 92, delay: 3.8 },
            { left: 8, top: 58, delay: 1.6 }, { left: 82, top: 12, delay: 4.3 },
            { left: 38, top: 48, delay: 2.9 }
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
              <Sparkles className="w-4 h-4 text-yellow-500 animate-float" />
            </div>
          );
        })}
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold text-sm mb-6 shadow-lg">
            <Crown className="w-5 h-5 mr-2" />
            SPONSORS OFICIALES
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 mb-6">
            Auspiciadores{' '}
            <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">Diamante</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empresas líderes que apoyan la innovación y el desarrollo de la minería en Latinoamérica
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-amber-600 mx-auto mt-6 rounded-full" />
        </div>

        {/* Infinite Carousel */}
        <div className={`transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          {/* Carousel Container */}
          <div className="relative overflow-hidden py-8">
            {/* Gradient overlays for fade effect - Only on desktop */}
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none"></div>
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-scroll-infinite">
              {infiniteSponsors.map((sponsor, index) => (
                <div
                  key={`${sponsor.id}-${index}`}
                  className="group relative flex-shrink-0 mx-2 lg:mx-6"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-2xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Sponsor Card */}
                  <div className="relative bg-white border-2 border-gray-100 rounded-2xl p-4 lg:p-8 text-center shadow-lg hover:shadow-2xl hover:border-yellow-500/30 transition-all duration-500 h-56 lg:h-64">
                    
                    {/* Diamond Badge */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-600 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
                      <Crown className="w-3 h-3 mr-1" />
                      DIAMANTE
                    </div>
                    
                    {/* Logo Container */}
                    <div className="relative h-20 lg:h-24 mb-4 flex items-center justify-center">
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={160}
                        height={80}
                        className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Sponsor Info */}
                    <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors duration-300">
                      {sponsor.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm">
                      {sponsor.description}
                    </p>
                    
                    {/* Hover line effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-b-2xl" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-bidirectional-desktop {
          0% {
            transform: translateX(0);
          }
          45% {
            transform: translateX(-50%);
          }
          50% {
            transform: translateX(-50%);
          }
          95% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes scroll-bidirectional-mobile {
          0% {
            transform: translateX(0);
          }
          45% {
            transform: translateX(-390%);
          }
          50% {
            transform: translateX(-390%);
          }
          60% {
            transform: translateX(-390%);
          }
          95% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll-infinite {
          animation: scroll-bidirectional-mobile 32s ease-in-out infinite;
        }

        @media (min-width: 1024px) {
          .animate-scroll-infinite {
            animation: scroll-bidirectional-desktop 16s ease-in-out infinite;
          }
        }
        
        .animate-scroll-infinite > div {
          width: 220px;
        }

        @media (min-width: 1024px) {
          .animate-scroll-infinite > div {
            width: 320px;
          }
        }
      `}</style>
    </section>
  );
};

export default SponsorsSection;