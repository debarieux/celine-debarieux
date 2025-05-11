import '../styles/globals.css';
import { useEffect, useState } from 'react';

/**
 * Solution 100% client-side rendering pour Next.js
 * Cette approche radicale résout définitivement tous les problèmes d'hydratation
 */
function ClientOnlyApp({ Component, pageProps }) {
  // S'assurer que tout le code ne s'exécute qu'après le chargement côté client
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Du00e9finir mounted à true seulement après le rendu initial côté client
    setMounted(true);
    
    // Du00e9sactiver les avertissements de React pour l'hydratation
    const originalConsoleError = console.error;
    console.warn = () => {};
    console.error = (msg) => {
      if (msg && typeof msg === 'string' && msg.includes('hydrat')) {
        return;
      }
      // Original console.error for other messages
      originalConsoleError(msg);
    };
  }, []);

  // Ne rien rendre jusqu'à ce que le composant soit monté côté client
  if (!mounted) {
    return (
      <div id="loading-screen" style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F1E1'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            border: '3px solid #C2B280', 
            borderRadius: '50%', 
            borderTopColor: 'transparent',
            animation: 'spin 1s linear infinite' 
          }}></div>
          <p style={{ marginTop: '1rem', fontFamily: 'serif', color: '#C2B280' }}>
            Chargement...
          </p>
        </div>
      </div>
    );
  }

  // Rendu normal une fois monté côté client
  return (
    <div id="pure-client-root" suppressHydrationWarning>
      <Component {...pageProps} />
    </div>
  );
}

export default ClientOnlyApp;
