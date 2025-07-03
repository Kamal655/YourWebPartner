
import React from 'react';
import { Sparkles, Zap } from 'lucide-react';
import Logo3D from './Logo3D';

const Logo = () => {
  return (
    <div className="flex items-center space-x-4 group cursor-pointer relative">
      {/* Premium Logo Container with 3D Enhancement */}
      <div className="relative">
        {/* 3D Logo */}
        <div className="w-16 h-16 flex items-center justify-center relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 group-hover:scale-110 transition-all duration-700 shadow-2xl">
          <div className="w-full h-full rounded-xl bg-white flex items-center justify-center relative overflow-hidden shadow-inner">
            <Logo3D />
            
            {/* Fallback image */}
            <img 
              src="/lovable-uploads/539cdbf4-fe0e-42f7-b9b9-9cc800a4cd6e.png" 
              alt="YourWebPartner Logo" 
              className="w-12 h-12 object-contain relative z-10 group-hover:scale-105 transition-transform duration-500 drop-shadow-sm absolute opacity-0 group-hover:opacity-100"
              onError={(e) => {
                console.log('Logo image failed to load');
                e.currentTarget.style.display = 'none';
              }}
            />
            
            {/* Fallback text logo if image doesn't load */}
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent opacity-0 group-[:has(img[style*='display: none'])]:opacity-100">
              YW
            </div>
            
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift rounded-xl"></div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-full group-hover:translate-x-full rounded-xl"></div>
          </div>
        </div>
        
        {/* Premium Glow Effects */}
        <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-60 transition-all duration-500 blur-xl animate-pulse"></div>
        <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded-2xl opacity-0 group-hover:opacity-40 transition-all duration-700 blur-2xl animate-pulse animation-delay-300"></div>
        
        {/* Floating sparkle effects */}
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-500 animation-delay-200">
          <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" />
        </div>
        <div className="absolute -bottom-2 -left-2 opacity-0 group-hover:opacity-100 transition-all duration-500 animation-delay-400">
          <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
        </div>
      </div>

      {/* Enhanced Brand Text with better visibility */}
      <div className="flex flex-col relative">
        {/* Main brand name with gradient text */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-700 tracking-tight relative drop-shadow-sm">
          YourWebPartner
          
          {/* Premium underline effect */}
          <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-700 rounded-full shadow-lg"></div>
        </h1>
        
        {/* Enhanced tagline with better contrast - Fixed DOM nesting */}
        <div className="text-base text-gray-700 group-hover:text-gray-800 font-semibold tracking-wide transition-colors duration-500 relative mt-1">
          <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-700 drop-shadow-sm">
            Your Website, Our Passion
          </span>
          
          {/* Subtle glow effect on tagline */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10 rounded"></div>
        </div>
      </div>
      
      {/* Floating particles around logo - more visible */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-2 left-2 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-80 animate-float transition-opacity duration-500 animation-delay-100 shadow-lg"></div>
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-80 animate-float-reverse transition-opacity duration-500 animation-delay-300 shadow-lg"></div>
        <div className="absolute top-1/2 right-2 w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-0 group-hover:opacity-80 animate-sparkle transition-opacity duration-500 animation-delay-500 shadow-lg"></div>
      </div>
    </div>
  );
};

export default Logo;
