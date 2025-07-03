
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              YourWebPartner
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your trusted partner for creating beautiful, functional websites that help your business grow online.
            </p>
            <p className="text-sm text-blue-400 font-medium">
              "Your Website, Our Passion"
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#services" className="hover:text-blue-400 transition-colors duration-200">Web Design</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors duration-200">Web Development</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors duration-200">E-commerce</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors duration-200">SEO Optimization</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors duration-200">Maintenance</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#about" className="hover:text-blue-400 transition-colors duration-200">About Us</a></li>
              <li><a href="#portfolio" className="hover:text-blue-400 transition-colors duration-200">Portfolio</a></li>
              <li><a href="#testimonials" className="hover:text-blue-400 transition-colors duration-200">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors duration-200">Contact</a></li>
              <li><a href="#pricing" className="hover:text-blue-400 transition-colors duration-200">Pricing</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <a 
                  href="mailto:yourwebpartner1@gmail.com" 
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  yourwebpartner1@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <a 
                  href="tel:+916300371553" 
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  +91 6300371553
                </a>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <a href="https://www.facebook.com/yourwebpartner.in" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://x.com/Yourwebpartner1" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-blue-400 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/yourwebpartner.in/" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/your-web-partner-ba276b366/" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-blue-700 transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 YourWebPartner. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#contact" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#contact" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#contact" className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
