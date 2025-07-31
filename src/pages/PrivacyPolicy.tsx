import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Shield, Eye, Lock, Database, Users, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
             {/* Header */}
       <div className="bg-gradient-to-r from-brand-50 to-brand-100 border-b border-brand-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
           <div className="flex items-center justify-between mb-8">
             <Link to="/" className="flex items-center space-x-2 text-brand-600 hover:text-brand-700 transition-colors">
               <ArrowLeft className="h-5 w-5" />
               <span className="font-medium">Back to Home</span>
             </Link>
             <div className="flex space-x-6 text-sm">
               <Link to="/privacy-policy" className="text-brand-600 font-medium border-b-2 border-brand-600 pb-1">
                 Privacy Policy
               </Link>
               <Link to="/terms-of-service" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">
                 Terms of Service
               </Link>
               <Link to="/cookie-policy" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">
                 Cookie Policy
               </Link>
             </div>
           </div>
           <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-brand-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: January 2025</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <div className="space-y-12">
            {/* Information We Collect */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Database className="h-6 w-6 text-brand-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  We collect information you provide directly to us, such as when you create an account, 
                  use our services, or contact us for support.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Account Information:</strong> Name, email address, phone number, and company details</li>
                  <li><strong>Usage Data:</strong> How you interact with our platform and services</li>
                  <li><strong>Project Data:</strong> Takeoff projects, measurements, and related files</li>
                  <li><strong>Payment Information:</strong> Billing details and transaction history</li>
                  <li><strong>Communication:</strong> Emails, support tickets, and feedback</li>
                </ul>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-brand-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and maintain our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Improve our services and develop new features</li>
                  <li>Protect against fraud and ensure security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-brand-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Information Sharing</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Service Providers:</strong> Trusted partners who help us operate our platform</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger or acquisition</li>
                  <li><strong>With Your Consent:</strong> When you explicitly authorize us to do so</li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Lock className="h-6 w-6 text-brand-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Employee training on data protection</li>
                  <li>Incident response procedures</li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Bell className="h-6 w-6 text-brand-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us at{" "}
                  <a href="mailto:privacy@protakeoffs.ai" className="text-brand-600 hover:text-brand-700">
                    privacy@protakeoffs.ai
                  </a>
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies and Tracking</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We use cookies and similar technologies to enhance your experience, analyze usage, and 
                  provide personalized content. You can control cookie settings through your browser preferences.
                </p>
                <p>
                  For more detailed information about our use of cookies, please see our{" "}
                  <Link to="/cookie-policy" className="text-brand-600 hover:text-brand-700">
                    Cookie Policy
                  </Link>
                  .
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-gradient-to-r from-brand-50 to-brand-100 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@protakeoffs.ai</p>
                  <p><strong>Address:</strong> San Francisco, CA</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy 