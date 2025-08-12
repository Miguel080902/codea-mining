"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Quote, Star, ChevronLeft, ChevronRight, Users, MessageCircle } from 'lucide-react';

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Catherine Mesía Benito",
      role: "Jefe de Soluciones Tecnológicas",
      company: "Minería en Komatsu - Mitsui",
      quote: "Este evento representa el futuro de la minería peruana: conectado, innovador y colaborativo.",
      image: "/images/testimonial-catherine.jpg",
      rating: 5,
      category: "Ponente"
    },
    {
      id: 2,
      name: "Luis Martinez",
      role: "Asociado Estratégico IMSS",
      company: "Consultores",
      quote: "El nivel técnico de las charlas fue de alto valor. Gran trabajo del equipo CODEa.",
      image: "/images/testimonial-luis.png",
      rating: 5,
      category: "Asistente"
    },
    {
      id: 3,
      name: "Yair Camborda Morocho",
      role: "Machine learning Engineer",
      company: "Data Scientist",
      quote: "Este evento representa el futuro de la minería peruana: conectado, innovador y colaborativo.",
      image: "/images/testimonial-yair.png",
      rating: 5,
      category: "Ponente"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        
        {/* Floating quote icons */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`
            }}
          >
            <Quote className="w-6 h-6 text-yellow-400 animate-float" />
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-sm mb-6 shadow-lg">
            <MessageCircle className="w-5 h-5 mr-2" />
            TESTIMONIOS REALES
          </div>
          
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6">
            Lo que dijeron nuestros{' '}
            <span className="text-gradient">asistentes y ponentes</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Las voces de quienes vivieron la experiencia del CODEa Mining Fest 2025
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-600 mx-auto mt-6 rounded-full" />
        </div>

        {/* Main Testimonial Display */}
        <div className={`relative max-w-6xl mx-auto transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Testimonial Image */}
            <div className="relative group">
              <div className="relative">
                {/* Main image container */}
                <div className="relative w-80 h-80 mx-auto rounded-full overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
                  <Image
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Category badge */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
                    <span className="bg-yellow-500/90 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      {testimonials[currentTestimonial].category}
                    </span>
                  </div>
                  
                  {/* Quote icon overlay */}
                  <div className="absolute bottom-6 right-6 z-20">
                    <div className="w-12 h-12 bg-blue-600/90 backdrop-blur-md rounded-full flex items-center justify-center">
                      <Quote className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Decorative rings */}
                <div className="absolute inset-0 border-2 border-yellow-500/30 rounded-full animate-spin-slow scale-110" />
                <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full animate-ping scale-125" />
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-blue-500/20 rounded-full blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="text-center lg:text-left">
              {/* Quote */}
              <div className="relative mb-8">
                <Quote className="w-16 h-16 text-yellow-400/20 absolute -top-4 -left-4" />
                <blockquote className="text-2xl lg:text-3xl xl:text-4xl font-medium text-white leading-relaxed italic pl-8">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
              </div>
              
              {/* Person Info */}
              <div className="mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  {testimonials[currentTestimonial].name}
                </h3>
                <p className="text-lg lg:text-xl text-yellow-400 font-semibold mb-2">
                  {testimonials[currentTestimonial].role}
                </p>
                <p className="text-base lg:text-lg text-blue-400">
                  {testimonials[currentTestimonial].company}
                </p>
                
                {/* Rating */}
                <div className="flex justify-center lg:justify-start items-center space-x-1 mt-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-gray-400 ml-2">({testimonials[currentTestimonial].rating}/5)</span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-center lg:justify-start items-center space-x-4">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 bg-slate-800/50 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-slate-700/50 hover:border-yellow-500/40 transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentTestimonial === index 
                          ? 'bg-gradient-to-r from-yellow-400 to-amber-600 w-8' 
                          : 'bg-gray-600 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 bg-slate-800/50 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-slate-700/50 hover:border-yellow-500/40 transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Mini Testimonials */}
        <div className={`mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 transform transition-all duration-1000 delay-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setCurrentTestimonial(index)}
              className={`text-left p-6 rounded-xl transition-all duration-300 ${
                currentTestimonial === index 
                  ? 'bg-gradient-to-r from-yellow-500/20 to-blue-500/20 border border-yellow-500/40 scale-105' 
                  : 'bg-slate-800/30 border border-white/10 hover:border-yellow-500/20 hover:scale-105'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
                  <p className="text-gray-400 text-xs">{testimonial.category}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-tight line-clamp-3">
                "{testimonial.quote}"
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;