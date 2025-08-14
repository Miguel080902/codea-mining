"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Quote, Mic, ArrowRight, Heart, Share, MessageCircle, Play, User, ExternalLink } from 'lucide-react';

// Declaración de tipos para YouTube API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const InterviewsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeInterview, setActiveInterview] = useState(0);
  const [showYouTubeEmbed, setShowYouTubeEmbed] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Estados separados para evitar re-renders cruzados
  const [videoState, setVideoState] = useState({
    activeIndex: 0,
    showYouTube: true
  });

  // Configuración del carrusel - simplificado y exacto
  const DESKTOP_VISIBLE = 4; // Cambiado de 5 a 4
  const MOBILE_VISIBLE = 2;
  const DESKTOP_ITEM_WIDTH = 160; // Ancho más grande en px
  const MOBILE_ITEM_WIDTH = 120; // Ancho exacto en px
  const GAP = 16; // Gap de 1rem = 16px

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

  const interviews = [
    {
      id: 0,
      name: "CODEa UNI Oficial",
      role: "YouTube Short - Contenido 1",
      quote: "Primer video exclusivo del CODEa Mining Fest 2025",
      image: `https://img.youtube.com/vi/ytN3FqzWAGg/hqdefault.jpg`,
      category: "YouTube",
      duration: "Short",
      likes: "Ver en YT",
      comments: "Real",
      isYouTube: true,
      videoId: "ytN3FqzWAGg"
    },
    {
      id: 1,
      name: "CODEa UNI Oficial",
      role: "YouTube Short - Contenido 2",
      quote: "Segundo video exclusivo del CODEa Mining Fest 2025",
      image: `https://img.youtube.com/vi/eDpUUCcKJH4/hqdefault.jpg`,
      category: "YouTube",
      duration: "Short",
      likes: "Ver en YT",
      comments: "Real",
      isYouTube: true,
      videoId: "eDpUUCcKJH4"
    },
    {
      id: 2,
      name: "CODEa UNI Oficial",
      role: "YouTube Short - Contenido 3",
      quote: "Tercer video exclusivo del CODEa Mining Fest 2025",
      image: `https://img.youtube.com/vi/veIyjbGww3Y/hqdefault.jpg`,
      category: "YouTube",
      duration: "Short",
      likes: "Ver en YT",
      comments: "Real",
      isYouTube: true,
      videoId: "veIyjbGww3Y"
    },
    {
      id: 3,
      name: "CODEa UNI Oficial",
      role: "YouTube Short - Contenido 4",
      quote: "Cuarto video exclusivo del CODEa Mining Fest 2025",
      image: `https://img.youtube.com/vi/iEUuAjztBGk/hqdefault.jpg`,
      category: "YouTube",
      duration: "Short",
      likes: "Ver en YT",
      comments: "Real",
      isYouTube: true,
      videoId: "iEUuAjztBGk"
    },
    {
      id: 4,
      name: "CODEa UNI Oficial",
      role: "YouTube Short - Contenido 5",
      quote: "Quinto video exclusivo del CODEa Mining Fest 2025",
      image: `https://img.youtube.com/vi/eDpUUCcKJH4/hqdefault.jpg`,
      category: "YouTube",
      duration: "Short",
      likes: "Ver en YT",
      comments: "Real",
      isYouTube: true,
      videoId: "eDpUUCcKJH4"
    },
    {
      id: 5,
      name: "CODEa UNI Oficial",
      role: "YouTube Short - Contenido 6",
      quote: "Sexto video exclusivo del CODEa Mining Fest 2025",
      image: `https://img.youtube.com/vi/ytN3FqzWAGg/hqdefault.jpg`,
      category: "YouTube",
      duration: "Short",
      likes: "Ver en YT",
      comments: "Real",
      isYouTube: true,
      videoId: "ytN3FqzWAGg"
    },
    {
      id: 6,
      name: "CODEa UNI Oficial",
      role: "YouTube Short - Contenido 7",
      quote: "Séptimo video exclusivo del CODEa Mining Fest 2025",
      image: `https://img.youtube.com/vi/ytN3FqzWAGg/hqdefault.jpg`,
      category: "YouTube",
      duration: "Short",
      likes: "Ver en YT",
      comments: "Real",
      isYouTube: true,
      videoId: "ytN3FqzWAGg"
    },
    {
      id: 7,
      name: "CODEa UNI Oficial",
      role: "YouTube Short - Contenido 8",
      quote: "Octavo video exclusivo del CODEa Mining Fest 2025",
      image: `https://img.youtube.com/vi/ytN3FqzWAGg/hqdefault.jpg`,
      category: "YouTube",
      duration: "Short",
      likes: "Ver en YT",
      comments: "Real",
      isYouTube: true,
      videoId: "ytN3FqzWAGg"
    },
    {
      id: 8,
      name: "CODEa UNI Oficial",
      role: "YouTube Short - Contenido 9",
      quote: "Noveno video exclusivo del CODEa Mining Fest 2025",
      image: `https://img.youtube.com/vi/ytN3FqzWAGg/hqdefault.jpg`,
      category: "YouTube",
      duration: "Short",
      likes: "Ver en YT",
      comments: "Real",
      isYouTube: true,
      videoId: "ytN3FqzWAGg"
    }
  ];

  // Memoizar el video actual usando el estado separado
  const currentVideo = React.useMemo(() => interviews[videoState.activeIndex], [videoState.activeIndex]);
  
  const handleInterviewSelect = React.useCallback((index: number) => {
    setVideoState({
      activeIndex: index,
      showYouTube: interviews[index].isYouTube || false
    });
    setActiveInterview(index); // Mantener sincronizado para los dots
  }, [interviews]);

  // Funciones de navegación del video principal - SEPARADAS del carrusel
  const handlePrevInterview = React.useCallback(() => {
    const newIndex = (videoState.activeIndex - 1 + interviews.length) % interviews.length;
    setVideoState({
      activeIndex: newIndex,
      showYouTube: interviews[newIndex].isYouTube || false
    });
    setActiveInterview(newIndex);
  }, [videoState.activeIndex, interviews]);

  const handleNextInterview = React.useCallback(() => {
    const newIndex = (videoState.activeIndex + 1) % interviews.length;
    setVideoState({
      activeIndex: newIndex,
      showYouTube: interviews[newIndex].isYouTube || false
    });
    setActiveInterview(newIndex);
  }, [videoState.activeIndex, interviews]);

  // Funciones del carrusel - COMPLETAMENTE SEPARADAS
  const nextCarousel = React.useCallback((isMobile = false) => {
    const visibleItems = isMobile ? MOBILE_VISIBLE : DESKTOP_VISIBLE;
    const maxIndex = Math.max(0, interviews.length - visibleItems);
    setCarouselIndex(prev => Math.min(prev + visibleItems, maxIndex));
  }, [interviews.length]);

  const prevCarousel = React.useCallback((isMobile = false) => {
    const visibleItems = isMobile ? MOBILE_VISIBLE : DESKTOP_VISIBLE;
    setCarouselIndex(prev => Math.max(prev - visibleItems, 0));
  }, []);

  // Calcular si los botones deben estar deshabilitados
  const canGoPrev = carouselIndex > 0;
  const canGoNext = React.useCallback((isMobile = false) => {
    const visibleItems = isMobile ? MOBILE_VISIBLE : DESKTOP_VISIBLE;
    return carouselIndex + visibleItems < interviews.length;
  }, [carouselIndex, interviews.length]);

  // Componente YouTube Player - Memoizado para evitar recargas
  const YouTubeEmbed = React.memo(({ videoId }: { videoId: string }) => {
    return (
      <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-black shadow-2xl">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0&modestbranding=1&playsinline=1`}
          title="CODEa Mining Fest 2025 - YouTube Short Oficial"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="rounded-3xl"
        />
        <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-[2rem] blur-xl -z-10 opacity-60" />
      </div>
    );
  });
  
  // Componente del video principal COMPLETAMENTE AISLADO
  const IsolatedVideoPlayer = React.memo(() => {
    const video = interviews[videoState.activeIndex];
    
    return (
      <div className="flex-1 mx-auto lg:mx-0" style={{ maxWidth: '700px' }}>
        {videoState.showYouTube && video.isYouTube ? (
          <div className="relative group">
            <YouTubeEmbed videoId={video.videoId} />
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-[2rem] blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ) : (
          <div className="relative group">
            {/* Mock Reel Display - Vertical format */}
            <div className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden bg-black shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10" />
              
              <Image
                src={video.image}
                alt={`Entrevista con ${video.name}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Top Info Bar */}
              <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-medium">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                    ENTREVISTA
                  </div>
                  <span className="bg-yellow-500/90 text-black px-2 py-1 rounded-full text-xs font-medium">
                    {video.category}
                  </span>
                </div>
                <div className="text-white text-xs bg-black/50 backdrop-blur-md px-2 py-1 rounded-full">
                  {video.duration}
                </div>
              </div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-15">
                <button className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 group-hover:scale-125">
                  <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                </button>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-4 left-4 right-16 z-20 text-white">
                {/* Profile info */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">{video.name}</h3>
                    <p className="text-xs text-gray-300">{video.role}</p>
                  </div>
                </div>
                
                {/* Quote */}
                <div className="relative mb-3">
                  <Quote className="w-4 h-4 text-yellow-400/60 absolute -top-1 -left-1" />
                  <p className="text-sm leading-tight pl-3">"{video.quote}"</p>
                </div>
                
                {/* Hashtags */}
                <div className="flex flex-wrap gap-1">
                  <span className="text-yellow-400 text-xs">#CODEaFest</span>
                  <span className="text-yellow-400 text-xs">#Entrevistas</span>
                  <span className="text-yellow-400 text-xs">#Testimonios</span>
                </div>
              </div>

              {/* Right Side Actions */}
              <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-4">
                <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 flex-col">
                  <Heart className="w-5 h-5 text-white" />
                  <span className="text-xs text-white mt-1">{video.likes}</span>
                </button>
                
                <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 flex-col">
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span className="text-xs text-white mt-1">{video.comments}</span>
                </button>
                
                <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110">
                  <Share className="w-5 h-5 text-white" />
                </button>
                
                <button className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110">
                  <Mic className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevInterview}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-25 w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
              
              <button
                onClick={handleNextInterview}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-25 w-8 h-8 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300 hover:scale-110"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500/20 to-blue-500/20 rounded-[2rem] blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        )}
      </div>
    );
  });

  IsolatedVideoPlayer.displayName = 'IsolatedVideoPlayer';

  // Componente del carrusel reutilizable
  const CarouselItem = ({ interview, index, itemWidth }: { interview: any, index: number, itemWidth: number }) => (
    <button
      key={interview.id}
      onClick={() => handleInterviewSelect(index)}
      className={`relative rounded-xl overflow-hidden transition-all duration-300 group flex-shrink-0 ${
        videoState.activeIndex === index 
          ? 'ring-2 ring-yellow-400 scale-105 shadow-xl shadow-yellow-400/25 z-10' 
          : 'hover:scale-105 opacity-70 hover:opacity-100'
      }`}
      style={{ 
        width: `${itemWidth}px`,
        height: `${itemWidth * 1.6}px` // Aspect ratio 9:16 aproximado
      }}
    >
      {interview.isYouTube ? (
        <img
          src={`https://img.youtube.com/vi/${interview.videoId}/hqdefault.jpg`}
          alt={`YouTube Short - ${interview.name}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <Image
          src={interview.image}
          alt={interview.name}
          fill
          className="object-cover"
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      
      {/* Category badge */}
      <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${
        interview.isYouTube 
          ? 'bg-red-500/90 text-white' 
          : 'bg-yellow-500/90 text-black'
      }`}>
        {interview.category}
      </div>
      
      {/* Play icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Play className="w-5 h-5 text-white opacity-80 group-hover:opacity-100" fill="currentColor" />
      </div>
      
      {/* Name */}
      <div className="absolute bottom-2 left-2 right-2 text-white">
        <p className="text-xs font-semibold truncate">{interview.name}</p>
        <p className="text-xs text-gray-300 truncate">{interview.category}</p>
      </div>
      
      {/* Duration */}
      <div className="absolute top-2 right-2 text-white bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-xs">
        {interview.duration}
      </div>
      
      {/* Active indicator */}
      {videoState.activeIndex === index && (
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
      )}
    </button>
  );

  return (
    <section 
      id="entrevistas"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        {/* Floating microphone icons */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-5"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          >
            <Mic className="w-6 h-6 text-yellow-400 animate-float" />
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-sm mb-6 shadow-lg">
            <Play className="w-5 h-5 mr-2" />
            CONTENIDO OFICIAL
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
            Videos y entrevistas{' '}
            <span className="text-gradient">del evento</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Contenido oficial y testimonios exclusivos desde el CODEa Mining Fest 2025
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-600 mx-auto mt-6 rounded-full" />
        </div>

        {/* Main Display */}
        <div className={`transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            
            {/* Main Content Display */}
            <IsolatedVideoPlayer />

            {/* Mobile Only: Carousel + YouTube Channel Button */}
            <div className="lg:hidden space-y-6 mt-6 w-full">
              {/* Mobile Carousel */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-6">
                  <h4 className="text-base font-semibold text-white">Más contenido:</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => prevCarousel(true)}
                      disabled={!canGoPrev}
                      className="w-8 h-8 bg-slate-800/50 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-slate-700/50 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </button>
                    <button
                      onClick={() => nextCarousel(true)}
                      disabled={!canGoNext(true)}
                      className="w-8 h-8 bg-slate-800/50 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-slate-700/50 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Mobile Carousel Container */}
                <div className="w-full px-6">
                  <div 
                    className="overflow-hidden py-8"
                    style={{ 
                      width: `${MOBILE_VISIBLE * MOBILE_ITEM_WIDTH + (MOBILE_VISIBLE - 1) * GAP}px`,
                      margin: '0 auto'
                    }}
                  >
                    <div 
                      className="flex transition-transform duration-500 ease-out"
                      style={{ 
                        transform: `translateX(-${carouselIndex * (MOBILE_ITEM_WIDTH + GAP)}px)`,
                        gap: `${GAP}px`
                      }}
                    >
                      {interviews.map((interview, index) => (
                        <CarouselItem 
                          key={interview.id}
                          interview={interview}
                          index={index}
                          itemWidth={MOBILE_ITEM_WIDTH}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* YouTube Channel Button */}
              <div className="text-center px-6">
                <a 
                  href="https://www.youtube.com/@codeauni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Ver canal en YouTube
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>

            {/* Desktop Content & Interview Selection */}
            <div className="hidden lg:block flex-1 space-y-8">
              
              {/* Current Interview Extended Info */}
              <div className="text-center lg:text-left px-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium mb-4">
                  {currentVideo.isYouTube ? (
                    <Play className="w-4 h-4 mr-2" />
                  ) : (
                    <Mic className="w-4 h-4 mr-2" />
                  )}
                  {currentVideo.isYouTube ? 'Video Oficial' : 'Entrevista Ejemplo'}
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  {currentVideo.name}
                </h3>
                <p className="text-lg text-yellow-400 mb-4">
                  {currentVideo.role}
                </p>
                
                {/* Full Quote Display */}
                <div className="relative mb-6 p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-yellow-500/20">
                  {currentVideo.isYouTube ? (
                    <Play className="w-8 h-8 text-red-400/40 absolute top-4 left-4" />
                  ) : (
                    <Quote className="w-8 h-8 text-yellow-400/40 absolute top-4 left-4" />
                  )}
                  <blockquote className="text-lg text-gray-300 leading-relaxed pl-8">
                    "{currentVideo.quote}"
                  </blockquote>
                </div>
                
                {/* Stats or Actions */}
                {currentVideo.isYouTube ? (
                  <div className="flex justify-center lg:justify-start gap-4">
                    <a 
                      href={`https://www.youtube.com/watch?v=${currentVideo.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 hover:scale-105"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Ver en YouTube
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                ) : (
                  <div className="flex justify-center lg:justify-start gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">{currentVideo.likes}</div>
                      <div className="text-sm text-gray-400">Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{currentVideo.comments}</div>
                      <div className="text-sm text-gray-400">Comentarios</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">{currentVideo.duration}</div>
                      <div className="text-sm text-gray-400">Duración</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop Carousel */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-8">
                  <h4 className="text-lg font-semibold text-white">Todo el contenido:</h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => prevCarousel(false)}
                      disabled={!canGoPrev}
                      className="w-10 h-10 bg-slate-800/50 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-slate-700/50 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ArrowRight className="w-5 h-5 rotate-180" />
                    </button>
                    <button
                      onClick={() => nextCarousel(false)}
                      disabled={!canGoNext(false)}
                      className="w-10 h-10 bg-slate-800/50 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-slate-700/50 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Desktop Carousel Container */}
                <div className="w-full px-8">
                  <div 
                    className="overflow-hidden py-8"
                    style={{ 
                      width: `${DESKTOP_VISIBLE * DESKTOP_ITEM_WIDTH + (DESKTOP_VISIBLE - 1) * GAP}px`,
                      margin: '0 auto'
                    }}
                  >
                    <div 
                      className="flex transition-transform duration-500 ease-out"
                      style={{ 
                        transform: `translateX(-${carouselIndex * (DESKTOP_ITEM_WIDTH + GAP)}px)`,
                        gap: `${GAP}px`
                      }}
                    >
                      {interviews.map((interview, index) => (
                        <CarouselItem 
                          key={interview.id}
                          interview={interview}
                          index={index}
                          itemWidth={DESKTOP_ITEM_WIDTH}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center lg:justify-start space-x-2 px-8">
                {interviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleInterviewSelect(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      videoState.activeIndex === index 
                        ? 'bg-yellow-400 w-6' 
                        : 'bg-gray-600 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterviewsSection;