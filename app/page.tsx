import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import CountdownSection from '@/components/sections/CountdownSection';           // NUEVO
import AboutSection from '@/components/sections/AboutSection';
import StatsSection from '@/components/sections/StatsSection';                   // MOVIDO AQUÍ
import HighlightsGallery from '@/components/sections/HighlightsGallery';
import InterviewsSection from '@/components/sections/InterviewsSection';
import EventAgenda from '@/components/sections/EventAgenda';
import FeaturedSpeakers from '@/components/sections/FeaturedSpeakers';
import KeynoteSpeakers from '@/components/sections/KeynoteSpeakers';             // NUEVO
import SponsorsSection from '@/components/sections/SponsorSection';            // NUEVO
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import NextEditionCTA from '@/components/sections/NextEditionCTA';     
import Footer from '@/components/sections/FooterSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <CountdownSection />          
      <AboutSection />
      <StatsSection />             
      <HighlightsGallery />
      <InterviewsSection />
      <EventAgenda />
      <FeaturedSpeakers />
      <KeynoteSpeakers />            {/* NUEVO - Conferencistas magistrales */}
      <SponsorsSection />            {/* NUEVO - Auspiciadores <TestimonialsSection />*/}
      <NextEditionCTA />     
      <Footer></Footer>        
    </main>
  );
}