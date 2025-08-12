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
    { value: timeLeft.days, label: 'Días', color: 'from-orange-500 to-red-600', iconColor: 'text-orange-500', bgAccent: 'bg-orange-500/20' },
    { value: timeLeft.hours, label: 'Horas', color: 'from-purple-600 to-pink-700', iconColor: 'text-purple-600', bgAccent: 'bg-purple-600/20' },
    { value: timeLeft.minutes, label: 'Minutos', color: 'from-cyan-500 to-blue-600', iconColor: 'text-cyan-500', bgAccent: 'bg-cyan-500/20' },
    { value: timeLeft.seconds, label: 'Segundos', color: 'from-emerald-500 to-green-600', iconColor: 'text-emerald-500', bgAccent: 'bg-emerald-500/20' }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 lg:py-24 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-400/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-400/8 rounded-full blur-3xl animate-ping" />
        
        {/* Modern geometric patterns */}
        <div className="absolute top-10 right-10 w-32 h-32 border border-slate-600 rounded-2xl rotate-45 opacity-30" />
        <div className="absolute bottom-32 left-16 w-24 h-24 border border-slate-600 rounded-full opacity-20" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-sm mb-6 shadow-lg backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            PRÓXIMA EDICIÓN
          </div>
          
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            Faltan solo...
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-blue-600 mx-auto rounded-full" />
        </div>

        {/* Countdown Display */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto mb-16 transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {timeUnits.map((unit, index) => (
            <div
              key={unit.label}
              className={`relative group transform transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${unit.color} opacity-10 rounded-2xl blur-xl scale-110 group-hover:opacity-20 transition-opacity duration-500`} />
              
              {/* Main container */}
              <div className="relative bg-slate-800/60 backdrop-blur-sm border border-slate-600 rounded-2xl p-6 lg:p-8 text-center shadow-xl group-hover:shadow-2xl group-hover:border-slate-500 transition-all duration-500">
                {/* Background accent */}
                <div className={`absolute top-0 left-0 w-full h-2 ${unit.color} bg-gradient-to-r rounded-t-2xl`} />
                
                <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 tabular-nums">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-gray-300 font-medium text-lg lg:text-xl">
                  {unit.label}
                </div>
                
                {/* Decorative elements */}
                <div className={`absolute top-4 right-4 w-3 h-3 ${unit.bgAccent} rounded-full animate-pulse`} />
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-slate-600 rounded-full animate-ping" />
              </div>
            </div>
          ))}
        </div>

        {/* Event Info Cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto transform transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="bg-white backdrop-blur-sm border border-slate-200 rounded-xl p-6 text-center hover:shadow-lg hover:border-yellow-300 transition-all duration-300 group">
            <Calendar className="w-8 h-8 text-yellow-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-slate-800 font-bold text-lg mb-1">3 Marzo 2026</div>
            <div className="text-slate-500 text-sm">Fecha del evento</div>
          </div>
          
          <div className="bg-white backdrop-blur-sm border border-slate-200 rounded-xl p-6 text-center hover:shadow-lg hover:border-emerald-300 transition-all duration-300 group">
            <MapPin className="w-8 h-8 text-emerald-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-slate-800 font-bold text-lg mb-1">Lima, Perú</div>
            <div className="text-slate-500 text-sm">Ubicación</div>
          </div>
          
          <div className="bg-white backdrop-blur-sm border border-slate-200 rounded-xl p-6 text-center hover:shadow-lg hover:border-blue-300 transition-all duration-300 group">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-slate-800 font-bold text-lg mb-1">8:00 AM</div>
            <div className="text-slate-500 text-sm">Hora de inicio</div>
          </div>
          
          <div className="bg-white backdrop-blur-sm border border-slate-200 rounded-xl p-6 text-center hover:shadow-lg hover:border-violet-300 transition-all duration-300 group">
            <Users className="w-8 h-8 text-violet-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-slate-800 font-bold text-lg mb-1">500+ asistentes</div>
            <div className="text-slate-500 text-sm">Esperados</div>
          </div>
        </div>
      </div>

      {/* Modern decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-slate-600 rounded-full animate-pulse opacity-60" />
      <div className="absolute bottom-40 right-20 w-16 h-16 border-2 border-slate-600 rounded-lg rotate-45 animate-bounce opacity-40" />
      <div className="absolute top-40 right-10 w-12 h-12 bg-slate-600/30 rounded-full animate-ping opacity-30" />

      {/* Transition to next blue section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-blue-900/30 z-10" />
    </section>
  );
};

export default CountdownSection;