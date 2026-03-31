import React from 'react';
import { DollarSign, Zap, Clock, HeadphonesIcon } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <DollarSign className="w-12 h-12 text-green-600" />,
      title: "Affordable Pricing",
      description: "Quality websites at competitive prices that fit your budget without compromising on excellence."
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-600" />,
      title: "Fully Customizable",
      description: "Every website is tailored to your brand, ensuring a unique online presence that stands out."
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-600" />,
      title: "Quick Delivery",
      description: "Fast turnaround times without sacrificing quality. Get your website live in record time."
    },
    {
      icon: <HeadphonesIcon className="w-12 h-12 text-purple-600" />,
      title: "Ongoing Support",
      description: "24/7 support and maintenance services to keep your website running smoothly at all times."
    }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're committed to delivering exceptional web solutions that drive your business forward
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 backdrop-blur-sm shadow-lg transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                <div className="p-4 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-gray-400 mb-8">
            Ready to get started? Let's bring your vision to life!
          </p>
          <a
            href="#pricing"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 border border-white/10"
          >
            Request a Quote
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
