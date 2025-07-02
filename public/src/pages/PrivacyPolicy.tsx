
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Shield, Eye, Lock, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-100 rounded-full">
                <Shield className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">
              Your privacy is important to us. This policy explains how we handle your data.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: June 14, 2025
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Name and contact information (email, phone number)</li>
                <li>• Business information and project requirements</li>
                <li>• Communication preferences</li>
                <li>• Payment information (processed securely through third parties)</li>
              </ul>
              
              <h3 className="text-lg font-semibold mb-3 mt-6">Automatically Collected Information</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Website usage data and analytics</li>
                <li>• IP address and browser information</li>
                <li>• Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <UserCheck className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <ul className="space-y-2 text-gray-700">
                <li>• To provide and improve our web development services</li>
                <li>• To communicate with you about projects and updates</li>
                <li>• To process payments and manage contracts</li>
                <li>• To send newsletters and marketing communications (with consent)</li>
                <li>• To analyze website performance and user experience</li>
                <li>• To comply with legal obligations</li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Data Protection & Security</h2>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• SSL encryption for all data transmission</li>
                <li>• Secure servers and regular security updates</li>
                <li>• Limited access to personal information</li>
                <li>• Regular security audits and monitoring</li>
                <li>• Secure payment processing through trusted providers</li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Access & Correction</h3>
                <p className="text-gray-700">You can request access to your personal data and ask us to correct any inaccuracies.</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Data Deletion</h3>
                <p className="text-gray-700">You can request deletion of your personal information, subject to legal requirements.</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Marketing Opt-out</h3>
                <p className="text-gray-700">You can unsubscribe from marketing communications at any time.</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Data Portability</h3>
                <p className="text-gray-700">You can request a copy of your data in a machine-readable format.</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies Policy</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                We use cookies to enhance your browsing experience and analyze website traffic.
              </p>
              <div className="space-y-3">
                <div>
                  <strong>Essential Cookies:</strong> Required for website functionality
                </div>
                <div>
                  <strong>Analytics Cookies:</strong> Help us understand how visitors use our site
                </div>
                <div>
                  <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> yourwebpartner1@gmail.com</p>
                <p><strong>Phone:</strong> +91 6300371553</p>
                <p><strong>Address:</strong> Prasadam Padu, Vijayawada, 521108</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
