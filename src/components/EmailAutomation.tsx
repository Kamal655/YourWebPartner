
import React, { useState } from 'react';
import { Mail, Send, Users, Clock, CheckCircle } from 'lucide-react';

const EmailAutomation = () => {
  const [emailData, setEmailData] = useState({
    subscribers: 1247,
    openRate: 28.5,
    clickRate: 3.2,
    campaigns: 12
  });

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
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Email Automation</h3>
        <Mail className="w-8 h-8 text-blue-600" />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-xl text-center">
          <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{emailData.subscribers.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Subscribers</div>
        </div>
        <div className="bg-green-50 p-4 rounded-xl text-center">
          <Mail className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{emailData.openRate}%</div>
          <div className="text-sm text-gray-600">Open Rate</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl text-center">
          <Send className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{emailData.clickRate}%</div>
          <div className="text-sm text-gray-600">Click Rate</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-xl text-center">
          <CheckCircle className="w-6 h-6 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{emailData.campaigns}</div>
          <div className="text-sm text-gray-600">Active Campaigns</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Campaigns */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Campaigns</h4>
          <div className="space-y-3">
            {recentCampaigns.map((campaign, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold text-gray-900">{campaign.name}</h5>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Sent:</span>
                    <div className="font-semibold">{campaign.sent}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Opened:</span>
                    <div className="font-semibold">{campaign.opened}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Clicked:</span>
                    <div className="font-semibold">{campaign.clicked}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automation Triggers */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Active Triggers</h4>
          <div className="space-y-3">
            {automationTriggers.map((trigger, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-900">{trigger}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Active</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h5 className="font-semibold text-gray-900 mb-2">Next Steps</h5>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Set up welcome email sequence</li>
              <li>• Create follow-up templates</li>
              <li>• Configure abandoned cart emails</li>
              <li>• Design newsletter templates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailAutomation;
