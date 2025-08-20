"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import FlagIcon from '@/components/ui/FlagIcon';
import emailjs from '@emailjs/browser';
import { 
  Send, 
  User, 
  Mail, 
  MessageSquare, 
  Building2, 
  Phone, 
  MapPin, 
  CheckCircle,
  Sparkles,
  ArrowRight,
  Star,
  Award,
  Users,
  Calendar,
  Clock,
  Globe,
  AlertCircle,
  Edit // ← CAMBIO: FileText por Edit (ícono disponible)
} from 'lucide-react';

const NextEditionCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    paisCodigo: '+51', // Perú por defecto
    paisBandera: 'PE',
    telefono: '',
    interes: '',
    descripcion: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Países con códigos y banderas
  const paises = [
    { codigo: '+51', bandera: 'PE', nombre: 'Perú' },
    { codigo: '+56', bandera: 'CL', nombre: 'Chile' },
    { codigo: '+57', bandera: 'CO', nombre: 'Colombia' },
    { codigo: '+54', bandera: 'AR', nombre: 'Argentina' },
    { codigo: '+55', bandera: 'BR', nombre: 'Brasil' },
    { codigo: '+593', bandera: 'EC', nombre: 'Ecuador' },
    { codigo: '+591', bandera: 'BO', nombre: 'Bolivia' },
    { codigo: '+598', bandera: 'UY', nombre: 'Uruguay' },
    { codigo: '+595', bandera: 'PY', nombre: 'Paraguay' },
    { codigo: '+58', bandera: 'VE', nombre: 'Venezuela' },
    { codigo: '+52', bandera: 'MX', nombre: 'México' },
    { codigo: '+1', bandera: 'US', nombre: 'Estados Unidos' },
    { codigo: '+1', bandera: 'CA', nombre: 'Canadá' },
    { codigo: '+34', bandera: 'ES', nombre: 'España' },
    { codigo: '+33', bandera: 'FR', nombre: 'Francia' },
    { codigo: '+49', bandera: 'DE', nombre: 'Alemania' },
    { codigo: '+44', bandera: 'GB', nombre: 'Reino Unido' },
    { codigo: '+61', bandera: 'AU', nombre: 'Australia' },
    { codigo: '+86', bandera: 'CN', nombre: 'China' },
    { codigo: '+81', bandera: 'JP', nombre: 'Japón' }
  ];

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'nombre':
      case 'apellido':
        return value.length < 2 ? 'Mínimo 2 caracteres' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Email inválido' : '';
      case 'telefono':
        return value.length < 6 ? 'Número de teléfono inválido' : '';
      case 'interes':
        return !value ? 'Selecciona una opción' : '';
      case 'descripcion':
        return value.length < 10 ? 'Mínimo 10 caracteres' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  const handlePaisChange = (pais: typeof paises[0]) => {
    setFormData(prev => ({ 
      ...prev, 
      paisCodigo: pais.codigo,
      paisBandera: pais.bandera 
    }));
    setIsCountryDropdownOpen(false);
  };

  // handleSubmit con EmailJS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    // Validate all fields
    const errors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'paisCodigo' && key !== 'paisBandera') {
        const error = validateField(key, value);
        if (error) errors[key] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('📧 Enviando email via SMTP...');

      // Preparar datos para la nueva API
      const emailData = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: `${formData.paisCodigo} ${formData.telefono}`,
        pais: formData.paisBandera,
        empresa: '', // Campo opcional
        cargo: '', // Campo opcional
        mensaje: `Tipo de interés: ${formData.interes}\n\nDescripción: ${formData.descripcion}`
      };

      // Llamar a nuestra API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error enviando email');
      }

      const result = await response.json();
      console.log('✅ Emails enviados exitosamente:', result);

      // Success!
      setIsSubmitted(true);
      setFormData({ 
        nombre: '', 
        apellido: '', 
        email: '', 
        paisCodigo: '+51',
        paisBandera: 'PE', 
        telefono: '', 
        interes: '', 
        descripcion: '' 
      });
      setFormErrors({});

      // Scroll suave al mensaje de éxito
      setTimeout(() => {
        const successElement = document.getElementById('success-message');
        if (successElement) {
          successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);

    } catch (error) {
      console.error('❌ Error enviando emails:', error);
      
      // Manejo de errores específicos
      let errorMessage = 'Hubo un error al enviar tu registro. ';
      
      if (error instanceof Error) {
        if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage += 'Verifica tu conexión a internet e intenta nuevamente.';
        } else if (error.message.includes('limit') || error.message.includes('quota')) {
          errorMessage += 'Se ha alcanzado el límite de envíos. Intenta más tarde o contacta directamente.';
        } else if (error.message.includes('Invalid')) {
          errorMessage += 'Error de configuración. Contacta al administrador.';
        } else {
          errorMessage += 'Por favor intenta nuevamente en unos minutos.';
        }
      } else {
        errorMessage += 'Por favor intenta nuevamente o contacta directamente a eventosinteligentes@codeaevents.com';
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { icon: Star, text: "Acceso VIP a contenido exclusivo", color: "text-yellow-400" },
    { icon: Award, text: "Descuentos early bird hasta 40%", color: "text-blue-400" },
    { icon: Users, text: "Networking premium con speakers", color: "text-green-400" },
    { icon: Calendar, text: "Agenda personalizada y recursos", color: "text-purple-400" }
  ];

  const stats = [
    { icon: Globe, value: "6", label: "Países", color: "from-blue-500 to-cyan-500" },
    { icon: Users, value: "500+", label: "Asistentes", color: "from-green-500 to-emerald-500" },
    { icon: Clock, value: "2", label: "Días", color: "from-purple-500 to-pink-500" },
    { icon: Award, value: "20+", label: "Speakers", color: "from-yellow-500 to-orange-500" }
  ];

  return (
    <section 
      id="proxima-edicion"
      ref={sectionRef}
      className="relative overflow-hidden w-full max-w-full"
    >
      {/* Hero Contact Section */}
      <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-white py-20 lg:py-32 w-full max-w-full overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => {
            // Valores fijos para evitar hydration mismatch
            const positions = [
              { left: 10, top: 15, delay: 0.5 }, { left: 90, top: 25, delay: 3.2 },
              { left: 35, top: 85, delay: 1.8 }, { left: 75, top: 45, delay: 4.1 },
              { left: 15, top: 65, delay: 2.3 }, { left: 85, top: 75, delay: 0.9 },
              { left: 55, top: 35, delay: 3.7 }, { left: 25, top: 55, delay: 1.4 },
              { left: 65, top: 15, delay: 4.6 }, { left: 45, top: 95, delay: 2.1 },
              { left: 95, top: 55, delay: 0.7 }, { left: 5, top: 35, delay: 3.9 },
              { left: 70, top: 85, delay: 1.6 }, { left: 30, top: 25, delay: 4.3 },
              { left: 80, top: 65, delay: 2.8 }, { left: 20, top: 45, delay: 0.3 },
              { left: 60, top: 75, delay: 3.5 }, { left: 40, top: 5, delay: 1.9 },
              { left: 85, top: 35, delay: 4.8 }, { left: 15, top: 85, delay: 2.6 },
              { left: 75, top: 25, delay: 0.8 }, { left: 35, top: 65, delay: 3.4 },
              { left: 95, top: 15, delay: 1.7 }, { left: 5, top: 75, delay: 4.2 },
              { left: 65, top: 55, delay: 2.9 }, { left: 25, top: 35, delay: 0.4 },
              { left: 85, top: 95, delay: 3.8 }, { left: 45, top: 25, delay: 1.3 },
              { left: 55, top: 85, delay: 4.7 }, { left: 15, top: 45, delay: 2.2 }
            ];
            const pos = positions[i];
            
            return (
              <div
                key={i}
                className="absolute opacity-10"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  animationDelay: `${pos.delay}s`
                }}
              >
                <Sparkles className="w-4 h-4 text-blue-500 animate-float" />
              </div>
            );
          })}
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-full">
            
            {/* Content Side */}
            <div className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
            }`}>
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm mb-8 shadow-lg">
                <Calendar className="w-5 h-5 mr-2" />
                PRÓXIMO EVENTO 2026
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  Contáctanos
                </span>
                <br />
                <span className="text-gray-800">
                  para conocer más
                </span>
              </h2>
              
              <div className="space-y-6 mb-10">
                <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed">
                  Estamos trabajando en la nueva edición del{' '}
                  <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    CODEa Mining Fest
                  </span>.
                </p>
                <p className="text-xl text-gray-600">
                  Queremos que sea más grande, más abierto, más conectado.
                </p>
                <p className="text-xl font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Si quieres enterarte antes que nadie, deja tus datos.
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 mb-10">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div 
                      key={index}
                      className={`flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${benefit.color} flex-shrink-0`} />
                      <span className="text-gray-700 font-medium text-xs sm:text-sm">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                        <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="text-lg sm:text-2xl font-bold text-gray-800">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Image Side */}
            <div className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl scale-110 group-hover:scale-125 transition-transform duration-700" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                  <Image
                    src="/images/contact/mining-engineer-woman-optimized.webp"
                    alt="Ingeniera de minas profesional"
                    width={896}
                    height={1280}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Floating badges */}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md rounded-xl px-4 py-3 shadow-xl">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span className="font-bold text-gray-800">2026</span>
                    </div>
                  </div>
                  
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md rounded-xl px-4 py-3 shadow-xl">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-green-600" />
                      <span className="font-bold text-gray-800">Lima</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-6 left-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl px-4 py-3 shadow-xl">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-white" />
                      <span className="font-bold text-white">500+ Asistentes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 w-full max-w-full overflow-hidden">
        {/* Background with conference image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70" />
          <Image
            src="/images/contact/conference-audience.webp"
            alt="Conference audience"
            fill
            className="object-cover opacity-30"
          />
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => {
            // Valores fijos para evitar hydration mismatch
            const positions = [
              { left: 8, top: 12, delay: 0.3, duration: 4.2 }, { left: 92, top: 28, delay: 3.7, duration: 5.1 },
              { left: 34, top: 88, delay: 1.9, duration: 3.8 }, { left: 78, top: 42, delay: 4.3, duration: 6.2 },
              { left: 12, top: 68, delay: 2.1, duration: 4.9 }, { left: 88, top: 82, delay: 0.7, duration: 3.5 },
              { left: 56, top: 18, delay: 3.4, duration: 5.6 }, { left: 22, top: 58, delay: 1.6, duration: 4.1 },
              { left: 68, top: 92, delay: 4.8, duration: 3.9 }, { left: 42, top: 32, delay: 2.3, duration: 5.8 },
              { left: 96, top: 48, delay: 0.9, duration: 4.6 }, { left: 4, top: 78, delay: 3.1, duration: 3.7 },
              { left: 72, top: 8, delay: 1.4, duration: 5.3 }, { left: 28, top: 72, delay: 4.6, duration: 4.4 },
              { left: 84, top: 38, delay: 2.8, duration: 6.1 }, { left: 16, top: 98, delay: 0.5, duration: 3.6 },
              { left: 62, top: 52, delay: 3.9, duration: 5.7 }, { left: 38, top: 22, delay: 1.7, duration: 4.3 },
              { left: 94, top: 88, delay: 4.1, duration: 3.4 }, { left: 6, top: 44, delay: 2.6, duration: 5.9 },
              { left: 74, top: 64, delay: 0.8, duration: 4.7 }, { left: 26, top: 14, delay: 3.5, duration: 3.8 },
              { left: 86, top: 76, delay: 1.3, duration: 5.4 }, { left: 14, top: 36, delay: 4.9, duration: 4.1 },
              { left: 58, top: 96, delay: 2.4, duration: 6.3 }, { left: 46, top: 6, delay: 0.6, duration: 3.9 },
              { left: 82, top: 54, delay: 3.8, duration: 5.2 }, { left: 18, top: 84, delay: 1.8, duration: 4.5 },
              { left: 66, top: 26, delay: 4.4, duration: 3.7 }, { left: 32, top: 46, delay: 2.7, duration: 6.0 },
              { left: 98, top: 62, delay: 0.4, duration: 4.8 }, { left: 2, top: 16, delay: 3.6, duration: 3.3 },
              { left: 76, top: 94, delay: 1.5, duration: 5.5 }, { left: 24, top: 34, delay: 4.7, duration: 4.2 },
              { left: 90, top: 74, delay: 2.9, duration: 3.6 }, { left: 10, top: 56, delay: 0.7, duration: 6.4 },
              { left: 54, top: 2, delay: 3.2, duration: 4.9 }, { left: 48, top: 86, delay: 1.1, duration: 5.1 },
              { left: 80, top: 24, delay: 4.5, duration: 3.8 }, { left: 20, top: 66, delay: 2.2, duration: 5.7 },
              { left: 64, top: 38, delay: 0.9, duration: 4.4 }, { left: 36, top: 92, delay: 3.3, duration: 6.2 },
              { left: 92, top: 12, delay: 1.6, duration: 3.5 }, { left: 8, top: 48, delay: 4.2, duration: 5.8 },
              { left: 52, top: 78, delay: 2.5, duration: 4.6 }, { left: 44, top: 58, delay: 0.3, duration: 3.9 },
              { left: 88, top: 4, delay: 3.7, duration: 5.3 }, { left: 12, top: 88, delay: 1.9, duration: 4.1 },
              { left: 70, top: 44, delay: 4.8, duration: 6.1 }, { left: 30, top: 68, delay: 2.8, duration: 3.7 },
              { left: 60, top: 82, delay: 0.5, duration: 5.6 }, { left: 40, top: 18, delay: 3.4, duration: 4.3 }
            ];
            const pos = positions[i];
            
            return (
              <div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400/30 rounded-full animate-float"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  animationDelay: `${pos.delay}s`,
                  animationDuration: `${pos.duration}s`
                }}
              />
            );
          })}
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24">
          
          {/* Section Header */}
          <div className={`text-center mb-16 transform transition-all duration-1000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border border-yellow-500/30 mb-8">
              <Sparkles className="w-6 h-6 text-yellow-400 mr-3 animate-pulse" />
              <span className="text-yellow-400 font-bold text-lg">Sé parte del próximo CODEa Mining Fest</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight">
              ¿Listo para transformar
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                el futuro de la minería?
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full" />
          </div>

          {/* Registration Form */}
          <div className={`max-w-3xl mx-auto transform transition-all duration-1000 delay-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            
            {!isSubmitted ? (
              <div className="relative">
                {/* Glass morphism container */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl">
                  
                  {/* Error message global */}
                  {submitError && (
                    <div className="mb-8 p-6 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start space-x-4">
                      <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-red-300 font-semibold text-lg mb-2">Error al enviar el registro</p>
                        <p className="text-red-400 leading-relaxed">{submitError}</p>
                        <p className="text-red-300 text-sm mt-3">
                          Si el problema persiste, contacta directamente a: 
                          <a href="mailto:eventosinteligentes@codeaevents.com" className="underline hover:text-red-200 ml-1">
                            eventosinteligentes@codeaevents.com
                          </a>
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 w-full max-w-full">
                    
                    {/* Name Fields Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                          <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            placeholder="Nombre"
                            className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                              formErrors.nombre 
                                ? 'border-red-500 focus:ring-red-500/50' 
                                : 'border-white/20 focus:border-yellow-500 focus:ring-yellow-500/20'
                            }`}
                            required
                          />
                        </div>
                        {formErrors.nombre && (
                          <p className="text-red-400 text-sm flex items-center">
                            <span className="w-1 h-1 bg-red-400 rounded-full mr-2" />
                            {formErrors.nombre}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                          <input
                            type="text"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleInputChange}
                            placeholder="Apellido"
                            className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                              formErrors.apellido 
                                ? 'border-red-500 focus:ring-red-500/50' 
                                : 'border-white/20 focus:border-yellow-500 focus:ring-yellow-500/20'
                            }`}
                            required
                          />
                        </div>
                        {formErrors.apellido && (
                          <p className="text-red-400 text-sm flex items-center">
                            <span className="w-1 h-1 bg-red-400 rounded-full mr-2" />
                            {formErrors.apellido}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Correo electrónico"
                          className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                            formErrors.email 
                              ? 'border-red-500 focus:ring-red-500/50' 
                              : 'border-white/20 focus:border-yellow-500 focus:ring-yellow-500/20'
                          }`}
                          required
                        />
                      </div>
                      {formErrors.email && (
                        <p className="text-red-400 text-sm flex items-center">
                          <span className="w-1 h-1 bg-red-400 rounded-full mr-2" />
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone Field with Country Selector */}
                    <div className="space-y-2">
                      <div className="flex gap-2 sm:gap-3">
                        {/* Country Selector with Flag Display */}
                        <div ref={countryDropdownRef} className="relative group flex-shrink-0 w-32 sm:w-40">
                          {/* Selected Country Display */}
                          <button
                            type="button"
                            onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                            className="w-full pl-2 sm:pl-3 pr-6 sm:pr-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 focus:border-yellow-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 text-xs sm:text-sm cursor-pointer flex items-center gap-1 sm:gap-2"
                          >
                            <FlagIcon countryCode={formData.paisBandera} className="w-4 h-3 sm:w-6 sm:h-4 flex-shrink-0" />
                            <span className="text-xs truncate">{formData.paisCodigo}</span>
                          </button>
                          
                          {/* Custom dropdown arrow */}
                          <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>

                          {/* Dropdown Options */}
                          {isCountryDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50 max-h-48 sm:max-h-60 overflow-y-auto">
                              {paises.map((pais) => (
                                <button
                                  key={pais.codigo + pais.nombre}
                                  type="button"
                                  onClick={() => handlePaisChange(pais)}
                                  className="w-full px-2 sm:px-3 py-2 sm:py-3 text-left hover:bg-white/10 transition-colors duration-200 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white first:rounded-t-xl last:rounded-b-xl"
                                >
                                  <FlagIcon countryCode={pais.bandera} className="w-4 h-3 sm:w-6 sm:h-4 flex-shrink-0" />
                                  <span className="text-xs text-gray-300 font-mono min-w-[30px] sm:min-w-[40px]">{pais.codigo}</span>
                                  <span className="text-xs sm:text-sm truncate">{pais.nombre}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Phone Number */}
                        <div className="relative group flex-1">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                          <input
                            type="tel"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            placeholder="Número de teléfono"
                            className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                              formErrors.telefono 
                                ? 'border-red-500 focus:ring-red-500/50' 
                                : 'border-white/20 focus:border-yellow-500 focus:ring-yellow-500/20'
                            }`}
                            required
                          />
                        </div>
                      </div>
                      {formErrors.telefono && (
                        <p className="text-red-400 text-sm flex items-center">
                          <span className="w-1 h-1 bg-red-400 rounded-full mr-2" />
                          {formErrors.telefono}
                        </p>
                      )}
                    </div>

                    {/* Interest Field with Prensa option */}
                    <div className="space-y-2">
                      <div className="relative group">
                        <MessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                        <select
                          name="interes"
                          value={formData.interes}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border rounded-xl text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                            formErrors.interes 
                              ? 'border-red-500 focus:ring-red-500/50' 
                              : 'border-white/20 focus:border-yellow-500 focus:ring-yellow-500/20'
                          }`}
                          required
                        >
                          <option value="" className="bg-slate-800 text-gray-300">
                            Interés (Asistente, Sponsor, Ponente, Empresa, Prensa)
                          </option>
                          <option value="asistente" className="bg-slate-800">Asistente</option>
                          <option value="sponsor" className="bg-slate-800">Sponsor</option>
                          <option value="ponente" className="bg-slate-800">Ponente</option>
                          <option value="empresa" className="bg-slate-800">Empresa</option>
                          <option value="prensa" className="bg-slate-800">Prensa</option>
                        </select>
                      </div>
                      {formErrors.interes && (
                        <p className="text-red-400 text-sm flex items-center">
                          <span className="w-1 h-1 bg-red-400 rounded-full mr-2" />
                          {formErrors.interes}
                        </p>
                      )}
                    </div>

                    {/* Description Field */}
                    <div className="space-y-2">
                      <div className="relative group">
                        <Edit className="absolute left-4 top-6 w-5 h-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                        <textarea
                          name="descripcion"
                          value={formData.descripcion}
                          onChange={handleInputChange}
                          placeholder="Descripción del mensaje (cuéntanos más sobre tu interés en el evento)"
                          rows={4}
                          className={`w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                            formErrors.descripcion 
                              ? 'border-red-500 focus:ring-red-500/50' 
                              : 'border-white/20 focus:border-yellow-500 focus:ring-yellow-500/20'
                          }`}
                          required
                        />
                      </div>
                      {formErrors.descripcion && (
                        <p className="text-red-400 text-sm flex items-center">
                          <span className="w-1 h-1 bg-red-400 rounded-full mr-2" />
                          {formErrors.descripcion}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="text-center pt-6">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="relative w-full max-w-full h-12 sm:h-14 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-400 hover:via-orange-400 hover:to-red-400 text-black font-bold text-sm sm:text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2 sm:mr-3" />
                            <span className="text-xs sm:text-sm">Enviando registro...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Send className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                            <span className="text-xs sm:text-base">Enviar mis datos</span>
                            <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        )}
                      </Button>
                      
                      {/* Help text */}
                      <p className="text-gray-400 text-sm mt-4">
                        Recibirás un email de confirmación tras el registro ✨
                      </p>
                    </div>
                  </form>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-500/20 rounded-full blur-xl animate-pulse" />
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
              </div>
            ) : (
              /* Success State */
              <div id="success-message" className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce shadow-2xl">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">¡Registro Exitoso! 🎉</h3>
                <div className="space-y-4 mb-8">
                  <p className="text-xl text-green-300 font-medium">
                    ✅ Tu registro ha sido enviado correctamente
                  </p>
                  <p className="text-lg text-gray-300">
                    📧 Hemos enviado un email de confirmación a tu correo
                  </p>
                  <p className="text-lg text-gray-300">
                    📞 Nos pondremos en contacto contigo pronto con toda la información del evento
                  </p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-8 max-w-md mx-auto">
                  <h4 className="text-white font-semibold mb-3">Próximos pasos:</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>• Revisa tu email (también spam/promociones)</p>
                    <p>• Guarda nuestro contacto: eventosinteligentes@codeaevents.com</p>
                    <p>• Síguenos en redes sociales para actualizaciones</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setSubmitError('');
                    }}
                    variant="outline" 
                    size="lg"
                    className="group"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Registrar otro participante
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </section>
  );
};

export default NextEditionCTA;