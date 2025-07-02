
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Code, Database, Server, Smartphone, Globe, Zap, CheckCircle, Star, Shield, Rocket, Award, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const WebDevelopment = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const services = [
    {
      icon: <Code className="w-8 h-8 text-purple-600" />,
      title: "Frontend Development",
      description: "Modern, interactive user interfaces built with React, Vue, or Angular for seamless user experiences and optimal performance."
    },
    {
      icon: <Server className="w-8 h-8 text-blue-600" />,
      title: "Backend Development",
      description: "Robust, scalable server-side solutions with Node.js, Python, or PHP to power your web applications with enterprise-grade reliability."
    },
    {
      icon: <Database className="w-8 h-8 text-green-600" />,
      title: "Database Architecture",
      description: "Secure and scalable database solutions including MySQL, PostgreSQL, and MongoDB with optimized performance and data integrity."
    },
    {
      icon: <Globe className="w-8 h-8 text-indigo-600" />,
      title: "API Development & Integration",
      description: "RESTful APIs and GraphQL endpoints for seamless data communication, third-party integrations, and microservices architecture."
    }
  ];

  const pricingPlans = [
    {
      id: 'basic',
      name: 'Basic Development',
      originalPrice: '₹60,000',
      price: '₹35,000',
      duration: 'One-time',
      description: 'Perfect for small businesses and startups',
      features: [
        'Custom web application (5 pages)',
        'Frontend development (React/Vue)',
        'Basic backend integration',
        'Database setup & configuration',
        'Contact form & basic features',
        'Mobile responsive design',
        'Basic testing & deployment',
        '2 rounds of revisions',
        '30-day support'
      ],
      notIncluded: [
        'Advanced functionality',
        'Payment gateway integration',
        'Real-time features',
        'Advanced security features'
      ],
      popular: false,
      discount: '42% OFF',
      savings: 'Save ₹25,000'
    },
    {
      id: 'premium',
      name: 'Premium Development',
      originalPrice: '₹1,20,000',
      price: '₹65,000',
      duration: 'One-time',
      description: 'Most popular choice for growing businesses',
      features: [
        'Full-stack web application',
        'Advanced frontend (React/Vue/Angular)',
        'Robust backend development',
        'Database design & optimization',
        'User authentication system',
        'Payment gateway integration',
        'API development & integration',
        'Real-time features (if needed)',
        'Comprehensive testing',
        'Cloud deployment',
        '4 rounds of revisions',
        '60-day support'
      ],
      notIncluded: [
        'Enterprise-level scaling',
        'Advanced DevOps setup',
        'Multi-region deployment'
      ],
      popular: true,
      discount: '46% OFF',
      savings: 'Save ₹55,000'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Development',
      originalPrice: '₹2,50,000',
      price: '₹1,35,000',
      duration: 'One-time',
      description: 'Complete solution for large businesses',
      features: [
        'Enterprise-grade web application',
        'Advanced full-stack development',
        'Microservices architecture',
        'Advanced database solutions',
        'Complete user management',
        'Multiple payment gateways',
        'Advanced API ecosystem',
        'Real-time & WebSocket features',
        'Advanced security implementation',
        'Performance optimization',
        'DevOps & CI/CD pipeline',
        'Multi-region deployment',
        'Unlimited revisions',
        '6-month support',
        'Training & documentation'
      ],
      notIncluded: [],
      popular: false,
      discount: '46% OFF',
      savings: 'Save ₹1,15,000'
    }
  ];

  const technologies = [
    { name: "React & Next.js", color: "text-blue-600", category: "Frontend", icon: "⚛️" },
    { name: "Node.js & Express", color: "text-green-600", category: "Backend", icon: "🟢" },
    { name: "Python & Django", color: "text-yellow-600", category: "Backend", icon: "🐍" },
    { name: "MongoDB & PostgreSQL", color: "text-green-700", category: "Database", icon: "🗄️" },
    { name: "AWS & Azure", color: "text-orange-600", category: "Cloud", icon: "☁️" },
    { name: "Docker & Kubernetes", color: "text-blue-500", category: "DevOps", icon: "🐳" }
  ];

  const stats = [
    { number: "1000+", label: "Applications Built", icon: <Rocket className="w-6 h-6 text-purple-600" /> },
    { number: "99.9%", label: "Uptime Guaranteed", icon: <Shield className="w-6 h-6 text-green-600" /> },
    { number: "50%", label: "Performance Improvement", icon: <Zap className="w-6 h-6 text-yellow-600" /> },
    { number: "24/7", label: "Technical Support", icon: <Award className="w-6 h-6 text-blue-600" /> }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Enhanced Header with Floating Elements */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 text-white py-24 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-white/5 rounded-full animate-pulse"></div>
        </div>
        
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link 
            to="/#services" 
            className="inline-flex items-center space-x-2 text-purple-200 hover:text-white transition-all duration-300 mb-8 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/20 transform hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Services</span>
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block animate-pulse">
                🚀 LAUNCH SPECIAL - Limited Time Only!
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Enterprise Web Development
              </h1>
              <p className={`text-xl md:text-2xl text-purple-100 leading-relaxed mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Build powerful, scalable web applications with cutting-edge technologies and enterprise-grade architecture 
                that grows with your business and exceeds performance expectations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/#contact"
                  className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-center"
                >
                  Claim Your Discount 🚀
                </Link>
                <a
                  href="#pricing"
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20 text-center"
                >
                  View Discounted Pricing
                </a>
              </div>
            </div>
            
            {/* Animated Stats in header */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-500 transform hover:scale-110 hover:-rotate-1 cursor-pointer ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex justify-center mb-3 animate-bounce" style={{ animationDelay: `${index * 300}ms` }}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white animate-pulse">{stat.number}</div>
                  <div className="text-sm text-purple-200 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Services Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Full-Stack Development Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From concept to deployment, our comprehensive development services cover every aspect of building 
              robust, scalable web applications that drive business success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 cursor-pointer group border border-gray-200"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section with Discounts */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600 to-blue-600"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 inline-block animate-bounce">
              🔥 LAUNCH SPECIAL - Up to 46% OFF!
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Web Development Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Special launch pricing for new businesses! All packages include our enterprise-grade development process and support.
            </p>
            <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-lg inline-block mt-4">
              ⏰ Limited time offer - Prices return to normal soon!
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-500 cursor-pointer group hover:shadow-2xl transform hover:-translate-y-4 ${
                  plan.popular 
                    ? 'border-purple-500 shadow-xl scale-105' 
                    : selectedPlan === plan.id
                    ? 'border-purple-500'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular ⭐
                    </span>
                  </div>
                )}
                
                <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  {plan.discount}
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-lg text-gray-500 line-through">{plan.originalPrice}</span>
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:scale-110 transition-transform duration-300">{plan.price}</div>
                  <div className="text-gray-500 mb-2">{plan.duration}</div>
                  <div className="text-green-600 font-bold text-sm">{plan.savings}</div>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2 animate-bounce" />
                    What's Included:
                  </h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 group-hover:translate-x-2 transition-transform duration-300" style={{ transitionDelay: `${index * 50}ms` }}>
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.notIncluded.length > 0 && (
                    <>
                      <h4 className="font-semibold text-gray-900 flex items-center mt-6">
                        <X className="w-5 h-5 text-red-500 mr-2" />
                        Not Included:
                      </h4>
                      {plan.notIncluded.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3 opacity-70">
                          <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-500">{feature}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                <Link
                  to="/#contact"
                  className={`block w-full text-center py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Claim This Offer 🚀
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Technologies Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Cutting-Edge Technology Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We leverage the latest and most reliable technologies to build applications that are not only 
              powerful today but future-proof for tomorrow's challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-purple-50 p-6 rounded-2xl hover:from-purple-50 hover:to-blue-50 transition-all duration-300 border border-gray-100 text-center group"
              >
                <div className="text-4xl mb-4">{tech.icon}</div>
                <div className="text-sm text-gray-500 mb-2 font-semibold">{tech.category}</div>
                <span className={`font-bold text-xl ${tech.color} group-hover:scale-105 transition-transform duration-200 block`}>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full animate-bounce"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="text-6xl mb-8 animate-bounce">💻</div>
            <div className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 inline-block animate-pulse">
              🚀 Launch Special Active - Don't Miss Out!
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Build Your Next Application?
            </h2>
            <p className="text-xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Take advantage of our special launch pricing! Let's discuss your development needs and architect a powerful, scalable solution that drives your business forward.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link
                to="/#contact"
                className="bg-white text-purple-600 px-10 py-5 rounded-full font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-rotate-2"
              >
                Claim Your Discount Now 🚀
              </Link>
              <div className="text-center">
                <p className="text-sm text-purple-200">
                  Free architecture consultation • Enterprise-grade solutions • Up to 46% savings ✨
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {[
                { title: "Enterprise-Grade", icon: "🏢", desc: "Scalable architecture" },
                { title: "Expert Team", icon: "👨‍💻", desc: "Senior developers" },
                { title: "Future-Proof", icon: "🔮", desc: "Modern tech stack" },
                { title: "24/7 Support", icon: "🛠️", desc: "Continuous support" }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-purple-200 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebDevelopment;
