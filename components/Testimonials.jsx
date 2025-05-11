import React from 'react';

const testimonialsData = [
  {
    id: 1,
    quote: "Une expérience inoubliable, un regard unique sur l'émotion.",
    author: "CAMILLE B."
  },
  {
    id: 2,
    quote: "Chaque cliché est une œuvre d'art, merci pour votre talent.",
    author: "GALERIE LUMEN"
  }
];

const TestimonialCard = ({ quote, author }) => {
  return (
    <div className="bg-beige-extralight p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md mx-auto relative">
      <span className="absolute top-4 left-4 text-5xl text-gold/50 font-playfair opacity-60">“</span>
      <p className="text-noir-profond font-cormorant italic text-lg md:text-xl mb-4 pt-5 relative z-10">
        {quote}
      </p>
      <p className="text-right font-montserrat text-sm text-gold font-semibold tracking-wider">— {author}</p>
    </div>
  );
};

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-beige-clair">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-noir-profond text-center mb-4">
          Ils ont vécu l'instant
        </h2>
        <div className="w-24 h-0.5 bg-gold mx-auto mb-12 md:mb-16"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {testimonialsData.map((testimonial) => (
            <TestimonialCard key={testimonial.id} quote={testimonial.quote} author={testimonial.author} />
          ))}
        </div>
      </div>
    </section>
  );
}
