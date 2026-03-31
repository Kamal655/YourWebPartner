import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// --- EMAILJS CONFIGURATION ---
// REPLACE THESE WITH YOUR ACTUAL KEYS FROM https://dashboard.emailjs.com/
const EMAILJS_SERVICE_ID = 'service_x1z9s5a';
const EMAILJS_TEMPLATE_ID = 'template_ohrxkmi';
const EMAILJS_PUBLIC_KEY = 'ljyKjgp1kdNLSnnPI';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
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
    setIsSubmitting(true);

    // --- REAL SEND MODE ---
    try {
      if (!formRef.current) return;

      // Define params BEFORE using them
      const templateParams = {
        to_name: 'Admin',
        from_name: formData.name,
        name: formData.name,
        reply_to: formData.email,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
      };

      // Run Supabase and EmailJS in parallel to speed up "Sending..."
      const [dbResult, emailResult] = await Promise.allSettled([
        // 1. Save to Database
        supabase.from('contact_submissions').insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message
        }]),
        // 2. Send via EmailJS
        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        )
      ]);

      // Check results
      if (dbResult.status === 'rejected') {
        console.error("Supabase Save Error:", dbResult.reason);
      }
      if (emailResult.status === 'rejected') {
        console.error("EmailJS Error:", emailResult.reason);
        toast({
          title: "Opening WhatsApp...",
          description: "Proceeding to WhatsApp to complete your inquiry.",
        });
      } else {
        console.log('EmailJS Success:', (emailResult as PromiseFulfilledResult<any>).value.text);
        toast({
          title: "Message Sent Successfully! 🎉",
          description: "We have received your inquiry. Opening WhatsApp...",
        });
      }

      // --- WhatsApp Integration ---
      const waMessage = `*New Inquiry from Website* 🚀%0A%0A` +
        `*Name:* ${formData.name}%0A` +
        `*Email:* ${formData.email}%0A` +
        `*Phone:* ${formData.phone}%0A` +
        `*Service:* ${formData.service}%0A` +
        `*Message:* ${formData.message}`;

      const waUrl = `https://wa.me/918160103379?text=${waMessage}`;

      // Open WhatsApp in a new tab
      window.open(waUrl, '_blank');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });

    } catch (error) {
      console.error('Submission Error:', error);
      // SHOW REAL ERROR TO USER
      toast({
        title: "Email Failed (Check Console)",
        description: `Error: ${error?.text || error?.message || JSON.stringify(error)}. Opening WhatsApp...`,
        variant: "destructive",
        duration: 5000,
      });

      // Fallback: Open WhatsApp even if error occurs
      const messageText = `*New Inquiry from Website* 🚀\n\n` +
        `*Name:* ${formData.name}\n` +
        `*Email:* ${formData.email}\n` +
        `*Phone:* ${formData.phone}\n` +
        `*Service:* ${formData.service}\n` +
        `*Message:* ${formData.message}`;

      const waUrl = `https://wa.me/918160103379?text=${encodeURIComponent(messageText)}`;

      // DOM-based redirection to bypass popup blockers
      const link = document.createElement('a');
      link.href = waUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="blob absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="blob absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/5 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Touch</span>
          </h2>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto font-light">
            Ready to start your web project? We're here to help you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Contact Information Cards */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-white/20 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-8">Contact Info</h3>

                <div className="space-y-8">
                  <a href="mailto:yourwebpartner1@gmail.com" className="flex items-center space-x-6 group/item cursor-pointer">
                    <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover/item:bg-blue-500/20 transition-all duration-300 border border-blue-500/20">
                      <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-1">Email Us</p>
                      <p className="text-white font-medium text-lg group-hover/item:text-blue-400 transition-colors">yourwebpartner1@gmail.com</p>
                    </div>
                  </a>

                  <a href="tel:+916300371553" className="flex items-center space-x-6 group/item cursor-pointer">
                    <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center group-hover/item:bg-green-500/20 transition-all duration-300 border border-green-500/20">
                      <Phone className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-1">Call Us</p>
                      <p className="text-white font-medium text-lg group-hover/item:text-green-400 transition-colors">+91 6300371553</p>
                    </div>
                  </a>



                  <a href="https://wa.me/918160103379" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-6 group/item cursor-pointer">
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover/item:bg-emerald-500/20 transition-all duration-300 border border-emerald-500/20">
                      <MessageSquare className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-1">WhatsApp Us</p>
                      <p className="text-white font-medium text-lg group-hover/item:text-emerald-400 transition-colors">+91 8160103379</p>
                    </div>
                  </a>

                  <div className="flex items-center space-x-6 group/item">
                    <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center group-hover/item:bg-purple-500/20 transition-all duration-300 border border-purple-500/20">
                      <MapPin className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-1">Visit Us</p>
                      <p className="text-white font-medium text-lg">Prasadam Padu, Vijayawada, 521108</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* "Why Work With Us" Gradient Card */}
            <div className="relative overflow-hidden rounded-3xl p-8 border border-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-pink-900/40 backdrop-blur-md"></div>
              <div className="relative z-10">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Why Choose Us?
                </h4>
                <ul className="space-y-4">
                  {[
                    "Free initial consultation",
                    "Custom design & development",
                    "Mobile-responsive websites",
                    "SEO optimization included",
                    "Ongoing support & maintenance"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-3 text-gray-300 bg-black/20 p-3 rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
              {/* Form Glow Effect */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="flex items-center gap-3 mb-8">
                <MessageSquare className="w-6 h-6 text-purple-400" />
                <h3 className="text-2xl font-bold text-white">Send us a Message</h3>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-400 ml-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-black/20 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 text-white placeholder-gray-600 outline-none hover:bg-black/30"
                      placeholder="John Doe"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-400 ml-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-black/20 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 text-white placeholder-gray-600 outline-none hover:bg-black/30"
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-400 ml-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-black/20 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 text-white placeholder-gray-600 outline-none hover:bg-black/30"
                      placeholder="+1 (555) 123-4567"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-medium text-gray-400 ml-1">
                      Service Needed
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-6 py-4 bg-black/20 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 text-white placeholder-gray-600 outline-none appearance-none hover:bg-black/30"
                        disabled={isSubmitting}
                      >
                        <option value="" className="bg-gray-900 text-gray-400">Select a service</option>
                        <option value="Basic Website Package" className="bg-gray-900">Basic Website Package</option>
                        <option value="Professional Website Package" className="bg-gray-900">Professional Website Package</option>
                        <option value="Enterprise Website Package" className="bg-gray-900">Enterprise Website Package</option>
                        <option value="web-design" className="bg-gray-900">Web Design</option>
                        <option value="web-development" className="bg-gray-900">Web Development</option>
                        <option value="ecommerce" className="bg-gray-900">E-commerce</option>
                        <option value="seo" className="bg-gray-900">SEO Optimization</option>
                        <option value="maintenance" className="bg-gray-900">Website Maintenance</option>
                        <option value="Free Consultation" className="bg-gray-900">Free Consultation</option>
                        <option value="Custom Development" className="bg-gray-900">Custom Development</option>
                      </select>
                      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <ArrowRight className="w-5 h-5 text-gray-500 rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-400 ml-1">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-black/20 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 text-white placeholder-gray-600 outline-none resize-none hover:bg-black/30"
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative px-8 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-600/20 transition-all duration-300 transform hover:scale-[1.02] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 skew-y-12"></div>
                  <span className="relative flex items-center justify-center gap-3">
                    <Send className="w-5 h-5" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
