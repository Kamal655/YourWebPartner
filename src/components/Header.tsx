
import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import Logo from './Logo';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-1000 ease-out ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-3xl shadow-2xl border-b border-gray-200/40 py-2' 
        : 'bg-gradient-to-b from-black/40 via-black/20 to-transparent py-6'
    }`}>
      {/* Dynamic gradient overlay that follows mouse */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 pointer-events-none ${
          isScrolled ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(59, 130, 246, 0.15), 
            rgba(147, 51, 234, 0.1), 
            rgba(236, 72, 153, 0.05), 
            transparent 70%)`
        }}
      />

      {/* Animated mesh background */}
      {!isScrolled && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute -top-20 -left-40 w-60 h-60 bg-gradient-to-br from-cyan-400/20 via-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-pink-400/20 via-rose-400/20 to-orange-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        <div className="flex justify-between items-center">
          {/* Enhanced Logo with premium effects */}
          <div className={`transform transition-all duration-700 ease-out ${
            isScrolled ? 'scale-95' : 'scale-100'
          } hover:scale-110 group`}>
            <div className="relative">
              <Logo />
              {/* Premium glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl -z-10 animate-pulse"></div>
            </div>
          </div>

          {/* Premium Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative group">
                <a
                  href={item.href}
                  className={`relative px-6 py-3 text-base font-semibold transition-all duration-500 rounded-2xl overflow-hidden group ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-white' 
                      : 'text-white hover:text-white'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100 rounded-2xl"></div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
                  
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Premium underline */}
                  <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 group-hover:w-full group-hover:left-0 transition-all duration-500 rounded-full shadow-lg"></div>
                </a>
              </div>
            ))}
          </nav>

          {/* Ultra Premium CTA Button */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              className={`relative inline-flex items-center px-8 py-4 rounded-2xl font-bold text-white transition-all duration-700 transform hover:scale-110 hover:rotate-1 group overflow-hidden shadow-2xl ${
                isScrolled
                  ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700'
                  : 'bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600'
              }`}
              style={{
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Multiple animated backgrounds */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-shift"></div>
              <div className="absolute inset-0 bg-gradient-to-45deg from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Sparkle icon */}
              <Sparkles className="w-5 h-5 mr-2 relative z-10 animate-spin group-hover:animate-pulse" />
              
              {/* Button text with gradient */}
              <span className="relative z-10 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent font-extrabold tracking-wide">
                Get Started
              </span>
              
              {/* Multiple shine effects */}
              <div className="absolute inset-0 -top-2 -left-2 w-6 h-full bg-white/30 rotate-12 transform -translate-x-full group-hover:translate-x-[400px] transition-transform duration-1000 ease-out"></div>
              <div className="absolute inset-0 -top-1 -left-1 w-4 h-full bg-white/20 rotate-12 transform -translate-x-full group-hover:translate-x-[400px] transition-transform duration-1200 ease-out animation-delay-200"></div>
              
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-xl -z-10 animate-pulse"></div>
            </a>
          </div>

          {/* Ultra Premium Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-4 rounded-2xl transition-all duration-700 transform hover:scale-125 hover:rotate-180 group overflow-hidden ${
              isScrolled 
                ? 'text-gray-700 bg-white/80 backdrop-blur-xl shadow-2xl border border-gray-200/50' 
                : 'text-white bg-white/10 backdrop-blur-xl border border-white/20'
            }`}
            style={{
              boxShadow: isScrolled 
                ? '0 10px 30px rgba(0, 0, 0, 0.1)' 
                : '0 10px 30px rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="relative">
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              {/* Button magical glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg -z-10 animate-pulse"></div>
            </div>
          </button>
        </div>

        {/* Ultra Premium Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-8 bg-white/95 backdrop-blur-3xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden animate-slide-in-down"
               style={{
                 boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)'
               }}>
            {/* Premium gradient header */}
            <div className="h-3 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 animate-gradient-shift"></div>
            
            <nav className="py-8 space-y-1">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block mx-4 px-6 py-5 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:via-purple-50 hover:to-pink-50 hover:text-blue-600 transition-all duration-700 font-semibold text-lg transform hover:scale-105 hover:translate-x-4 relative group rounded-2xl overflow-hidden"
                  onClick={() => setIsOpen(false)}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animation: 'slide-in-left 0.8s ease-out forwards'
                  }}
                >
                  <span className="relative z-10">{item.name}</span>
                  
                  {/* Premium hover effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  <div className="absolute left-0 top-1/2 w-2 h-0 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 group-hover:h-full group-hover:top-0 transition-all duration-500 rounded-r-full"></div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
                </a>
              ))}
              
              {/* Premium Mobile CTA Button */}
              <div className="px-8 pt-8 pb-4">
                <a
                  href="#contact"
                  className="block w-full text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white px-8 py-6 rounded-2xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:rotate-1 font-bold text-lg relative overflow-hidden group"
                  onClick={() => setIsOpen(false)}
                  style={{
                    boxShadow: '0 15px 35px rgba(59, 130, 246, 0.4)'
                  }}
                >
                  {/* Multiple animated backgrounds */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="w-5 h-5 relative z-10 animate-spin group-hover:animate-pulse" />
                    <span className="relative z-10 font-extrabold">Get Started</span>
                  </div>
                  
                  {/* Multiple shine effects */}
                  <div className="absolute inset-0 -top-2 -left-2 w-6 h-full bg-white/30 rotate-12 transform -translate-x-full group-hover:translate-x-[400px] transition-transform duration-1000 ease-out"></div>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Enhanced floating particles with premium effects */}
      {!isScrolled && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated particles */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-float shadow-lg shadow-blue-400/50"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float-reverse animation-delay-1000 shadow-lg shadow-purple-400/50"></div>
          <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-sparkle animation-delay-2000 shadow-lg shadow-pink-400/50"></div>
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full animate-float animation-delay-3000 shadow-lg shadow-indigo-400/50"></div>
          <div className="absolute bottom-1/3 right-1/5 w-3 h-3 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full animate-sparkle animation-delay-4000 shadow-lg shadow-cyan-400/50"></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-3/4 left-1/5 w-6 h-6 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 transform rotate-45 animate-float-reverse animation-delay-1500"></div>
          <div className="absolute top-1/5 right-1/2 w-4 h-4 bg-gradient-to-r from-green-400/30 to-emerald-400/30 transform rotate-12 animate-sparkle animation-delay-2500"></div>
        </div>
      )}

      {/* Premium border gradient */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 via-purple-500/50 via-pink-500/50 to-transparent transition-opacity duration-1000 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`}></div>
    </header>
  );
};

export default Header;
