
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, Eye, Lock, UserCheck, ChevronRight, FileText, Server, Scale, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-sans selection:bg-blue-500/30">
      <Header />

      {/* Global Background Effects */}
      <div className="fixed inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-black via-black/90 to-black pointer-events-none -z-10"></div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen animate-blob"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 backdrop-blur-sm animate-fade-in-up hover:bg-white/10 transition-colors cursor-default">
            <Shield className="w-5 h-5 text-emerald-400" />
            <span className="text-sm text-gray-300 font-medium tracking-wide">Last updated: June 14, 2025</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight animate-fade-in-up animation-delay-100">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Policy</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            We are committed to transparently determining how we handle your personal data and ensuring your digital safety.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="space-y-8">

          {/* Section 1: Collection */}
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 hover:border-white/20 transition-all duration-300 group">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <Eye className="w-8 h-8 text-blue-400" />
              </div>
              <div className="space-y-6 flex-1">
                <h2 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">Information We Collect</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/[0.02] rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-colors">
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-blue-400" />
                      Personal Information
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full"></div>Name & Contact Details</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full"></div>Business Requirements</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full"></div>Communication History</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-400 rounded-full"></div>Payment Details</li>
                    </ul>
                  </div>
                  <div className="bg-white/[0.02] rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-colors">
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Server className="w-4 h-4 text-purple-400" />
                      Technical Data
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-400 rounded-full"></div>IP Address & Device Info</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-400 rounded-full"></div>Browser Type & Version</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-400 rounded-full"></div>Usage Patterns</li>
                      <li className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-400 rounded-full"></div>Cookies & Tracking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Usage */}
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 hover:border-white/20 transition-all duration-300 group">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                <FileText className="w-8 h-8 text-purple-400" />
              </div>
              <div className="space-y-5 flex-1">
                <h2 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">How We Use Your Data</h2>
                <p className="text-gray-400 leading-relaxed">
                  We use your information to deliver and improve our services, communicate with you, and comply with legal obligations.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "To provide and maintain our Service",
                    "To notify you about changes to our Service",
                    "To provide customer support",
                    "To gather analysis to improve our Service",
                    "To monitor the usage of our Service",
                    "To detect, prevent and address technical issues"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-300 bg-black/20 p-3 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors">
                      <CheckCircle className="w-4 h-4 text-purple-500 min-w-[16px]" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Security */}
          <div className="bg-emerald-500/5 backdrop-blur-xl border border-emerald-500/10 rounded-3xl p-8 md:p-10 hover:border-emerald-500/20 transition-all duration-300 group">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <Lock className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="space-y-5 flex-1">
                <h2 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">Data Protection & Security</h2>
                <p className="text-gray-400 leading-relaxed max-w-2xl">
                  We employ industry-standard security measures to safeguard your data. While no method of transmission over the Internet is 100% secure, we strive to use commercially acceptable means to protect your Personal Data.
                </p>
                <div className="flex flex-wrap gap-3 mt-2">
                  {["SSL Encryption", "Secure Servers", "Regular Audits", "Access Control"].map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm font-semibold tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Rights */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 p-10 text-center group">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 group-hover:from-blue-900/30 group-hover:to-purple-900/30 transition-colors duration-500"></div>

            <div className="relative z-10">
              <div className="inline-flex p-4 rounded-full bg-white/5 border border-white/10 mb-6">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Your Data Rights</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                You have the right to access, update, or delete your personal information at any time. We respect your privacy and control over your data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/#contact" className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
                  Contact Privacy Officer
                </Link>
                <Link to="/faq" className="inline-flex items-center justify-center gap-2 bg-white/5 text-white px-8 py-3 rounded-full font-bold border border-white/10 hover:bg-white/10 transition-colors">
                  Read FAQ <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Footer Contact */}
          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-gray-500">
              Questions about this policy? Email us at <a href="mailto:yourwebpartner1@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors underline-offset-4 hover:underline">yourwebpartner1@gmail.com</a>
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
