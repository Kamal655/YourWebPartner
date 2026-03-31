
import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, BarChart3, Smartphone, ChevronUp, ChevronDown, Globe, Zap, Shield, Target, ChevronRight } from 'lucide-react';

const SEOBooster = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [seoScore, setSeoScore] = useState(85);

  useEffect(() => {
    // Pulse animation for SEO score
    const interval = setInterval(() => {
      setSeoScore(prev => prev === 85 ? 86 : 85);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const seoFeatures = [
    { name: 'Meta Tags', status: 'good', icon: Search },
    { name: 'Structured Data', status: 'good', icon: BarChart3 },
    { name: 'Performance', status: 'good', icon: Zap },
    { name: 'Mobile Optimized', status: 'good', icon: Smartphone },
    { name: 'Core Web Vitals', status: 'good', icon: Target },
    { name: 'Security Headers', status: 'good', icon: Shield },
    { name: 'International SEO', status: 'improving', icon: Globe }
  ];

  return (
    <div className="hidden md:block fixed bottom-24 left-6 z-50 max-w-xs font-sans">
      {/* Collapsed State */}
      {isCollapsed ? (
        <button
          onClick={() => setIsCollapsed(false)}
          className="group relative bg-black/60 backdrop-blur-2xl text-white px-4 py-3 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 hover:border-blue-500/50 hover:bg-black/80 transition-all duration-300 flex items-center space-x-3 overflow-hidden ring-1 ring-white/5"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
            <Search className="w-5 h-5 text-white" />
          </div>

          <div className="text-left pr-2">
            <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">SEO Score</div>
            <div className="text-lg font-bold text-white leading-none tracking-tight">{seoScore}/100</div>
          </div>

          <div className="pl-2 border-l border-white/10">
            <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          </div>
        </button>
      ) : (
        /* Expanded State */
        <div className="bg-black/80 backdrop-blur-2xl rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.6)] border border-white/10 p-5 w-80 animate-in slide-in-from-bottom-5 duration-300 ring-1 ring-white/5 relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[50px] pointer-events-none"></div>

          {/* Header */}
          <div className="flex items-center justify-between mb-5 relative z-10">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">SEO Status</h3>
                <p className="text-xs text-blue-400 flex items-center gap-1.5 font-medium">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Live Monitoring
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCollapsed(true)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/5 hover:border-white/20"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* SEO Score Meter */}
          <div className="mb-6 bg-white/[0.03] rounded-2xl p-4 border border-white/5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Optimization Score</span>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{seoScore}%</span>
            </div>
            <div className="w-full bg-black/40 rounded-full h-2.5 overflow-hidden border border-white/5">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-1000 ease-out relative shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                style={{ width: `${seoScore}%` }}
              >
                <div className="absolute inset-0 bg-white/20 w-full h-full animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Key Features List */}
          <div className="space-y-2 relative z-10">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 pl-1">Core Metrics</h4>
            <div className="max-h-[160px] overflow-y-auto pr-1 space-y-1 custom-scrollbar">
              {seoFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-3 text-sm group p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors cursor-default border border-transparent hover:border-white/5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${feature.status === 'good' ? 'bg-emerald-500/10 text-emerald-400 shadow-emerald-500/10' : 'bg-yellow-500/10 text-yellow-400 shadow-yellow-500/10'
                      }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-gray-300 flex-1 font-medium group-hover:text-white transition-colors">{feature.name}</span>
                    {feature.status === 'good' && (
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <button className="text-xs text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 mx-auto group">
              View Full Report
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOBooster;
