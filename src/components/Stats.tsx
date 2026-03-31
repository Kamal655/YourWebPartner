import React, { useRef } from 'react';
import { Users, Award, Clock, Heart } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/button';

gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
  const containerRef = useRef<HTMLElement>(null);

  const stats = [
    {
      label: 'Global Clients',
      value: '120+',
      icon: <Users className="w-8 h-8 text-white" />,
      bg: 'bg-gradient-to-br from-blue-400 to-blue-600',
      shadow: 'shadow-blue-400/30',
      colorClass: 'text-blue-500'
    },
    {
      label: 'Projects Delivered',
      value: '250+',
      icon: <Award className="w-8 h-8 text-white" />,
      bg: 'bg-gradient-to-br from-purple-400 to-fuchsia-600',
      shadow: 'shadow-purple-400/30',
      colorClass: 'text-fuchsia-500'
    },
    {
      label: 'Years of Excellence',
      value: '5+',
      icon: <Clock className="w-8 h-8 text-white" />,
      bg: 'bg-gradient-to-br from-emerald-400 to-green-600',
      shadow: 'shadow-emerald-400/30',
      colorClass: 'text-emerald-500'
    },
    {
      label: 'Average Rating',
      value: '4.9/5',
      icon: <Heart className="w-8 h-8 text-white" />,
      bg: 'bg-gradient-to-br from-orange-400 to-amber-500',
      shadow: 'shadow-orange-400/30',
      colorClass: 'text-rose-500'
    },
  ];

  useGSAP(() => {
    // Animate the main text card
    gsap.from(".main-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    // Animate the stat cards on the right
    gsap.from(".stat-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      scale: 0.8,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "back.out(1.7)"
    });
  }, { scope: containerRef }); 

  return (
    <section ref={containerRef} id="about" className="py-24 bg-background relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* Left Column: Main Text Card */}
          <div className="lg:w-1/2 main-card bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 flex flex-col justify-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Crafting Digital <span className="text-orange-500">Masterpieces</span>
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Founded with a vision to revolutionize the digital landscape,
              we combine cutting-edge technology with creative excellence
              to deliver solutions that don't just meet expectations—they
              exceed them.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Our team of passionate designers and developers work tirelessy
              to ensure every project is a testament to innovation,
              quality, and client satisfaction.
            </p>
            <div>
              <Button className="bg-[#D9264F] hover:bg-[#b01e3f] text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-pink-500/30 transition-all hover:scale-105">
                Learn More About Us
              </Button>
            </div>
          </div>

          {/* Right Column: Stats Grid */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card bg-white rounded-[2rem] p-6 flex flex-col items-center justify-center text-center shadow-lg shadow-gray-100/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`mb-4 w-16 h-16 rounded-full ${stat.bg} flex items-center justify-center shadow-lg ${stat.shadow}`}>
                  {stat.icon}
                </div>
                <h3 className={`text-3xl font-bold mb-2 ${stat.colorClass}`}>
                  {stat.value}
                </h3>
                <p className="text-slate-600 font-semibold text-sm sm:text-base">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Stats;
