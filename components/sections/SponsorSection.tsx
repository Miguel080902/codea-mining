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
    }
  ];

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
            <Sparkles className="w-4 h-4 text-yellow-500 animate-float" />
          </div>
        ))}
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
          
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-6">
            Auspiciadores{' '}
            <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">Diamante</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empresas líderes que apoyan la innovación y el desarrollo de la minería en Latinoamérica
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-amber-600 mx-auto mt-6 rounded-full" />
        </div>

        {/* Sponsors Grid */}
        <div className={`transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          {/* Main Sponsors Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
            {diamondSponsors.slice(0, 3).map((sponsor, index) => (
              <div
                key={sponsor.id}
                className={`group relative transform transition-all duration-700 hover:scale-105 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-2xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Sponsor Card */}
                <div className="relative bg-white border-2 border-gray-100 rounded-2xl p-8 lg:p-10 text-center shadow-lg hover:shadow-2xl hover:border-yellow-500/30 transition-all duration-500">
                  
                  {/* Diamond Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-600 text-black px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center">
                    <Crown className="w-3 h-3 mr-1" />
                    DIAMANTE
                  </div>
                  
                  {/* Logo Container */}
                  <div className="relative h-24 lg:h-32 mb-6 flex items-center justify-center">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={200}
                      height={100}
                      className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Sponsor Info */}
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                    {sponsor.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm lg:text-base">
                    {sponsor.description}
                  </p>
                  
                  {/* Hover line effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-b-2xl" />
                </div>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 max-w-3xl mx-auto">
            {diamondSponsors.slice(3, 5).map((sponsor, index) => (
              <div
                key={sponsor.id}
                className={`group relative transform transition-all duration-700 hover:scale-105 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${(index + 3) * 200}ms` }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-2xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Sponsor Card */}
                <div className="relative bg-white border-2 border-gray-100 rounded-2xl p-8 lg:p-10 text-center shadow-lg hover:shadow-2xl hover:border-yellow-500/30 transition-all duration-500">
                  
                  {/* Diamond Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-600 text-black px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center">
                    <Crown className="w-3 h-3 mr-1" />
                    DIAMANTE
                  </div>
                  
                  {/* Logo Container */}
                  <div className="relative h-24 lg:h-32 mb-6 flex items-center justify-center">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={200}
                      height={100}
                      className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Sponsor Info */}
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors duration-300">
                    {sponsor.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm lg:text-base">
                    {sponsor.description}
                  </p>
                  
                  {/* Hover line effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-b-2xl" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="text-center p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
            <Award className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-yellow-600 mb-2">5</div>
            <div className="text-gray-700 font-medium">Sponsors Diamante</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <Star className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-700 font-medium">Años de experiencia</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <Crown className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-700 font-medium">Líderes del sector</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;