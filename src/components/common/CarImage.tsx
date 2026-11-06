import React, { useState } from 'react';
import { Car as CarIcon } from 'lucide-react';

interface CarImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackIconSize?: number;
}

export const CarImage: React.FC<CarImageProps> = ({
  src,
  alt,
  className = '',
  fallbackIconSize = 24
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Normalize path if needed
  const normalizedSrc = src.startsWith('/src/assets/')
    ? src.replace('/src/assets/', '/assets/')
    : src;

  if (hasError) {
    return (
      <div
        className={`bg-gradient-to-br from-[#102943] to-[#071525] border border-[rgba(150,190,255,0.18)] flex flex-col items-center justify-center text-[#71869D] ${className}`}
        aria-label={alt}
      >
        <CarIcon size={fallbackIconSize} className="text-[#50A8FF]/60 mb-1" />
        <span className="text-[10px] text-[#A8B9CC] font-medium truncate max-w-[90%] px-2">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Subtle skeleton shimmer before load */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#0B1D31] animate-pulse flex items-center justify-center">
          <CarIcon size={fallbackIconSize} className="text-[#173550]" />
        </div>
      )}
      <img
        src={normalizedSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
