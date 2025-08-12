import React from 'react';
import Image from 'next/image';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Users,
  Award,
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-400" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-blue-300" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-400" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-500" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-400" }
  ];

  const quickLinks = [
    { title: "Sobre el evento", href: "#about" },
    { title: "Conferencistas", href: "#speakers" },
    { title: "Agenda", href: "#agenda" },
    { title: "Patrocinadores", href: "#sponsors" },
    { title: "Registro", href: "#register" },
    { title: "Contacto", href: "#contact" }
  ];

  const legalLinks = [
    { title: "Términos y condiciones", href: "#terms" },
    { title: "Política de privacidad", href: "#privacy" },
    { title: "Código de conducta", href: "#conduct" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 lg:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Logo and Description */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Image
                  src="/images/logo-codea-white.png"
                  alt="CODEa Mining Fest"
                  width={180}
                  height={90}
                  className="object-contain mb-4"
                />
                <h3 className="text-xl font-bold text-white mb-3">CODEa Mining Fest</h3>
                <p className="text-gray-400 leading-relaxed">
                  El evento líder en innovación minera de Latinoamérica. Conectando profesionales, 
                  empresas y estudiantes para explorar el futuro de la industria.
                </p>
              </div>

              {/* Event Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-white/10">
                  <div className="text-2xl font-bold text-yellow-400">300+</div>
                  <div className="text-xs text-gray-400">Asistentes</div>
                </div>
                <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-white/10">
                  <div className="text-2xl font-bold text-blue-400">25+</div>
                  <div className="text-xs text-gray-400">Expositores</div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-yellow-400" />
                Enlaces rápidos
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <ExternalLink className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-green-400" />
                Contacto
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Lima, Perú</p>
                    <p className="text-gray-400 text-sm">Universidad Nacional de Ingeniería</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <a href="tel:+51978400626" className="text-gray-400 hover:text-white transition-colors">
                    +51 978 400 626
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <a 
                    href="mailto:miguel.ybanez.e@gmail.com" 
                    className="text-gray-400 hover:text-white transition-colors break-all"
                  >
                    miguel.ybanez.e@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Organization & Social */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-yellow-400" />
                Organiza
              </h4>
              
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-white font-bold">CODEa UNI</p>
                    <p className="text-gray-400 text-sm">Centro de Estudios</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Liderando la innovación y transformación digital en la industria minera peruana.
                </p>
              </div>

              {/* Social Media */}
              <div>
                <h5 className="text-white font-semibold mb-4">Síguenos</h5>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-slate-800/50 border border-white/10 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-slate-700/50`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 lg:px-6 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              
              {/* Copyright */}
              <div className="text-center lg:text-left">
                <p className="text-gray-400 text-sm">
                  © {currentYear} CODEa Mining Fest. Todos los derechos reservados.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Desarrollado con ❤️ para la comunidad minera latinoamericana
                </p>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center gap-6">
                {legalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.title}
                  </a>
                ))}
              </div>

              {/* Next Event Badge */}
              <div className="bg-blue-600/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-white text-sm font-medium">Próximo evento 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-20 left-10 w-16 h-16 border border-yellow-400/20 rounded-lg rotate-45 animate-bounce opacity-30" />
      <div className="absolute top-20 right-10 w-12 h-12 bg-blue-400/10 rounded-full animate-ping opacity-40" />
    </footer>
  );
};

export default Footer;