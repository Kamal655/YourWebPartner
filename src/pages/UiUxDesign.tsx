
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Palette, Users, Zap, Eye, CheckCircle, Star, Shield, Rocket, Award, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import CheckoutModal from '@/components/CheckoutModal';

const UiUxDesign = () => {
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
      color: 'pink' // Default color for UI/UX
    });
    setShowCheckout(true);
  };

  const services = [
    {
      icon: <Eye className="w-8 h-8 text-purple-400" />,
      title: "User Experience Research",
      description: "In-depth user research, personas, and journey mapping to understand your audience and create user-centered design solutions."
    },
    {
      icon: <Palette className="w-8 h-8 text-pink-400" />,
      title: "Interface Design",
      description: "Beautiful, intuitive user interfaces that combine aesthetic appeal with functional excellence and accessibility standards."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-400" />,
      title: "Usability Testing",
      description: "Comprehensive user testing and feedback analysis to optimize user flows and maximize conversion rates."
    },
    {
      icon: <Zap className="w-8 h-8 text-green-400" />,
      title: "Prototype Development",
      description: "Interactive prototypes and wireframes that bring your ideas to life before development begins."
    }
  ];

  const pricingPlans = [
    {
      id: 'basic',
      name: 'Basic UX Design',
      originalPrice: '₹40,000',
      price: '₹25,000',
      duration: 'One-time',
      description: 'Perfect for small businesses and startups',
      features: [
        'User research & personas',
        'Basic wireframes (5 screens)',
        'UI design mockups',
        'Mobile responsive design',
        'Basic usability testing',
        '2 rounds of revisions',
        '30-day support'
      ],
      notIncluded: [
        'Interactive prototypes',
        'Advanced animations',
        'A/B testing',
        'Design system creation'
      ],
      popular: false,
      discount: '38% OFF',
      savings: 'Save ₹15,000'
    },
    {
      id: 'premium',
      name: 'Premium UX Design',
      originalPrice: '₹80,000',
      price: '₹45,000',
      duration: 'One-time',
      description: 'Most popular choice for growing businesses',
      features: [
        'Comprehensive user research',
        'Advanced wireframes (10 screens)',
        'High-fidelity UI designs',
        'Interactive prototypes',
        'Mobile & desktop design',
        'Usability testing sessions',
        'Basic design system',
        '4 rounds of revisions',
        '60-day support',
        'Conversion optimization'
      ],
      notIncluded: [
        'Advanced design system',
        'Multiple user testing rounds',
        'Animation specifications'
      ],
      popular: true,
      discount: '44% OFF',
      savings: 'Save ₹35,000'
    },
    {
      id: 'enterprise',
      name: 'Enterprise UX Design',
      originalPrice: '₹1,60,000',
      price: '₹85,000',
      duration: 'One-time',
      description: 'Complete solution for large businesses',
      features: [
        'Extensive user research',
        'Unlimited screen designs',
        'Advanced interactive prototypes',
        'Complete design system',
        'Multi-platform design',
        'Multiple usability testing rounds',
        'A/B testing recommendations',
        'Animation specifications',
        'Accessibility compliance',
        'Unlimited revisions',
        '6-month support',
        'Training & documentation'
      ],
      notIncluded: [],
      popular: false,
      discount: '47% OFF',
      savings: 'Save ₹75,000'
    }
  ];

  const designProcess = [
    { step: "Research", description: "User interviews, market analysis, and competitive research", icon: "🔍" },
    { step: "Define", description: "Problem definition, user personas, and success metrics", icon: "📋" },
    { step: "Ideate", description: "Brainstorming sessions and concept development", icon: "💡" },
    { step: "Prototype", description: "Low and high-fidelity prototypes with user flows", icon: "⚡" },
    { step: "Test", description: "User testing, feedback collection, and iteration", icon: "🧪" },
    { step: "Deliver", description: "Final designs with comprehensive style guides", icon: "🚀" }
  ];

  const stats = [
    { number: "312+", label: "UI/UX Projects", icon: <Rocket className="w-6 h-6 text-purple-400" /> },
    { number: "85%", label: "Conversion Increase", icon: <Zap className="w-6 h-6 text-green-400" /> },
    { number: "4.9/5", label: "User Rating", icon: <Star className="w-6 h-6 text-yellow-400" /> },
    { number: "24/7", label: "Design Support", icon: <Award className="w-6 h-6 text-blue-400" /> }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-sans selection:bg-pink-500/30">

      {/* Global Background Effects */}
      <div className="fixed inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-black via-gray-900/50 to-black pointer-events-none -z-10"></div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

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
              <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-full text-sm font-bold mb-4 inline-flex items-center gap-2 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                🚀 LAUNCH SPECIAL - Limited Time!
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">UI/UX Design</span>
              </h1>
              <p className={`text-xl md:text-2xl text-gray-400 leading-relaxed mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Create exceptional user experiences that delight customers and drive business growth through
                research-driven design and conversion-focused user interface solutions.
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

            {/* Stats Cards - Animated */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-pink-500/10 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex justify-center mb-3 text-purple-400 animate-bounce" style={{ animationDelay: `${index * 300}ms` }}>
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
              User-Centered <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Design</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              From user research to final implementation, our comprehensive UI/UX design process ensures
              every interaction is meaningful, intuitive, and drives measurable business results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:border-pink-500/30 hover:bg-white/[0.08] transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-pink-500/10 transition-all duration-300 border border-white/5">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pink-400 transition-colors duration-300">
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
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-6 inline-block shadow-lg shadow-red-500/20 animate-pulse">
              🔥 LAUNCH SPECIAL - Up to 47% OFF!
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              UI/UX Packages
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Special launch pricing for new businesses! All packages include our comprehensive UX research and design process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.id}
                className={`relative bg-white/5 backdrop-blur-md rounded-3xl p-8 border transition-all duration-500 cursor-pointer group hover:shadow-2xl hover:shadow-pink-500/10 transform hover:-translate-y-4 ${plan.popular
                  ? 'border-pink-500 bg-white/[0.08] scale-105 z-10'
                  : selectedPlanId === plan.id
                    ? 'border-purple-500'
                    : 'border-white/10 hover:border-pink-500/50'
                  }`}
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={() => setSelectedPlanId(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="absolute top-4 right-4 bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1 rounded-full text-xs font-bold">
                  {plan.discount}
                </div>

                <div className="text-center mb-8 mt-4">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors duration-300">{plan.name}</h3>
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
                    <div key={index} className="flex items-start space-x-3 group-hover:translate-x-2 transition-transform duration-300" style={{ transitionDelay: `${index * 50}ms` }}>
                      <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}

                  {plan.notIncluded.length > 0 && (
                    <div className="pt-4 border-t border-white/5 mt-4">
                      <h4 className="font-semibold text-gray-400 flex items-center mb-3">
                        <X className="w-5 h-5 text-red-500 mr-2" />
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

      {/* Process Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              UX Design <span className="text-purple-400">Process</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              A systematic approach to creating exceptional user experiences through research,
              testing, and iterative design that puts users at the center of every decision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designProcess.map((process, index) => (
              <div
                key={index}
                className="relative bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-pink-500/30 transition-all duration-500 group hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white font-bold text-lg border border-white/10 group-hover:bg-pink-600 transition-colors">
                  {index + 1}
                </div>
                <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all animate-bounce" style={{ animationDelay: `${index * 200}ms` }}>
                  {process.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 mt-8 group-hover:text-pink-400 transition-colors duration-300">
                  {process.step}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-t from-pink-900/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-3xl inline-block max-w-4xl w-full hover:border-white/20 transition-all">
            <div className="text-6xl mb-8 animate-bounce">🎨</div>
            <div className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 inline-block animate-pulse">
              🔥 Launch Special Active - Don't Miss Out!
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              Ready to Enhance User Experience?
            </h2>
            <p className="text-xl text-pink-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Take advantage of our special launch pricing! Let's create user experiences that delight your customers and drive meaningful business growth.
            </p>

            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 bg-white text-black px-12 py-5 rounded-full font-bold text-xl hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Start Project Now
              <Rocket className="w-5 h-5" />
            </Link>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12 pt-8 border-t border-white/5 text-center">
              {[
                { title: "Research-Driven", icon: "🔍", desc: "Data-backed decisions" },
                { title: "User-Centered", icon: "👥", desc: "Focus on user needs" },
                { title: "Conversion-Focused", icon: "📈", desc: "Drive business results" },
                { title: "Accessible Design", icon: "♿", desc: "Inclusive experiences" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="group"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-2 text-white group-hover:text-pink-400 transition-colors">{item.title}</h3>
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

export default UiUxDesign;
