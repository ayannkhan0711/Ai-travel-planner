import React from 'react';

export default function Loading({ message = 'Curating your luxury experience...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-2 border-luxury-beige animate-ping opacity-25"></div>
        <div className="absolute inset-0 rounded-full border-2 border-t-luxury-brown border-r-transparent border-b-luxury-gold border-l-transparent animate-spin"></div>
        <div className="absolute inset-2 flex items-center justify-center text-luxury-brown font-serif text-lg">
          ✦
        </div>
      </div>
      <p className="font-serif text-sm tracking-widest text-luxury-brown uppercase font-medium animate-pulse">
        {message}
      </p>
    </div>
  );
}
