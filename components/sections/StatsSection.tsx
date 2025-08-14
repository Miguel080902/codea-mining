"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useCountAnimation } from '@/hooks/useCountAnimation';

interface StatItemProps {
  number: number;
  label: string;
  isVisible: boolean;
  delay?: number;
}

const StatItem: React.FC<StatItemProps> = ({ number, label, isVisible, delay = 0 }) => {
  const [startAnimation, setStartAnimation] = useState(false);
  const count = useCountAnimation({ 
    target: number, 
    duration: 2500, 
    isVisible: startAnimation 
  });

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setStartAnimation(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div className={`text-center transform transition-all duration-1000 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`}>
      <div className="relative group">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-2xl blur-xl scale-110 group-hover:scale-125 transition-transform duration-500" />
        
        {/* Main container */}
        <div className="relative bg-slate-800/50 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-6 sm:p-8 hover:border-yellow-500/40 transition-all duration-500 group-hover:transform group-hover:scale-105">
          {/* Number with animation */}
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light sm:font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              +{count.toLocaleString()}
            </span>
          </div>
          
          {/* Label */}
          <p className="text-gray-300 text-base sm:text-lg lg:text-xl font-light sm:font-medium leading-tight">
            {label}
          </p>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const stats = [
    { number: 25, label: "Speaker de nivel internacional" },
    { number: 15, label: "Charlas técnicas" },
    { number: 300, label: "Asistentes" }
  ];

  return (
    <section 
      id="estadisticas"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/3 to-yellow-500/3 rounded-full blur-3xl" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-6">
        {/* Section title */}
        <div className={`text-center mb-12 md:mb-16 lg:mb-20 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light md:font-bold text-white mb-4 md:mb-6 px-4">
            Una primera edición{' '}
            <span className="text-gradient font-medium md:font-bold">épica</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-0">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              number={stat.number}
              label={stat.label}
              isVisible={isVisible}
              delay={index * 200}
            />
          ))}
        </div>

        {/* Bottom decorative line */}
        <div className={`mt-16 lg:mt-20 flex justify-center transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="h-px w-64 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;