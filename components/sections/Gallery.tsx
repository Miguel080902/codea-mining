"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ZoomIn, Calendar, Users, Award, Presentation, ChevronLeft, ChevronRight, Filter, Grid3X3, Rows3, LayoutGrid, Eye, Heart, Share2 } from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'evento' | 'ponentes' | 'keynotes' | 'sponsors' | 'testimonios';
  title: string;
  description?: string;
}

interface GalleryData {
  baseUrl: string;
  backgroundImage: string;
  images: Omit<GalleryImage, 'src'>[];
}

const categories = [
  { id: 'all', name: 'Todas', icon: LayoutGrid },
  { id: 'evento', name: 'Evento', icon: Calendar },
  { id: 'keynotes', name: 'Keynotes', icon: Presentation },
  { id: 'ponentes', name: 'Ponentes', icon: Users },
  { id: 'testimonios', name: 'Testimonios', icon: Award },
];

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry' | 'list'>('masonry');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Cargar datos desde GitHub
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          'https://raw.githubusercontent.com/Miguel080902/CodeaMiningMultiMedia/refs/heads/master/data/gallery.json'
        );
        
        if (!response.ok) {
          throw new Error('Error al cargar los datos de la galería');
        }
        
        const data: GalleryData = await response.json();
        
        // Combinar baseUrl con las rutas relativas de las imágenes
        const imagesWithFullUrls: GalleryImage[] = data.images.map(image => ({
          ...image,
          src: `${data.baseUrl}/${image.src}`
        }));
        
        setGalleryImages(imagesWithFullUrls);
        setBackgroundImage(data.backgroundImage);
        setIsLoading(false);
        
        // Animación de carga
        const timer = setTimeout(() => setIsLoaded(true), 300);
        return () => clearTimeout(timer);
        
      } catch (err) {
        console.error('Error cargando galería:', err);
        setError('Error al cargar las imágenes. Por favor, intenta de nuevo.');
        setIsLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  // Función para obtener altura aleatoria para el efecto masonry
  const getRandomHeight = (index: number) => {
    const heights = [280, 320, 380, 420, 360, 400, 340, 450, 300, 390];
    return heights[index % heights.length];
  };

  const MasonryGrid = ({ children }: { children: React.ReactNode[] }) => {
    return (
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6">
        {children}
      </div>
    );
  };

  const getGridClasses = () => {
    switch (viewMode) {
      case 'grid':
        return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';
      case 'list':
        return 'grid grid-cols-1 gap-8';
      default:
        return '';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Cargando galería...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <p className="text-gray-300 text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black">
        {/* Background Pattern */}
        {backgroundImage && (
          <div className="absolute inset-0 opacity-10">
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent leading-tight">
              Galería CODEa Mining Fest
            </h1>
            <p className="text-base md:text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Revive los mejores momentos del evento que está transformando la industria minera en Latinoamérica. 
              Descubre las conferencias, ponentes y conexiones que marcaron la diferencia.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Controls */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`group relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-500 text-sm font-medium overflow-hidden ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-black shadow-lg shadow-yellow-500/25'
                          : 'bg-white/5 backdrop-blur-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      
                      <Icon className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">{category.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* View Mode Controls */}
              <div className="flex items-center space-x-1 bg-white/5 backdrop-blur-xl rounded-full p-1 border border-white/10">
                {[
                  { mode: 'masonry', icon: Grid3X3, title: 'Vista Masonry' },
                  { mode: 'grid', icon: LayoutGrid, title: 'Vista Grid' },
                  { mode: 'list', icon: Rows3, title: 'Vista Lista' }
                ].map(({ mode, icon: Icon, title }) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode as 'grid' | 'masonry' | 'list')}
                    className={`p-2 rounded-full transition-all duration-300 relative overflow-hidden ${
                      viewMode === mode 
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-400 text-black shadow-lg' 
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                    title={title}
                  >
                    <Icon className="w-4 h-4 relative z-10" />
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <p className="text-gray-300 text-sm">
                  {filteredImages.length} {filteredImages.length === 1 ? 'imagen' : 'imágenes'}
                  {selectedCategory !== 'all' && (
                    <span className="text-yellow-400 ml-1 font-medium">
                      • {categories.find(cat => cat.id === selectedCategory)?.name}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Gallery Grid - Smooth Masonry */}          
          {viewMode === 'masonry' ? (
            <MasonryGrid>
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="group cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 break-inside-avoid mb-6 animate-fade-in"
                  onClick={() => openLightbox(image)}
                  style={{ 
                    animationDelay: `${index * 80}ms`,
                  }}
                >
                  <div className="relative overflow-hidden bg-slate-900/50 rounded-2xl shadow-lg hover:shadow-2xl border border-white/5 backdrop-blur-sm group-hover:border-yellow-500/30 transition-all duration-500 ease-out group-hover:shadow-yellow-500/20">
                    
                    {/* Subtle Gradient border effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                    
                    {/* Image Container - Variable Heights */}
                    <div 
                      className="relative bg-slate-800 rounded-2xl overflow-hidden"
                      style={{ height: `${getRandomHeight(index)}px` }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />

                      {/* Smooth Overlay Effects */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out">
                        
                        {/* Simple Action Button */}
                        <div className="absolute top-4 right-4 transform translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                          <button 
                            className="p-3 bg-white/15 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              openLightbox(image);
                            }}
                          >
                            <ZoomIn className="w-5 h-5" />
                          </button>
                        </div>
                        
                        {/* Content Info - Smooth Slide */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 delay-150">
                          
                          {/* Category Badge */}
                          <div className="mb-3">
                            <span className="inline-flex items-center px-3 py-1.5 bg-yellow-500/90 backdrop-blur-sm rounded-full text-xs font-bold text-black shadow-md">
                              {categories.find(cat => cat.id === image.category)?.name}
                            </span>
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-white font-bold text-lg mb-2 leading-tight">
                            {image.title}
                          </h3>
                          
                          {/* Description */}
                          {image.description && (
                            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-3">
                              {image.description}
                            </p>
                          )}
                          
                          {/* Simple Interaction Indicator */}
                          <div className="flex items-center space-x-2 text-gray-400">
                            <Eye className="w-4 h-4" />
                            <span className="text-xs">Ver detalles</span>
                            <div className="flex space-x-1 ml-auto">
                              {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: `${i * 300}ms`}}></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Subtle Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                    </div>
                  </div>
                </div>
              ))}
            </MasonryGrid>
          ) : (
            <div className={getGridClasses()}>
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`group cursor-pointer transition-all duration-500 ${
                    viewMode === 'list' ? 'flex flex-col md:flex-row gap-6 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10' : ''
                  }`}
                  onClick={() => openLightbox(image)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`relative overflow-hidden ${
                    viewMode === 'list' 
                      ? 'w-full md:w-80 h-48 flex-shrink-0' 
                      : 'aspect-square'
                  } bg-slate-800 rounded-xl`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                          {image.title}
                        </h3>
                        {viewMode !== 'list' && image.description && (
                          <p className="text-gray-300 text-xs line-clamp-2">
                            {image.description}
                          </p>
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* List View Content */}
                  {viewMode === 'list' && (
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-white font-bold text-xl mb-2">
                        {image.title}
                      </h3>
                      {image.description && (
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {image.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-2">
                        <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium">
                          {categories.find(cat => cat.id === image.category)?.name}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-3 bg-black/50 backdrop-blur-xl rounded-full text-white hover:bg-black/70 border border-white/20 transition-all duration-300 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur-xl rounded-full text-white hover:bg-black/70 border border-white/20 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 backdrop-blur-xl rounded-full text-white hover:bg-black/70 border border-white/20 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="relative h-[70vh] bg-slate-900 rounded-xl overflow-hidden">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>

            {/* Image Info */}
            <div className="mt-6 text-center">
              <h3 className="text-white font-bold text-2xl mb-3">
                {selectedImage.title}
              </h3>
              {selectedImage.description && (
                <p className="text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
                  {selectedImage.description}
                </p>
              )}
              <div className="flex items-center justify-center space-x-4">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 text-yellow-400 rounded-full text-sm font-medium border border-yellow-500/20">
                  {categories.find(cat => cat.id === selectedImage.category)?.name}
                </span>
                <span className="text-gray-500 text-sm bg-white/5 px-3 py-1 rounded-full">
                  {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} de {filteredImages.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 767px) {
          .columns-1 {
            column-count: 1;
          }
        }
        
        @media (min-width: 768px) and (max-width: 1023px) {
          .md\\:columns-2 {
            column-count: 2;
          }
        }
        
        @media (min-width: 1024px) and (max-width: 1279px) {
          .lg\\:columns-3 {
            column-count: 3;
          }
        }
        
        @media (min-width: 1280px) {
          .xl\\:columns-4 {
            column-count: 4;
          }
        }
        
        .break-inside-avoid {
          break-inside: avoid;
        }
      `}</style>
    </>
  );
};

export default Gallery;