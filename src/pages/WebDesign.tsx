
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Palette, Monitor, Smartphone, Zap, CheckCircle, Star, Shield, Rocket, Award, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import CheckoutModal from '@/components/CheckoutModal';

const WebDesign = () => {
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
    // Parse price string "₹25,000" -> 25000
    const priceNumber = parseInt(plan.price.replace(/[^0-9]/g, ''), 10);

    setCheckoutPlan({
      name: plan.name,
      price: priceNumber,
      color: plan.color
    });
    setShowCheckout(true);
  };

  const services = [
    {
      icon: <Palette className="w-8 h-8 text-blue-400" />,
      title: "Custom Website Design",
      description: "Unique, brand-focused designs that capture your company's essence and create memorable first impressions with stunning visual storytelling.",
      color: "blue"
    },
    {
      icon: <Monitor className="w-8 h-8 text-purple-400" />,
      title: "Responsive Web Design",
      description: "Mobile-first designs that look perfect on every device, ensuring seamless user experiences across desktops, tablets, and smartphones.",
      color: "purple"
    },
    {
      icon: <Zap className="w-8 h-8 text-green-400" />,
      title: "UI/UX Optimization",
      description: "User-centered design principles that maximize engagement, conversion rates, and customer satisfaction through intuitive interfaces.",
      color: "green"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-pink-400" />,
      title: "Brand Identity Design",
      description: "Comprehensive brand design including logos, color schemes, typography, and visual guidelines that establish strong market presence.",
      color: "pink"
    }
  ];

  const pricingPlans = [
    {
      id: 'basic',
      name: 'Basic Design',
      originalPrice: '₹35,000',
      price: '₹25,000',
      duration: 'One-time',
      description: 'Perfect for small businesses and startups',
      features: [
        'Custom 3-page website design',
        'Mobile-responsive design',
        'Basic SEO optimization',
        'Contact form integration',
        'Social media integration',
        '2 rounds of revisions',
        '30-day support'
      ],
      notIncluded: [
        'E-commerce functionality',
        'Advanced animations',
        'Custom CMS',
        'Multi-language support'
      ],
      popular: false,
      color: 'blue',
      discount: '29% OFF',
      savings: 'Save ₹10,000'
    },
    {
      id: 'premium',
      name: 'Premium Design',
      originalPrice: '₹75,000',
      price: '₹50,000',
      duration: 'One-time',
      description: 'Most popular choice for growing businesses',
      features: [
        'Custom 5-page website design',
        'Advanced responsive design',
        'Premium SEO optimization',
        'Contact & inquiry forms',
        'Social media integration',
        'Interactive elements & animations',
        'Performance optimization',
        '4 rounds of revisions',
        '60-day support',
        'Basic e-commerce setup'
      ],
      notIncluded: [
        'Advanced e-commerce features',
        'Custom CMS development',
        'Multi-language support'
      ],
      popular: true,
      color: 'purple',
      discount: '33% OFF',
      savings: 'Save ₹25,000'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Design',
      originalPrice: '₹1,50,000',
      price: '₹90,000',
      duration: 'One-time',
      description: 'Complete solution for large businesses',
      features: [
        'Unlimited page website design',
        'Advanced responsive design',
        'Complete SEO optimization',
        'Multiple contact forms',
        'Full social media integration',
        'Advanced animations & interactions',
        'Performance optimization',
        'Full e-commerce functionality',
        'Custom CMS integration',
        'Multi-language support',
        'Unlimited revisions',
        '6-month support',
        'Priority support',
        'Training & documentation'
      ],
      notIncluded: [],
      popular: false,
      color: 'green',
      discount: '40% OFF',
      savings: 'Save ₹60,000'
    }
  ];

  const designProcess = [
    { step: "Discovery", description: "Understanding your brand, goals, and target audience", icon: "🔍" },
    { step: "Strategy", description: "Creating a comprehensive design strategy and sitemap", icon: "📋" },
    { step: "Wireframing", description: "Developing detailed wireframes and user flow diagrams", icon: "📐" },
    { step: "Design", description: "Crafting beautiful, on-brand visual designs", icon: "🎨" },
    { step: "Prototyping", description: "Building interactive prototypes for testing", icon: "⚡" },
    { step: "Launch", description: "Final implementation and quality assurance testing", icon: "🚀" }
  ];

  const stats = [
    { number: "523+", label: "Websites Designed", icon: <Rocket className="w-6 h-6 text-purple-400" /> },
    { number: "4.9/5", label: "Average Rating", icon: <Star className="w-6 h-6 text-yellow-400" /> },
    { number: "40%", label: "Conversion Increase", icon: <Zap className="w-6 h-6 text-green-400" /> },
    { number: "24/7", label: "Design Support", icon: <Award className="w-6 h-6 text-blue-400" /> }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-purple-500/30 font-sans">
      <Helmet>
        <title>Web Design Services | YourWebPartner</title>
        <meta name="description" content="Premium web design services tailored to your brand." />
      </Helmet>

      {/* Global Background Effects */}
      <div className="fixed inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-black via-gray-900/50 to-black pointer-events-none -z-10"></div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/#services"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300 mb-8 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/10 border border-white/5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Services</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-sm font-bold mb-6 inline-flex items-center gap-2 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                LAUNCH SPECIAL - Limited Time!
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200">Web Design</span>
              </h1>
              <p className={`text-xl text-gray-400 leading-relaxed mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                Create stunning, conversion-focused websites that captivate your audience and drive business growth with our award-winning design expertise.
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
                  className={`text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-purple-500/10 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-white/5 rounded-2xl">{stat.icon}</div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Our Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Services</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              From concept to launch, our full-service design approach ensures every pixel serves a purpose in creating extraordinary digital experiences.
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
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-6 inline-block shadow-lg shadow-red-500/20 animate-pulse">
              🔥 LAUNCH SPECIAL - Up to 47% OFF!
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Web Design Packages
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Special launch pricing for new businesses! All packages include our signature design process.
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
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{plan.name}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{plan.description}</p>
                  <div className="mb-1">
                    <span className="text-lg text-gray-500 line-through">{plan.originalPrice}</span>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{plan.price}</div>
                  <div className="text-emerald-400 font-bold text-sm tracking-wide">{plan.savings}</div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-sm">
                      <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}

                  {plan.notIncluded.length > 0 && (
                    <div className="pt-4 border-t border-white/5 mt-4">
                      {plan.notIncluded.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-3 text-sm opacity-50">
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
                  Choose Plan 🚀
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Process</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A proven methodology that transforms your vision into reality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designProcess.map((process, index) => (
              <div
                key={index}
                className="relative bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all duration-500 group hover:-translate-y-2"
              >
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 font-bold group-hover:bg-purple-600 group-hover:text-white transition-all border border-white/5">
                  {index + 1}
                </div>
                <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">
                  {process.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                  {process.step}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-12 rounded-3xl inline-block max-w-4xl w-full hover:border-white/20 transition-colors">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Brand?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Take advantage of our special launch pricing! Let's create a stunning website that drives real results.
            </p>

            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 bg-white text-black px-12 py-5 rounded-full font-bold text-xl hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              Start Project Now
              <Rocket className="w-5 h-5" />
            </Link>
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

export default WebDesign;
