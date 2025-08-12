import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import SocialIcons from '@/components/ui/SocialIcons';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/mining-background.jpg"
          alt="Mining truck background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 lg:px-6 text-center">
        {/* Success Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600/90 text-white text-sm font-medium mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
          PRIMERA EDICIÓN EXITOSA PROBANDO
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          ¡Gracias por ser parte del
          <br />
          <span className="text-gradient">
            CODEa Mining Fest
          </span>{' '}
          <span className="text-yellow-400">2025</span>!
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
          El evento que reunió a profesionales, empresas, autoridades y estudiantes para explorar el futuro de la
          minería en Latinoamérica. Más de 300 asistentes participaron de una jornada intensa con charlas técnicas,
          innovación, networking, mesas redondas y un pitch de proyectos CODEa.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button variant="primary" size="lg" className="min-w-[250px]">
            Participar del próximo evento
          </Button>
          <Button variant="outline" size="lg" className="min-w-[250px]">
            Convertirse en patrocinador
          </Button>
        </div>
      </div>

      {/* Social Icons - Fixed position */}
      <div className="absolute bottom-8 right-8 z-30">
        <SocialIcons orientation="vertical" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-blue-500/30 rounded-full animate-pulse opacity-60" />
      <div className="absolute bottom-40 left-20 w-16 h-16 border border-yellow-500/30 rounded-lg rotate-45 animate-bounce opacity-40" />
      <div className="absolute top-40 right-20 w-12 h-12 bg-blue-500/20 rounded-full animate-ping opacity-30" />
    </section>
  );
};

export default Hero;
