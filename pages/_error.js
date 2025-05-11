import React from 'react';

function Error({ statusCode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-beige-light">
      <div className="text-center p-8 max-w-md bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-playfair text-noir mb-4">
          {statusCode
            ? `Une erreur ${statusCode} s'est produite`
            : 'Une erreur s\'est produite'}
        </h1>
        <p className="text-noir-light mb-6">
          Nous nous excusons pour ce désagrément. Veuillez réessayer ultérieurement.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-gold text-white rounded-md hover:bg-gold/90 transition-colors"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
