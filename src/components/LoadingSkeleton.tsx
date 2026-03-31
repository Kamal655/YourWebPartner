
import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'avatar' | 'image';
  className?: string;
  lines?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  variant = 'card', 
  className = '', 
  lines = 3 
}) => {
  const baseClass = "animate-pulse bg-gray-200 rounded";

  if (variant === 'text') {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`${baseClass} h-4`}
            style={{ width: `${Math.random() * 40 + 60}%` }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'avatar') {
    return <div className={`${baseClass} w-12 h-12 rounded-full ${className}`} />;
  }

  if (variant === 'image') {
    return <div className={`${baseClass} w-full h-48 ${className}`} />;
  }

  // Default card variant
  return (
    <div className={`${baseClass} p-6 space-y-4 ${className}`}>
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
      <div className="h-10 bg-gray-300 rounded w-1/3"></div>
    </div>
  );
};

export default LoadingSkeleton;
