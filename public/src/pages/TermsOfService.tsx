
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FileText, Scale, Users, AlertTriangle } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-24 pb-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-purple-100 rounded-full">
                <Scale className="w-12 h-12 text-purple-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600">
              Please read these terms carefully before using our services.
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
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">1. Service Agreement</h2>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                By engaging our web development services, you agree to these terms and conditions. Our services include:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Custom website design and development</li>
                <li>• UI/UX design services</li>
                <li>• SEO optimization</li>
                <li>• Website maintenance and support</li>
                <li>• E-commerce solutions</li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">2. Client Responsibilities</h2>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Content & Materials</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• Provide all necessary content, images, and materials</li>
                <li>• Ensure all content is original or properly licensed</li>
                <li>• Review and approve designs within specified timeframes</li>
                <li>• Provide timely feedback and approvals</li>
              </ul>
              
              <h3 className="text-lg font-semibold mb-3">Communication</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Respond to project communications within 48 hours</li>
                <li>• Designate a primary point of contact</li>
                <li>• Provide clear project requirements and objectives</li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Payment Terms</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Payment Schedule</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• 50% deposit to start project</li>
                  <li>• 25% at design approval</li>
                  <li>• 25% upon project completion</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Late Payments</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• 15-day grace period</li>
                  <li>• 2% monthly interest thereafter</li>
                  <li>• Work may be suspended</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Project Timeline & Delivery</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Project timelines are estimates based on scope and client responsiveness:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Basic websites: 2-4 weeks</li>
                <li>• Professional websites: 4-6 weeks</li>
                <li>• Enterprise solutions: 6-12 weeks</li>
                <li>• Timelines may extend due to client delays or scope changes</li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Client Ownership</h3>
                  <p className="text-gray-700">Upon full payment, clients own all custom design elements and content specific to their project.</p>
                </div>
                <div>
                  <h3 className="font-semibold">Our Ownership</h3>
                  <p className="text-gray-700">We retain rights to general methodologies, code frameworks, and techniques used in development.</p>
                </div>
                <div>
                  <h3 className="font-semibold">Third-Party Assets</h3>
                  <p className="text-gray-700">Clients are responsible for licensing any third-party assets, plugins, or services.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">6. Limitations & Warranties</h2>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Service Limitations</h3>
              <ul className="space-y-2 text-gray-700 mb-4">
                <li>• We guarantee website functionality but not business results</li>
                <li>• Browser compatibility for current major browsers</li>
                <li>• Basic SEO setup included, advanced marketing services separate</li>
                <li>• Security measures implemented but not guaranteed against all threats</li>
              </ul>
              
              <h3 className="text-lg font-semibold mb-3">Warranty Period</h3>
              <p className="text-gray-700">
                30-day warranty on functionality issues. Does not cover hosting, domain, or third-party service issues.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Refund Policy</h2>
            <div className="bg-red-50 p-6 rounded-lg">
              <div className="space-y-3">
                <div>
                  <strong>Before Design Phase:</strong> Full refund minus processing fees
                </div>
                <div>
                  <strong>After Design Approval:</strong> 50% refund of remaining balance
                </div>
                <div>
                  <strong>After Development Starts:</strong> No refund, but project files will be provided
                </div>
                <div>
                  <strong>Completed Projects:</strong> No refunds, 30-day warranty applies
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Either party may terminate the agreement with written notice:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Client: 14-day notice, payment for completed work required</li>
                <li>• YourWebPartner: 7-day notice for non-payment or breach of terms</li>
                <li>• All project files and access will be provided upon final payment</li>
              </ul>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                For questions about these terms or to discuss your project:
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

export default TermsOfService;
