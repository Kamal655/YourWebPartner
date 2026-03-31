import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Monitor, Palette, Code, Search, Sparkles, Zap, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Title Animation
    gsap.from(titleRef.current?.children || [], {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out"
    });

    // 2. Cards Stagger Animation
    // using fromTo for robustness
    gsap.fromTo(".service-card",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // 3. Background Elements Parallax
    gsap.to(".bg-shape", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      },
      y: 100,
      ease: "none"
    });

  }, { scope: containerRef });

  const services = [
    {
      icon: <Monitor className="w-16 h-16 text-blue-500" />,
      title: "Web Design",
      description: "Beautiful, modern designs that capture your brand's essence and engage your audience with stunning visual experiences.",
      color: "blue",
      gradient: "from-blue-600 to-cyan-500",
      link: "/web-design",
      features: [
        "Custom responsive design",
        "5 unique page layouts",
        "Mobile-first approach",
        "Brand integration",
        "3 rounds of revisions"
      ]
    },
    {
      icon: <Code className="w-16 h-16 text-purple-500" />,
      title: "Web Development",
      description: "Custom websites built with the latest technologies for optimal performance, functionality, and user experience.",
      color: "purple",
      gradient: "from-purple-600 to-pink-500",
      link: "/web-development",
      features: [
        "Modern React/Next.js build",
        "Database integration",
        "API development",
        "Performance optimization",
        "Security implementation"
      ]
    },
    {
      icon: <Palette className="w-16 h-16 text-pink-500" />,
      title: "UI/UX Design",
      description: "User-centered design that creates intuitive and enjoyable experiences for your visitors and customers.",
      color: "pink",
      gradient: "from-pink-600 to-rose-500",
      link: "/ui-ux-design",
      features: [
        "User research & personas",
        "Wireframes & prototypes",
        "Interactive mockups",
        "Usability testing",
        "Design system creation"
      ]
    },
    {
      icon: <Search className="w-16 h-16 text-green-500" />,
      title: "SEO Optimization",
      description: "Boost your online visibility with our comprehensive SEO strategies and cutting-edge optimization techniques.",
      color: "green",
      gradient: "from-green-500 to-emerald-500",
      link: "/seo-optimization",
      features: [
        "Keyword research & strategy",
        "On-page optimization",
        "Technical SEO audit",
        "Content optimization",
        "Monthly performance reports"
      ]
    }
  ];

  return (
    <>
      {/* ───────────── Meta / Open‑Graph / Twitter Tags ───────────── */}
      <Helmet>
        <title>Our Services - Web Design, Development & SEO | YourWebPartner</title>
        <meta
          name="description"
          content="Explore full-stack web design, custom development, UI/UX and SEO services tailored to grow your business online."
        />
        <meta property="og:title" content="Our Services – YourWebPartner" />
        <meta
          property="og:description"
          content="Beautiful web design, high-performance development, and expert SEO solutions—see how we can level-up your digital presence."
        />
        <meta property="og:url" content="https://www.yourwebpartner.in/services" />
        <meta property="og:image" content="https://www.yourwebpartner.in/og-services.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* ───────────── Main Services Section ───────────── */}
      <section
        id="services"
        ref={containerRef}
        className="py-32 bg-background relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-shape absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
          <div className="bg-shape absolute bottom-20 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px]"></div>
          <Sparkles className="absolute top-32 right-1/4 w-6 h-6 text-blue-400/50 animate-sparkle" />
          <Zap className="absolute bottom-48 left-1/3 w-8 h-8 text-purple-400/50 animate-bounce" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div ref={titleRef} className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent bg-300% animate-gradient-shift">Services</span>
            </h2>
            <p className="text-2xl text-gray-400 max-w-4xl mx-auto">
              We offer comprehensive web solutions to help your business <span className="text-purple-400 font-semibold">thrive online</span>
            </p>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className={`service-card group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-500 hover:-translate-y-4 hover:rotate-1 cursor-pointer overflow-hidden block`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  boxShadow:
                    hoveredIndex === index
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(168, 85, 247, 0.2)'
                      : '0 10px 25px -3px rgba(0, 0, 0, 0.2)',
                }}
              >
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-3xl`}
                ></div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift bg-300% p-[1px] pointer-events-none">
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  <div className="mb-6 transform group-hover:scale-110 transition-all duration-500 flex justify-center">
                    <div className="relative p-4 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors duration-500">
                      {service.icon}
                      {hoveredIndex === index && (
                        <div className="absolute inset-0 animate-ping">
                          {React.cloneElement(service.icon, {
                            className: `w-16 h-16 text-${service.color}-400 opacity-20`,
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300 text-center">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed text-sm mb-6 text-center flex-grow">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8 bg-black/20 p-4 rounded-xl">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-300">
                        <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Animated elements that appear on hover */}
                  <div className="mt-auto">
                    <div
                      className={`w-full py-3 rounded-xl bg-white/10 text-center text-sm font-semibold text-white group-hover:bg-gradient-to-r ${service.gradient} transition-all duration-500 flex items-center justify-center gap-2`}
                    >
                      <span>Learn More</span>
                      <div className={`w-2 h-2 rounded-full bg-white animate-pulse`}></div>
                    </div>
                  </div>
                </div>

                {/* Floating particles on hover */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <a href="/#contact" className="group relative px-12 py-6 bg-transparent text-white text-xl font-bold rounded-full transition-all duration-500 transform hover:scale-105 overflow-hidden border border-white/20 hover:border-white/40 inline-flex items-center">
              <span className="relative z-10 flex items-center gap-2">
                Get Started Today
                <Sparkles className="w-5 h-5 group-hover:animate-spin" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
