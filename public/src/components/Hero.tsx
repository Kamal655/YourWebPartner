import React, { useEffect, useState } from 'react';
import { ArrowDown, Sparkles, Zap, Stars } from 'lucide-react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Animated Particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-liquid-morph"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-morph-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-32 right-1/4 w-4 h-4 bg-blue-500 rotate-45 animate-float animation-delay-1000"></div>
        <div className="absolute top-64 left-1/3 w-6 h-6 bg-purple-500 rounded-full animate-float-reverse animation-delay-2000"></div>
        <div className="absolute bottom-32 right-1/3 w-3 h-3 bg-pink-500 animate-sparkle animation-delay-3000"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30 animate-float animation-delay-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20 animate-float-reverse animation-delay-1500"></div>
      </div>

      {/* Dynamic cursor follower */}
      <div 
        className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8), transparent)',
          borderRadius: '50%',
          transition: 'all 0.1s ease'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center">
          {/* Animated Icons */}
          <div className="flex justify-center space-x-4 mb-8">
            <Sparkles className={`w-8 h-8 text-blue-500 ${isLoaded ? 'animate-sparkle animation-delay-500' : ''}`} />
            <Zap className={`w-8 h-8 text-purple-500 ${isLoaded ? 'animate-bounce animation-delay-700' : ''}`} />
            <Stars className={`w-8 h-8 text-pink-500 ${isLoaded ? 'animate-sparkle animation-delay-1000' : ''}`} />
          </div>

          <h1 className={`text-6xl md:text-8xl font-bold text-gray-900 mb-6 ${isLoaded ? 'animate-slide-in-down' : 'opacity-0'}`}>
            <span className="inline-block hover:animate-neon-glow transition-all duration-300">Beautiful</span>{' '}
            <span className="inline-block hover:animate-glitch transition-all duration-300">Websites</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift bg-300% hover:scale-105 transition-transform duration-300">
              Built for Success
            </span>
          </h1>
          
          <p className={`text-2xl md:text-3xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed ${isLoaded ? 'animate-slide-in-up animation-delay-500' : 'opacity-0'}`}>
            We create <span className="text-blue-600 font-semibold animate-neon-glow">stunning</span>, 
            <span className="text-purple-600 font-semibold"> user-friendly</span> websites that help your business 
            <span className="text-pink-600 font-semibold"> grow online</span>. 
            From design to development, we're your trusted web partner.
          </p>

          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 ${isLoaded ? 'animate-zoom-in animation-delay-1000' : 'opacity-0'}`}>
            <a 
              href="#contact"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-rotate-2 animate-gradient-shift bg-300%"
            >
              <span className="relative z-10">Start Your Project</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-white opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </a>
            
            <a 
              href="#portfolio"
              className="group relative border-3 border-gray-300 text-gray-700 px-10 py-5 rounded-full text-xl font-bold hover:border-purple-500 hover:text-purple-600 transition-all duration-500 transform hover:scale-105 hover:rotate-1 glass hover-glow"
            >
              <span className="group-hover:animate-sparkle">View Our Work</span>
            </a>
          </div>

          {/* Animated feature badges */}
          <div className={`flex flex-wrap justify-center gap-4 mb-16 ${isLoaded ? 'animate-slide-in-up animation-delay-1500' : 'opacity-0'}`}>
            {['Responsive Design', 'SEO Optimized', '24/7 Support', 'Fast Delivery'].map((feature, index) => (
              <span 
                key={feature}
                className={`px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-700 border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-fade-in animation-delay-${1500 + index * 200}`}
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Animated scroll indicator */}
          <div className={`mt-20 ${isLoaded ? 'animate-bounce animation-delay-2000' : 'opacity-0'}`}>
            <div className="relative inline-block">
              <ArrowDown className="mx-auto text-gray-400 animate-bounce" size={40} />
              <div className="absolute inset-0 animate-ping">
                <ArrowDown className="mx-auto text-purple-300 opacity-30" size={40} />
              </div>
            </div>
            <p className="mt-2 text-gray-500 text-sm animate-fade-in animation-delay-3000">Scroll to discover more</p>
          </div>
        </div>
      </div>

      {/* Matrix-style rain effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-matrix-rain opacity-10"
            style={{
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 0.5}s`,
              fontSize: '10px',
              color: '#4f46e5'
            }}
          >
            01010101
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
