
import React, { useRef, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Users, Award, Clock, Heart, Sparkles, Star, Zap, ShieldCheck, TrendingUp, Target } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const bottomCtaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Force refresh to handle dynamic content height changes
    ScrollTrigger.refresh();

    // 1. Header Animation
    gsap.fromTo(headerRef.current?.children || [],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // 2. Main Content (Left Text)
    if (leftContentRef.current) {
      gsap.fromTo(leftContentRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftContentRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // 3. Main Content (Right Stats) - Staggered
    gsap.fromTo(rightContentRef.current?.children || [],
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightContentRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // 4. Values Cards Stagger
    gsap.fromTo(valuesRef.current?.children || [],
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: valuesRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // 5. Bottom CTA
    if (bottomCtaRef.current) {
      gsap.fromTo(bottomCtaRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: bottomCtaRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // 6. Background Parallax
    gsap.to(".bg-blob", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      },
      y: 150,
      ease: "none"
    });

  }, { scope: containerRef });

  // Static styling configuration to preserve premium look
  const styleConfig = [
    { color: "from-blue-500 to-cyan-400", bgColor: "bg-blue-500/10" },
    { color: "from-purple-500 to-pink-400", bgColor: "bg-purple-500/10" },
    { color: "from-green-500 to-emerald-400", bgColor: "bg-green-500/10" },
    { color: "from-yellow-400 to-orange-400", bgColor: "bg-yellow-500/10" }
  ];

  const [stats] = useState([
    { icon: <Users className="w-8 h-8" />, number: "120+", label: "Global Clients", ...styleConfig[0] },
    { icon: <Award className="w-8 h-8" />, number: "250+", label: "Projects Delivered", ...styleConfig[1] },
    { icon: <Clock className="w-8 h-8" />, number: "5+", label: "Years of Excellence", ...styleConfig[2] },
    { icon: <Star className="w-8 h-8" />, number: "4.9/5", label: "Average Rating", ...styleConfig[3] }
  ]);

  const values = [
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: "Pioneering Innovation",
      description: "Leveraging emerging technologies to create future-proof digital solutions that position your brand at the forefront of your industry.",
      gradient: "from-yellow-400 via-orange-500 to-red-500"
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "Uncompromising Excellence",
      description: "Delivering precision-engineered digital products where every detail is meticulously crafted to meet global standards of perfection.",
      gradient: "from-blue-400 via-purple-500 to-pink-500"
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Agile Efficiency",
      description: "Streamlined workflows and agile methodologies ensure rapid deployment without ever sacrificing the integrity or quality of your solution.",
      gradient: "from-green-400 via-blue-500 to-purple-500"
    },
    {
      icon: <ShieldCheck className="w-12 h-12" />,
      title: "Absolute Integrity",
      description: "Fostering long-term partnerships through complete clarity in pricing, processes, and communication. No hidden clauses, just honest collaboration.",
      gradient: "from-cyan-400 via-blue-500 to-indigo-500"
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Strategic Impact",
      description: "Aligning our technical expertise with your business objectives to deliver measurable ROI and sustainable market growth.",
      gradient: "from-pink-400 via-rose-500 to-red-500"
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Enduring Success",
      description: "Providing ongoing optimization and scalability support to ensure your digital presence evolves alongside your business ambitions.",
      gradient: "from-violet-400 via-purple-500 to-fuchsia-500"
    }
  ];

  return (
    <section id="about" ref={containerRef} className="py-32 bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-blob absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="bg-blob absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-pink-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="bg-blob absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-full blur-3xl"></div>

        {/* Floating Sparkles */}
        <Sparkles className="absolute top-20 right-1/4 w-8 h-8 text-yellow-500/20 animate-sparkle" />
        <Star className="absolute bottom-32 left-1/3 w-6 h-6 text-pink-500/20 animate-bounce" />
        <Zap className="absolute top-1/3 right-1/3 w-10 h-10 text-purple-500/20 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-8 shadow-lg shadow-purple-500/20 animate-pulse">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-6xl md:text-7xl font-bold mb-6 text-white">
            About{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-300% animate-gradient-shift">
              Our Journey
            </span>
          </h2>
          <p className="text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            We are more than a digital agency. We are the{' '}
            <span className="text-purple-400 font-bold">architects of your digital future</span>,
            turning ambitious visions into breathtaking realities.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left Content */}
          <div ref={leftContentRef}>
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:-translate-y-2">
              <h3 className="text-4xl font-bold text-white mb-6">
                Redefining Digital{' '}
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Excellence
                </span>
              </h3>
              <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                YourWebPartner wasn't built to just "make websites." It was born from a frustration with mediocrity.
                We saw too many businesses settling for cookie-cutter templates that failed to capture their unique essence.
                We knew there had to be a better way—a way to blend <strong>stunning aesthetics</strong> with <strong>powerful functionality</strong>.
              </p>
              <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                Today, we stand as a beacon for brands that refuse to blend in. Our team of visionary designers and
                master developers works in perfect sync to craft digital experiences that don't just look good—they feel right,
                perform flawlessly, and drive measurable growth. When you partner with us, you're not just getting a service provider;
                you're gaining a dedicated ally in your pursuit of greatness.
              </p>

              {/* Call to Action */}
              <a href="/#values" className="group relative px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden inline-block">
                <span className="relative z-10 flex items-center gap-2">
                  Read Our Full Story
                  <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </a>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div ref={rightContentRef} className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} backdrop-blur-sm rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-2 group cursor-pointer border border-white/5 hover:border-white/20`}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} text-white rounded-full mb-4 group-hover:scale-125 transition-transform duration-300 shadow-lg`}>
                  {stat.icon}
                </div>
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.number}
                </div>
                <div className="text-gray-400 font-semibold group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-16">
          <h3 className="text-5xl font-bold text-white mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Core Values
            </span>
          </h3>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            The guiding principles that drive our innovation and ensure your success.
          </p>
        </div>

        <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1 border border-white/10 hover:border-white/20 overflow-hidden"
            >
              {/* Animated Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-3xl`}></div>

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${value.gradient} text-white rounded-full mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl relative z-10`}>
                {value.icon}
              </div>

              {/* Content */}
              <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 transition-all duration-300 relative z-10">
                {value.title}
              </h4>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 relative z-10">
                {value.description}
              </p>

              {/* Hover Effect Particles */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.3}s`
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div ref={bottomCtaRef} className="text-center mt-20">
          <div className="bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-red-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 opacity-10 animate-pulse"></div>
            <div className="relative z-10">
              <h4 className="text-4xl font-bold mb-4">Ready to Build Your Legacy?</h4>
              <p className="text-xl mb-8 text-gray-300">Don't settle for ordinary. Let's build something extraordinary.</p>
              <a href="/#contact" className="group relative px-12 py-6 bg-white text-purple-600 font-bold rounded-full hover:shadow-2xl transition-all duration-500 transform hover:scale-110 overflow-hidden inline-block cursor-pointer">
                <span className="relative z-10">Start Your Project</span>
                <div className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  Contact Us Now
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
