import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SignatureMedaillon from '../components/SignatureMedaillon';

export default function Contact() {
  const [formData, setFormData] = useState({
    // Champs communs
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
    // Champs spécifiques au contact simple
    subject: '',
    // Champs spécifiques à la demande de devis
    sessionType: '',
    eventDate: '',
    location: '',
    budget: '',
    referralSource: '',
    // Type de formulaire
    isDevis: false
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    message: ''
  });

  const sessionTypes = [
    { value: '', label: '-- Choisir --' },
    { value: 'mariage', label: 'Mariage' },
    { value: 'grossesse', label: 'Grossesse' },
    { value: 'nouveau_ne', label: 'Nouveau-né' },
    { value: 'famille', label: 'Famille' },
    { value: 'couple', label: 'Couple' },
    { value: 'portrait', label: 'Portrait' },
    { value: 'evenement', label: 'Événement' },
    { value: 'entreprise', label: 'Entreprise' },
    { value: 'autre', label: 'Autre' }
  ];
  
  const subjectTypes = [
    { value: '', label: '-- Choisir --' },
    { value: 'question', label: 'Question sur vos services' },
    { value: 'information', label: 'Demande d\'information' },
    { value: 'disponibilite', label: 'Vérification de disponibilité' },
    { value: 'autre', label: 'Autre' }
  ];
  
  const budgetRanges = [
    { value: '', label: '-- Choisir --' },
    { value: 'moins_500', label: 'Moins de 500€' },
    { value: '500_1000', label: 'Entre 500€ et 1000€' },
    { value: '1000_1500', label: 'Entre 1000€ et 1500€' },
    { value: '1500_2000', label: 'Entre 1500€ et 2000€' },
    { value: 'plus_2000', label: 'Plus de 2000€' },
    { value: 'non_defini', label: 'Budget non défini' }
  ];

  const referralSources = [
    { value: '', label: '-- Choisir --' },
    { value: 'google', label: 'Recherche Google' },
    { value: 'social', label: 'Réseaux sociaux' },
    { value: 'recommendation', label: 'Recommandation' },
    { value: 'deja_client', label: 'Déjà client(e)' },
    { value: 'autre', label: 'Autre' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleFormType = (isDevis) => {
    setFormData(prevData => ({
      ...prevData,
      isDevis
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      isError: false,
      message: ''
    });

    setTimeout(() => {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        isError: false,
        message: formData.isDevis ? 
          'Votre demande de devis a bien été envoyée. Je vous contacterai sous 48h pour discuter de votre projet en détail.' : 
          'Votre message a bien été envoyé. Je vous répondrai dans les meilleurs délais.'
      });
      // Réinitialiser le formulaire tout en gardant le type de formulaire actif
      setFormData({
        // Réinitialisation des champs communs
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        consent: false,
        // Réinitialisation des champs spécifiques au contact simple
        subject: '',
        // Réinitialisation des champs spécifiques à la demande de devis
        sessionType: '',
        eventDate: '',
        location: '',
        budget: '',
        referralSource: '',
        // Conserver le type de formulaire
        isDevis: formData.isDevis
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-beige-lightest">
      <Head>
        <title>Contact | Céline Debarieux Photographie</title>
        <meta name="description" content="Contactez Céline Debarieux, photographe professionnelle" />
      </Head>

      <Header />

      <main className="flex-grow">
        <section className="relative h-[40vh] min-h-[300px] md:min-h-[400px] bg-noir overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <Image
              src="/assets/contact-bg.jpg"
              alt="Contactez Céline Debarieux"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-noir/70 via-noir/50 to-noir/70"></div>
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10">
              <SignatureMedaillon size="lg" />
            </div>
          </div>
          
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className="flex justify-center items-center mb-6">
                <div className="h-px w-16 bg-gold/70"></div>
                <span className="mx-4 text-gold font-cormorant italic text-xl">Contact</span>
                <div className="h-px w-16 bg-gold/70"></div>
              </div>
              
              <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-beige mb-4 sm:mb-6 leading-tight px-2 sm:px-0">
                <span className="text-gold">Parlons</span> de votre projet
              </h1>
              
              <p className="font-cormorant text-lg sm:text-xl md:text-2xl text-beige-light/90 max-w-2xl mx-auto px-3 sm:px-0">
                Une question ou une demande de devis ?
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-beige-lightest">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="flex border-b border-beige/30">
                <button
                  onClick={() => toggleFormType(false)}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-all ${!formData.isDevis ? 'bg-gold/10 text-noir border-b-2 border-gold' : 'text-noir-light hover:text-noir'}`}
                >
                  Contact Simple
                </button>
                <button
                  onClick={() => toggleFormType(true)}
                  className={`flex-1 py-4 px-6 text-center font-medium transition-all ${formData.isDevis ? 'bg-gold/10 text-noir border-b-2 border-gold' : 'text-noir-light hover:text-noir'}`}
                >
                  Demande de Devis
                </button>
              </div>

              <div className="p-8 md:p-10">
                {formStatus.isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center"
                  >
                    <div className="text-3xl mb-4">✓</div>
                    <p className="font-medium text-lg mb-2">Merci pour votre message !</p>
                    <p>{formStatus.message}</p>
                    <button 
                      onClick={() => setFormStatus(prev => ({...prev, isSubmitted: false}))}
                      className="mt-6 text-gold hover:text-gold-dark underline"
                    >
                      Envoyer un nouveau message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Titre du formulaire avec style différent selon le type */}
                    <div className={`p-4 rounded-lg ${formData.isDevis ? 'bg-gold/5 border border-gold/20' : 'bg-beige/5 border border-beige/20'}`}>
                      <h3 className={`font-playfair text-xl ${formData.isDevis ? 'text-gold' : 'text-noir'}`}>
                        {formData.isDevis ? 'Demande de devis personnalisé' : 'Formulaire de contact'}
                      </h3>
                      <p className="text-sm text-noir-light mt-1">
                        {formData.isDevis 
                          ? 'Décrivez votre projet pour recevoir une proposition adaptée à vos besoins.'
                          : 'Une question ou besoin d\'information ? N\'hésitez pas à me contacter.'}
                      </p>
                    </div>
                    
                    {/* Champs communs aux deux formulaires */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-noir-light text-sm font-medium mb-2">
                          Prénom <span className="text-gold">*</span>
                        </label>
                        <input 
                          type="text" 
                          id="firstName" 
                          name="firstName" 
                          value={formData.firstName} 
                          onChange={handleChange} 
                          required
                          className="w-full px-4 py-3 rounded-lg border border-beige/50 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-noir-light text-sm font-medium mb-2">
                          Nom <span className="text-gold">*</span>
                        </label>
                        <input 
                          type="text" 
                          id="lastName" 
                          name="lastName" 
                          value={formData.lastName} 
                          onChange={handleChange} 
                          required
                          className="w-full px-4 py-3 rounded-lg border border-beige/50 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-noir-light text-sm font-medium mb-2">
                          Email <span className="text-gold">*</span>
                        </label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          required
                          className="w-full px-4 py-3 rounded-lg border border-beige/50 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-noir-light text-sm font-medium mb-2">
                          Téléphone <span className="text-gold">*</span>
                        </label>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          required
                          className="w-full px-4 py-3 rounded-lg border border-beige/50 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all"
                        />
                      </div>
                    </div>
                    
                    {/* Champs spécifiques au formulaire de contact simple */}
                    {!formData.isDevis && (
                      <div>
                        <label htmlFor="subject" className="block text-noir-light text-sm font-medium mb-2">
                          Sujet de votre message <span className="text-gold">*</span>
                        </label>
                        <select 
                          id="subject" 
                          name="subject" 
                          value={formData.subject} 
                          onChange={handleChange} 
                          required
                          className="w-full px-4 py-3 rounded-lg border border-beige/50 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all bg-white"
                        >
                          {subjectTypes.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    
                    {/* Champs spécifiques à la demande de devis */}
                    {formData.isDevis && (
                      <>
                        <div>
                          <label htmlFor="sessionType" className="block text-noir-light text-sm font-medium mb-2">
                            Type de prestation <span className="text-gold">*</span>
                          </label>
                          <select 
                            id="sessionType" 
                            name="sessionType" 
                            value={formData.sessionType} 
                            onChange={handleChange} 
                            required
                            className="w-full px-4 py-3 rounded-lg border border-beige/50 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all bg-white"
                          >
                            {sessionTypes.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        {(formData.sessionType === 'mariage' || formData.sessionType === 'evenement') && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="eventDate" className="block text-noir-light text-sm font-medium mb-2">
                                Date de l'événement <span className="text-gold">*</span>
                              </label>
                              <input 
                                type="date" 
                                id="eventDate" 
                                name="eventDate" 
                                value={formData.eventDate} 
                                onChange={handleChange} 
                                required={formData.sessionType === 'mariage' || formData.sessionType === 'evenement'}
                                className="w-full px-4 py-3 rounded-lg border border-beige/50 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="location" className="block text-noir-light text-sm font-medium mb-2">
                                Lieu de l'événement <span className="text-gold">*</span>
                              </label>
                              <input 
                                type="text" 
                                id="location" 
                                name="location" 
                                value={formData.location} 
                                onChange={handleChange} 
                                required={formData.sessionType === 'mariage' || formData.sessionType === 'evenement'}
                                className="w-full px-4 py-3 rounded-lg border border-beige/50 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all"
                                placeholder="Ville, département"
                              />
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <label htmlFor="budget" className="block text-noir-light text-sm font-medium mb-2">
                            Budget envisagé
                          </label>
                          <select 
                            id="budget" 
                            name="budget" 
                            value={formData.budget} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 rounded-lg border border-beige/50 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all bg-white"
                          >
                            {budgetRanges.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="referralSource" className="block text-noir-light text-sm font-medium mb-2">
                            Comment m'avez-vous connu ? <span className="text-gold">*</span>
                          </label>
                          <select 
                            id="referralSource" 
                            name="referralSource" 
                            value={formData.referralSource} 
                            onChange={handleChange} 
                            required
                            className="w-full px-4 py-3 rounded-lg border border-beige/50 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all bg-white"
                          >
                            {referralSources.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}
                    
                    {/* Message - commun aux deux formulaires mais avec libellé différent */}
                    <div>
                      <label htmlFor="message" className="block text-noir-light text-sm font-medium mb-2">
                        {formData.isDevis ? 'Détails de votre projet' : 'Votre message'} <span className="text-gold">*</span>
                      </label>
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-beige/50 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none transition-all resize-y"
                        placeholder={formData.isDevis ? 
                          'Décrivez votre projet, vos attentes et toute information pertinente pour le devis...' : 
                          'Votre message...'}
                      ></textarea>
                    </div>
                    
                    {/* Consentement RGPD */}
                    <div className="pt-2">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="consent"
                            name="consent"
                            type="checkbox"
                            checked={formData.consent}
                            onChange={handleChange}
                            required
                            className="w-4 h-4 text-gold bg-beige-lightest rounded border-beige focus:ring-gold"
                          />
                        </div>
                        <label htmlFor="consent" className="ml-3 text-sm text-noir-light">
                          J'accepte les conditions de traitement des données. <span className="text-gold">*</span>
                        </label>
                      </div>
                    </div>
                    
                    {/* Bouton d'envoi avec style différent selon le type de formulaire */}
                    <div className="pt-4 text-center">
                      <button 
                        type="submit" 
                        disabled={formStatus.isSubmitting}
                        className={`inline-block ${formData.isDevis ? 'bg-gold hover:bg-gold-dark text-noir' : 'bg-noir hover:bg-noir-light text-beige'} font-montserrat font-semibold py-3.5 px-10 rounded-full shadow-lg transition-all ${formStatus.isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {formStatus.isSubmitting ? 'Envoi en cours...' : formData.isDevis ? 'Demander un devis' : 'Envoyer'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto mt-16 md:mt-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="text-center">
                  <div className="inline-block p-3.5 rounded-full bg-gold/10 mb-4">
                    <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <h3 className="font-playfair text-xl text-noir mb-1">Téléphone</h3>
                  <p className="text-noir-light">06 12 34 56 78</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-block p-3.5 rounded-full bg-gold/10 mb-4">
                    <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <h3 className="font-playfair text-xl text-noir mb-1">Email</h3>
                  <p className="text-noir-light">contact@celinedebarieux.fr</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-block p-3.5 rounded-full bg-gold/10 mb-4">
                    <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <h3 className="font-playfair text-xl text-noir mb-1">Lieu</h3>
                  <p className="text-noir-light">Le Mans, Sarthe (72)</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
