import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function MaVision() {
  const [ref, inView] = useInView({
    triggerOnce: false, // L'animation peut se redéclancher si on scroll de nouveau
    threshold: 0.2,   // Déclenchement quand 20% de l'élément est visible
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
    // Si vous voulez que l'animation se réinitialise en quittant la vue :
    // else { setIsVisible(false); }
  }, [inView]);

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut', delay: 0.2 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut', delay: 0.4 } },
  };

  return (
    <section 
      ref={ref} 
      className="py-20 px-6 md:px-10 bg-white text-noir-profond" // Fond blanc pour un contraste élégant
      id="ma-vision"
      aria-labelledby="ma-vision-title"
    >
      <div className="max-w-4xl mx-auto">
        {/* Titre et Sous-titre */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            id="ma-vision-title"
            className="text-4xl md:text-5xl font-playfair mb-4 text-noir-profond relative inline-block"
            variants={titleVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            Ma Vision
            <span className="block w-2/3 h-0.5 bg-gold mx-auto mt-3 rounded-full"></span>
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl font-lato text-noir-leger italic max-w-2xl mx-auto"
            variants={subtitleVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            Photographe professionnelle au Mans : une approche sensible et lumineuse
          </motion.p>
        </div>

        {/* Contenu Textuel */}
        <motion.div 
          className="space-y-6 font-lato text-lg text-noir-leger leading-relaxed text-left md:text-justify"
          variants={textVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <p>
            Ma démarche photographique repose sur une conviction simple : une belle image ne se limite pas à une composition réussie, elle raconte une histoire, capture une émotion, révèle une personnalité. Photographe professionnelle au Mans, je mets mon regard et ma sensibilité au service de ceux qui souhaitent des clichés sincères, esthétiques et intemporels.
          </p>
          <p>
            Chaque séance photo est pensée comme une rencontre. Que ce soit pour un portrait, un reportage événementiel, un mariage ou un projet artistique, je prends le temps de comprendre votre univers afin de créer des images qui vous ressemblent. J’accorde une importance particulière à la lumière naturelle, à l’authenticité des instants et à la subtilité des gestes. C’est dans ces détails que se cache la force d’une photographie.
          </p>
          <p>
            Mon objectif : capturer des instants vrais, des regards profonds, des émotions brutes, pour vous offrir une galerie d’images uniques, entre élégance, émotion et naturel. Que vous soyez un particulier ou un professionnel, je vous accompagne dans la création de souvenirs forts et de visuels qui marquent.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
