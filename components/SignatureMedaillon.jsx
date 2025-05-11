import React from 'react';

export default function SignatureMedaillon({ size = 'md' }) {
  // Différentes tailles pour le médaillon
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20 md:w-24 md:h-24',
    lg: 'w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32',
  };
  
  return (
    <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center border-2 border-gold/80 bg-beige-lightest/95 shadow-lg`}>
      <div className="text-center">
        <p className="font-playfair text-gold text-xs md:text-sm leading-tight">Céline</p>
        <p className="font-playfair text-gold text-xs md:text-sm leading-tight">Debarieux</p>
      </div>
    </div>
  );
}
