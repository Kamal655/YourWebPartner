
import React, { useState } from 'react';
import { Search, CheckCircle, BarChart3, Smartphone, ChevronUp, ChevronDown, Globe, Zap, Shield, Target } from 'lucide-react';

const SEOBooster = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [seoScore] = useState(85);

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
    <div className="fixed bottom-4 left-20 z-40 max-w-xs">
      {/* Collapsed State - Smaller, more subtle button */}
      {isCollapsed ? (
        <button
          onClick={() => setIsCollapsed(false)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300 flex items-center space-x-2 text-sm"
        >
          <Search className="w-4 h-4" />
          <span className="font-medium">SEO: {seoScore}%</span>
          <ChevronUp className="w-3 h-3" />
        </button>
      ) : (
        /* Expanded State - Smaller and more compact */
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
          {/* Header with collapse button */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1 rounded-full bg-blue-500">
                <Search className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">SEO Status</h3>
                <p className="text-xs text-blue-600">Good Optimization</p>
              </div>
            </div>
            <button
              onClick={() => setIsCollapsed(true)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* SEO Score */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600">Overall Score</span>
              <div className="flex items-center space-x-1">
                <span className="text-lg font-bold text-blue-600">{seoScore}%</span>
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${seoScore}%` }}
              ></div>
            </div>
          </div>

          {/* SEO Features - Simplified */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-gray-700">Key Features</h4>
            {seoFeatures.slice(0, 4).map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-center space-x-2 text-xs">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-2 h-2 text-white" />
                  </div>
                  <IconComponent className="w-3 h-3 text-blue-600" />
                  <span className="text-gray-700 flex-1">{feature.name}</span>
                  <span className="text-xs text-blue-700 bg-blue-100 px-1 py-0.5 rounded">
                    {feature.status === 'good' ? 'Good' : 'OK'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOBooster;
