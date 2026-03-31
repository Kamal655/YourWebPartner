
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Code, Database, Server, Smartphone, Globe, Zap, CheckCircle, Star, Shield, Rocket, Award, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import CheckoutModal from '@/components/CheckoutModal';

const WebDevelopment = () => {
  const [selectedPlanId, setSelectedPlanId] = useState('premium');
  const [isVisible, setIsVisible] = useState(false);

  // Checkout State
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleChoosePlan = (plan: any) => {
    const priceNumber = parseInt(plan.price.replace(/[^0-9]/g, ''), 10);
    setCheckoutPlan({
      name: plan.name,
      price: priceNumber,
      color: 'blue' // Default color for WebDev, or derive from plan
    });
    setShowCheckout(true);
  };

  const services = [
    {
      icon: <Code className="w-8 h-8 text-purple-400" />,
      title: "Frontend Development",
      description: "Modern, interactive user interfaces built with React, Vue, or Angular for seamless user experiences and optimal performance."
    },
    {
      icon: <Server className="w-8 h-8 text-blue-400" />,
      title: "Backend Development",
      description: "Robust, scalable server-side solutions with Node.js, Python, or PHP to power your web applications with enterprise-grade reliability."
    },
    {
      icon: <Database className="w-8 h-8 text-green-400" />,
      title: "Database Architecture",
      description: "Secure and scalable database solutions including MySQL, PostgreSQL, and MongoDB with optimized performance and data integrity."
    },
    {
      icon: <Globe className="w-8 h-8 text-indigo-400" />,
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
    { name: "React & Next.js", color: "text-blue-400", category: "Frontend", icon: "⚛️" },
    { name: "Node.js & Express", color: "text-green-400", category: "Backend", icon: "🟢" },
    { name: "Python & Django", color: "text-yellow-400", category: "Backend", icon: "🐍" },
    { name: "MongoDB & PostgreSQL", color: "text-emerald-400", category: "Database", icon: "🗄️" },
    { name: "AWS & Azure", color: "text-orange-400", category: "Cloud", icon: "☁️" },
    { name: "Docker & Kubernetes", color: "text-blue-300", category: "DevOps", icon: "🐳" }
  ];

  const stats = [
    { number: "879+", label: "Applications Delivered", icon: <Rocket className="w-6 h-6 text-purple-400" /> },
    { number: "99.9%", label: "Uptime Guaranteed", icon: <Shield className="w-6 h-6 text-green-400" /> },
    { number: "4.9/5", label: "Client Rating", icon: <Star className="w-6 h-6 text-yellow-400" /> },
    { number: "24/7", label: "Technical Support", icon: <Award className="w-6 h-6 text-blue-400" /> }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-sans selection:bg-purple-500/30">

      {/* Global Background Effects */}
      <div className="fixed inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-black via-gray-900/50 to-black pointer-events-none -z-10"></div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/#services"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300 mb-8 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/10 border border-white/5"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Services</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-full text-sm font-bold mb-4 inline-flex items-center gap-2 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                🚀 LAUNCH SPECIAL - Limited Time!
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Enterprise <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Web Development</span>
              </h1>
              <p className={`text-xl md:text-2xl text-gray-400 leading-relaxed mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Build powerful, scalable web applications with cutting-edge technologies and enterprise-grade architecture
                that grows with your business and exceeds performance expectations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/#contact"
                  className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] text-center flex items-center justify-center gap-2"
                >
                  <Rocket className="w-5 h-5" />
                  Claim Discount
                </Link>
                <a
                  href="#pricing"
                  className="bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border border-white/10 text-center"
                >
                  View Packages
                </a>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-blue-500/10 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex justify-center mb-3 animate-bounce" style={{ animationDelay: `${index * 300}ms` }}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Full-Stack <span className="text-purple-400">Expertise</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              From concept to deployment, our comprehensive development services cover every aspect of building
              robust, scalable web applications that drive business success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-purple-500/30 hover:bg-white/[0.08] transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-purple-500/10 transition-all duration-300 border border-white/5">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-black pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-6 inline-block shadow-lg shadow-red-500/20 animate-pulse">
              🔥 LAUNCH SPECIAL - Up to 46% OFF!
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Development Packages
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Special launch pricing for new businesses! All packages include our enterprise-grade development process and support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.id}
                className={`relative bg-white/5 backdrop-blur-md rounded-3xl p-8 border transition-all duration-500 cursor-pointer group hover:shadow-2xl hover:shadow-purple-500/10 transform hover:-translate-y-4 ${plan.popular
                  ? 'border-purple-500 bg-white/[0.08] scale-105 z-10'
                  : selectedPlanId === plan.id
                    ? 'border-blue-500'
                    : 'border-white/10 hover:border-purple-500/50'
                  }`}
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => setSelectedPlanId(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="absolute top-4 right-4 bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-xs font-bold">
                  {plan.discount}
                </div>

                <div className="text-center mb-8 mt-4">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">{plan.name}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{plan.description}</p>
                  <div className="mb-1">
                    <span className="text-lg text-gray-500 line-through">{plan.originalPrice}</span>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{plan.price}</div>
                  <div className="text-emerald-400 font-bold text-sm tracking-wide">{plan.savings}</div>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-white flex items-center">
                    <Check className="w-5 h-5 text-emerald-400 mr-2" />
                    What's Included:
                  </h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 group-hover:translate-x-2 transition-transform duration-300">
                      <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}

                  {plan.notIncluded.length > 0 && (
                    <div className="pt-4 border-t border-white/5 mt-4">
                      <h4 className="font-semibold text-gray-400 flex items-center mb-3">
                        <X className="w-5 h-5 text-red-400 mr-2" />
                        Not Included:
                      </h4>
                      {plan.notIncluded.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3 opacity-50 text-sm">
                          <X className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-500">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleChoosePlan(plan)}
                  className={`block w-full text-center py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:brightness-110'
                    : 'bg-white text-black hover:bg-gray-200'
                    }`}
                >
                  Claim This Offer 🚀
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Technology <span className="text-blue-400">Stack</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We leverage the latest and most reliable technologies to build applications that are not only
              powerful today but future-proof for tomorrow's challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/5 text-center group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{tech.icon}</div>
                <div className="text-sm text-gray-500 mb-2 font-semibold uppercase tracking-wider">{tech.category}</div>
                <span className={`font-bold text-xl ${tech.color} block`}>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-t from-purple-900/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-3xl max-w-4xl mx-auto hover:border-white/20 transition-all">
            <div className="text-6xl mb-8 animate-bounce">💻</div>
            <div className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 inline-block animate-pulse">
              🚀 Launch Special Active - Don't Miss Out!
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              Ready to Build Your Next Application?
            </h2>
            <p className="text-xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Take advantage of our special launch pricing! Let's discuss your development needs and architect a powerful, scalable solution that drives your business forward.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link
                to="/#contact"
                className="bg-white text-black px-10 py-5 rounded-full font-bold text-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 transform hover:scale-105"
              >
                Claim Your Discount Now 🚀
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/5">
              {[
                { title: "Enterprise-Grade", icon: "🏢", desc: "Scalable architecture" },
                { title: "Expert Team", icon: "👨‍💻", desc: "Senior developers" },
                { title: "Future-Proof", icon: "🔮", desc: "Modern tech stack" },
                { title: "24/7 Support", icon: "🛠️", desc: "Continuous support" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="text-center group"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-1 text-white group-hover:text-purple-400 transition-colors">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {checkoutPlan && (
        <CheckoutModal
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          plan={checkoutPlan}
          billingCycle="one-time"
        />
      )}
    </div>
  );
};

export default WebDevelopment;
