import { useEffect, useRef } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Importer les composants avec SSR déactivé
const Header = dynamic(() => import('../components/Header'), { ssr: false });
const Hero = dynamic(() => import('../components/Hero'), { ssr: false });
const About = dynamic(() => import('../components/About'), { ssr: false });
const MaVision = dynamic(() => import('../components/MaVision'), { ssr: false });
const PerspectiveCarousel = dynamic(() => import('../components/PerspectiveCarousel'), { ssr: false });
const Prestations = dynamic(() => import('../components/Prestations'), { ssr: false });
const Testimonials = dynamic(() => import('../components/Testimonials'), { ssr: false });
const Footer = dynamic(() => import('../components/Footer'), { ssr: false });
// const ContactSimple = dynamic(() => import('../components/ContactSimple'), { ssr: false }); // Commenté

export default function Home() {
  // Pour les animations de chargement de page
  const loaderRef = useRef(null);

  // Animation de chargement de la page
  useEffect(() => {
    // Simuler un temps de chargement pour l'animation d'entrée
    const timer = setTimeout(() => {
      if (loaderRef.current) {
        loaderRef.current.style.opacity = 0;
        loaderRef.current.style.pointerEvents = 'none';
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Variants pour les animations de page
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9],
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };

  return (
    <>
      <Head>
        <title>Céline Debarieux | Photographe d'Exception au Mans | Portraits & Événements</title>
        <meta name="description" content="Découvrez l'univers photographique raffiné de Céline Debarieux, artiste portraitiste au Mans. Prestations sur-mesure pour sublimer vos émotions et moments précieux." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Loader élégant simplifié */}
      <div 
        ref={loaderRef} 
        className="fixed inset-0 z-50 flex items-center justify-center bg-beige transition-opacity duration-1000"
      >
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 relative">
            <div className="absolute inset-0 rounded-full border-2 border-gold opacity-50"></div>
            <div className="absolute inset-4 rounded-full border-2 border-gold opacity-80"></div>
            <div className="absolute inset-0 rounded-full border-t-2 border-gold animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-playfair text-xl text-gold">CD</span>
            </div>
          </div>
          <p className="mt-4 font-cormorant text-gold text-lg">L'élégance en images</p>
        </div>
      </div>

      <div className="min-h-screen bg-beige-light">
        <Header />
        <main data-scroll-section>
          <Hero />
          <About />
          <MaVision />
          <PerspectiveCarousel />
          <Prestations />
          <Testimonials />
          {/* <ContactSimple /> */}
          {/* Autres sections à ajouter ici */}
        </main>

        {/* Footer sublimé */}
        <Footer />
      </div>
    </>
  );
}
