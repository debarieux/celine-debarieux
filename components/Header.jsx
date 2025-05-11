import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Effet pour du00e9tecter le du00e9filement
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation pour l'apparition du header
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 50,
        damping: 15,
        mass: 1
      } 
    },
  };

  // Animation pour le logo
  const logoVariants = {
    normal: { scale: 1 },
    hover: { 
      scale: 1.05,
      filter: 'drop-shadow(0 0 8px rgba(194, 178, 128, 0.7))',
      transition: { 
        duration: 0.5,
        yoyo: Infinity,
        ease: 'easeInOut' 
      } 
    }
  };

  // Animation pour les liens de navigation
  const navLinkVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1 + 0.2,
        duration: 0.5,
        ease: "easeInOut"
      }
    }),
    hover: {
      scale: 1.05,
      color: '#C2B280',
      textShadow: '0 0 5px rgba(194, 178, 128, 0.5)',
      borderBottom: '2px solid #C2B280',
      transition: { 
        duration: 0.3, 
        borderBottom: { 
          type: 'spring', 
          stiffness: 500, 
          damping: 20 
        }
      }
    }
  };

  // Animation pour le menu mobile
  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 20,
        when: 'beforeChildren',
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Animation pour les liens du menu mobile
  const mobileLinkVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <>
      <motion.header 
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-beige/95 backdrop-blur-sm shadow-gold py-3' : 'bg-transparent py-6'}`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" legacyBehavior passHref aria-label="Cu00e9line Debarieux, page d'accueil">
            <motion.a 
              variants={logoVariants}
              initial="normal"
              whileHover="hover"
              className="relative overflow-hidden rounded-full bg-white p-1 shadow-gold cursor-pointer block"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold">
                <img 
                  src="/assets/logo1.jpg" 
                  alt="Logo Cu00e9line Debarieux Photographie" 
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={(e) => {
                    console.log('Erreur de chargement du logo');
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150/C2B280/FFFFFF/?text=CD';
                  }}
                />
              </div>
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(194,178,128,0.4) 0%, rgba(194,178,128,0) 70%)',
                }}
              />
            </motion.a>
          </Link>
          
          {/* Navigation Desktop */}
          <nav className="hidden md:flex justify-center items-center space-x-8">
            {[
              { path: '/', label: 'Accueil' },
              { path: '/prestations', label: 'Prestations' },
              { path: '/a-propos', label: 'À Propos' },
              { path: '/contact', label: 'Contact' }
            ].map((link, i) => (
              <motion.div key={link.path} custom={i} variants={navLinkVariants} initial="hidden" animate="visible">
                <Link href={link.path} legacyBehavior passHref>
                  <motion.a 
                    variants={navLinkVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                    className={`text-lg font-cormorant tracking-wide ${router.pathname === link.path ? 'text-gold font-semibold' : 'text-noir hover:text-gold'} transition-all duration-300 cursor-pointer relative overflow-hidden pb-1`}
                  >
                    {link.label}
                    {router.pathname === link.path && (
                      <div>
                        <motion.span 
                          layoutId="navIndicator" 
                          className="block h-0.5 mt-1 bg-gold" 
                          initial={{ width: 0, x: '-100%' }}
                          animate={{ width: '100%', x: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                        <motion.span 
                          className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-light opacity-40"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        />
                      </div>
                    )}
                  </motion.a>
                </Link>
              </motion.div>
            ))}
          </nav>
          
          {/* Menu Burger (Mobile) */}
          <div className="md:hidden">
            <motion.button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-noir z-50 relative"
              whileTap={{ scale: 0.95 }}
              aria-label="Menu"
            >
              <div className="w-8 flex flex-col items-center justify-center overflow-hidden">
                <motion.span 
                  className={`block h-0.5 w-8 bg-noir-light mb-1.5 transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
                />
                <motion.span 
                  className={`block h-0.5 w-8 bg-noir-light transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                />
                <motion.span 
                  className={`block h-0.5 w-8 bg-noir-light mt-1.5 transform transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Menu Mobile (Overlay) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-beige/95 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div 
              className="flex flex-col justify-center h-full max-w-sm mx-auto px-8"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={(e) => e.stopPropagation()}
            >
              {[
                { path: '/', label: 'Accueil' },
                { path: '/prestations', label: 'Prestations' },
                { path: '/a-propos', label: 'À Propos' },
                { path: '/contact', label: 'Contact' }
              ].map((link) => (
                <motion.div key={link.path} variants={mobileLinkVariants} className="mb-6">
                  <Link href={link.path} legacyBehavior passHref>
                    <motion.a 
                      className={`block text-center text-2xl font-playfair relative ${router.pathname === link.path ? 'text-gold font-semibold' : 'text-noir'}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      whileHover={{ x: 5, color: '#C2B280' }}
                      whileTap={{ scale: 0.98 }}
                      initial={{opacity: 0, y: 20}}
                      animate={{opacity: 1, y: 0}}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                    >
                      <span className="relative z-10">{link.label}</span>
                    </motion.a>
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                className="flex justify-center mt-12 space-x-6"
                variants={mobileLinkVariants}
              >
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <motion.svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    whileHover={{ scale: 1.1, color: '#C2B280' }}
                    className="text-noir"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/>
                  </motion.svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <motion.svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    whileHover={{ scale: 1.1, color: '#C2B280' }}
                    className="text-noir"
                  >
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" fill="currentColor"/>
                  </motion.svg>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
