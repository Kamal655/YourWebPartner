
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Check for URL parameters to pre-fill the form
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    const packageParam = urlParams.get('package');
    const sourceParam = urlParams.get('source');
    const typeParam = urlParams.get('type');

    if (serviceParam) {
      let serviceValue = '';
      let messageValue = '';

      // Map URL parameters to form values
      if (serviceParam === 'basic-website') {
        serviceValue = 'Basic Website Package';
        messageValue = `I'm interested in the Basic Website Package${packageParam ? ` (${packageParam})` : ''}. Please provide more details and a quote.`;
      } else if (serviceParam === 'professional-website') {
        serviceValue = 'Professional Website Package';
        messageValue = `I'm interested in the Professional Website Package${packageParam ? ` (${packageParam})` : ''}. Please provide more details and a quote.`;
      } else if (serviceParam === 'enterprise-website') {
        serviceValue = 'Enterprise Website Package';
        messageValue = `I'm interested in the Enterprise Website Package${packageParam ? ` (${packageParam})` : ''}. Please provide more details and a quote.`;
      } else if (serviceParam === 'custom-quote') {
        serviceValue = 'Custom Development';
        messageValue = `I need a custom quote for ${packageParam || 'enterprise'} solutions. Please contact me to discuss my specific requirements.`;
      } else if (serviceParam === 'consultation') {
        serviceValue = 'Free Consultation';
        if (typeParam === 'schedule') {
          messageValue = 'I would like to schedule a consultation to discuss my project requirements.';
        } else {
          messageValue = 'I would like a free consultation and quote for my project.';
        }
      }

      setFormData(prev => ({
        ...prev,
        service: serviceValue,
        message: messageValue
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted, preventing default');
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            service: formData.service || null,
            message: formData.message
          }
        ]);

      if (error) {
        throw error;
      }

      // Show success message
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your inquiry. We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your web project? Contact us today for a free consultation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Let's Start a Conversation
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email Us</h4>
                  <a 
                    href="mailto:yourwebpartner1@gmail.com" 
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    yourwebpartner1@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Call Us</h4>
                  <a 
                    href="tel:+916300371553" 
                    className="text-gray-600 hover:text-green-600 transition-colors duration-200"
                  >
                    +91 6300371553
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Visit Us</h4>
                  <p className="text-gray-600">Prasadam Padu, Vijayawada, 521108</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Why Work With Us?
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Free initial consultation</li>
                <li>✓ Custom design & development</li>
                <li>✓ Mobile-responsive websites</li>
                <li>✓ SEO optimization included</li>
                <li>✓ Ongoing support & maintenance</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="+1 (555) 123-4567"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    disabled={isSubmitting}
                  >
                    <option value="">Select a service</option>
                    <option value="Basic Website Package">Basic Website Package</option>
                    <option value="Professional Website Package">Professional Website Package</option>
                    <option value="Enterprise Website Package">Enterprise Website Package</option>
                    <option value="web-design">Web Design</option>
                    <option value="web-development">Web Development</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="seo">SEO Optimization</option>
                    <option value="maintenance">Website Maintenance</option>
                    <option value="Free Consultation">Free Consultation</option>
                    <option value="Custom Development">Custom Development</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
