"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';

const CountdownSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fecha del evento: 3 de marzo de 2026 a las 8am hora de Perú (UTC-5)
  const eventDate = new Date('2026-03-03T08:00:00-05:00');

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

  // Función para calcular el tiempo restante
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const eventTime = eventDate.getTime();
    const difference = eventTime - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  // Countdown timer effect
  useEffect(() => {
    // Calcular tiempo inicial
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'Días', color: 'from-yellow-400 to-yellow-500', iconColor: 'text-yellow-400' },
    { value: timeLeft.hours, label: 'Horas', color: 'from-blue-500 to-blue-600', iconColor: 'text-blue-400' },
    { value: timeLeft.minutes, label: 'Minutos', color: 'from-green-400 to-green-500', iconColor: 'text-green-400' },
    { value: timeLeft.seconds, label: 'Segundos', color: 'from-blue-400 to-blue-500', iconColor: 'text-blue-300' }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-green-400/5 rounded-full blur-3xl animate-ping" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-600/90 text-white font-bold text-sm mb-6 shadow-lg backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            PRÓXIMA EDICIÓN
          </div>
          
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            Faltan solo...
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-blue-500 mx-auto rounded-full" />
        </div>

        {/* Countdown Display */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto mb-16 transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {timeUnits.map((unit, index) => (
            <div
              key={unit.label}
              className={`relative group transform transition-all duration-700 hover:scale-105 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${unit.color} opacity-20 rounded-2xl blur-xl scale-110 group-hover:opacity-30 transition-opacity duration-500`} />
              
              {/* Main container */}
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 text-center shadow-xl group-hover:shadow-2xl group-hover:border-white/20 transition-all duration-500">
                <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 tabular-nums">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-gray-300 font-medium text-lg lg:text-xl">
                  {unit.label}
                </div>
                
                {/* Decorative elements */}
                <div className={`absolute top-3 right-3 w-2 h-2 ${unit.iconColor.replace('text', 'bg')} rounded-full animate-pulse`} />
                <div className="absolute bottom-3 left-3 w-1 h-1 bg-white/30 rounded-full animate-ping" />
                
                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${unit.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl`} />
              </div>
            </div>
          ))}
        </div>

        {/* Event Info Cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-slate-800/60 hover:border-yellow-400/30 transition-all duration-300 group">
            <Calendar className="w-8 h-8 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-white font-bold text-lg mb-1">3 Marzo 2026</div>
            <div className="text-gray-400 text-sm">Fecha del evento</div>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-slate-800/60 hover:border-green-400/30 transition-all duration-300 group">
            <MapPin className="w-8 h-8 text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-white font-bold text-lg mb-1">Lima, Perú</div>
            <div className="text-gray-400 text-sm">Ubicación</div>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-slate-800/60 hover:border-blue-400/30 transition-all duration-300 group">
            <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-white font-bold text-lg mb-1">8:00 AM</div>
            <div className="text-gray-400 text-sm">Hora de inicio</div>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-slate-800/60 hover:border-yellow-400/30 transition-all duration-300 group">
            <Users className="w-8 h-8 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-white font-bold text-lg mb-1">500+ asistentes</div>
            <div className="text-gray-400 text-sm">Esperados</div>
          </div>
        </div>
      </div>

      {/* Decorative elements matching Hero */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-blue-500/30 rounded-full animate-pulse opacity-60" />
      <div className="absolute bottom-40 right-20 w-16 h-16 border border-yellow-400/30 rounded-lg rotate-45 animate-bounce opacity-40" />
      <div className="absolute top-40 right-10 w-12 h-12 bg-green-400/20 rounded-full animate-ping opacity-30" />
    </section>
  );
};

export default CountdownSection;