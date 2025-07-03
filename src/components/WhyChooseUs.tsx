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
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to delivering exceptional web solutions that drive your business forward
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-8">
            Ready to get started? Let's bring your vision to life!
          </p>
          <a 
            href="#pricing"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Request a Quote
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
