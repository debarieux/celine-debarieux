import React, { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Les icônes pour chaque prestation
const ServiceIcon = ({ type }) => {
  // Icônes SVG détaillées et facilement identifiables
  const renderIcon = () => {
    switch(type) {
      case 'mariage':
        return (
          <svg className="w-12 h-12 md:w-16 md:h-16 text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Alliance de mariage */}
            <circle cx="32" cy="26" r="12" fill="none" strokeWidth="2" />
            <circle cx="32" cy="26" r="16" fill="none" strokeWidth="2" />
            <path d="M22 40 C 22 48, 42 48, 42 40" strokeWidth="2" />
            <path d="M16 46 C 16 56, 48 56, 48 46" strokeWidth="2" />
          </svg>
        );
      case 'naissance':
        return (
          <svg className="w-12 h-12 md:w-16 md:h-16 text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Bébé dans un couffin */}
            <ellipse cx="32" cy="38" rx="20" ry="10" fill="none" strokeWidth="2" />
            <path d="M12 38 C 12 20, 52 20, 52 38" strokeWidth="2" />
            <circle cx="32" cy="28" r="8" fill="none" strokeWidth="2" />
            <path d="M30 27 Q 32 29 34 27" strokeWidth="1.5" />
          </svg>
        );
      case 'grossesse':
        return (
          <svg className="w-12 h-12 md:w-16 md:h-16 text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Silhouette de femme enceinte */}
            <circle cx="32" cy="14" r="6" fill="none" strokeWidth="2" />
            <path d="M32 20 L 32 28" strokeWidth="2" />
            <path d="M32 28 Q 25 28 25 36 Q 25 44 32 48 Q 39 44 39 36 Q 39 28 32 28" strokeWidth="2" />
            <path d="M25 48 L 25 58" strokeWidth="2" />
            <path d="M39 48 L 39 58" strokeWidth="2" />
          </svg>
        );
      case 'famille':
        return (
          <svg className="w-12 h-12 md:w-16 md:h-16 text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Groupe familial */}
            <circle cx="32" cy="12" r="6" fill="none" strokeWidth="2" />
            <circle cx="18" cy="16" r="5" fill="none" strokeWidth="2" />
            <circle cx="46" cy="16" r="5" fill="none" strokeWidth="2" />
            <circle cx="25" cy="22" r="3" fill="none" strokeWidth="2" />
            <circle cx="39" cy="22" r="3" fill="none" strokeWidth="2" />
            <path d="M32 18 L 32 40" strokeWidth="2" />
            <path d="M18 21 L 18 40" strokeWidth="2" />
            <path d="M46 21 L 46 40" strokeWidth="2" />
            <path d="M25 25 L 25 36" strokeWidth="2" />
            <path d="M39 25 L 39 36" strokeWidth="2" />
            <path d="M18 40 L 46 40" strokeWidth="2" />
          </svg>
        );
      case 'couple':
      case 'emotions':
        return (
          <svg className="w-12 h-12 md:w-16 md:h-16 text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Deux coeurs enlacés */}
            <path d="M20 20 Q 12 20 12 28 Q 12 36 25 45 L 32 50 L 39 45 Q 52 36 52 28 Q 52 20 44 20 Q 38 20 32 28 Q 26 20 20 20 Z" fill="none" strokeWidth="2" />
          </svg>
        );
      case 'portrait':
        return (
          <svg className="w-12 h-12 md:w-16 md:h-16 text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Cadre photo avec portrait */}
            <rect x="14" y="12" width="36" height="40" rx="1" fill="none" strokeWidth="2" />
            <rect x="18" y="16" width="28" height="32" rx="1" fill="none" strokeWidth="2" />
            <circle cx="32" cy="26" r="6" fill="none" strokeWidth="2" />
            <path d="M24 42 Q 32 38 40 42" strokeWidth="2" />
          </svg>
        );
      case 'evenements':
        return (
          <svg className="w-12 h-12 md:w-16 md:h-16 text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Un appareil photo avec flash */}
            <rect x="12" y="22" width="40" height="24" rx="2" fill="none" strokeWidth="2" />
            <circle cx="32" cy="34" r="8" fill="none" strokeWidth="2" />
            <rect x="24" y="16" width="16" height="6" rx="1" fill="none" strokeWidth="2" />
            <path d="M48 28 L 52 24 L 52 30 L 48 26" strokeWidth="2" />
          </svg>
        );
      case 'mini':
        return (
          <svg className="w-12 h-12 md:w-16 md:h-16 text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Un petit arbre en fleur */}
            <path d="M32 46 L 32 58" strokeWidth="2" />
            <path d="M32 46 Q 25 46 22 40 Q 19 34 25 30 Q 22 25 26 20 Q 30 15 32 20 Q 34 15 38 20 Q 42 25 39 30 Q 45 34 42 40 Q 39 46 32 46 Z" fill="none" strokeWidth="2" />
            <circle cx="28" cy="26" r="2" fill="currentColor" />
            <circle cx="36" cy="24" r="2" fill="currentColor" />
            <circle cx="32" cy="36" r="2" fill="currentColor" />
          </svg>
        );
      case 'entreprise':
        return (
          <svg className="w-12 h-12 md:w-16 md:h-16 text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Immeuble de bureaux */}
            <rect x="14" y="14" width="36" height="40" fill="none" strokeWidth="2" />
            <rect x="22" y="14" width="20" height="40" fill="none" strokeWidth="2" />
            <path d="M14 26 L 50 26" strokeWidth="2" />
            <path d="M14 38 L 50 38" strokeWidth="2" />
            <path d="M22 14 L 22 54" strokeWidth="2" />
            <path d="M42 14 L 42 54" strokeWidth="2" />
            <rect x="30" y="46" width="4" height="8" fill="none" strokeWidth="2" />
          </svg>
        );
      case 'inclus':
        return (
          <svg className="w-12 h-12 md:w-16 md:h-16 text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Étoile premium */}
            <path d="M32 12 L 38 24 L 52 26 L 42 36 L 44 48 L 32 42 L 20 48 L 22 36 L 12 26 L 26 24 Z" fill="none" strokeWidth="2" />
            <path d="M28 28 L 32 32 L 40 24" strokeWidth="2" />
          </svg>
        );
      default:
        return (
          <svg className="w-12 h-12 md:w-16 md:h-16 text-gold" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Appareil photo */}
            <rect x="12" y="18" width="40" height="30" rx="2" fill="none" strokeWidth="2" />
            <circle cx="32" cy="33" r="10" fill="none" strokeWidth="2" />
            <circle cx="32" cy="33" r="5" fill="none" strokeWidth="2" />
            <path d="M24 18 L 28 12 L 36 12 L 40 18" strokeWidth="2" />
            <circle cx="44" cy="24" r="2" fill="currentColor" />
          </svg>
        );
    }
  };
  
  return (
    <div className="flex justify-center items-center mb-6">
      <div className="p-3 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20">
        {renderIcon()}
      </div>
    </div>
  );
};

