"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Clock, Users, Presentation, MessageSquare, Building2, Calendar } from 'lucide-react';

const EventAgenda = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('charlas');
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

  const agendaData = {
    charlas: {
      icon: Presentation,
      title: "CHARLAS TÉCNICAS",
      color: "from-blue-500 to-blue-600",
      items: [
        "Gestión integrada de operaciones mineras",
        "Futuro autónomo: Tecnología de Perforación agnóstica",
        "Minería 5.0: Operaciones Integradas, Seguras y Colaborativas",
        "IA en acción: Casos de éxito que están revolucionando la minería",
        "El valor agregado de la Conminución y la Variabilidad como Enemigo Silencioso en la Eficiencia del Proceso",
        "Redefinición de la IA en la conexión Mina-Planta",
        "OT para soportar la operación minera",
        "Análisis de riesgo aplicado a la planificación minera",
        "Integración de nuevas tecnologías de gestión de relaves y desmonte en la Planificación en minería a tajo abierto"
      ]
    },
    mesas: {
      icon: Users,
      title: "MESAS REDONDAS",
      color: "from-yellow-500 to-amber-600",
      items: [
        "Innovación en Minería: Retos, Casos y Oportunidades",
        "Data-Driven Mining: Construyendo una cultura basada en datos"
      ]
    },
    comerciales: {
      icon: Building2,
      title: "CHARLAS COMERCIALES",
      color: "from-green-500 to-emerald-600",
      items: [
        "Micromine",
        "CorePlan", 
        "Geodrone",
        "IMSS",
        "Komatsu Mitsui"
      ]
    }
  };

  const tabs = Object.entries(agendaData);

  return (
    <section 
      id="agenda"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/3 to-blue-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
            Un día completo de{' '}
            <span className="text-gradient">conocimiento y experiencias</span>
          </h2>
          
          {/* Time badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-slate-800/50 backdrop-blur-md border border-yellow-500/20 mb-6">
            <Clock className="w-5 h-5 text-yellow-400 mr-3" />
            <span className="text-white font-medium">Desde las 8 a.m. hasta las 11 p.m., el evento ofreció:</span>
          </div>
          
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Tab Navigation */}
<div className={`flex justify-center mb-12 px-4 transform transition-all duration-1000 delay-300 ${
  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
}`}>
  <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl p-2 border border-white/10 w-full max-w-4xl">
    <div className="flex flex-col sm:flex-row gap-2">
      {tabs.map(([key, data]) => {
        const Icon = data.icon;
        return (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center justify-center sm:justify-center px-4 sm:px-6 py-3 rounded-xl transition-all duration-300 flex-1 min-w-0 ${
              activeTab === key
                ? `bg-gradient-to-r ${data.color} text-white shadow-lg`
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon className="w-5 h-5 mr-2 flex-shrink-0" />
            <span className="font-medium text-sm lg:text-base truncate">
              {data.title}
            </span>
          </button>
        );
      })}
    </div>
  </div>
</div>

        {/* Content Display */}
        <div className={`transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {tabs.map(([key, data]) => {
            if (key !== activeTab) return null;
            
            const Icon = data.icon;
            return (
              <div key={key} className="max-w-6xl mx-auto">
                {/* Section Title */}
                <div className="text-center mb-12">
                  <div className={`inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r ${data.color} text-white mb-6 shadow-lg`}>
                    <Icon className="w-6 h-6 mr-3" />
                    <span className="font-bold text-lg">{data.title}</span>
                  </div>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.items.map((item, index) => (
                    <div
                      key={index}
                      className={`group bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-yellow-500/30 transition-all duration-300 hover:scale-105 transform opacity-0 animate-fade-in`}
                      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${data.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium leading-relaxed group-hover:text-yellow-400 transition-colors duration-300">
                            {item}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Hover line effect */}
                      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">12hrs</div>
                    <div className="text-gray-300">De contenido</div>
                  </div>
                  <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="text-3xl font-bold text-blue-400 mb-2">+20</div>
                    <div className="text-gray-300">Presentaciones</div>
                  </div>
                  <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="text-3xl font-bold text-green-400 mb-2">5</div>
                    <div className="text-gray-300">Sponsors destacados</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </section>
  );
};

export default EventAgenda;