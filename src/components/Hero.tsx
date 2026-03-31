import React, { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Lazy load heavy 3D background
const HeroBackground3D = lazy(() => import('./HeroBackground3D'));

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [displayText, setDisplayText] = useState("Digital Excellence.");
  const finalHeadline = "Excellence.";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  gsap.registerPlugin(useGSAP);

  // Text Scramble Effect
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev =>
        finalHeadline
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return finalHeadline[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= finalHeadline.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Initial State Set
    gsap.set([sublineRef.current, badgeRef.current, socialRef.current], {
      opacity: 0,
      y: 30
    });

    if (headlineRef.current?.children) {
      gsap.set(headlineRef.current.children, { opacity: 0, y: 30 });
    }
    if (buttonsRef.current?.children) {
      gsap.set(buttonsRef.current.children, { opacity: 0, y: 30 });
    }

    // 2. Staggered Entrance
    tl.to(badgeRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
      .to(headlineRef.current?.children || [], {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power4.out'
      }, "-=0.4")
      .to(sublineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, "-=0.6")
      .to(buttonsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }, "-=0.4")
      .to(socialRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, "-=0.4");

  }, { scope: containerRef });

  // Custom Cursor Logic
  useGSAP(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Magnetic button effect
      const buttons = document.querySelectorAll('.magnetic-btn');
      buttons.forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < 100) {
          gsap.to(btn, {
            x: deltaX * 0.2,
            y: deltaY * 0.2,
            duration: 0.3,
            ease: 'power2.out'
          });
        } else {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" ref={containerRef} className="min-h-screen relative overflow-hidden bg-background text-foreground flex items-center justify-center pt-20">

      {/* 1. 3D Background - Lazy Loaded for Performance */}
      <React.Suspense fallback={null}>
        <div className="absolute inset-0 z-0">
          <HeroBackground3D />
        </div>
      </React.Suspense>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Superior "Badge" */}
        <div ref={badgeRef} className="opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium tracking-wide text-gray-300">Accepting New Projects for 2026</span>
        </div>

        {/* Main Headline with Staggered Reveal */}
        <h1 ref={headlineRef} className="text-4xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight mb-8 leading-[1.1]">
          <span className="block bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent opacity-0 translate-y-8">
            Digital
          </span>
          {/* Hacker Text Effect */}
          <span className="block bg-gradient-to-r from-primary via-accent to-blue-500 bg-clip-text text-transparent pb-4 opacity-0 translate-y-8 min-h-[1.1em]">
            {displayText}
          </span>
        </h1>

        <p ref={sublineRef} className="opacity-0 text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8 md:mb-12 font-light leading-relaxed">
          We craft <span className="text-white font-medium">bespoke digital experiences</span> that elevate brands and captivate audiences. Your vision, masterfully engineered.
        </p>

        {/* CTA Buttons - Magnetic */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a
            href="/#contact"
            className="magnetic-btn relative px-8 py-4 rounded-full font-bold text-lg text-white transition-all duration-700 transform hover:scale-110 hover:rotate-1 group overflow-hidden shadow-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700"
            style={{
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Multiple animated backgrounds */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-shift"></div>

            <div className="flex items-center gap-2 relative z-10">
              <Sparkles className="w-5 h-5 animate-spin-slow group-hover:animate-pulse" />
              <span className="drop-shadow-md">Start Your Project</span>
            </div>

            {/* Shine effects */}
            <div className="absolute inset-0 -top-2 -left-2 w-6 h-full bg-white/30 rotate-12 transform -translate-x-full group-hover:translate-x-[400px] transition-transform duration-1000 ease-out"></div>
          </a>

          <a
            href="/#portfolio"
            className="magnetic-btn group px-8 py-4 rounded-full font-semibold text-lg text-white border border-white/20 hover:bg-white/5 hover:border-white/40 transition-all duration-300 backdrop-blur-sm flex items-center gap-2"
          >
            <span>View Portfolio</span>
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Social Proof / Trust Indicators */}
        <div ref={socialRef} className="opacity-0 mt-16 md:mt-24 pt-8 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {['Strategic Design', 'Next-Gen Dev', 'SEO Dominance', 'Brand Identity'].map((item, i) => (
            <div key={i} className="text-center group hover:scale-105 transition-transform duration-300">
              <p className="text-sm font-display font-semibold text-gray-400 tracking-wider uppercase group-hover:text-white transition-colors">{item}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Decorative Grid - Faded */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20"></div>
    </section>
  );
};

export default Hero;
