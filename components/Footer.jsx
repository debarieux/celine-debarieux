import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

// Un composant décoratif pour le séparateur élégant
const Separator = () => (
  <div className="flex items-center justify-center w-full my-6">
    <span className="h-px w-full max-w-[40px] bg-gold opacity-30"></span>
    <span className="mx-3 text-gold opacity-70 text-xs">&#9679;</span>
    <span className="h-px w-full max-w-[80px] bg-gold opacity-60"></span>
    <span className="mx-3 text-gold opacity-90 text-xs">&#9679;</span>
    <span className="h-px w-full max-w-[40px] bg-gold opacity-30"></span>
  </div>
);

// Animation subtile pour les liens sociaux
const SocialLink = ({ href, icon: Icon, label }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="relative group p-2"
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <Icon className="text-noir-light group-hover:text-gold transition-colors duration-300" size={16} />
      <motion.span 
        className="absolute inset-0 rounded-full border border-gold/0 group-hover:border-gold/40 -z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.a>
  );
};

const Footer = () => {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      }
    }
  };
  
  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  return (
    <footer className="bg-beige relative overflow-hidden" aria-labelledby="footer-heading">
      {/* Dégradé séparateur prononcé */}
      <div className="h-8 w-full bg-gradient-to-b from-beige-light via-beige to-beige relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
        <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-beige via-gold/30 to-beige"></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-10 py-16">
        <motion.div
          className="text-center mb-14 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div 
            variants={fadeInUp} 
            className="mb-8 inline-block relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold/50 shadow-gold"
          >
            <Image
              src="/assets/logo1.jpg"
              alt="Céline Debarieux"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-gold/10 to-transparent" 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </motion.div>
          
          <Separator />
          
          <motion.div variants={fadeInUp} className="flex justify-center space-x-6 mb-8">
            <SocialLink href="https://instagram.com" icon={FaInstagram} label="Instagram" />
            <SocialLink href="https://facebook.com" icon={FaFacebookF} label="Facebook" />
            <SocialLink href="https://twitter.com" icon={RiTwitterXFill} label="Twitter" />
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-2xl mx-auto text-center md:text-left">
            <motion.div variants={fadeInUp} className="space-y-2">
              <p className="font-cormorant text-sm italic text-noir/80">Photographe professionnelle</p>
              <p className="font-montserrat text-xs text-noir-light">Le Mans, France</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-2">
              <a 
                href="mailto:contact@celinedebarieux.com" 
                className="font-cormorant text-sm italic text-noir/80 hover:text-gold transition-colors"
              >
                contact@celinedebarieux.com
              </a>
              <p className="font-montserrat text-xs text-noir-light">+33 (0)6 XX XX XX XX</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="text-center opacity-70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7, transition: { delay: 0.8, duration: 0.6 } }}
          viewport={{ once: true }}
        >
          <p className="font-montserrat text-[10px] tracking-wider text-noir-light/60">
            &copy; {new Date().getFullYear()} Céline Debarieux. Tous droits réservés.
          </p>
        </motion.div>
      </div>
      
      {/* Élément décoratif subtil */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-1/4 w-px h-12 bg-gradient-to-b from-transparent via-gold to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-20 bg-gradient-to-b from-transparent via-gold to-transparent"></div>
      </div>
    </footer>
  );
};

export default Footer;
