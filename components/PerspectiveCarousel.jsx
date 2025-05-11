import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'; // Icônes pour la navigation

// Données d'exemple - à remplacer par vos images et légendes
const initialItems = [
  { id: 1, src: '/assets/chat.jpg', caption: "Regard félin capturé avec douceur, instant de grâce par votre photographe au Mans.", alt: "Portrait artistique d'un chat aux yeux vifs, photographie animalière Le Mans par Céline Debarieux." },
  { id: 2, src: '/assets/sample5.jpg', caption: "Jeu de textures et de lumières, une exploration visuelle signée au Mans.", alt: "Photographie d'art conceptuelle ou de détail, portfolio Céline Debarieux, Le Mans." },
  { id: 3, src: '/assets/sample1.jpg', caption: "La poésie d'un instant suspendu, l'art de la photographie au Mans.", alt: "Exemple de photographie artistique Le Mans, par Céline Debarieux." },
  { id: 4, src: '/assets/complice 1.jpg', caption: "Complicité et émotion, un souvenir précieux immortalisé par votre photographe au Mans.", alt: "Photographie lifestyle capturant un moment de complicité, Céline Debarieux Le Mans." },
  { id: 5, src: '/assets/fleuve.jpg', caption: "Sérénité des bords de Sarthe, la nature sublimée par l'objectif au Mans.", alt: "Paysage de fleuve en Sarthe, photographie nature par Céline Debarieux, Le Mans." },
  { id: 6, src: '/assets/willo 5.jpg', caption: "L'expression unique de Willo, un portrait plein de vie réalisé au Mans.", alt: "Portrait de Willo, photographie personnalisée par Céline Debarieux, Le Mans." },
  { id: 7, src: '/assets/amitié.jpg', caption: "L'amitié sublimée par la lumière, une connexion authentique saisie à l'objectif au Mans.", alt: "Portrait d'amitié, photographie émotionnelle par Céline Debarieux, Le Mans." },
  { id: 8, src: '/assets/double.jpg', caption: "Double regard, double émotion, la dualité magnifiée par la photographie au Mans.", alt: "Portrait artistique double, photographie créative par Céline Debarieux, Le Mans." },
  { id: 9, src: '/assets/chabin.jpg', caption: "Élégance sauvage, le portrait animalier dans sa plus pure expression sarthoise.", alt: "Portrait animalier, photographie nature et faune par Céline Debarieux, Le Mans." },
  { id: 10, src: '/assets/goutte.jpg', caption: "La perfection éphémère d'une goutte, macro-photographie d'exception au Mans.", alt: "Photographie macro d'une goutte d'eau, art photographique par Céline Debarieux, Le Mans." },
  { id: 11, src: '/assets/main&oiseaux.jpg', caption: "La rencontre délicate entre l'humain et la nature, symbole de confiance capturé au Mans.", alt: "Photographie conceptuelle main et oiseaux, art sensitif par Céline Debarieux, Le Mans." },
  { id: 12, src: '/assets/nature.jpg', caption: "L'âme paisible de la nature sarthoise, un havre de sérénité immortalisé par l'objectif.", alt: "Paysage naturel de la Sarthe, photographie nature par Céline Debarieux, Le Mans." },
  { id: 13, src: '/assets/sample3.jpg', caption: "L'art de capturer l'essence du moment, une signature visuelle unique au Mans.", alt: "Photographie artistique signature, portfolio d'excellence par Céline Debarieux, Le Mans." }
];

