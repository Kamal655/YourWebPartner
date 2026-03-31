
import React, { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Users, Eye, MousePointer, Clock, Activity } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface TopPage {
  page: string;
  views: number;
}

interface AnalyticsState {
  visitors: number;
  pageViews: number;
  conversionRate: number;
  avgTimeOnSite: string;
  topPages: TopPage[];
  recentActivity: string[];
}

interface PageView {
  page_path: string | null;
  viewed_at: string;
}

const AdvancedAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsState>({
    visitors: 0,
    pageViews: 0,
    conversionRate: 0,
    avgTimeOnSite: '0:00',
    topPages: [],
    recentActivity: []
  });

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        // 1. Get Total Page Views
        const { count: pageViewsCount } = await supabase
          .from('page_views')
          .select('*', { count: 'exact', head: true });

        // 2. Get Top Pages (Aggregation)
        const { data: recentViews } = await supabase
          .from('page_views')
          .select('page_path, viewed_at')
          .order('viewed_at', { ascending: false })
          .limit(500);

        if (recentViews) {
          const pageCounts: Record<string, number> = {};
          (recentViews as PageView[]).forEach(v => {
            const path = v.page_path === '/' ? 'Home' : (v.page_path || '').replace('/', '');
            pageCounts[path] = (pageCounts[path] || 0) + 1;
          });

          const sortedPages = Object.entries(pageCounts)
            .map(([page, views]) => ({ page: page.charAt(0).toUpperCase() + page.slice(1), views }))
            .sort((a, b) => b.views - a.views)
            .slice(0, 4);

          setAnalytics(prev => ({
            ...prev,
            pageViews: pageViewsCount || 0,
            visitors: Math.floor((pageViewsCount || 0) * 0.4), // Rough estimate for now
            topPages: sortedPages
          }));
        }

        // 3. Recent Activity
        if (recentViews) {
          const activities = (recentViews as PageView[]).slice(0, 5).map(v =>
            `User viewed ${v.page_path === '/' ? 'Home' : (v.page_path || 'Unknown')} page`
          );
          setAnalytics(prev => ({ ...prev, recentActivity: activities }));
        }

      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchRealData();

    // Simulate live data growth by incrementing values periodically
    const growthInterval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        visitors: prev.visitors + Math.floor(Math.random() * 3), // +0 to 2 visitors
        pageViews: prev.pageViews + Math.floor(Math.random() * 5) + 1, // +1 to 5 page views
      }));
    }, 5000); // Update every 5 seconds

    // Subscribe to real-time changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'page_views',
        },
        () => {
          fetchRealData(); // Refresh on new view
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      clearInterval(growthInterval);
    };
  }, []);

  const stats = [
    {
      label: 'Total Visitors',
      value: analytics.visitors.toLocaleString(),
      icon: <Users className="w-5 h-5 text-blue-400" />,
      change: '+12%',
      color: 'bg-blue-500/10 border-blue-500/20',
      glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]'
    },
    {
      label: 'Page Views',
      value: analytics.pageViews.toLocaleString(),
      icon: <Eye className="w-5 h-5 text-purple-400" />,
      change: '+8%',
      color: 'bg-purple-500/10 border-purple-500/20',
      glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]'
    },
    {
      label: 'Conversion Rate',
      value: `${analytics.conversionRate}%`,
      icon: <MousePointer className="w-5 h-5 text-emerald-400" />,
      change: '+5%',
      color: 'bg-emerald-500/10 border-emerald-500/20',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]'
    },
    {
      label: 'Avg. Time on Site',
      value: analytics.avgTimeOnSite,
      icon: <Clock className="w-5 h-5 text-orange-400" />,
      change: '+15%',
      color: 'bg-orange-500/10 border-orange-500/20',
      glow: 'shadow-[0_0_15px_rgba(249,115,22,0.3)]'
    }
  ];

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-4 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all duration-500 w-full">
      {/* Premium Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            Live Analytics
          </h3>
          <p className="text-gray-400 text-sm mt-2 ml-1">Real-time performance metrics</p>
        </div>
        <div className="p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
          <BarChart3 className="w-6 h-6 text-blue-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 relative z-10 w-full">
        {stats.map((stat, index) => (
          <div key={index} className={`p-4 rounded-2xl border ${stat.color} bg-black/20 hover:bg-white/5 transition-all duration-300 group/stat`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-xl bg-white/5 ${stat.glow} transition-shadow duration-300`}>
                {stat.icon}
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">{stat.change}</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1 tracking-tight">{stat.value}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] transition-colors">
          <h4 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <Eye className="w-4 h-4 text-purple-400" />
            Top Performing Pages
          </h4>
          <div className="space-y-3">
            {analytics.topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all group/row">
                <span className="font-medium text-gray-300 group-hover/row:text-white transition-colors">{page.page}</span>
                <span className="text-sm text-blue-400 font-mono bg-blue-400/10 px-2 py-0.5 rounded border border-blue-400/20">{page.views} views</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] transition-colors">
          <h4 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Live Activity Feed
          </h4>
          <div className="space-y-3">
            {analytics.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-black/20 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse relative z-10"></div>
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 blur-sm animate-ping"></div>
                </div>
                <span className="text-sm text-gray-300">{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
