
import React, { useState } from 'react';
import { ExternalLink, Github, Star, Zap, TrendingUp, Users, DollarSign } from 'lucide-react';

interface CaseStudy {
  title: string;
  category: string;
  image: string;
  description: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    icon: React.ReactNode;
  }[];
  tech: string[];
  color: string;
  timeline: string;
  client: string;
}

const PortfolioShowcase = () => {
  const [selectedProject, setSelectedProject] = useState<CaseStudy | null>(null);

  const caseStudies: CaseStudy[] = [
    {
      title: "E-commerce Revolution",
      category: "Online Retail",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Complete e-commerce transformation for a growing retail business",
      challenge: "Legacy system with poor conversion rates and mobile experience",
      solution: "Modern React-based platform with optimized checkout flow and mobile-first design",
      results: [
        { metric: "Conversion Rate", value: "+340%", icon: <TrendingUp className="w-5 h-5" /> },
        { metric: "Mobile Users", value: "+180%", icon: <Users className="w-5 h-5" /> },
        { metric: "Revenue", value: "+250%", icon: <DollarSign className="w-5 h-5" /> }
      ],
      tech: ["React", "Node.js", "Stripe", "MongoDB"],
      color: "blue",
      timeline: "8 weeks",
      client: "RetailPro Inc."
    },
    {
      title: "Restaurant Digital Experience",
      category: "Food & Beverage",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Digital transformation for premium restaurant chain",
      challenge: "Manual reservation system and lack of online presence",
      solution: "Integrated reservation system with online ordering and delivery tracking",
      results: [
        { metric: "Online Orders", value: "+420%", icon: <TrendingUp className="w-5 h-5" /> },
        { metric: "Table Bookings", value: "+190%", icon: <Users className="w-5 h-5" /> },
        { metric: "Customer Satisfaction", value: "98%", icon: <Star className="w-5 h-5" /> }
      ],
      tech: ["Vue.js", "Firebase", "Payment Gateway"],
      color: "green",
      timeline: "6 weeks",
      client: "Gourmet Bistro"
    },
    {
      title: "Real Estate Platform",
      category: "Real Estate",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Comprehensive property management and listing platform",
      challenge: "Outdated property search with poor user experience",
      solution: "AI-powered search with virtual tours and advanced filtering",
      results: [
        { metric: "Search Efficiency", value: "+280%", icon: <TrendingUp className="w-5 h-5" /> },
        { metric: "Lead Generation", value: "+320%", icon: <Users className="w-5 h-5" /> },
        { metric: "Property Views", value: "+450%", icon: <Star className="w-5 h-5" /> }
      ],
      tech: ["Angular", "MongoDB", "Maps API", "AI/ML"],
      color: "purple",
      timeline: "12 weeks",
      client: "PropertyMax"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {caseStudies.map((project, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-3xl transition-all duration-700 transform hover:-translate-y-8 hover:rotate-1 hover:scale-105 animate-zoom-in cursor-pointer"
            style={{
              animationDelay: `${300 + index * 150}ms`
            }}
            onClick={() => setSelectedProject(project)}
          >
            <div className="relative h-80 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
              
              {/* Quick Stats */}
              <div className="absolute top-4 left-4 space-y-2">
                {project.results.slice(0, 1).map((result, idx) => (
                  <div key={idx} className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    {result.icon}
                    <span className="text-white font-bold text-sm">{result.value}</span>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 bg-${project.color}-500 rounded-full text-white text-sm font-bold`}>
                    {project.category}
                  </span>
                  <span className="text-gray-300 text-sm">{project.timeline}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-t-3xl"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">{selectedProject.title}</h2>
                  <p className="text-xl text-gray-600">{selectedProject.client}</p>
                </div>
                <span className={`px-4 py-2 bg-${selectedProject.color}-500 text-white rounded-full font-bold`}>
                  {selectedProject.category}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Challenge</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProject.challenge}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Solution</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProject.solution}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedProject.results.map((result, index) => (
                    <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl">
                      <div className="flex justify-center mb-4 text-blue-600">
                        {result.icon}
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-2">{result.value}</div>
                      <div className="text-gray-600">{result.metric}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300">
                  <ExternalLink className="w-5 h-5" />
                  <span>View Live Site</span>
                </button>
                <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-50 transition-all duration-300">
                  <Github className="w-5 h-5" />
                  <span>View Code</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioShowcase;
