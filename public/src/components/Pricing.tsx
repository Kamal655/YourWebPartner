import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Users, Shield, Award, ArrowRight, CreditCard, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: "Basic",
      icon: <Star className="w-8 h-8 text-blue-600" />,
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
      icon: <Zap className="w-8 h-8 text-purple-600" />,
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
      icon: <Crown className="w-8 h-8 text-pink-600" />,
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
    <section id="pricing" className="py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full opacity-30 animate-float animation-delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100 rounded-full opacity-20 animate-float-reverse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-10 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Trust Indicators */}
        <div className="flex justify-center items-center space-x-8 mb-16 animate-fade-in">
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="flex items-center space-x-2 text-gray-600">
              <div className="text-purple-600">{indicator.icon}</div>
              <span className="font-medium">{indicator.text}</span>
            </div>
          ))}
        </div>

        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-slide-in-down">
            Super <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Affordable</span> Pricing
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto mb-8 animate-slide-in-up animation-delay-300">
            Professional web development at startup-friendly rates
          </p>
          <p className="text-lg text-purple-600 font-semibold animate-slide-in-up animation-delay-400">
            ✨ Perfect for new businesses • 30-day money-back guarantee • Free consultation
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-16 animate-fade-in animation-delay-500">
            <span className={`text-lg font-medium ${billingCycle === 'monthly' ? 'text-purple-600' : 'text-gray-500'}`}>
              One-time
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-16 h-8 bg-gray-200 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${billingCycle === 'yearly' ? 'transform translate-x-8 bg-purple-600' : ''}`}></div>
            </button>
            <span className={`text-lg font-medium ${billingCycle === 'yearly' ? 'text-purple-600' : 'text-gray-500'}`}>
              Annual Package
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full ml-2">Save 50%</span>
            </span>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-3xl border-2 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 animate-zoom-in ${
                plan.popular 
                  ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl ring-4 ring-purple-100' 
                  : 'border-gray-200 bg-white hover:border-purple-300 shadow-lg hover:shadow-2xl'
              }`}
              style={{ animationDelay: `${600 + index * 200}ms` }}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className={`px-6 py-2 rounded-full text-sm font-bold animate-bounce ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  }`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full bg-${plan.color}-100`}>
                    {plan.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">
                    ₹{billingCycle === 'monthly' ? plan.monthlyPrice.toLocaleString() : plan.yearlyPrice.toLocaleString()}
                  </span>
                  <span className="text-gray-600 ml-2">
                    {billingCycle === 'monthly' ? '/project' : '/year + hosting'}
                  </span>
                  {billingCycle === 'yearly' && (
                    <div className="text-sm text-green-600 font-medium mt-2">
                      Save ₹{((plan.monthlyPrice * 12) - plan.yearlyPrice).toLocaleString()}
                    </div>
                  )}
                </div>

                {/* Payment Options */}
                <div className="flex justify-center space-x-4 mb-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <CreditCard className="w-4 h-4" />
                    <span>Card</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>EMI Available</span>
                  </div>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={`/#contact?service=${plan.serviceParam}&package=${plan.name.toLowerCase()}`}
                className={`w-full py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 group ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl'
                    : 'bg-gray-900 text-white hover:bg-purple-600 hover:shadow-lg'
                }`}
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>

              {plan.name === 'Enterprise' && (
                <div className="mt-4 text-center">
                  <Link 
                    to="/#contact?service=custom-quote&package=enterprise"
                    className="text-purple-600 hover:text-purple-800 font-medium text-sm transition-colors"
                  >
                    Need a custom quote? Contact us →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Customer Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4 animate-slide-in-up">
              What Our Clients Say
            </h3>
            <p className="text-xl text-gray-600 animate-slide-in-up animation-delay-200">
              Join hundreds of satisfied customers who chose us for their web needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${1000 + index * 200}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Services */}
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-gray-900 mb-4 animate-slide-in-up">
            Additional Services
          </h3>
          <p className="text-xl text-gray-600 animate-slide-in-up animation-delay-200">
            Enhance your website with our specialized services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {additionalServices.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl border border-gray-200 hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg animate-fade-in group"
              style={{ animationDelay: `${800 + index * 100}ms` }}
            >
              <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">{service.name}</h4>
              <p className="text-2xl font-bold text-purple-600 mb-3">{service.price}</p>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center animate-slide-in-up animation-delay-1200">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-xl mb-8 opacity-90">
                Contact us today for a free consultation and detailed quote
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link 
                  to="/#contact?service=consultation&source=pricing-cta"
                  className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 group"
                >
                  <span>Get Free Quote</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link 
                  to="/#contact?service=consultation&type=schedule"
                  className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105"
                >
                  Schedule Consultation
                </Link>
              </div>
              <div className="flex justify-center items-center space-x-6 text-sm opacity-80">
                <span>✓ Free 30-min consultation</span>
                <span>✓ No obligation quote</span>
                <span>✓ Quick 24hr response</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
