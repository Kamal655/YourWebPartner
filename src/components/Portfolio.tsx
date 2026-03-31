import React, { useState } from 'react';
import { ExternalLink, Github, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PortfolioShowcase from './PortfolioShowcase';

const Portfolio = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      title: "E-commerce Store",
      category: "Online Retail",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Modern e-commerce platform with seamless shopping experience and advanced payment integration",
      tech: ["React", "Node.js", "Stripe"],
      color: "blue"
    },
    {
      title: "Restaurant Website",
      category: "Food & Beverage",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Elegant restaurant website with online reservation system and interactive menu",
      tech: ["Vue.js", "Firebase", "Stripe"],
      color: "green"
    },
    {
      title: "Real Estate Portal",
      category: "Real Estate",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Comprehensive property listing platform with advanced search and virtual tours",
      tech: ["Angular", "MongoDB", "Maps API"],
      color: "purple"
    },
    {
      title: "Healthcare Clinic",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Professional medical website with appointment booking and patient portal",
      tech: ["React", "Express", "MySQL"],
      color: "red"
    },
    {
      title: "Tech Startup",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Innovative startup website with modern design and interactive animations",
      tech: ["Next.js", "GraphQL", "AWS"],
      color: "indigo"
    },
    {
      title: "Fashion Boutique",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Stylish fashion website with elegant product showcase and social integration",
      tech: ["Shopify", "React", "Instagram API"],
      color: "pink"
    }
  ];

  return (
    <section id="portfolio" className="py-32 bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-20 w-72 h-72 bg-blue-500 rounded-full opacity-10 animate-morph-blob animation-delay-1000"></div>
        <div className="absolute bottom-32 right-20 w-64 h-64 bg-purple-500 rounded-full opacity-10 animate-liquid-morph animation-delay-2000"></div>
        
        {/* Floating geometric shapes */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          >
            <Star className="w-4 h-4 text-white" />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-bold mb-6 animate-slide-in-down">
            Our <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-shift bg-300%">Portfolio</span>
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto animate-slide-in-up animation-delay-300">
            Take a look at some of our recent projects and see how we've helped businesses 
            <span className="text-blue-400 font-semibold"> grow online</span>
          </p>
        </div>

        {/* Enhanced Portfolio Showcase */}
        <PortfolioShowcase />

        {/* Enhanced call to action */}
        <div className="text-center mt-20 animate-slide-in-up animation-delay-2000">
          <div className="inline-block">
            <Link 
              to="/projects"
              className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-xl font-bold rounded-full hover:shadow-2xl transition-all duration-500 transform hover:scale-110 animate-gradient-shift bg-300% overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>View All Projects</span>
                <ExternalLink className="w-6 h-6 group-hover:animate-bounce" />
              </span>
              <div className="absolute inset-0 bg-white opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
