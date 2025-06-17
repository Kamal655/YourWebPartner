
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Store Owner",
      company: "Boutique Fashion",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c93c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      text: "YourWebPartner transformed our online presence completely. Our sales increased by 150% within the first month of launching our new website! The team's creativity and professionalism exceeded all expectations.",
      rating: 5,
      color: "blue"
    },
    {
      name: "Michael Chen",
      position: "Restaurant Manager",
      company: "Taste of Asia",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      text: "The team delivered exactly what we needed - a beautiful, functional website that our customers love. The online reservation system works perfectly and has streamlined our entire booking process!",
      rating: 5,
      color: "green"
    },
    {
      name: "Emily Rodriguez",
      position: "CEO",
      company: "Tech Solutions Inc.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      text: "Professional, responsive, and creative. They understood our vision and brought it to life with modern design and excellent functionality. Our website now truly represents our brand values.",
      rating: 5,
      color: "purple"
    },
    {
      name: "David Thompson",
      position: "Clinic Director",
      company: "HealthCare Plus",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
      text: "Our patient booking system has never worked better. The website is clean, professional, and exactly what our practice needed. Patient satisfaction has improved significantly since the launch.",
      rating: 5,
      color: "red"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        nextTestimonial();
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [isAnimating]);

  const nextTestimonial = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const prevTestimonial = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToTestimonial = (index: number) => {
    if (index !== currentIndex) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-32 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-morph-blob animation-delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full animate-liquid-morph animation-delay-2000"></div>
        
        {/* Floating sparkles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              opacity: 0.3
            }}
          >
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-bold mb-6 animate-slide-in-down">
            What Our <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-shift bg-300%">Clients Say</span>
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto animate-slide-in-up animation-delay-300">
            Don't just take our word for it - hear from some of our 
            <span className="text-yellow-400 font-semibold"> satisfied customers</span>
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main testimonial card */}
          <div className={`glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden transition-all duration-500 transform ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
            {/* Animated background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r from-${currentTestimonial.color}-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-shift bg-300%`}></div>
            
            {/* Quote icon */}
            <div className="relative z-10">
              <Quote className="w-16 h-16 text-blue-400 mx-auto mb-8 animate-float opacity-60" />
              
              {/* Star rating */}
              <div className="flex justify-center mb-8 space-x-2">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-8 h-8 text-yellow-400 fill-current animate-bounce animation-delay-${i * 100}`} 
                  />
                ))}
              </div>
              
              {/* Testimonial text */}
              <p className="text-2xl md:text-3xl text-gray-200 mb-10 leading-relaxed font-light animate-fade-in">
                "{currentTestimonial.text}"
              </p>
              
              {/* Customer info */}
              <div className="flex items-center justify-center space-x-6 animate-slide-in-up animation-delay-500">
                <div className="relative">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white/30 animate-float"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 animate-ping"></div>
                </div>
                <div className="text-left">
                  <h4 className="text-2xl font-bold text-white mb-1 animate-neon-glow">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-gray-300 text-lg">
                    {currentTestimonial.position}
                  </p>
                  <p className={`text-${currentTestimonial.color}-400 font-semibold`}>
                    {currentTestimonial.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-10 left-10 animate-float animation-delay-1000">
              <div className="w-4 h-4 bg-blue-400 rounded-full opacity-60"></div>
            </div>
            <div className="absolute top-20 right-16 animate-float-reverse animation-delay-2000">
              <div className="w-3 h-3 bg-purple-400 rounded-full opacity-60"></div>
            </div>
            <div className="absolute bottom-16 left-20 animate-sparkle animation-delay-1500">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 p-4 glass rounded-full hover:bg-white/30 transition-all duration-300 group animate-slide-in-left animation-delay-1000"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-8 h-8 group-hover:scale-125 transition-transform duration-300" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 p-4 glass rounded-full hover:bg-white/30 transition-all duration-300 group animate-slide-in-right animation-delay-1000"
            disabled={isAnimating}
          >
            <ChevronRight className="w-8 h-8 group-hover:scale-125 transition-transform duration-300" />
          </button>

          {/* Dot indicators */}
          <div className="flex justify-center mt-12 space-x-4 animate-slide-in-up animation-delay-1500">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`relative w-4 h-4 rounded-full transition-all duration-500 transform hover:scale-125 ${
                  index === currentIndex 
                    ? `bg-gradient-to-r from-${currentTestimonial.color}-400 to-purple-400 scale-125` 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
              >
                {index === currentIndex && (
                  <div className="absolute inset-0 rounded-full animate-ping bg-white opacity-30"></div>
                )}
              </button>
            ))}
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 animate-slide-in-up animation-delay-2000">
            {[
              { number: "200+", label: "Happy Clients", icon: "👥" },
              { number: "98%", label: "Satisfaction Rate", icon: "⭐" },
              { number: "24/7", label: "Support Available", icon: "🚀" }
            ].map((stat, index) => (
              <div key={index} className={`text-center p-6 glass rounded-2xl hover:scale-105 transition-all duration-300 animate-zoom-in animation-delay-${2200 + index * 200}`}>
                <div className="text-4xl mb-4 animate-bounce animation-delay-500">{stat.icon}</div>
                <div className="text-4xl font-bold text-white mb-2 animate-neon-glow">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
