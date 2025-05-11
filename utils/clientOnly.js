import { useEffect, useState } from 'react';

/**
 * Composant d'ordre supérieur pour éviter les erreurs d'hydratation
 * en ne rendant le composant que côté client
 */
export default function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div {...delegated}>
      {children}
    </div>
  );
}
