import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Zap, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '@/integrations/supabase/client';

const DEFAULT_PROJECTS = [
  // --- E-Commerce & Retail ---
  {
    title: "LuxeFashion Global",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Premium fashion marketplace with AI-driven style recommendations and AR virtual try-on.",
    tech: ["Next.js", "Shopify Plus", "TensorFlow.js"],
    color: "pink",
    client: "Luxe Brands Ltd",
    year: "2024",
    duration: "5 months"
  },
  {
    title: "UrbanPicks Store",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1472851294608-415522f97817?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Multi-vendor marketplace for streetwear enthusiasts with real-time auction functionality.",
    tech: ["React", "Node.js", "Socket.io"],
    color: "blue",
    client: "Urban Retail",
    year: "2024",
    duration: "4 months"
  },
  {
    title: "EcoGrocery Direct",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Sustainable grocery delivery app with route optimization and carbon footprint tracking.",
    tech: ["Vue.js", "Firebase", "Google Maps API"],
    color: "green",
    client: "Green Earth",
    year: "2023",
    duration: "3 months"
  },
  {
    title: "TechGear Pro",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "B2B electronics component sourcing platform with bulk ordering and ERP integration.",
    tech: ["Angular", ".NET Core", "Azure"],
    color: "blue",
    client: "TG Industries",
    year: "2023",
    duration: "6 months"
  },

  // --- Real Estate & Property ---
  {
    title: "Skyline Realty",
    category: "Real Estate",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Luxury property portal featuring 360-degree virtual tours and mortgage calculators.",
    tech: ["React", "Matterport API", "AWS"],
    color: "purple",
    client: "Skyline Group",
    year: "2024",
    duration: "4 months"
  },
  {
    title: "UrbanNest Rentals",
    category: "Real Estate",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Short-term rental platform for digital nomads with automated booking management.",
    tech: ["Next.js", "Supabase", "Stripe Connect"],
    color: "orange",
    client: "UrbanNest",
    year: "2024",
    duration: "3 months"
  },
  {
    title: "Commercial Hub",
    category: "Real Estate",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Investment analysis tool for commercial real estate portfolios.",
    tech: ["Python", "Django", "D3.js"],
    color: "gray",
    client: "Hub Invest",
    year: "2023",
    duration: "5 months"
  },

  // --- Fintech & Banking ---
  {
    title: "NovaBank Mobile",
    category: "Fintech",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Neobank mobile application interface with spending analytics and goal tracking.",
    tech: ["React Native", "Node.js", "Plaid"],
    color: "emerald",
    client: "Nova Financial",
    year: "2024",
    duration: "6 months"
  },
  {
    title: "CryptoVault",
    category: "Fintech",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Secure non-custodial wallet dashboard for managing multi-chain assets.",
    tech: ["Web3.js", "Solidity", "Rust"],
    color: "indigo",
    client: "BlockSecure",
    year: "2024",
    duration: "4 months"
  },
  {
    title: "InsureTech Dash",
    category: "Fintech",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "AI-powered claim processing dashboard for insurance agents.",
    tech: ["Vue.js", "Python ML", "PostgreSQL"],
    color: "cyan",
    client: "InsureOne",
    year: "2023",
    duration: "5 months"
  },

  // --- Healthcare & Wellness ---
  {
    title: "VitalCheck Teleheatlh",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "HIPAA-compliant telemedicine platform connecting patients with specialists worldwide.",
    tech: ["WebRTC", "React", "Node.js"],
    color: "red",
    client: "Vital Health",
    year: "2024",
    duration: "7 months"
  },
  {
    title: "Mindful Space",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Meditation and wellness app with personalized daily routines and mood tracking.",
    tech: ["Flutter", "Firebase", "Sanity CMS"],
    color: "teal",
    client: "Mindful Corp",
    year: "2023",
    duration: "3 months"
  },
  {
    title: "PharmaSupply B2B",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Supply chain management system for pharmaceutical distributors.",
    tech: ["Java", "Spring Boot", "React"],
    color: "blue",
    client: "PharmaLink",
    year: "2023",
    duration: "8 months"
  },

  // --- Travel & Hospitality ---
  {
    title: "Wanderlust Travels",
    category: "Travel",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Immersive travel booking platform with customized itinerary planning features.",
    tech: ["Next.js", "Mapbox", "Amadeus API"],
    color: "orange",
    client: "Wanderlust Inc",
    year: "2024",
    duration: "4 months"
  },
  {
    title: "DineEasy Reserve",
    category: "Travel",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Restaurant table reservation system with dynamic floor plan management.",
    tech: ["Vue.js", "Laravel", "Twilio"],
    color: "red",
    client: "Dine Group",
    year: "2024",
    duration: "3 months"
  },
  {
    title: "Hotelier Pro",
    category: "Travel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Property management system for independent boutique hotels.",
    tech: ["React", "Go", "PostgreSQL"],
    color: "purple",
    client: "Hotelier Systems",
    year: "2023",
    duration: "6 months"
  },

  // --- Education & EdTech ---
  {
    title: "LearnWave Academy",
    category: "Education",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Interactive learning management system with video courses and live quizzes.",
    tech: ["MERN Stack", "AWS S3", "Vimeo API"],
    color: "yellow",
    client: "LearnWave",
    year: "2024",
    duration: "5 months"
  },
  {
    title: "KidCode Jr",
    category: "Education",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Gamified coding platform for children ages 6-12.",
    tech: ["React", "Phaser.js", "Node.js"],
    color: "green",
    client: "KidCode",
    year: "2023",
    duration: "4 months"
  },
  {
    title: "UniConnect",
    category: "Education",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Networking and mentorship portal for university alumni and students.",
    tech: ["Django", "PostgreSQL", "Redis"],
    color: "blue",
    client: "Global University",
    year: "2023",
    duration: "3 months"
  },

  // --- Corporate & Enterprise ---
  {
    title: "InnovateTech Corp",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "High-performance corporate website with investor relations portal.",
    tech: ["Next.js", "Strapi", "Vercel"],
    color: "indigo",
    client: "InnovateTech",
    year: "2024",
    duration: "2 months"
  },
  {
    title: "LogiStream CMS",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Internal content management system for global logistics documentation.",
    tech: ["Angular", "SharePoint", "Azure"],
    color: "blue",
    client: "Logi Worldwide",
    year: "2024",
    duration: "5 months"
  },
  {
    title: "LegalFlow Pro",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Case management software for mid-sized law firms.",
    tech: ["React", ".NET", "SQL Server"],
    color: "slate",
    client: "Legal Partners",
    year: "2023",
    duration: "6 months"
  },
  {
    title: "HR Pulse",
    category: "Corporate",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Employee engagement and performance review platform.",
    tech: ["Vue.js", "Ruby on Rails", "PostgreSQL"],
    color: "rose",
    client: "PeopleFirst",
    year: "2023",
    duration: "4 months"
  },

  // --- Creative & Portfolio ---
  {
    title: "Studio Noir Portfolio",
    category: "Creative",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Minimalist 3D portfolio for an award-winning design agency.",
    tech: ["Three.js", "React", "WebGL"],
    color: "black",
    client: "Studio Noir",
    year: "2024",
    duration: "2 months"
  },
  {
    title: "PhotoLens Gallery",
    category: "Creative",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "High-resolution photography archive with smart tagging and licensing.",
    tech: ["Next.js", "Cloudinary", "Stripe"],
    color: "violet",
    client: "Lens Media",
    year: "2023",
    duration: "3 months"
  },
  {
    title: "MusicStream App",
    category: "Creative",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Indie music streaming platform for unsigned artists.",
    tech: ["Flutter Web", "Firebase", "FFmpeg"],
    color: "purple",
    client: "IndieSound",
    year: "2024",
    duration: "5 months"
  },

  // --- Food & Beverage ---
  {
    title: "Bistro Reserve",
    category: "Food",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Online ordering and table booking system for a restaurant chain.",
    tech: ["React", "Express", "MongoDB"],
    color: "orange",
    client: "Bistro Chain",
    year: "2024",
    duration: "3 months"
  },
  {
    title: "Coffee Culture",
    category: "Food",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Subscription management platform for specialty coffee beans.",
    tech: ["Shopify Liquid", "Js", "Recharge"],
    color: "brown",
    client: "Coffee Culture",
    year: "2023",
    duration: "2 months"
  },
  {
    title: "FarmToTable",
    category: "Food",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Marketplace connecting local organic farmers directly with consumers.",
    tech: ["Next.js", "Stripe", "PostgreSQL"],
    color: "green",
    client: "Local Farms",
    year: "2023",
    duration: "4 months"
  },

  // --- Non-Profit & NGO ---
  {
    title: "CleanOcean Initiative",
    category: "Non-Profit",
    image: "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Donation and awareness platform for ocean conservation efforts.",
    tech: ["WordPress", "React", "Donation API"],
    color: "cyan",
    client: "Ocean NGO",
    year: "2024",
    duration: "2 months"
  },
  {
    title: "EduForAll",
    category: "Non-Profit",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Volunteer management system for rural education programs.",
    tech: ["React", "Firebase", "Google Maps"],
    color: "yellow",
    client: "Edu Foundation",
    year: "2023",
    duration: "3 months"
  }
];

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [loading, setLoading] = useState(true);

  // Fetch projects from Supabase
  useEffect(() => {
    interface ProjectRow {
      title: string;
      category: string;
      image_url: string;
      description: string | null;
      tech: string[] | null;
      color: string | null;
      client: string | null;
      year: string | null;
      duration: string | null;
    }

    // ... inside component
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching projects:', error);
          // Keep default projects on error
        } else if (data && data.length > 0) {
          // Map Supabase data to match component structure
          const mappedProjects = (data as ProjectRow[]).map((item) => ({
            title: item.title,
            category: item.category,
            image: item.image_url, // map image_url to image
            description: item.description || "Portfolio Project",
            tech: item.tech || [],
            color: item.color || "blue",
            client: item.client || "Client",
            year: item.year || "2024",
            duration: item.duration || "Ongoing"
          }));
          if (mappedProjects.length > 0) {
            setProjects(mappedProjects);
          } else {
            setProjects(DEFAULT_PROJECTS);
          }
        }
      } catch (err) {
        console.error('Unexpected error fetching projects:', err);
        setProjects(DEFAULT_PROJECTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category
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
                    {project.tech && project.tech.map((tech) => (
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
