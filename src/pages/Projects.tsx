
import React, { useState } from 'react';
import { ExternalLink, Github, Star, Zap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const projects = [
    {
      title: "E-commerce Store",
      category: "Online Retail",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Modern e-commerce platform with seamless shopping experience and advanced payment integration",
      tech: ["React", "Node.js", "Stripe"],
      color: "blue",
      client: "TechMart",
      year: "2024",
      duration: "3 months"
    },
    {
      title: "Restaurant Website",
      category: "Food & Beverage",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Elegant restaurant website with online reservation system and interactive menu",
      tech: ["Vue.js", "Firebase", "Stripe"],
      color: "green",
      client: "Bella Vista",
      year: "2024",
      duration: "2 months"
    },
    {
      title: "Real Estate Portal",
      category: "Real Estate",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Comprehensive property listing platform with advanced search and virtual tours",
      tech: ["Angular", "MongoDB", "Maps API"],
      color: "purple",
      client: "PropFinder",
      year: "2023",
      duration: "4 months"
    },
    {
      title: "Healthcare Clinic",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Professional medical website with appointment booking and patient portal",
      tech: ["React", "Express", "MySQL"],
      color: "red",
      client: "MediCare Plus",
      year: "2023",
      duration: "3 months"
    },
    {
      title: "Tech Startup",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Innovative startup website with modern design and interactive animations",
      tech: ["Next.js", "GraphQL", "AWS"],
      color: "indigo",
      client: "InnovateTech",
      year: "2024",
      duration: "2 months"
    },
    {
      title: "Fashion Boutique",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Stylish fashion website with elegant product showcase and social integration",
      tech: ["Shopify", "React", "Instagram API"],
      color: "pink",
      client: "StyleHub",
      year: "2024",
      duration: "3 months"
    },
    {
      title: "Educational Platform",
      category: "Education",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Interactive learning platform with video courses and progress tracking",
      tech: ["React", "Node.js", "MongoDB"],
      color: "yellow",
      client: "EduPro",
      year: "2023",
      duration: "5 months"
    },
    {
      title: "Financial Dashboard",
      category: "Finance",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Advanced financial analytics dashboard with real-time data visualization",
      tech: ["React", "D3.js", "Python"],
      color: "emerald",
      client: "FinTech Solutions",
      year: "2024",
      duration: "4 months"
    },
    {
      title: "Travel Agency",
      category: "Travel",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Beautiful travel booking website with destination galleries and booking system",
      tech: ["Vue.js", "Laravel", "Stripe"],
      color: "cyan",
      client: "Wanderlust Travel",
      year: "2023",
      duration: "3 months"
    }
  ];

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-32 left-20 w-72 h-72 bg-blue-500 rounded-full opacity-10 animate-morph-blob"></div>
          <div className="absolute bottom-32 right-20 w-64 h-64 bg-purple-500 rounded-full opacity-10 animate-liquid-morph"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center mb-8">
            <Link 
              to="/#portfolio" 
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Portfolio</span>
            </Link>
          </div>

          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              All <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Projects</span>
            </h1>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
              Explore our complete portfolio of web development projects and see how we've helped businesses succeed online
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl transition-all duration-700 transform hover:-translate-y-8 hover:rotate-2 hover:scale-105 cursor-pointer"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  boxShadow: hoveredProject === index 
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 50px rgba(168, 85, 247, 0.4)' 
                    : '0 10px 25px -3px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Image container */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                  
                  {/* Tech badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className={`absolute top-4 right-4 flex space-x-2 transform transition-all duration-500 ${hoveredProject === index ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </button>
                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300">
                      <Github className="w-5 h-5 text-white" />
                    </button>
                  </div>

                  {/* Category badge */}
                  <div className="absolute bottom-4 right-4">
                    <span className={`px-4 py-2 bg-gradient-to-r from-${project.color}-500 to-${project.color}-600 rounded-full text-sm font-bold text-white`}>
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content section */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3 group-hover:text-white transition-colors duration-300">
                    {project.description}
                  </p>
                  
                  {/* Project details */}
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>Client: {project.client}</span>
                    <span>{project.year}</span>
                    <span>{project.duration}</span>
                  </div>
                </div>

                {/* Sparkle effects */}
                {hoveredProject === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute animate-sparkle"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      >
                        <Zap className="w-4 h-4 text-yellow-400" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
            <p className="text-xl text-gray-300 mb-8">
              Let's create something amazing together
            </p>
            <Link 
              to="/#contact"
              className="inline-block px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-xl font-bold rounded-full hover:shadow-2xl transition-all duration-500 transform hover:scale-110"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
