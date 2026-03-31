import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Users, Shield, Award, ArrowRight, CreditCard, Calendar, Sparkles } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

interface Plan {
  id?: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  price?: number; // string because it contains currency symbol in plans array
  color: string;
  description: string;
  features: string[];
  popular: boolean;
  notIncluded?: string[]; // Made optional
  badge?: string | null;
  serviceParam?: string;
  originalPrice?: string;
  duration?: string;
  discount?: string;
  savings?: string;
}

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Checkout Modal State
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleGetStarted = (plan: any) => { // keep any here for now as plans array is inferred with mixed types, or fix plans definition
    setSelectedPlan(plan);
    setShowCheckout(true);
  };

  const plans = [
    {
      name: "Basic",
      icon: <Star className="w-8 h-8 text-blue-400" />,
      description: "Perfect for small businesses and startups",
      monthlyPrice: 8000,
      yearlyPrice: 80000,
      features: [
        "5-page responsive website",
        "Basic SEO optimization",
        "Contact form integration",
        "Social media links",
        "Mobile responsive design",
        "1 month free maintenance",
        "Basic analytics setup"
      ],
      popular: false,
      color: "blue",
      badge: null,
      serviceParam: "basic-website"
    },
    {
      name: "Professional",
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      description: "Ideal for growing businesses",
      monthlyPrice: 15000,
      yearlyPrice: 150000,
      features: [
        "10-page responsive website",
        "Advanced SEO optimization",
        "Contact & booking forms",
        "Social media integration",
        "Custom animations",
        "3 months free maintenance",
        "Google Analytics setup",
        "Blog section",
        "Payment gateway integration"
      ],
      popular: true,
      color: "purple",
      badge: "Most Popular",
      serviceParam: "professional-website"
    },
    {
      name: "Enterprise",
      icon: <Crown className="w-8 h-8 text-pink-400" />,
      description: "For large businesses with complex needs",
      monthlyPrice: 30000,
      yearlyPrice: 300000,
      features: [
        "Unlimited pages",
        "Premium SEO optimization",
        "Advanced forms & automation",
        "Full e-commerce setup",
        "Custom animations & effects",
        "6 months free maintenance",
        "Advanced analytics",
        "Multi-language support",
        "Custom integrations",
        "Priority support",
        "Performance optimization"
      ],
      popular: false,
      color: "pink",
      badge: "Best Value",
      serviceParam: "enterprise-website"
    }
  ];

  const additionalServices = [
    {
      name: "E-commerce Store",
      price: "Starting at ₹20,000",
      description: "Complete online store with payment gateway"
    },
    {
      name: "SEO Package",
      price: "₹5,000/month",
      description: "Comprehensive SEO optimization and monitoring"
    },
    {
      name: "Website Maintenance",
      price: "₹2,000/month",
      description: "Regular updates, backups, and security monitoring"
    },
    {
      name: "Custom Development",
      price: "Quote on Request",
      description: "Tailored solutions for specific business needs"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      business: "Sharma Textiles",
      text: "Their professional package transformed our business. Sales increased by 40% within 3 months!",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      business: "Kumar Electronics",
      text: "Excellent service and great value for money. The team delivered exactly what we needed.",
      rating: 5
    },
    {
      name: "Anita Patel",
      business: "Patel Catering",
      text: "The basic package was perfect for our startup. Professional website at an affordable price.",
      rating: 5
    }
  ];

  const trustIndicators = [
    { icon: <Users className="w-6 h-6" />, text: "500+ Happy Clients" },
    { icon: <Shield className="w-6 h-6" />, text: "100% Secure & Reliable" },
    { icon: <Award className="w-6 h-6" />, text: "Award Winning Design" }
  ];

  return (
    <section id="pricing" className="py-32 bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/5 to-transparent opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-16 animate-fade-in">
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="flex items-center space-x-2 text-gray-400">
              <div className="text-purple-400">{indicator.icon}</div>
              <span className="font-medium tracking-wide">{indicator.text}</span>
            </div>
          ))}
        </div>

        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-in-down">
            Super <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent bg-300% animate-gradient-shift">Affordable</span> Pricing
          </h2>
          <p className="text-2xl text-gray-400 max-w-4xl mx-auto mb-8 animate-slide-in-up animation-delay-300 font-light">
            Professional web development at startup-friendly rates
          </p>
          <p className="text-lg text-purple-300 font-semibold animate-slide-in-up animation-delay-400 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> Perfect for new businesses • 30-day money-back guarantee • Free consultation
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-6 mt-12 animate-fade-in animation-delay-500">
            <span className={`text-lg font-medium transition-colors ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500'}`}>
              One-time
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-20 h-10 bg-white/10 rounded-full transition-all duration-300 focus:outline-none ring-1 ring-white/20 hover:ring-purple-500/50"
            >
              <div className={`absolute top-1 left-1 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full shadow-lg transition-transform duration-300 ${billingCycle === 'yearly' ? 'transform translate-x-10' : ''} flex items-center justify-center`}>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </button>
            <span className={`text-lg font-medium transition-colors ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-500'}`}>
              Annual Package
              <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full ml-3 font-bold shadow-lg shadow-green-500/20">SAVE 50%</span>
            </span>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-[2rem] border transition-all duration-500 transform hover:-translate-y-4 hover:scale-[1.02] animate-zoom-in backdrop-blur-xl group ${plan.popular
                ? 'border-purple-500/50 bg-white/10 shadow-2xl shadow-purple-500/20'
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                }`}
              style={{ animationDelay: `${600 + index * 200}ms` }}
            >
              {plan.badge && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                  <span className={`px-6 py-2 rounded-full text-sm font-bold animate-bounce shadow-lg ${plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/30'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    }`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Glowing effect behind popular card */}
              {plan.popular && (
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-transparent rounded-[2rem] pointer-events-none"></div>
              )}

              <div className="text-center mb-8 relative z-10">
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-2xl bg-${plan.color}-500/20 ring-1 ring-${plan.color}-500/40 group-hover:scale-110 transition-transform duration-500`}>
                    {plan.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-8 h-10">{plan.description}</p>

                <div className="mb-6 relative">
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-5xl font-bold text-white tracking-tight">
                      ₹{billingCycle === 'monthly' ? plan.monthlyPrice.toLocaleString() : plan.yearlyPrice.toLocaleString()}
                    </span>
                    <span className="text-gray-400 mb-2 font-medium">
                      {billingCycle === 'monthly' ? '/project' : '/year'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <div className="text-sm text-green-400 font-bold mt-2 py-1 px-3 bg-green-500/10 rounded-full inline-block">
                      Save ₹{((plan.monthlyPrice * 12) - plan.yearlyPrice).toLocaleString()}
                    </div>
                  )}
                </div>

                {/* Payment Options */}
                <div className="flex justify-center space-x-4 mb-8 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                  <div className="flex items-center space-x-1">
                    <CreditCard className="w-3 h-3" />
                    <span>Card</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>EMI Available</span>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

              <ul className="space-y-4 mb-8 relative z-10">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3 group/item">
                    <Check className={`w-5 h-5 text-${plan.color}-400 flex-shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform`} />
                    <span className="text-gray-300 group-hover/item:text-white transition-colors text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleGetStarted(plan)}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.03] flex items-center justify-center space-x-2 group/btn relative overflow-hidden z-10 ${plan.popular
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/50'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                  }`}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 skew-y-12"></div>
                <span className="relative">Get Started</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1 relative" />
              </button>
            </div>
          ))}
        </div>

        {/* Customer Testimonials - Dark Mode */}
        <div className="mb-24 relative">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4 animate-slide-in-up">
              Client <span className="text-purple-400">Success Stories</span>
            </h3>
            <p className="text-xl text-gray-400 animate-slide-in-up animation-delay-200">
              Join hundreds of business owners who trust us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:-translate-y-2 group"
                style={{ animationDelay: `${1000 + index * 200}ms` }}
              >
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-sm text-purple-400">{testimonial.business}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Services - Glass Grid */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            Add-on Services
          </h3>
          <p className="text-gray-400">Scale your digital presence further</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {additionalServices.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-400/30 transition-all duration-300 hover:transform hover:-translate-y-1 hover:bg-white/10 group cursor-default"
            >
              <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{service.name}</h4>
              <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">{service.price}</p>
              <p className="text-gray-500 text-sm leading-snug">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center animate-slide-in-up animation-delay-1200">
          <div className="bg-gradient-to-r from-blue-900/50 via-purple-900/50 to-pink-900/50 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-12 text-white relative overflow-hidden group">
            {/* Animated particles */}
            <div className="absolute inset-0">
              <div className="absolute w-2 h-2 bg-white rounded-full top-10 left-10 animate-sparkle opacity-20"></div>
              <div className="absolute w-2 h-2 bg-white rounded-full bottom-10 right-10 animate-sparkle opacity-20 animation-delay-1000"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-bold mb-6">Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">Ignite Your Growth?</span></h3>
              <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
                Stop waiting for success. Let's build a digital presence that demands attention.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
                <a
                  href="/?service=consultation&source=pricing-cta#contact"
                  className="px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>Get Free Quote</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/?service=consultation&type=schedule#contact"
                  className="px-10 py-5 border border-white/20 bg-white/5 backdrop-blur-sm text-white rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 inline-block text-center"
                >
                  Schedule Consultation
                </a>
              </div>
              <div className="flex justify-center items-center gap-8 text-sm text-gray-400 font-medium">
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Free 30-min strategy call</span>
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> No obligation</span>
                <span className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Fast 24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedPlan && (
        <CheckoutModal
          isOpen={showCheckout}
          onClose={() => setShowCheckout(false)}
          plan={selectedPlan}
          billingCycle={billingCycle}
        />
      )}
    </section>
  );
};

export default Pricing;
