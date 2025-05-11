import dynamic from 'next/dynamic';
import React from 'react';

/**
 * Utilitaire pour désactiver complètement le rendu côté serveur
 * Solution radicale pour les problèmes d'hydratation avec Next.js et Framer Motion
 */
export function noSSR(Component) {
  return dynamic(() => Promise.resolve(Component), {
    ssr: false
  });
}

/**
 * HOC (High Order Component) pour désactiver le SSR
 */
export function withNoSSR(Component) {
  const NoSSRComponent = (props) => (
    <React.Fragment>
      <Component {...props} />
    </React.Fragment>
  );
  
  // Désactiver le SSR en utilisant dynamic import avec ssr: false
  return dynamic(() => Promise.resolve(NoSSRComponent), { ssr: false });
}
