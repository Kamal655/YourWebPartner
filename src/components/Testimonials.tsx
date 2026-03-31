
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles } from 'lucide-react';

import { supabase } from '@/integrations/supabase/client';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  interface Testimonial {
    id?: string | number;
    name: string;
    position: string;
    company: string;
    image: string;
    text: string;
    rating: number;
    color: string;
    role?: string;
    content?: string;
    image_url?: string;
    created_at?: string;
  }

  // Default fallback data if DB is empty - Premium Version 10/10
  const defaultTestimonials: Testimonial[] = [
    {
      name: "Kamal Chinthakayala",
      position: "Senior UI/UX Designer",
      company: "NextGen Creative",
      image: "https://ui-avatars.com/api/?name=Kamal+Chinthakayala&background=3b82f6&color=fff&size=150&bold=true",
      text: "Excellent service! YourWebPartner transformed our vision into a high-performance digital reality. Highly professional team.",
      rating: 5,
      color: "blue"
    },
    {
      name: "Sarah Johnson",
      position: "E-commerce Director",
      company: "The Fashion House",
      image: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=a855f7&color=fff&size=150&bold=true",
      text: "Our conversion rates skyrocketed after the relaunch. The ROI was visible within the first month. Incredible results!",
      rating: 5,
      color: "purple"
    },
    {
      name: "Michael Chen",
      position: "Product Manager",
      company: "TechPulse Solutions",
      image: "https://ui-avatars.com/api/?name=Michael+Chen&background=ec4899&color=fff&size=150&bold=true",
      text: "The most professional agency I've worked with. Clean code, great design, and on-time delivery. 10/10 experience.",
      rating: 5,
      color: "pink"
    }
  ];

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false });

        if (data && data.length > 0) {
          const colors = ['blue', 'purple', 'pink', 'green'];
          const mappedData: Testimonial[] = data.map((t: any, index: number) => {
            const [rolePart, companyPart] = (t.role || ' @ ').split(' @ ');
            
            // Intelligent quote parsing to clean up text like "(Company: ...)"
            let cleanText = t.content || '';
            let extractedCompany = companyPart || '';
            
            const companyMatch = cleanText.match(/\(Company:\s*(.*?)\)/i);
            if (companyMatch) {
              cleanText = cleanText.replace(companyMatch[0], '').trim();
              if (!extractedCompany) extractedCompany = companyMatch[1];
            }

            return {
              ...t,
              position: rolePart || t.role || 'Happy Customer',
              company: extractedCompany,
              text: cleanText,
              image: t.image_url || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=150&h=150',
              rating: t.rating || 5,
              color: colors[index % colors.length]
            };
          });
          setTestimonials(mappedData);
        } else {
          setTestimonials(defaultTestimonials);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
        setTestimonials(defaultTestimonials);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const nextTestimonial = React.useCallback(() => {
    if (testimonials.length === 0) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setIsAnimating(false);
    }, 400); // Slightly slower for more impact
  }, [testimonials.length]);

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 400);
  };

  const goToTestimonial = (index: number) => {
    if (index !== currentIndex) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 400);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        nextTestimonial();
      }
    }, 7000); // More time to read
    return () => clearInterval(timer);
  }, [isAnimating, nextTestimonial]);

  const currentTestimonial = testimonials[currentIndex] || defaultTestimonials[0];

  return (
    <section id="testimonials" className="py-32 bg-[#05060A] text-white relative overflow-hidden">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-morph-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-liquid-morph"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 animate-fade-in">
            <Quote className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm font-medium text-blue-100 tracking-wider uppercase">Testimonials</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
            What Our <span className="bg-gradient-to-r from-blue-400 via-white to-purple-400 bg-clip-text text-transparent animate-gradient-shift bg-300%">Partners Say</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From startups to industry leaders, we empower businesses to achieve 
            <span className="text-white font-semibold"> digital excellence</span>.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Enhanced Testimonial Card */}
          <div className={`backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-[40px] p-8 md:p-16 text-center shadow-3xl transition-all duration-700 transform ${isAnimating ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}>
            {/* Stars */}
            <div className="flex justify-center mb-10 space-x-1.5">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-yellow-500 fill-current drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="mb-12">
              <p className="text-2xl md:text-4xl text-white font-light leading-snug tracking-tight">
                "{currentTestimonial.text}"
              </p>
            </blockquote>

            {/* Identity */}
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="relative w-24 h-24 rounded-full object-cover border-2 border-white/20 shadow-2xl"
                />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-2 font-display bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                  {currentTestimonial.name}
                </h4>
                <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-3 text-lg">
                  <span className="text-blue-400 font-medium">{currentTestimonial.position}</span>
                  {currentTestimonial.company && (
                    <>
                      <span className="hidden sm:inline text-gray-600">|</span>
                      <span className="text-gray-400">{currentTestimonial.company}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Precision Controls */}
          <div className="flex justify-between items-center mt-12 px-4">
            <button
              onClick={prevTestimonial}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              disabled={isAnimating}
            >
              <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-blue-400 group-hover:scale-110 transition-all" />
            </button>

            {/* Dot indicators */}
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${index === currentIndex
                    ? 'bg-blue-500 w-8'
                    : 'bg-white/20 hover:bg-white/40'
                    }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              disabled={isAnimating}
            >
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-400 group-hover:scale-110 transition-all" />
            </button>
          </div>

          {/* Real Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-32">
            {[
              { number: "250+", label: "Projects Delivered", icon: "💎" },
              { number: "98%", label: "Client Retention", icon: "🤝" },
              { number: "15+", label: "Industry Awards", icon: "🏆" },
              { number: "24/7", label: "Expert Support", icon: "⭐" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2 font-display">{stat.number}</div>
                <div className="text-sm text-gray-500 uppercase tracking-widest font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
