
import React from 'react';
import { Users, Award, Clock, Heart, Sparkles, Star, Zap } from 'lucide-react';

const About = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "100+",
      label: "Happy Clients",
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "200+",
      label: "Projects Completed",
      color: "from-purple-500 to-pink-400",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      number: "5+",
      label: "Years Experience",
      color: "from-green-500 to-emerald-400",
      bgColor: "bg-green-50"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      number: "99%",
      label: "Client Satisfaction",
      color: "from-red-500 to-pink-400",
      bgColor: "bg-red-50"
    }
  ];

  const values = [
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: "Innovation First",
      description: "We stay ahead of the curve with the latest design trends and technologies.",
      gradient: "from-yellow-400 via-orange-500 to-red-500"
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "Quality Focused",
      description: "Every pixel matters. We deliver nothing but excellence in every project.",
      gradient: "from-blue-400 via-purple-500 to-pink-500"
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Fast Delivery",
      description: "Quick turnaround times without compromising on quality or creativity.",
      gradient: "from-green-400 via-blue-500 to-purple-500"
    }
  ];

  return (
    <section id="about" className="py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-float animation-delay-1000 blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-pink-400 to-yellow-500 rounded-full opacity-20 animate-float-reverse animation-delay-2000 blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-15 animate-morph-blob blur-xl"></div>
        
        {/* Floating Sparkles */}
        <Sparkles className="absolute top-20 right-1/4 w-8 h-8 text-yellow-400 animate-sparkle animation-delay-500" />
        <Star className="absolute bottom-32 left-1/3 w-6 h-6 text-pink-400 animate-bounce animation-delay-1500" />
        <Zap className="absolute top-1/3 right-1/3 w-10 h-10 text-purple-400 animate-pulse animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8 animate-bounce">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-6xl md:text-7xl font-bold mb-6 animate-slide-in-down">
            About{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift bg-300%">
              Our Story
            </span>
          </h2>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-slide-in-up animation-delay-300">
            We're passionate creators who transform ideas into{' '}
            <span className="text-purple-600 font-bold">stunning digital experiences</span>{' '}
            that captivate audiences and drive results.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left Content */}
          <div className="animate-slide-in-left">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                Crafting Digital{' '}
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Masterpieces
                </span>
              </h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Founded with a vision to revolutionize the digital landscape, we combine cutting-edge 
                technology with creative excellence to deliver solutions that don't just meet expectations—they exceed them.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our team of passionate designers and developers work tirelessly to ensure every project 
                is a testament to innovation, quality, and client satisfaction.
              </p>
              
              {/* Call to Action */}
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold rounded-full hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-gradient-shift bg-300% overflow-hidden">
                <span className="relative z-10">Learn More About Us</span>
                <div className="absolute inset-0 bg-white opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="grid grid-cols-2 gap-6 animate-slide-in-right animation-delay-500">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-2 animate-zoom-in group cursor-pointer border-2 border-transparent hover:border-white`}
                style={{ animationDelay: `${700 + index * 200}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} text-white rounded-full mb-4 group-hover:scale-125 transition-transform duration-300 shadow-lg`}>
                  {stat.icon}
                </div>
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.number}
                </div>
                <div className="text-gray-700 font-semibold group-hover:text-gray-900 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-16">
          <h3 className="text-5xl font-bold text-gray-900 mb-4 animate-slide-in-up">
            Our{' '}
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              Core Values
            </span>
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-in-up animation-delay-200">
            The principles that guide everything we do and define who we are
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 text-center hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-8 hover:rotate-1 animate-zoom-in border border-white/30 overflow-hidden"
              style={{ animationDelay: `${1000 + index * 300}ms` }}
            >
              {/* Animated Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-3xl`}></div>
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${value.gradient} text-white rounded-full mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl relative z-10`}>
                {value.icon}
              </div>
              
              {/* Content */}
              <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300 relative z-10">
                {value.title}
              </h4>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 relative z-10">
                {value.description}
              </p>

              {/* Hover Effect Particles */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-purple-400 rounded-full animate-sparkle"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.3}s`
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 animate-slide-in-up animation-delay-1500">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
            <div className="relative z-10">
              <h4 className="text-4xl font-bold mb-4">Ready to Start Your Project?</h4>
              <p className="text-xl mb-8 opacity-90">Let's create something amazing together!</p>
              <button className="group relative px-12 py-6 bg-white text-purple-600 font-bold rounded-full hover:shadow-2xl transition-all duration-500 transform hover:scale-110 overflow-hidden">
                <span className="relative z-10">Get Started Today</span>
                <div className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  Let's Talk! 
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
