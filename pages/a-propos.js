import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SignatureMedaillon from '../components/SignatureMedaillon';

// Component pour l'accordéon de la FAQ
const FaqItem = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <div className="border border-beige/40 rounded-xl overflow-hidden transition-all duration-300 mb-4">
      <button 
        onClick={toggleOpen}
        className={`w-full py-5 px-6 flex items-center justify-between text-left transition-all ${isOpen ? 'bg-gradient-to-r from-gold/10 to-transparent' : 'hover:bg-beige-lightest/50'}`}
        aria-expanded={isOpen}
      >
        <h3 className="font-playfair text-xl text-noir font-medium pr-8">{question}</h3>
        <span className={`text-gold text-2xl transition-transform transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-6 pt-2 font-cormorant text-base md:text-lg text-noir-light leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

// Section composant réutilisable
const AboutSection = ({ id, title, content, image, reversed = false, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.25,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: delay
      }
    }
  };

  const contentOrder = reversed ? 'md:order-2' : '';
  const imageOrder = reversed ? 'md:order-1' : '';
  
  return (
    <section id={id} className="py-20 md:py-28 relative overflow-hidden">
      {/* Décoration d'arrière-plan */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute ${reversed ? '-bottom-20 -left-20' : '-top-20 -right-20'} w-72 h-72 rounded-full bg-gradient-to-br from-gold/10 to-gold/5 blur-3xl opacity-70`}></div>
        <div className={`absolute ${reversed ? 'top-10 right-10' : 'bottom-10 left-10'} w-48 h-48 rounded-full bg-gradient-to-tr from-gold/15 to-transparent blur-3xl opacity-70`}></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-4 relative z-10">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16 lg:gap-20 max-w-5xl mx-auto"
        >
          {/* Contenu texte */}
          <div className={`w-full md:w-1/2 ${contentOrder}`}>
            <h2 className="font-playfair text-3xl md:text-4xl text-noir mb-6 relative inline-block">
              {title}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold/30 rounded-full"></span>
            </h2>
            <div className="prose prose-lg text-noir-light font-cormorant max-w-none">
              {content}
            </div>
          </div>
          
          {/* Image */}
          <div className={`w-full md:w-1/2 ${imageOrder}`}>
            <div className="relative w-full aspect-[4/3] md:aspect-[3/4] rounded-lg overflow-hidden shadow-xl"
                style={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(212, 197, 137, 0.1)' }}>
              {image && (
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-noir/30 to-transparent opacity-50"></div>
              
              {/* Aucun médaillon sur les images secondaires */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function APropos() {
  // État pour l'accordéon FAQ
  const [openFaq, setOpenFaq] = useState(null);
  
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Données pour la FAQ
  const faqItems = [
    {
      question: "Est-ce que je peux réussir mes photos même si je ne suis pas photogénique ?",
      answer: "Bien sûr ! Il ne s'agit pas d'être photogénique, mais d'être vous-même. Mon rôle est de capturer votre authenticité, ensemble, on crée des souvenirs qui vous mettent en valeur, naturellement."
    },
    {
      question: "Peut-on se rencontrer avant une séance photo ?",
      answer: "Tout à fait ! Je privilégie les rencontres sur rendez-vous, pour vous offrir un moment d'échange privilégié. N'hésitez pas à me contacter pour qu'on fixe ensemble une date."
    },
    {
      question: "Proposez-vous des séances en extérieur ou uniquement en studio ?",
      answer: "Les deux sont possibles ! Que vous préfériez l'ambiance douce et maîtrisée du studio ou un cadre naturel en extérieur, je m'adapte à vos envies et au style que vous souhaitez. L'important, c'est de créer des images qui vous ressemblent."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-beige-lightest">
      <Head>
        <title>À Propos | Céline Debarieux Photographie</title>
        <meta name="description" content="Découvrez ma démarche artistique, ma signature visuelle et tout ce qui fait la différence dans mon approche photographique professionnelle au Mans." />
        <link rel="canonical" href="https://celinedebarieux.fr/a-propos" />
        <meta property="og:title" content="À Propos | Céline Debarieux Photographie" />
        <meta property="og:description" content="Une approche photographique authentique privilégiant la lumière naturelle, les émotions sincères et les instants précieux. Photographe professionnelle au Mans." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://celinedebarieux.fr/a-propos" />
      </Head>

      <Header />

      <main className="flex-grow">
        {/* Héro Section */}
        <section className="relative h-[50vh] min-h-[400px] md:min-h-[500px] bg-noir overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <Image
              src="/assets/complice.jpg"
              alt="À propos de Céline Debarieux - Photographe professionnelle au Mans"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-noir/70 via-noir/50 to-noir/70"></div>
            
            {/* Médaillon signature */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 z-10">
              <SignatureMedaillon size="lg" />
            </div>
          </div>
          
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl"
            >
              <div className="flex justify-center items-center mb-6">
                <div className="h-px w-16 bg-gold/70"></div>
                <span className="mx-4 text-gold font-cormorant italic text-xl">Bienvenue</span>
                <div className="h-px w-16 bg-gold/70"></div>
              </div>
              
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-beige mb-6 leading-tight whitespace-normal">
                À propos de <span className="text-gold block md:inline">Céline Debarieux</span>
              </h1>
              
              <p className="font-cormorant text-xl md:text-2xl text-beige-light/90 max-w-2xl mx-auto">
                Une approche photographique authentique, où chaque image raconte une histoire.  
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section Ma Démarche Artistique */}
        <AboutSection 
          id="demarche"
          title="Ma démarche artistique"
          image="/assets/sample2.jpg"
          content={
            <>
              <p className="text-xl font-medium text-noir mb-5">Une photographie pensée, pas simplement prise.</p>
              <p>Dans un monde saturé d'images, je choisis de ralentir. Derrière chaque cliché, il y a une intention, un regard, une recherche de vérité. La lumière naturelle, les textures brutes, les instants volés... tout m'intéresse dans ce qui échappe à la mise en scène parfaite. Je privilégie l'authenticité à la pose figée, l'émotion à la perfection.</p>
              <p className="mt-4">Chaque séance est une exploration de l'équilibre entre esthétique et sincérité. Qu'il s'agisse d'un portrait, d'un reportage de mariage ou d'un moment de vie en famille, je m'attache à raconter votre histoire, avec pudeur et justesse.</p>
            </>
          }
        />

        {/* Section Ce que vous emportez avec vous */}
        <AboutSection 
          id="souvenirs"
          title="Ce que vous emportez avec vous"
          image="/assets/naissance.jpg"
          reversed={true}
          delay={0.2}
          content={
            <>
              <p className="text-xl font-medium text-noir mb-5">Plus qu'une photo : un souvenir ancré, une émotion vivante.</p>
              <p>Une image réussie ne se résume pas à une belle lumière ou à une bonne composition. C'est un morceau de votre vie que vous emportez, un regard, un sourire, un geste qui vous échappe sur l'instant mais qui, plus tard, ravivera tout un univers de souvenirs.</p>
              <p className="mt-4">Les photos que vous recevez ne sont pas des fichiers numériques impersonnels. Ce sont des images pensées pour traverser le temps, à afficher, à offrir, à conserver, à transmettre. Des instants vrais, qui racontent ce que vous avez vécu – et ressenti.</p>
            </>
          }
        />

        {/* Section Ma Signature Visuelle */}
        <AboutSection 
          id="signature"
          title="Ma signature visuelle"
          image="/assets/femme-chapeau.jpg"
          delay={0.4}
          content={
            <>
              <p className="text-xl font-medium text-noir mb-5">Une esthétique lumineuse, naturelle et intemporelle.</p>
              <p>Ma photographie se distingue par une approche à la fois douce et structurée. J'accorde une attention particulière à la lumière naturelle, aux couleurs subtiles et aux compositions épurées. Mon style privilégie l'élégance discrète, la chaleur des émotions sincères et la simplicité des gestes vrais.</p>
              <p className="mt-4">Chaque image est pensée pour raconter une histoire sans artifice. Je travaille les teintes avec finesse, pour créer une cohérence visuelle qui traverse toutes mes séries : des tons doux, des contrastes maîtrisés, et une lumière qui sublime sans dénaturer. Que ce soit pour un portrait, un reportage de mariage ou une séance famille, je cherche avant tout à capturer l'essence de l'instant avec justesse et sensibilité.</p>
            </>
          }
        />

        {/* Section FAQ */}
        <section className="py-20 md:py-24 bg-beige-extralight relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-50 bg-[url('/assets/pattern-overlay.png')] bg-repeat"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
            >
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-noir mb-6 leading-tight">
                Foire aux questions
              </h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
            </motion.div>
            
            <div className="max-w-3xl mx-auto">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <FaqItem 
                    question={item.question} 
                    answer={item.answer} 
                    isOpen={openFaq === index}
                    toggleOpen={() => toggleFaq(index)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-noir to-noir-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <Image
              src="/assets/contact-bg.jpg"
              alt=""
              fill
              className="object-cover object-center"
              aria-hidden="true"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-beige-light mb-6 whitespace-normal">
                Racontons ensemble<br /><span className="text-gold font-bold">votre histoire</span>
              </h2>
              <p className="font-cormorant text-xl text-beige-light/90 mb-8 max-w-xl mx-auto">
                Chaque projet est unique, comme votre histoire. Contactez-moi pour discuter de vos envies et créer ensemble des images qui vous ressemblent.  
              </p>
              <a 
                href="/contact" 
                className="inline-block bg-gold hover:bg-gold-dark focus-visible:bg-gold-dark text-noir font-montserrat font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-gold/30 focus-visible:shadow-gold/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Me contacter
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
