
import React, { useState } from 'react';
import { Mail, Send, Users, CheckCircle, Zap, ArrowRight, BarChart } from 'lucide-react';

const EmailAutomation = () => {
  const [emailData, setEmailData] = useState({
    subscribers: 1247,
    openRate: 28.5,
    clickRate: 3.2,
    campaigns: 12
  });

  React.useEffect(() => {
    const subscriberInterval = setInterval(() => {
      setEmailData(prev => ({
        ...prev,
        subscribers: prev.subscribers + Math.floor(Math.random() * 2) // +0 or 1 subscriber
      }));
    }, 8000); // Every 8 seconds

    return () => clearInterval(subscriberInterval);
  }, []);

  const recentCampaigns = [
    {
      name: "Welcome Series",
      status: "Active",
      sent: 156,
      opened: 89,
      clicked: 23,
      date: "2024-06-10"
    },
    {
      name: "Newsletter June",
      status: "Completed",
      sent: 1247,
      opened: 355,
      clicked: 47,
      date: "2024-06-08"
    },
    {
      name: "Special Offer",
      status: "Draft",
      sent: 0,
      opened: 0,
      clicked: 0,
      date: "2024-06-12"
    }
  ];

  const automationTriggers = [
    "New Contact Form Submission",
    "Pricing Page Visit",
    "Service Page Engagement",
    "Consultation Request",
    "Portfolio Download"
  ];

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-4 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all duration-500 h-full">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>
            Email Automation
          </h3>
          <p className="text-gray-400 text-sm mt-2 ml-1">Campaign performance & triggers</p>
        </div>
        <div className="p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
          <Mail className="w-6 h-6 text-purple-400" />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 relative z-10">
        <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl hover:bg-blue-500/10 transition-all duration-300 group/metric">
          <Users className="w-5 h-5 text-blue-400 mb-2 group-hover/metric:scale-110 transition-transform" />
          <div className="text-2xl font-bold text-white">{emailData.subscribers.toLocaleString()}</div>
          <div className="text-xs text-gray-400 group-hover/metric:text-blue-300 transition-colors">Subscribers</div>
        </div>
        <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-2xl hover:bg-emerald-500/10 transition-all duration-300 group/metric">
          <Mail className="w-5 h-5 text-emerald-400 mb-2 group-hover/metric:scale-110 transition-transform" />
          <div className="text-2xl font-bold text-white">{emailData.openRate}%</div>
          <div className="text-xs text-gray-400 group-hover/metric:text-emerald-300 transition-colors">Open Rate</div>
        </div>
        <div className="bg-purple-500/5 border border-purple-500/10 p-4 rounded-2xl hover:bg-purple-500/10 transition-all duration-300 group/metric">
          <Send className="w-5 h-5 text-purple-400 mb-2 group-hover/metric:scale-110 transition-transform" />
          <div className="text-2xl font-bold text-white">{emailData.clickRate}%</div>
          <div className="text-xs text-gray-400 group-hover/metric:text-purple-300 transition-colors">Click Rate</div>
        </div>
        <div className="bg-orange-500/5 border border-orange-500/10 p-4 rounded-2xl hover:bg-orange-500/10 transition-all duration-300 group/metric">
          <CheckCircle className="w-5 h-5 text-orange-400 mb-2 group-hover/metric:scale-110 transition-transform" />
          <div className="text-2xl font-bold text-white">{emailData.campaigns}</div>
          <div className="text-xs text-gray-400 group-hover/metric:text-orange-300 transition-colors">Active</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        {/* Recent Campaigns */}
        <div>
          <h4 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <BarChart className="w-4 h-4 text-blue-400" />
            Recent Campaigns
          </h4>
          <div className="space-y-3">
            {recentCampaigns.map((campaign, index) => (
              <div key={index} className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-white text-sm">{campaign.name}</h5>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${campaign.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    campaign.status === 'Completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-gray-500/10 text-gray-400 border-gray-500/20'
                    }`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 bg-black/20 rounded-lg">
                    <span className="block text-gray-500 mb-1">Sent</span>
                    <span className="font-bold text-white">{campaign.sent}</span>
                  </div>
                  <div className="text-center p-2 bg-black/20 rounded-lg">
                    <span className="block text-gray-500 mb-1">Opened</span>
                    <span className="font-bold text-white">{campaign.opened}</span>
                  </div>
                  <div className="text-center p-2 bg-black/20 rounded-lg">
                    <span className="block text-gray-500 mb-1">Clicked</span>
                    <span className="font-bold text-white">{campaign.clicked}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automation Triggers */}
        <div>
          <h4 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            Active Triggers
          </h4>
          <div className="space-y-3">
            {automationTriggers.map((trigger, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl border border-white/5 hover:border-yellow-500/30 transition-all group/trigger">
                <span className="text-gray-300 text-sm group-hover/trigger:text-white transition-colors">{trigger}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"></div>
                  <span className="text-xs text-emerald-400 font-medium">On</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-5 bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl relative overflow-hidden group/actions hover:border-blue-500/30 transition-all">
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
            <div className="relative z-10">
              <h5 className="font-bold text-white mb-3 flex items-center gap-2 text-sm">
                <ArrowRight className="w-4 h-4 text-blue-400 group-hover/actions:translate-x-1 transition-transform" />
                Recommended Actions
              </h5>
              <ul className="text-xs text-gray-300 space-y-2 ml-1">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.5)]"></span>
                  Set up welcome email sequence
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.5)]"></span>
                  Create follow-up templates
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.5)]"></span>
                  Configure abandoned cart emails
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailAutomation;
