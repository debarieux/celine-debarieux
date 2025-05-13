import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: false, // Remis à false pour un test normal
    threshold: 0.25,
  });
  
  const [isVisible, setIsVisible] = useState(false); // Restauré à false
  
  useEffect(() => { // Restauré
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);
  
  return (
    <section 
      ref={ref} // ref pour react-intersection-observer
      className="py-20 px-6 md:px-10 bg-beige-light relative overflow-hidden" 
      id="about"
      aria-label="à propos de Céline Debarieux, photographe d'exception au Mans"
      itemScope 
      itemType="https://schema.org/Person"
    >
      {/* Décoration d'arrière-plan */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-gold/10 to-gold/5 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-gold/10 to-transparent blur-3xl"></div>
      
      <div className="max-w-5xl mx-auto">
        {/* En-tête de section avec ligne décorative */}
        <div className="flex items-center justify-center mb-16">
          <div className="h-px w-12 bg-gold/40"></div>
          <motion.h2 
            className="text-3xl md:text-4xl font-playfair font-medium px-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            itemProp="name"
          >
            <span className="relative inline-block">
              <span className="relative z-10 text-noir"
                style={{ textShadow: '0 1px 0 rgba(194, 178, 128, 0.3)' }}
              >
                À Propos <span className="text-gold">Céline Debarieux</span>
              </span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gold/20 rounded-full"></span>
            </span>
          </motion.h2>
          <div className="h-px w-12 bg-gold/40"></div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-14 lg:gap-20">
          {/* Colonne gauche - Portrait */}
          <div className="relative w-64 md:w-72 lg:w-80 aspect-[3/4]">
            <img 
              src="/assets/femme-chapeau.jpg"
              alt="Céline Debarieux, photographe d'exception au Mans"
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
              itemProp="image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60 rounded-lg"></div>
            <motion.div 
              className="absolute -bottom-4 -right-4 bg-beige-light rounded-lg p-3 shadow-md"
              style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1), 0 0 0 1px rgba(194, 178, 128, 0.1)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="text-sm font-cormorant italic text-noir-light">
                <span className="text-gold">"</span> L'art de capturer la beauté <span className="text-gold">"</span>
              </div>
            </motion.div>
          </div>
          
          {/* Colonne droite - Texte */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
            className="w-full md:w-3/5 space-y-6"
            itemProp="description"
          >
            <p className="text-lg md:text-xl leading-relaxed text-noir" itemProp="knowsAbout">
              Passionnée par l'art de <span className="text-gold font-medium">capturer l'instant</span>, je mets mon expertise au service de vos plus beaux souvenirs. <span className="italic">Photographe d'exception au Mans</span>, je propose des prestations haut de gamme pour particuliers et entreprises, dans un style élégant, naturel et intemporel.
            </p>
            
            <p className="text-base md:text-lg leading-relaxed text-noir-light">
              Mon approche privilégie la <span className="font-medium">lumière naturelle</span>, la spontanéité et l'émotion, pour des images authentiques et raffinées. Chaque séance est une expérience sur-mesure, pensée pour révéler votre personnalité et sublimer vos moments précieux.
            </p>
            
            <div className="pt-2">
              <p className="text-base md:text-lg leading-relaxed text-noir-light">
                Spécialisée dans <span className="italic">les portraits d'exception</span> et les <span className="italic">reportages sur-mesure</span>, j'accompagne mes clients avec attention et bienveillance pour créer ensemble des souvenirs visuels qui traverseront le temps.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-6 mt-2">
              <h3 className="w-full text-lg font-medium text-noir mb-3">Mes spécialités</h3>
              <motion.span 
                className="px-6 py-2.5 rounded-full bg-gold/30 text-noir text-base font-semibold border border-gold/50"
                style={{ boxShadow: '0 2px 10px rgba(194, 178, 128, 0.2)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.4 }}
                whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(194, 178, 128, 0.25)' }}
              >
                <span className="text-gold">✧</span> <span style={{ letterSpacing: '0.02em' }}>Portraits d'exception</span>
              </motion.span>
              <motion.span 
                className="px-6 py-2.5 rounded-full bg-gold/30 text-noir text-base font-semibold border border-gold/50"
                style={{ boxShadow: '0 2px 10px rgba(194, 178, 128, 0.2)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.4 }}
                whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(194, 178, 128, 0.25)' }}
              >
                <span className="text-gold">✧</span> <span style={{ letterSpacing: '0.02em' }}>Reportages sur-mesure</span>
              </motion.span>
              <motion.span 
                className="px-6 py-2.5 rounded-full bg-gold/30 text-noir text-base font-semibold border border-gold/50"
                style={{ boxShadow: '0 2px 10px rgba(194, 178, 128, 0.2)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.4 }}
                whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(194, 178, 128, 0.25)' }}
              >
                <span className="text-gold">✧</span> <span style={{ letterSpacing: '0.02em' }}>Événements</span>
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