// Composant pour une formule spécifique
const FormuleCard = ({ title, price, features, highlighted = false, delay = 0, isUnique = false }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: delay
      }
    }
  };

  // Pour les formules uniques, ajouter plus d'u00e9lu00e9gance
  const uniqueClass = isUnique ? 'max-w-lg mx-auto border-gold/60 shadow-lg shadow-gold/10' : '';

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className={`${highlighted ? 'border-gold border-2 shadow-lg shadow-gold/20' : 'border border-beige/40'} 
                  ${uniqueClass}
                  rounded-xl overflow-hidden transition-all duration-300 
                  h-full flex flex-col bg-gradient-to-b ${highlighted ? 'from-noir/90 to-noir-dark' : 'from-noir/80 to-noir-dark/80'}
                  hover:shadow-xl hover:shadow-gold/20`}
    >
      <div className={`px-6 py-5 border-b ${highlighted || isUnique ? 'border-gold/50 bg-gradient-to-r from-gold/10 to-transparent' : 'border-beige/20'}`}>
        <h3 className="font-playfair text-2xl font-bold text-beige-light">{title}</h3>
        <div className="font-cormorant text-xl sm:text-2xl font-semibold mt-1.5 text-gold">{price}</div>
      </div>
      <ul className="flex-grow px-6 py-5 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="font-montserrat text-sm md:text-base text-beige flex items-start">
            <span className="text-gold mr-2.5 font-bold">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      {/* Ajout d'un effet du00e9coratif subtil sur les cartes uniques */}
      {isUnique && (
        <div className="absolute -right-3 -bottom-3 w-16 h-16 opacity-10 rotate-12 hidden md:block">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.5 9H22L16 13.5L18 21L12 17L6 21L8 13.5L2 9H9.5L12 2Z" fill="#d4c589" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

// Composant pour une section de service avec ses formules
const ServiceSection = ({ id, title, description, icon, formules, reversed = false }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Déterminer la disposition en fonction du nombre de formules
  const getGridClass = () => {
    const count = formules.length;
    if (count === 1) {
      return "max-w-md mx-auto";
    } else if (count === 2) {
      return "grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8";
    } else {
      return "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8";
    }
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={`py-16 md:py-24 ${reversed ? 'bg-gradient-to-b from-beige-lightest to-beige-lightest/30' : 'bg-gradient-to-b from-transparent to-beige-lightest/20'}`}
    >
      <div className="container mx-auto px-4">
        <motion.div variants={textVariants} className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">
          <ServiceIcon type={icon} />
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-noir mb-3 md:mb-4">{title}</h2>
          <p className="font-cormorant text-lg md:text-xl text-noir-light leading-relaxed">{description}</p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6"></div>
        </motion.div>

        <div className={getGridClass()}>
          {formules.map((formule, index) => (
            <FormuleCard
              key={formule.title}
              title={formule.title}
              price={formule.price}
              features={formule.features}
              highlighted={formule.highlighted}
              delay={index * 0.1}
              isUnique={formules.length === 1}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Animation pour l'en-tête
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function Prestations() {
  // Données des prestations
  const prestationsData = [
    {
      id: 'mariage',
      title: 'Mariage',
      description: 'Une couverture authentique de votre journée, dans la discrétion et la sensibilité.',
      icon: 'mariage',
      formules: [
        {
          title: 'Formule Essentielle',
          price: '650 €',
          features: [
            '4h de reportage (cérémonie, couple, groupes)',
            '80 à 120 photos HD retouchées',
            'Galerie privée en ligne',
            'Clé USB offerte'
          ]
        },
        {
          title: 'Formule Journée Complète',
          price: '1 100 €',
          features: [
            '10h de présence (préparatifs → ouverture du bal)',
            '250 à 400 photos retouchées',
            'Galerie privée + clé USB + coffret photo',
            'RDV préparatoire inclus'
          ],
          highlighted: true
        },
        {
          title: 'Option',
          price: '+150 €',
          features: [
            'Séance engagement ou day after',
            'Durée supplémentaire sur demande',
            'Album photo premium disponible'
          ]
        }
      ]
    },
    {
      id: 'naissance',
      title: 'Naissance',
      description: 'Une séance douce et naturelle, dans le respect du rythme de bébé.',
      icon: 'naissance',
      formules: [
        {
          title: 'Formule Cocon',
          price: '180 €',
          features: [
            '1h à 1h30 de séance à domicile',
            '15 photos HD retouchées',
            'Galerie privée en ligne',
            'Accessoires et ambiance cocooning inclus'
          ],
          highlighted: true
        }
      ]
    },
    {
      id: 'grossesse',
      title: 'Grossesse / Maternité',
      description: 'Sublimer l\'attente et la beauté de cette période unique.',
      icon: 'grossesse',
      formules: [
        {
          title: 'Formule Douceur',
          price: '150 €',
          features: [
            'Séance en extérieur ou à domicile',
            '10 photos HD retouchées',
            'Prêt de tenues et accessoires possible',
            'Conseils de poses'
          ],
          highlighted: true
        }
      ]
    },
    {
      id: 'emotions',
      title: 'Émotions',
      description: 'Capturer les liens, les regards, l\'intimité d\'un couple.',
      icon: 'emotions',
      formules: [
        {
          title: 'Formule Émotions',
          price: '140 €',
          features: [
            '1h de séance en extérieur',
            '10 photos HD retouchées',
            'Accompagnement dans le choix du lieu et du style'
          ],
          highlighted: true
        }
      ]
    },
    {
      id: 'famille',
      title: 'Famille',
      description: 'Une séance vivante, complice et naturelle.',
      icon: 'famille',
      formules: [
        {
          title: 'Formule Sourires',
          price: '160 €',
          features: [
            '1h de séance à domicile ou en extérieur',
            'Jusqu\'à 5 personnes',
            '12 photos HD retouchées',
            'Galerie en ligne incluse',
            'Photos supplémentaires : +10 €/photo'
          ],
          highlighted: true
        }
      ]
    },
    {
      id: 'portrait',
      title: 'Portrait / Book individuel',
      description: 'Pour vous mettre en valeur avec naturel et confiance.',
      icon: 'portrait',
      formules: [
        {
          title: 'Formule Express',
          price: '90 €',
          features: [
            '30 minutes – en extérieur ou studio',
            '5 photos HD retouchées'
          ]
        },
        {
          title: 'Formule Signature',
          price: '150 €',
          features: [
            '1h – 2 ambiances, 2 tenues',
            '10 à 15 photos HD',
            'Accompagnement poses et style'
          ],
          highlighted: true
        }
      ]
    },
    {
      id: 'evenements',
      title: 'Événements privés',
      description: 'Reportage de vos moments forts, en toute discrétion.',
      icon: 'evenements',
      formules: [
        {
          title: 'Formule Événement',
          price: 'Sur devis, à partir de 200 €',
          features: [
            'Cérémonie, réception, moment de vie…',
            'Durée modulable selon votre programme',
            'Livraison HD, galerie en ligne sécurisée'
          ],
          highlighted: true
        }
      ]
    },
    {
      id: 'mini',
      title: 'Mini-séances à thème',
      description: 'Des formats courts et accessibles autour d\'un décor ou d\'une ambiance spécifique.',
      icon: 'mini',
      formules: [
        {
          title: 'Mini-Séance',
          price: 'À partir de 75 €',
          features: [
            '20 minutes de séance',
            '5 photos HD retouchées',
            'Idéal pour cadeaux, enfants, instants saisonniers'
          ],
          highlighted: true
        }
      ]
    },
    {
      id: 'entreprise',
      title: 'Entreprises & Professionnels',
      description: 'Mettez en valeur votre image, vos produits ou votre équipe.',
      icon: 'entreprise',
      formules: [
        {
          title: 'Portrait Corporate',
          price: 'À partir de 100 €',
          features: [
            'Portraits individuels ou d\'équipe',
            'Optimisés pour CV, LinkedIn, site web',
            'Conseil en image professionnelle'
          ]
        },
        {
          title: 'Reportage Entreprise',
          price: 'À partir de 250 €',
          features: [
            'Sur devis selon vos besoins',
            'Événements, locaux, produits',
            'Forfaits sur mesure'
          ],
          highlighted: true
        },
        {
          title: 'Shooting Contenu Digital',
          price: 'À partir de 250 €',
          features: [
            'Réseaux sociaux / site web',
            'Pack d\'images optimisées',
            'Conseil stratégie visuelle'
          ]
        }
      ]
    }
  ];

  // Inclusions standard pour toutes les formules
  const inclusionsStandard = {
    id: 'inclus',
    title: 'Inclus dans toutes les formules',
    description: 'Le service premium qui fait la différence, pour une expérience photographique complète.',
    icon: 'inclus',
    formules: [
      {
        title: 'Prestations de Base',
        price: 'Compris',
        features: [
          'Retouches naturelles & soignées',
          'Livraison en haute définition',
          'Galerie privée en ligne'
        ]
      },
      {
        title: 'Accompagnement',
        price: 'Compris',
        features: [
          'Conseils en amont de la séance',
          'Déplacement gratuit dans un rayon de 20 km autour du Mans',
          'Suivi personnalisé'
        ],
        highlighted: true
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-beige-lightest">
      <Head>
        <title>Prestations et Tarifs | Céline Debarieux Photographie</title>
        <meta name="description" content="Découvrez mes prestations et tarifs pour immortaliser vos plus beaux moments. Photographie professionnelle au Mans: mariages, portraits, familles, entreprises." />
        <link rel="canonical" href="https://celinedebarieux.fr/prestations" />
        <meta property="og:title" content="Prestations et Tarifs | Céline Debarieux Photographie" />
        <meta property="og:description" content="Des souvenirs uniques, pour chaque moment de vie. Photographe professionnelle au Mans proposant des services pour mariage, grossesse, famille, portrait et entreprise." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://celinedebarieux.fr/prestations" />
      </Head>

      <Header />

      <main className="flex-grow">
        <section className="py-20 md:py-32 bg-gradient-to-b from-noir to-noir-light relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/assets/prestations-bg.jpg"
              alt=""
              fill
              className="object-cover"
              aria-hidden="true"
              priority
            />
          </div>
          {/* Overlay avec un motif subtle pour plus d'élegance */}
          <div className="absolute inset-0 opacity-10 bg-[url('/assets/pattern-overlay.png')] bg-repeat"></div>
          
          {/* Décoration latérale */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-40 md:h-64 bg-gradient-to-b from-transparent via-gold/80 to-transparent hidden md:block"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-40 md:h-64 bg-gradient-to-b from-transparent via-gold/80 to-transparent hidden md:block"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="mb-5 md:mb-6">
                <div className="inline-block w-32 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mb-6"></div>
                <p className="font-cormorant text-lg md:text-xl text-gold/90 italic">Créatrice d'images intemporelles</p>
              </motion.div>
            
              <motion.h1 variants={fadeInUp} className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-beige mb-6 leading-tight">
                Prestations <span className="text-gold">&</span> Tarifs
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="font-cormorant text-xl md:text-2xl text-beige-light/90 mb-8 md:mb-10 leading-relaxed max-w-3xl mx-auto">
                Photographe professionnelle au Mans – Des souvenirs uniques, pour chaque moment de vie. Découvrez mes formules personnalisées pour immortaliser vos instants précieux.
              </motion.p>
              
              <motion.div variants={fadeInUp}>
                <a href="#mariage" className="inline-block bg-gold hover:bg-gold-dark focus-visible:bg-gold-dark text-noir font-montserrat font-semibold py-3.5 px-10 rounded-full shadow-lg hover:shadow-gold/40 focus-visible:shadow-gold/40 transition-all duration-300 ease-in-out transform hover:scale-105">
                  Découvrir mes formules
                </a>
              </motion.div>

              <motion.div 
                variants={fadeInUp} 
                className="hidden md:flex justify-center space-x-4 mt-12">
                {prestationsData.map(service => (
                  <a 
                    key={service.id} 
                    href={`#${service.id}`}
                    className="px-4 py-2 font-montserrat text-sm text-beige-light/80 hover:text-gold transition-colors duration-300 border-b-2 border-transparent hover:border-gold/40"
                  >
                    {service.title}
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Afficher chaque section de service */}
        {prestationsData.map((service, index) => (
          <ServiceSection
            key={service.id}
            id={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon}
            formules={service.formules}
            reversed={index % 2 !== 0}
          />
        ))}

        {/* Section des inclusions standard */}
        <ServiceSection
          id={inclusionsStandard.id}
          title={inclusionsStandard.title}
          description={inclusionsStandard.description}
          icon={inclusionsStandard.icon}
          formules={inclusionsStandard.formules}
          reversed={prestationsData.length % 2 === 0}
        />
        
        {/* Section d'appel à l'action */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-noir to-noir-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <Image
              src="/assets/contact-bg.jpg"
              alt=""
              fill
              className="object-cover object-center"
              aria-hidden="true"
            />
          </div>

          {/* Overlay avec motif luxueux */}
          <div className="absolute inset-0 bg-[url('/assets/pattern-overlay.png')] opacity-5"></div>
          
          {/* Éléments décoratifs */}
          <div className="absolute left-6 md:left-12 top-10 w-0.5 h-20 bg-gradient-to-b from-gold/60 to-transparent hidden md:block"></div>
          <div className="absolute right-6 md:right-12 bottom-10 w-0.5 h-20 bg-gradient-to-t from-gold/60 to-transparent hidden md:block"></div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl mx-auto"
            >
              <div className="mb-6">
                <span className="inline-block h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mb-6"></span>
                <p className="font-cormorant text-lg text-gold/90 italic">Réservez dès maintenant</p>
              </div>
              
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-beige mb-5 md:mb-6 leading-tight">
                <span className="text-gold">Prêt(e)</span> à capturer vos moments d'exception ?
              </h2>
              
              <p className="font-cormorant text-xl md:text-2xl text-beige-light mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
                Chaque instant mérite d'être immortalisé avec talent et sensibilité. Contactez-moi pour discuter de votre projet et créer ensemble des souvenirs intemporels.
              </p>
              
              <a 
                href="/contact" 
                className="inline-block bg-gold hover:bg-gold-dark focus-visible:bg-gold-dark text-noir font-montserrat font-semibold py-3.5 px-10 rounded-full shadow-lg hover:shadow-xl hover:shadow-gold/30 focus-visible:shadow-gold/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Prendre rendez-vous
              </a>
              
              <p className="mt-6 text-beige-light/70 font-montserrat text-sm">
                Sans engagement • Réponse rapide • Conseil personnalisé
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