export default function PerspectiveCarousel() {
  const [items, setItems] = useState(initialItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0: initial, 1: next, -1: prev
  const intervalRef = useRef(null); // Pour stocker la référence de l'intervalle

  const AUTOPLAY_DELAY = 5000; // Augmenté à 5 secondes

  // Gérer la navigation en boucle
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    resetAutoplay(); // Réinitialise le timer après navigation manuelle
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    resetAutoplay(); // Réinitialise le timer après navigation manuelle
  };

  // Fonction pour démarrer l'autoplay
  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1); // Simule un clic sur "suivant"
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, AUTOPLAY_DELAY);
  };

  // Fonction pour réinitialiser l'autoplay (après interaction manuelle)
  const resetAutoplay = () => {
    if (items.length > 1) { // Ne pas redémarrer si une seule image ou si pas d'items
        startAutoplay();
    }
  };

  useEffect(() => {
    if (items.length > 1) { // Démarrer l'autoplay seulement s'il y a plus d'une image
      startAutoplay();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current); // Nettoyer l'intervalle au démontage
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [items.length]); // Dépendance items.length pour redémarrer si le nb d'images change. Ajout de la directive pour ESlint.

  // Préparer les images à afficher : centrale, précédente, suivante
  const getVisibleItems = () => {
    const N = items.length;
    if (N === 0) return [];

    const central = items[currentIndex];
    const prev = items[(currentIndex - 1 + N) % N];
    const next = items[(currentIndex + 1) % N];
    return { prev, central, next };
  };

  const visibleItems = getVisibleItems();

  const slideVariants = {
    enter: (direction) => ({
      zIndex: 0,
      x: direction > 0 ? '110%' : '-110%', // Augmenté pour plus de distance
      opacity: 0,
      scale: 0.6, // Diminué pour plus de perspective
      rotateY: direction > 0 ? -70 : 70 // Angle de rotation augmenté
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: { duration: 1.2, ease: "easeInOut" } // Durée augmentée
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '110%' : '-110%', // Augmenté pour plus de distance
      opacity: 0,
      scale: 0.6, // Diminué pour plus de perspective
      rotateY: direction < 0 ? 70 : -70, // Angle de rotation augmenté
      transition: { duration: 1.2, ease: "easeInOut" } // Remplacement par valeur standard pour compatibilité mobile
    }),
  };
  
  const captionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5, ease: "easeInOut" } }
  };

  if (items.length === 0) {
    return <div className="text-center py-10">Aucune image à afficher.</div>;
  }

  return (
    <section className="py-16 md:py-24 bg-beige-extralight overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-playfair text-center text-noir-profond mb-12 relative pb-3"
          initial={{ opacity:0, y: -20}} 
          whileInView={{ opacity:1, y:0}} 
          viewport={{ once: true, amount:0.5}}
          transition={{duration:0.7}}
        >
          Instants Précieux
          <span className="block w-20 h-0.5 bg-gold mx-auto mt-3 rounded-full"></span>
        </motion.h2>

        <div 
          className="relative h-[400px] md:h-[550px] flex items-center justify-center"
          style={{ perspective: '1000px' }} // Diminué pour accentuer la perspective
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex} // Important pour qu'AnimatePresence détecte le changement
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full absolute flex items-center justify-center"
            >
              <img 
                src={items[currentIndex].src}
                alt={items[currentIndex].alt}
                className="max-w-[70%] max-h-[80%] md:max-w-[60%] md:max-h-[90%] object-contain rounded-lg shadow-2xl transition-all duration-500 ease-in-out hover:scale-105"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 15px 30px -10px rgba(0,0,0,0.25)',
                  marginTop: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].includes(items[currentIndex].id) ? '-20px' : '0'
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Légende pour l'image centrale */}
          <motion.div 
            key={`caption-${currentIndex}`} // Clé unique pour l'animation de la légende
            className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-[15%] sm:left-[25%] md:left-1/2 transform -translate-x-1/2 p-2 sm:p-3 md:p-4 bg-gradient-to-t from-black/80 to-black/65 backdrop-blur-md rounded-lg text-left sm:text-center w-[75%] sm:w-[80%] md:w-auto md:max-w-3xl shadow-xl z-20"
            variants={captionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden" // Pour que la légende disparaisse avec l'image
            y={[4, 7, 8, 11, 12].includes(items[currentIndex].id) ? 15 : 0} // Décalage vertical conditionnel
          >
            <p className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base font-cormorant text-beige-light drop-shadow-md leading-tight pl-2 pr-1 sm:px-2 md:px-4 line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
              {items[currentIndex].caption}
            </p>
          </motion.div>
        </div>

        {/* Commandes de navigation */}
        {items.length > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-6">
            <button 
              onClick={handlePrev} 
              className="p-3 rounded-full bg-white/50 hover:bg-gold text-noir-profond hover:text-white transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-gold/70"
              aria-label="Image précédente"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <div className="text-sm font-lato text-noir-leger">
              {currentIndex + 1} / {items.length}
            </div>
            <button 
              onClick={handleNext} 
              className="p-3 rounded-full bg-white/50 hover:bg-gold text-noir-profond hover:text-white transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-gold/70"
              aria-label="Image suivante"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
