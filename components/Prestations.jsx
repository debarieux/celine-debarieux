import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline'; // Pour le CTA

const servicesData = [
  {
    id: 'portrait',
    title: "Portrait d'Art",
    subtitle: "Révélez votre essence unique",
    description: "Chaque portrait est une collaboration, une exploration artistique pour capturer votre personnalité et créer une image qui parle.",
    frontImage: '/assets/soleil.jpg',
    revealImage: '/assets/soleil.jpg',
    altText: "Portrait artistique saisissant sous une lumière dorée", 
    ctaText: "Découvrir les Séances Portrait"
  },
  {
    id: 'mariage',
    title: "Mariage d'Émotion",
    subtitle: "L'histoire de votre journée, en images",
    description: "Des préparatifs aux derniers éclats de rire, je saisis chaque instant précieux avec sensibilité et discrétion pour un récit photographique authentique.",
    frontImage: '/assets/mariage.jpg',
    revealImage: '/assets/mariage.jpg',
    altText: "Reportage photo d'un mariage rempli d'émotion", 
    ctaText: "Voir les Reportages Mariage"
  },
  {
    id: 'corporate',
    title: "Signature Corporate",
    subtitle: "Valorisez votre image de marque",
    description: "Portraits professionnels, reportages d'entreprise, photographies de produits... Des visuels percutants pour affirmer votre identité et votre savoir-faire.",
    frontImage: '/assets/Thanou.jpg',
    revealImage: '/assets/Thanou.jpg',
    altText: "Photographie corporate professionnelle et impactante", 
    ctaText: "Explorer les Services Pro"
  }
];

// Variants pour Framer Motion
const cardVariants = {
  rest: {
    y: 0,
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)' // Equivalent à shadow-xl de Tailwind
  },
  hover: {
    y: -10, // Soulèvement plus prononcé
    boxShadow: '0 25px 50px -12px rgba(212, 197, 137, 0.35), 0 15px 30px -10px rgba(212, 197, 137, 0.2)', // Ombre dorée plus marquée
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
};

const frontContentVariants = {
  rest: { opacity: 1 },
  hover: { opacity: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

const frontImageVariants = {
  rest: { opacity: 0.25 }, // Opacité initiale de l'image de fond
  hover: { opacity: 0.1, transition: { duration: 0.4, ease: "easeOut" } } // Devient plus subtile au survol
};

const revealOverlayVariants = {
  rest: { opacity: 0, y: "30%" }, // Commence plus bas et invisible
  hover: {
    opacity: 1,
    y: "0%",
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1], 
      staggerChildren: 0.15 // Délai pour les enfants (description, bouton)
    }
  }
};

const revealImageUnderlayVariants = {
  rest: { filter: 'brightness(0.6)' },
  hover: { filter: 'brightness(0.85)', transition: { duration: 0.7, ease: "easeOut" } }
};

const revealTextContentVariants = {
  rest: { opacity: 0, y: 20 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const PrestationCard = ({ service }) => {
  return (
    <motion.div
      className="relative aspect-[3/4] md:aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-noir-dark"
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
    >
      {/* Image de fond pour le contenu initial (frontImage) */}
      <motion.div 
        className='absolute inset-0 w-full h-full pointer-events-none'
        variants={frontImageVariants}
      >
        <Image
          src={service.frontImage}
          alt=""
          fill
          className='object-cover'
          aria-hidden="true"
        />
      </motion.div>

      {/* Contenu initial visible (titre, sous-titre) */}
      <motion.div 
        className='absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-t from-noir/70 via-noir/40 to-transparent pointer-events-none'
        variants={frontContentVariants}
      >
        <h3 className='font-playfair text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-beige-light mb-1 md:mb-2 px-1'>{service.title}</h3>
        <p className='font-cormorant text-xs sm:text-sm md:text-base lg:text-lg text-beige-light/90 italic px-2'>{service.subtitle}</p>
      </motion.div>

      {/* Contenu révélé au survol */}
      <motion.div 
        className='absolute inset-0 z-20 flex flex-col items-center justify-end p-6 pb-8 md:p-8 md:pb-10 text-center'
        variants={revealOverlayVariants}
      >
        {/* Image principale révélée (revealImage) comme fond de cette div */}
        <motion.div 
          className='absolute inset-0 w-full h-full -z-10'
          variants={revealImageUnderlayVariants}
        >
          <Image
            src={service.revealImage}
            alt={service.altText}
            fill
            className='object-cover'
            style={{ objectPosition: 'center 70%' }}
          />
        </motion.div>
        {/* Gradient pour la lisibilité du texte sur l'image révélée */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-noir/95 via-noir/70 to-transparent -z-[5] pointer-events-none"></div>

        <motion.p 
          className='font-cormorant text-xs sm:text-sm md:text-base text-beige-light mb-3 sm:mb-4 md:mb-6 max-w-md mx-auto px-1 sm:px-0'
          variants={revealTextContentVariants}
        >
          {service.description}
        </motion.p>
        <motion.button 
          className='bg-gold hover:bg-gold-dark focus-visible:bg-gold-dark text-noir font-montserrat font-semibold py-2 px-5 sm:py-2.5 sm:px-7 md:py-3 md:px-8 rounded-full shadow-lg hover:shadow-gold/30 focus-visible:shadow-gold/30 transition-all duration-300 ease-in-out flex items-center space-x-1.5 sm:space-x-2.5 text-sm sm:text-base'
          variants={revealTextContentVariants}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{service.ctaText}</span>
          <ArrowRightIcon className='w-5 h-5'/>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default function Prestations() {
  return (
    <section className="py-16 sm:py-20 md:py-32 bg-beige-lightest overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center mb-12 sm:mb-16 md:mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-6xl font-extrabold text-noir mb-3 sm:mb-4 px-1 sm:px-0 mx-auto leading-tight">
            L'Art de Sublimer <span className="gold-shimmer-reverse">Vos Instants</span>
          </h2>
          <p className="font-cormorant text-base sm:text-lg md:text-xl text-noir-light max-w-3xl mx-auto leading-relaxed px-3 sm:px-6 md:px-0">
            Chaque prestation est une promesse : celle d'une écoute attentive, d'une vision artistique et d'un savoir-faire d'exception pour immortaliser ce qui vous est cher.
          </p>
          <span className="block w-24 h-1 bg-gold mx-auto mt-8 rounded-full"></span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8 md:gap-10 lg:gap-12 px-1 sm:px-2 md:px-0 mx-auto">
          {servicesData.map((service) => (
            <PrestationCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
