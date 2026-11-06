import React from 'react';

export const AutoHubLogo: React.FC<{ className?: string; size?: number; glow?: boolean }> = ({
  className = '',
  size = 40,
  glow = true
}) => {
  return (
    <div className={`relative inline-flex flex-col items-center justify-center ${className}`}>
      {glow && (
        <div className="absolute -inset-1 bg-sky-500/25 blur-md rounded-full pointer-events-none" />
      )}
      <svg
        width={size}
        height={size * 0.55}
        viewBox="0 0 100 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative transition-transform duration-300 group-hover:scale-105"
      >
        {/* Sleek sports car roofline silhouette matching the reference logo */}
        <path
          d="M 12 36 C 24 35, 30 22, 42 16 C 54 10, 68 10, 78 18 C 84 23, 90 32, 94 36"
          stroke="#50A8FF"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Aerodynamic windshield & side window curve */}
        <path
          d="M 38 24 C 46 17, 60 16, 72 23 C 65 24, 48 24, 38 24 Z"
          fill="rgba(80, 168, 255, 0.25)"
          stroke="#50A8FF"
          strokeWidth="1.2"
        />
        {/* Bottom aerodynamic rocker line & ground reflection */}
        <path
          d="M 6 42 C 28 42, 72 42, 94 42"
          stroke="rgba(80, 168, 255, 0.4)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Rear spoiler / taillight flick */}
        <path
          d="M 12 36 C 8 36, 4 39, 4 41"
          stroke="#237BFF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Front aggressive headlight swoop */}
        <path
          d="M 94 36 C 97 37, 98 40, 96 42"
          stroke="#50A8FF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export const BrandLogo: React.FC<{ brand: string; className?: string; size?: number }> = ({
  brand,
  className = '',
  size = 32
}) => {
  const norm = brand.toLowerCase();

  if (norm.includes('tesla')) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="currentColor" className={className}>
        <path d="M50 15c-11.4 0-21.8 3.5-30.4 9.5l6.2 8.7C32.4 28.5 40.8 26 50 26s17.6 2.5 24.2 7.2l6.2-8.7C71.8 18.5 61.4 15 50 15z" />
        <path d="M50 33c-7.8 0-14.8 2.2-20.7 6l4.6 7.4c4.6-2.9 10-4.6 16.1-4.6s11.5 1.7 16.1 4.6l4.6-7.4c-5.9-3.8-12.9-6-20.7-6z" />
        <path d="M47 48v37h6V48c8.2-1.2 15-4.8 20.3-9.9l-4.2-6.5C64.6 35.8 58 38.6 50 38.6s-14.6-2.8-19.1-7l-4.2 6.5c5.3 5.1 12.1 8.7 20.3 9.9z" />
      </svg>
    );
  }

  if (norm.includes('bmw')) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
        <circle cx="50" cy="50" r="46" fill="#0B1D31" stroke="#50A8FF" strokeWidth="3" />
        <circle cx="50" cy="50" r="32" fill="#071525" stroke="#FFFFFF" strokeWidth="1.5" />
        {/* Top-Right White */}
        <path d="M50 50 L50 18 A32 32 0 0 1 82 50 Z" fill="#FFFFFF" />
        {/* Bottom-Left White */}
        <path d="M50 50 L50 82 A32 32 0 0 1 18 50 Z" fill="#FFFFFF" />
        {/* Top-Left Blue */}
        <path d="M50 50 L18 50 A32 32 0 0 1 50 18 Z" fill="#237BFF" />
        {/* Bottom-Right Blue */}
        <path d="M50 50 L82 50 A32 32 0 0 1 50 82 Z" fill="#237BFF" />
      </svg>
    );
  }

  if (norm.includes('mercedes')) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
        <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="4.5" />
        <path
          d="M50 10 L50 50 L17 72 L50 50 L83 72 L50 50 Z"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M50 12 L47 48 L19 70 L48 52 L81 70 L53 48 Z"
          fill="currentColor"
          opacity="0.8"
        />
      </svg>
    );
  }

  if (norm.includes('audi')) {
    return (
      <svg width={size * 1.3} height={size * 0.7} viewBox="0 0 130 50" fill="none" className={className}>
        <circle cx="25" cy="25" r="18" stroke="currentColor" strokeWidth="4" />
        <circle cx="50" cy="25" r="18" stroke="currentColor" strokeWidth="4" />
        <circle cx="75" cy="25" r="18" stroke="currentColor" strokeWidth="4" />
        <circle cx="100" cy="25" r="18" stroke="currentColor" strokeWidth="4" />
      </svg>
    );
  }

  if (norm.includes('toyota')) {
    return (
      <svg width={size * 1.2} height={size * 0.8} viewBox="0 0 100 70" fill="none" className={className}>
        <ellipse cx="50" cy="35" rx="46" ry="30" stroke="currentColor" strokeWidth="4" />
        <ellipse cx="50" cy="26" rx="28" ry="12" stroke="currentColor" strokeWidth="3.5" />
        <ellipse cx="50" cy="38" rx="14" ry="24" stroke="currentColor" strokeWidth="3.5" />
      </svg>
    );
  }

  if (norm.includes('porsche')) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className}>
        <path
          d="M20 20 L80 20 L72 70 L50 88 L28 70 Z"
          stroke="currentColor"
          strokeWidth="4"
          fill="rgba(35, 123, 255, 0.1)"
        />
        <path d="M50 20 L50 88" stroke="currentColor" strokeWidth="2.5" />
        <path d="M24 45 L76 45" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="50" cy="45" r="10" fill="#237BFF" />
      </svg>
    );
  }

  return (
    <div className={`flex items-center justify-center font-bold text-xs tracking-wider ${className}`}>
      {brand.slice(0, 3).toUpperCase()}
    </div>
  );
};
