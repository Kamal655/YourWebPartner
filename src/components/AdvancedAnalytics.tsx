
import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Users, Eye, MousePointer, Clock } from 'lucide-react';

const AdvancedAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    visitors: 0,
    pageViews: 0,
    conversionRate: 0,
    avgTimeOnSite: '0:00',
    topPages: [],
    recentActivity: []
  });

  useEffect(() => {
    // Simulate analytics data - in real implementation, connect to Google Analytics API
    const initAnalytics = () => {
      // Track page view
      trackPageView();
      
      // Track user session
      trackUserSession();
      
      // Load analytics data
      loadAnalyticsData();
    };

    const trackPageView = () => {
      const currentViews = parseInt(localStorage.getItem('pageViews') || '0');
      localStorage.setItem('pageViews', (currentViews + 1).toString());
    };

    const trackUserSession = () => {
      const sessionStart = Date.now();
      localStorage.setItem('sessionStart', sessionStart.toString());
      
      // Track session duration on page unload
      window.addEventListener('beforeunload', () => {
        const sessionEnd = Date.now();
        const duration = sessionEnd - sessionStart;
        const totalDuration = parseInt(localStorage.getItem('totalDuration') || '0');
        localStorage.setItem('totalDuration', (totalDuration + duration).toString());
      });
    };

    const loadAnalyticsData = () => {
      const pageViews = parseInt(localStorage.getItem('pageViews') || '0');
      const visitors = Math.floor(pageViews * 0.7); // Estimate unique visitors
      const conversionRate = Math.min(15 + Math.random() * 10, 25); // 15-25%
      const totalDuration = parseInt(localStorage.getItem('totalDuration') || '0');
      const avgDuration = pageViews > 0 ? totalDuration / pageViews : 0;
      const minutes = Math.floor(avgDuration / 60000);
      const seconds = Math.floor((avgDuration % 60000) / 1000);

      setAnalytics({
        visitors,
        pageViews,
        conversionRate: parseFloat(conversionRate.toFixed(1)),
        avgTimeOnSite: `${minutes}:${seconds.toString().padStart(2, '0')}`,
        topPages: [
          { page: 'Home', views: Math.floor(pageViews * 0.4) },
          { page: 'Services', views: Math.floor(pageViews * 0.25) },
          { page: 'Pricing', views: Math.floor(pageViews * 0.2) },
          { page: 'Contact', views: Math.floor(pageViews * 0.15) }
        ],
        recentActivity: [
          'New contact form submission',
          'User viewed pricing page',
          'Downloaded portfolio',
          'Scheduled consultation'
        ]
      });
    };

    initAnalytics();
  }, []);

  const stats = [
    {
      label: 'Total Visitors',
      value: analytics.visitors.toLocaleString(),
      icon: <Users className="w-6 h-6 text-blue-600" />,
      change: '+12%'
    },
    {
      label: 'Page Views',
      value: analytics.pageViews.toLocaleString(),
      icon: <Eye className="w-6 h-6 text-green-600" />,
      change: '+8%'
    },
    {
      label: 'Conversion Rate',
      value: `${analytics.conversionRate}%`,
      icon: <MousePointer className="w-6 h-6 text-purple-600" />,
      change: '+5%'
    },
    {
      label: 'Avg. Time on Site',
      value: analytics.avgTimeOnSite,
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      change: '+15%'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h3>
        <BarChart3 className="w-8 h-8 text-blue-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              {stat.icon}
              <span className="text-sm text-green-600 font-semibold">{stat.change}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h4>
          <div className="space-y-3">
            {analytics.topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{page.page}</span>
                <span className="text-sm text-gray-600">{page.views} views</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h4>
          <div className="space-y-3">
            {analytics.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
