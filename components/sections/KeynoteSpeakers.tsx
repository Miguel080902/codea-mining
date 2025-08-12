"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Star, MapPin, Linkedin, Twitter, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const KeynoteSpeakers = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSpeaker, setHoveredSpeaker] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const speakersPerPage = 10;
  const totalPages = 2;

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

  const keynoteSpeakers = [
    // Página 1 - Speakers 1-10
    {
      id: 1,
      name: "Gabriel Cubas Glen",
      title: "Gerente Automatización y Tecnología Operacional",
      company: "Maquinarias Perú - KKMP",
      image: "/images/keynote-gabriel.png",
      country: "Perú",
      expertise: "Automatización Industrial",
      years: "15+ años"
    },
    {
      id: 2,
      name: "Alessandra Mandriotti",
      title: "Gerente Corporativo de Transformación, Talento y Tecnología",
      company: "Alpayana",
      image: "/images/keynote-alessandra.png",
      country: "Perú",
      expertise: "Transformación Digital",
      years: "12+ años"
    },
    {
      id: 3,
      name: "Leonardo Almeyda Tejada",
      title: "Ingeniero de Innovación & Transformación Digital",
      company: "Nexa Resources",
      image: "/images/keynote-leonardo.png",
      country: "Perú",
      expertise: "Innovación Tecnológica",
      years: "10+ años"
    },
    {
      id: 4,
      name: "Kevin Renzo Salazar",
      title: "Consultor STEM",
      company: "Pi Data Strategy & Consulting",
      image: "/images/keynote-kevin.png",
      country: "Perú",
      expertise: "Data Science",
      years: "8+ años"
    },
    {
      id: 5,
      name: "Felipe Carrillo",
      title: "Superintendente de Laboratorio Geofísico-SAC",
      company: "Compañía Minera",
      image: "/images/keynote-felipe.png",
      country: "Perú",
      expertise: "Geofísica Aplicada",
      years: "20+ años"
    },
    {
      id: 6,
      name: "Alexander Chacón Butron",
      title: "Superintendente de Tecnología e Innovación",
      company: "Minera Regional",
      image: "/images/keynote-alexander.png",
      country: "Perú",
      expertise: "Innovación Minera",
      years: "18+ años"
    },
    {
      id: 7,
      name: "Cleber da Cunha",
      title: "Expert Associate - Gen AI Adoption en NT1 DATA Perú",
      company: "NT1 DATA",
      image: "/images/keynote-cleber.png",
      country: "Perú",
      expertise: "Inteligencia Artificial",
      years: "14+ años"
    },
    {
      id: 8,
      name: "Osvaldo Bascur",
      title: "Principal and Consultant Fellow at DSB Digital LLC",
      company: "DSB Digital",
      image: "/images/keynote-osvaldo.png",
      country: "Perú",
      expertise: "Digitalización Minera",
      years: "25+ años"
    },
    {
      id: 9,
      name: "María Elena Torres",
      title: "Directora de Innovación Tecnológica",
      company: "Minsur S.A.",
      image: "/images/keynote-gabriel.png", // Reutilizando imagen
      country: "Perú",
      expertise: "Tecnología Minera",
      years: "16+ años"
    },
    {
      id: 10,
      name: "Roberto Silva Mendez",
      title: "Gerente de Transformación Digital",
      company: "Southern Peru",
      image: "/images/keynote-leonardo.png", // Reutilizando imagen
      country: "Perú",
      expertise: "Digitalización",
      years: "13+ años"
    },
    // Página 2 - Speakers 11-20
    {
      id: 11,
      name: "Ana Patricia Quispe",
      title: "Especialista en Automatización Industrial",
      company: "Volcan Compañía Minera",
      image: "/images/keynote-alessandra.png", // Reutilizando imagen
      country: "Perú",
      expertise: "Automatización",
      years: "11+ años"
    },
    {
      id: 12,
      name: "Carlos Alberto Ramos",
      title: "Head of Digital Innovation",
      company: "Antamina",
      image: "/images/keynote-kevin.png", // Reutilizando imagen
      country: "Perú",
      expertise: "Innovación Digital",
      years: "17+ años"
    },
    {
      id: 13,
      name: "Diego Fernández Castro",
      title: "Superintendente de Sistemas",
      company: "Cerro Verde",
      image: "/images/keynote-felipe.png", // Reutilizando imagen
      country: "Perú",
      expertise: "Sistemas Integrados",
      years: "19+ años"
    },
    {
      id: 14,
      name: "Lucía Vargas Herrera",
      title: "Gerente de Tecnología e Innovación",
      company: "Buenaventura",
      image: "/images/keynote-alexander.png", // Reutilizando imagen
      country: "Perú",
      expertise: "Tech Innovation",
      years: "14+ años"
    },
    {
      id: 15,
      name: "Miguel Angel Soto",
      title: "Director de Transformación Digital",
      company: "Las Bambas",
      image: "/images/keynote-cleber.png", // Reutilizando imagen
      country: "Perú",
      expertise: "Transformación",
      years: "22+ años"
    },
    {
      id: 16,
      name: "Patricia Morales Luna",
      title: "Especialista en AI & Machine Learning",
      company: "Hochschild Mining",
      image: "/images/keynote-osvaldo.png", // Reutilizando imagen
      country: "Perú",
      expertise: "Machine Learning",
      years: "9+ años"
    },
    {
      id: 17,
      name: "Ricardo Peña Valdez",
      title: "Jefe de Innovación Operacional",
      company: "Glencore Peru",
      image: "/images/keynote-gabriel.png", // Reutilizando imagen
      country: "Perú",
      expertise: "Innovación Operacional",
      years: "18+ años"
    },
    {
      id: 18,
      name: "Sofia Gutierrez Rojas",
      title: "Consultora Senior en Digitalización",
      company: "Yanacocha",
      image: "/images/keynote-alessandra.png", // Reutilizando imagen
      country: "Perú",
      expertise: "Consultoría Digital",
      years: "12+ años"
    },
    {
      id: 19,
      name: "Fernando Acosta Ruiz",
      title: "Gerente de Tecnologías Emergentes",
      company: "Milpo",
      image: "/images/keynote-leonardo.png", // Reutilizando imagen
      country: "Perú",
      expertise: "Tecnologías Emergentes",
      years: "15+ años"
    },
    {
      id: 20,
      name: "Claudia Mendoza Silva",
      title: "Directora de Estrategia Digital",
      company: "Pan American Silver",
      image: "/images/keynote-kevin.png", // Reutilizando imagen
      country: "Perú",
      expertise: "Estrategia Digital",
      years: "16+ años"
    }
  ];

  const getCurrentPageSpeakers = () => {
    const startIndex = currentPage * speakersPerPage;
    return keynoteSpeakers.slice(startIndex, startIndex + speakersPerPage);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section 
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
          
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            Conferencistas{' '}
            <span className="text-gradient">magistrales</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Los expertos más reconocidos en minería, tecnología e innovación que lideraron las conferencias principales
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Page Info */}
        <div className={`text-center mb-8 transform transition-all duration-1000 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center space-x-4 bg-slate-800/40 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
            <span className="text-gray-300 text-sm">
              Mostrando {currentPage * speakersPerPage + 1}-{Math.min((currentPage + 1) * speakersPerPage, keynoteSpeakers.length)} de {keynoteSpeakers.length} speakers
            </span>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentPage === index 
                      ? 'bg-yellow-400 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Speakers Grid */}
        <div className={`relative transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 min-h-[600px]">
            {getCurrentPageSpeakers().map((speaker, index) => (
              <div
                key={`${speaker.id}-${currentPage}`}
                className={`group relative transform transition-all duration-700 hover:scale-105 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredSpeaker(speaker.id)}
                onMouseLeave={() => setHoveredSpeaker(null)}
              >
                {/* Card Container */}
                <div className="relative bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/30 transition-all duration-500 h-full">
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  
                  {/* Speaker Image */}
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Keynote Badge */}
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                      KEYNOTE
                    </div>
                    
                    {/* Country Badge */}
                    <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full">
                      <MapPin className="w-3 h-3 text-yellow-400" />
                      <span className="text-white text-xs font-medium">{speaker.country}</span>
                    </div>
                    
                    {/* Experience Badge */}
                    <div className="absolute bottom-3 right-3 bg-blue-600/90 backdrop-blur-md px-2 py-1 rounded-full">
                      <span className="text-white text-xs font-bold">{speaker.years}</span>
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
                  <div className="relative p-4 flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
                      {speaker.name}
                    </h3>
                    
                    <p className="text-yellow-400 font-semibold text-xs mb-2 line-clamp-2">
                      {speaker.title}
                    </p>
                    
                    <p className="text-blue-400 font-medium text-xs mb-3 line-clamp-1">
                      {speaker.company}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-gray-400 text-xs line-clamp-1">{speaker.expertise}</span>
                      </div>
                    </div>

                    {/* Hover line effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl" />
                  </div>

                  {/* Floating number */}
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center text-black font-bold text-xs shadow-lg">
                    {currentPage * speakersPerPage + index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className={`flex justify-center items-center space-x-6 mt-12 transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="flex items-center space-x-2 px-6 py-3 bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl hover:border-yellow-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <ChevronLeft className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-white font-medium">Anterior</span>
          </button>

          <div className="flex space-x-3">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 ${
                  currentPage === index
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-lg scale-110'
                    : 'bg-slate-800/40 backdrop-blur-sm border border-white/10 text-white hover:border-yellow-500/30'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className="flex items-center space-x-2 px-6 py-3 bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl hover:border-yellow-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <span className="text-white font-medium">Siguiente</span>
            <ChevronRight className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>

        {/* Bottom Stats */}
        <div className={`mt-16 grid grid-cols-1 sm:grid-cols-4 gap-6 transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="text-3xl font-bold text-yellow-400 mb-2">20</div>
            <div className="text-gray-300">Conferencistas Magistrales</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="text-3xl font-bold text-blue-400 mb-2">6</div>
            <div className="text-gray-300">Países Representados</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="text-3xl font-bold text-green-400 mb-2">15+</div>
            <div className="text-gray-300">Años Promedio Experiencia</div>
          </div>
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="text-3xl font-bold text-purple-400 mb-2">2</div>
            <div className="text-gray-300">Páginas de Contenido</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeynoteSpeakers;