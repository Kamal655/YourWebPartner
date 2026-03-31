
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FileText, Scale, Users, AlertTriangle, Check, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-sans selection:bg-blue-500/30">
      <Header />

      {/* Global Background Effects */}
      <div className="fixed inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-black via-black/90 to-black pointer-events-none -z-10"></div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-blob"></div>
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 backdrop-blur-xl animate-fade-in-up hover:bg-white/10 transition-colors cursor-default">
            <Scale className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-gray-300 font-medium tracking-wide">Last updated: June 14, 2025</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight animate-fade-in-up animation-delay-100">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Service</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Please read these terms carefully before using our services. They define the legal relationship between you and YourWebPartner.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="space-y-8">

          {/* Section 1: Service Agreement */}
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 hover:border-white/20 transition-all duration-300 group">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
              <div className="space-y-4 flex-1">
                <h2 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">1. Service Agreement</h2>
                <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    By engaging our web development services, you agree to these terms and conditions. Our primary services include:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {[
                      "Custom website design & development",
                      "UI/UX design services",
                      "SEO audit & optimization",
                      "Maintenance & technical support",
                      "E-commerce implementation"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Client Responsibilities */}
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 hover:border-white/20 transition-all duration-300 group">
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <div className="space-y-6 flex-1">
                <h2 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">2. Client Responsibilities</h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/5">
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-400" />
                      Content & Materials
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Provide necessary content & images</li>
                      <li>• Ensure content is properly licensed</li>
                      <li>• Review designs within 3 business days</li>
                    </ul>
                  </div>

                  <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/5">
                    <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-400" />
                      Communication
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Respond within 48 hours</li>
                      <li>• Designate one primary contact</li>
                      <li>• Provide clear initial requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Payment */}
          <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 hover:border-white/20 transition-all duration-300">
            <h2 className="text-2xl font-bold text-white mb-6 pl-2 border-l-4 border-green-500">3. Payment Terms</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-500/5 p-6 rounded-2xl border border-green-500/10 hover:bg-green-500/10 transition-colors">
                <h3 className="font-bold text-green-400 mb-3 text-lg">Payment Schedule</h3>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Start Project</span>
                    <span className="font-bold text-white bg-green-500/20 px-3 py-1 rounded-full border border-green-500/20">50% Deposit</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Design Approval</span>
                    <span className="font-bold text-white bg-green-500/20 px-3 py-1 rounded-full border border-green-500/20">25% Payment</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Project Launch</span>
                    <span className="font-bold text-white bg-green-500/20 px-3 py-1 rounded-full border border-green-500/20">25% Final</span>
                  </li>
                </ul>
              </div>
              <div className="bg-yellow-500/5 p-6 rounded-2xl border border-yellow-500/10 hover:bg-yellow-500/10 transition-colors">
                <h3 className="font-bold text-yellow-400 mb-3 text-lg">Late Policy</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    15-day grace period for all invoices
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    2% monthly interest on overdue balance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    Work may be paused if payments are late
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 4 & 5: Timeline & IP */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
              <h2 className="text-xl font-bold text-white mb-4">4. Timeline Estimates</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5">
                  <span className="text-gray-400 text-sm">Basic Sites</span>
                  <span className="text-white font-mono text-sm">2-4 Weeks</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5">
                  <span className="text-gray-400 text-sm">Professional</span>
                  <span className="text-white font-mono text-sm">4-6 Weeks</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5">
                  <span className="text-gray-400 text-sm">Enterprise</span>
                  <span className="text-white font-mono text-sm">6-12 Weeks</span>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all">
              <h2 className="text-xl font-bold text-white mb-4">5. Intellectual Property</h2>
              <ul className="space-y-4">
                <li className="bg-black/20 p-3 rounded-xl border border-white/5">
                  <span className="block text-blue-400 text-sm font-bold mb-1">Client Ownership</span>
                  <span className="text-xs text-gray-400">You own all custom designs and content upon full payment.</span>
                </li>
                <li className="bg-black/20 p-3 rounded-xl border border-white/5">
                  <span className="block text-purple-400 text-sm font-bold mb-1">Our Rights</span>
                  <span className="text-xs text-gray-400">We retain rights to our code frameworks and tools.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 6: Limitations */}
          <div className="bg-orange-500/5 backdrop-blur-xl border border-orange-500/10 rounded-3xl p-8 md:p-10 hover:border-orange-500/20 transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <AlertTriangle className="w-8 h-8 text-orange-400 animate-pulse" />
              <h2 className="text-2xl font-bold text-white">6. Limitations & Warranties</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 text-sm">
              <div>
                <h3 className="text-white font-bold mb-3">Service Limitations</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>• Functionality guaranteed, business results are not</li>
                  <li>• Browser compatibility for modern browsers only</li>
                  <li>• 3rd party service uptime is not guaranteed</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-bold mb-3">Warranty Period</h3>
                <p className="text-gray-400 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
                  We provide a <strong>30-day warranty</strong> on all functionality issues post-launch. This covers bugs and errors in our code. It does not cover issues caused by third-party updates, hosting changes, or client modifications.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Contact */}
          <div className="mt-12 text-center pt-8 border-t border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Have questions about our terms?</h3>
            <p className="text-gray-400 mb-6">Our team is happy to explain any part of this agreement.</p>
            <Link to="/#contact" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
              Contact Support
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;
