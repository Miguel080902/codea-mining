import Header from '@/components/sections/Header';
import Gallery from '@/components/sections/Gallery';
import Footer from '@/components/sections/FooterSection';

export const metadata = {
  title: "Galería - CODEa Mining Fest 2025",
  description: "Revive los mejores momentos del CODEa Mining Fest a través de nuestra galería fotográfica.",
};

export default function GaleriaPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Gallery />
      <Footer />
    </main>
  );
}