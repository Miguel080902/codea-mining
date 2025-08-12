import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import SocialIcons from '@/components/ui/SocialIcons';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/images/hero/video-portada-CMF.mp4" type="video/mp4" />
          {/* Fallback para navegadores que no soporten el video */}
          <div className="absolute inset-0 bg-slate-900" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 lg:px-6 text-center">
        {/* Success Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600/90 text-white text-sm font-medium mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
          PRIMERA EDICIÓN
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light md:font-bold text-white mb-4 md:mb-6 leading-tight">
          ¡Gracias por ser parte del
          <br />
          <span className="text-gradient font-medium md:font-bold">
            CODEa Mining Fest
          </span>{' '}
          <span className="text-yellow-400 font-medium md:font-bold">2025</span>!
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl md:max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed font-light px-2 sm:px-0">
          El evento que reunió a profesionales, empresas, autoridades y estudiantes para explorar el futuro de la
          minería en Latinoamérica. Más de 300 asistentes participaron de una jornada intensa con charlas técnicas,
          innovación, networking, mesas redondas y un pitch de proyectos CODEa.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 md:mb-16 px-4 sm:px-0">
          <Button variant="primary" size="md" className="w-full sm:w-auto px-6 py-3 text-sm sm:text-base">
            Participar del próximo evento
          </Button>
          <Button variant="outline" size="md" className="w-full sm:w-auto px-6 py-3 text-sm sm:text-base">
            Convertirse en patrocinador
          </Button>
        </div>
      </div>

      {/* Social Icons - Fixed position */}
      <div className="absolute bottom-8 right-8 z-30">
        <SocialIcons orientation="vertical" />
      </div>

      {/* Decorative Elements with Company Logo */}
      <div className="absolute top-20 left-10 w-16 h-16 opacity-30 animate-pulse">
        <Image 
          src="/images/FAVICON-CODEAMININGFEST.png" 
          alt="CODEa Mining Fest" 
          width={64}
          height={64}
          className="w-full h-full object-contain filter brightness-200"
        />
      </div>

      <div className="absolute bottom-1/3 right-1/4 w-14 h-14 opacity-25 animate-bounce">
        <Image 
          src="/images/FAVICON-CODEAMININGFEST.png" 
          alt="CODEa Mining Fest" 
          width={56}
          height={56}
          className="w-full h-full object-contain filter brightness-200"
        />
      </div>

      {/* Smooth transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-slate-800/60 to-slate-800 z-10" />
    </section>
  );
};

export default Hero;