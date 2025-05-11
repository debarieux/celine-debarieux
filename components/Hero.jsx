import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import gsap from 'gsap';

import { useState } from 'react';

const Hero = () => {
  // Références pour les animations GSAP
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const sectionRef = useRef(null);

  // Contrôle du shimmer doré
  const [isShimmerActive, setShimmerActive] = useState(false);
  
  // Pour l'effet de parallaxe
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  // Utilisation de react-intersection-observer pour déclencher des animations
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.25,
  });

  // Animation GSAP avancée
  useEffect(() => {
    if (!titleRef.current) return;
    
    const tl = gsap.timeline({ paused: true });
    
    // Animation de l'overlay
    tl.fromTo(
      '.hero-overlay',
      { opacity: 0 },
      { opacity: 0.4, duration: 1.5, ease: 'power2.out' },
      0
    )
    
    // Animation scintillante de la bordure
    .fromTo(
      '.image-border',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
      0.3
    )
    
    // Animation du titre principal - uniquement l'apparition initiale
    .fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'back.out(1.7)' },
      0.4
    )
    
    // Animation des sous-titres
    .fromTo(
      '.subtitle-line',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
      0.7
    )
    
    // Animation du bouton
    .fromTo(
      '.hero-button',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      1.2
    );
    
    // Démarrer l'animation quand la section est visible
    if (inView) {
      tl.play();
      // Déclenche le shimmer après l'animation du titre
      setTimeout(() => setShimmerActive(true), 1400); // 1s anim GSAP + 0.4s délai
    } else {
      setShimmerActive(false);
      tl.progress(0).pause();
    }
    
    return () => {
      tl.kill();
    };
  }, [inView]);
  
  // Animation séquentielle lettre par lettre
  useEffect(() => {
    if (!titleRef.current) return;
    
    // Prépare le titre pour l'animation
    const titleElement = titleRef.current;
    const originalText = titleElement.textContent;
    titleElement.innerHTML = '';
    
    // Crée un span pour chaque lettre avec espacement légèrement ajusté
    [...originalText].forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.marginRight = char === ' ' ? '0.15em' : '-0.01em'; // Écart entre mots réduit
      span.style.color = '#C2B280'; // Couleur dorée par défaut
      span.className = 'title-letter'; // Classe pour cibler les lettres
      titleElement.appendChild(span);
    });
    
    // Récupère toutes les lettres
    const letters = titleElement.querySelectorAll('.title-letter');
    
    // Fonction pour animer les lettres séquentiellement
    const animateLetters = () => {
      // Animation séquentielle
      letters.forEach((letter, i) => {
        // Délai pour chaque lettre - délai plus court pour plus de fluidité
        setTimeout(() => {
          // Ajoute une transition initiale pour tout
          letter.style.transition = 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
          
          // 1. Illumination initiale avec intensité accrue
          letter.style.color = 'transparent';
          letter.style.textShadow = '0 0 12px rgba(214, 197, 137, 0.9)'; // Ombre plus intense
          letter.style.background = 'linear-gradient(90deg, #f0e6b3 0%, #C2B280 50%, #8e7f4e 100%)'; // Contraste plus fort
          letter.style.backgroundSize = '200% 100%';
          letter.style.backgroundPosition = '100% 0';
          letter.style.webkitBackgroundClip = 'text';
          letter.style.backgroundClip = 'text';
          letter.style.webkitTextFillColor = 'transparent';
          
          // 2. Déplacement du dégradé - transition fluide
          setTimeout(() => {
            letter.style.transition = 'background-position 1s cubic-bezier(0.25, 0.1, 0.25, 1)';
            letter.style.backgroundPosition = '0% 0';
            
            // 3. Retour à la couleur normale avec transition fluide
            setTimeout(() => {
              letter.style.transition = 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
              letter.style.color = '#C2B280';
              letter.style.background = 'none';
              letter.style.webkitTextFillColor = '#C2B280';
              letter.style.textShadow = '0 1px 0 #a69660';
              letter.style.backgroundClip = 'initial';
              letter.style.webkitBackgroundClip = 'initial';
            }, 1000); // Délai plus court pour plus de fluidité
          }, 100); // Délai plus court pour plus de fluidité
        }, i * 350); // Délai plus court entre les lettres pour une animation plus fluide
      });
    };
    
    // Lance l'animation initiale
    animateLetters();
    
    // Répète l'animation toutes les 21 secondes (11 secondes d'animation + 10 secondes de pause)
    const interval = setInterval(animateLetters, 21000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  

  return (
    <section 
      ref={(el) => { sectionRef.current = el; ref(el); }}
      className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8 lg:px-16 overflow-hidden bg-beige-light"
      itemScope
      itemType="https://schema.org/PhotographyBusiness"
      aria-label="Céline Debarieux - Photographe d'exception au Mans"
      id="accueil"
    >
      {/* Arrière-plan avec gradient animé */}
      <div className="absolute inset-0 bg-gradient-to-b from-beige-light via-beige to-beige-light opacity-80"></div>
      
      {/* Motif décoratif */}
      <div className="absolute inset-0 opacity-10" 
           style={{
             backgroundImage: 'url("/assets/pattern-luxury.png")',
             backgroundSize: '200px',
             mixBlendMode: 'multiply'
           }}></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* Colonne gauche - Image */}
        <div className="w-full md:w-5/12 lg:w-6/12 relative" ref={imageRef}>
          <motion.div 
            className="relative aspect-[4/5] overflow-hidden rounded-lg image-border"
            style={{ 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 30px rgba(194, 178, 128, 0.3)',
              border: '1px solid rgba(194, 178, 128, 0.3)',
              padding: '12px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 100%)'
            }}
          >
            <motion.div 
              className="absolute inset-0 rounded-lg overflow-hidden"
              style={{ scale: imageScale, opacity: imageOpacity }}
            >
              <img 
                src="/assets/complice.jpg" 
                alt="Portrait artistique par Céline Debarieux" 
                className="w-full h-full object-cover"
                loading="eager"
                onError={(e) => {
                  console.log('Erreur de chargement de l\'image hero');
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/800x1000/C2B280/FFFFFF/?text=Celine+Debarieux';
                }}
              />
              <div className="hero-overlay absolute inset-0 bg-gradient-to-t from-noir/40 to-transparent"></div>
            </motion.div>
            
            {/* Effet de bordure scintillante */}
            <motion.div 
              className="absolute inset-0 rounded-lg"
              animate={{ 
                boxShadow: ['0 0 0 rgba(194, 178, 128, 0)', '0 0 15px rgba(194, 178, 128, 0.5)', '0 0 0 rgba(194, 178, 128, 0)'] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: 'reverse',
                ease: 'easeInOut'
              }}
            />
          </motion.div>
          
          {/* Signature ou badge */}
          <motion.div 
            className="absolute -bottom-6 -right-6 bg-white rounded-full p-2 shadow-gold"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.5, duration: 0.7, ease: 'backOut' }}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-gold flex items-center justify-center bg-beige-light">
              <span className="text-gold text-xs font-playfair italic">Céline<br/>Debarieux</span>
            </div>
          </motion.div>
        </div>
        
        {/* Colonne droite - Texte */}
        <div className="w-full md:w-7/12 lg:w-6/12 text-center md:text-left space-y-6">
          <motion.h1 
            ref={titleRef}
            className="font-playfair text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-gold mb-4 md:mb-6 leading-tight gold-title" 
            style={{ textShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)', letterSpacing: '0.01em' }}
            itemProp="headline"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            L'Art du Portrait d'Exception
          </motion.h1>
          
          <motion.p className="subtitle-line leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}>
            <span>Céline Debarieux, </span>
            <strong className="text-noir" style={{ textShadow: '0 0.5px 0 #8e7f4e' }}>photographe d'exception au Mans</strong>
            <span>, sublime l'essence de votre histoire avec une sensibilité rare et un raffinement inégalé.</span>
          </motion.p>
          
          <motion.p className="subtitle-line leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }}>
            Offrez-vous l'expérience d'un <em className="font-medium" style={{ color: '#a69660' }}>portrait</em> ou d'un <em className="font-medium" style={{ color: '#a69660' }}>reportage sur-mesure</em>, où l'élégance rencontre l'émotion.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <Link href="/galerie" passHref>
              <motion.a 
                className="hero-button inline-block mt-8 px-10 py-4 bg-gold text-white font-playfair tracking-wider rounded-full shadow-gold golden-button"
                style={{
                  background: 'linear-gradient(135deg, #d4c589 0%, #C2B280 50%, #a69660 100%)',
                  boxShadow: '0 6px 20px rgba(166, 150, 96, 0.3), 0 2px 5px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
                  letterSpacing: '0.08em',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}
                whileHover={{ 
                  y: -3, 
                  boxShadow: '0 10px 25px rgba(194, 178, 128, 0.5), 0 2px 5px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
                  scale: 1.02
                }}
                whileTap={{ scale: 0.98 }}
                aria-label="Découvrir la galerie de photographie de Céline Debarieux"
                itemProp="url"
              >
                <span style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>Découvrir la Galerie</span>
              </motion.a>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Séparateur au bas de la section */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ 
          background: 'linear-gradient(to bottom, transparent, rgba(246, 241, 225, 1))'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />
      
      {/* Scroll indicator - Transformu00e9 en bouton cliquable */}
      <motion.div 
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
      >
        <button
          onClick={() => {
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-10 h-14 sm:w-12 sm:h-16 border-2 border-gold rounded-full flex flex-col items-center justify-center bg-transparent cursor-pointer hover:bg-gold/10 transition-all duration-300 focus:outline-none"
          style={{
            boxShadow: '0 4px 15px rgba(194, 178, 128, 0.2)'
          }}
          aria-label="Découvrir la section À propos"
        >
          <span className="text-gold text-xs font-medium mb-1.5 tracking-wide">Voir</span>
          <motion.div 
            className="w-1.5 h-3 bg-gold rounded-full"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
          />
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
