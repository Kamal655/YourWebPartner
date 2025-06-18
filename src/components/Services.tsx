import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Monitor, Palette, Code, Search, Sparkles, Zap, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      icon: <Monitor className="w-16 h-16 text-blue-600" />,
      title: "Web Design",
      description: "Beautiful, modern designs that capture your brand's essence and engage your audience with stunning visual experiences.",
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
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
      icon: <Code className="w-16 h-16 text-purple-600" />,
      title: "Web Development",
      description: "Custom websites built with the latest technologies for optimal performance, functionality, and user experience.",
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
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
      icon: <Palette className="w-16 h-16 text-pink-600" />,
      title: "UI/UX Design",
      description: "User-centered design that creates intuitive and enjoyable experiences for your visitors and customers.",
      color: "pink",
      gradient: "from-pink-500 to-rose-500",
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
      icon: <Search className="w-16 h-16 text-green-600" />,
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
        <title>Our Services – Web Design, Development & SEO | YourWebPartner</title>
        <meta
          name="description"
          content="Explore full‑stack web design, custom development, UI/UX and SEO services tailored to grow your business online."
        />
        <meta property="og:title" content="Our Services – YourWebPartner" />
        <meta
          property="og:description"
          content="Beautiful web design, high‑performance development, and expert SEO solutions—see how we can level‑up your digital presence."
        />
        <meta property="og:url" content="https://www.yourwebpartner.in/services" />
        <meta property="og:image" content="https://www.yourwebpartner.in/og-services.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* ───────────── Main Services Section ───────────── */}
      <section
        id="services"
        className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full opacity-50 animate-float animation-delay-1000"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-100 rounded-full opacity-50 animate-float-reverse animation-delay-2000"></div>
          <Sparkles className="absolute top-32 right-1/4 w-6 h-6 text-blue-400 animate-sparkle animation-delay-500" />
          <Zap className="absolute bottom-48 left-1/3 w-8 h-8 text-purple-400 animate-bounce animation-delay-1500" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-slide-in-down">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-shift bg-300%">Services</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto animate-slide-in-up animation-delay-300">
              We offer comprehensive web solutions to help your business <span className="text-purple-600 font-semibold">thrive online</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className={`group relative p-8 rounded-3xl bg-white border border-gray-100 hover:border-transparent transition-all duration-700 transform hover:-translate-y-8 hover:rotate-2 hover:scale-105 animate-zoom-in animation-delay-${500 + index * 200} cursor-pointer overflow-hidden block`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  boxShadow:
                    hoveredIndex === index
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 50px rgba(168, 85, 247, 0.3)'
                      : '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-3xl`}
                ></div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-shift bg-300% p-[2px]">
                  <div className="w-full h-full bg-white rounded-3xl"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 flex justify-center">
                    <div className="relative">
                      {service.icon}
                      {hoveredIndex === index && (
                        <div className="absolute inset-0 animate-ping">
                          {React.cloneElement(service.icon, {
                            className: `w-16 h-16 text-${service.color}-300 opacity-30`,
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-sm mb-6 group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Animated elements that appear on hover */}
                  <div
                    className={`transform transition-all duration-500 ${
                      hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-purple-600">Learn More</span>
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>

                {/* Floating particles on hover */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-purple-400 rounded-full animate-sparkle"
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
          <div className="text-center mt-20 animate-slide-in-up animation-delay-1500">
            <button className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-xl font-bold rounded-full hover:shadow-2xl transition-all duration-500 transform hover:scale-110 animate-gradient-shift bg-300% overflow-hidden">
              <span className="relative z-10">Get Started Today</span>
              <div className="absolute inset-0 bg-white opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
