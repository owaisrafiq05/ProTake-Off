import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Scale, Users, CreditCard, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

const TermsOfService: React.FC = () => {
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
               <Link to="/privacy-policy" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">
                 Privacy Policy
               </Link>
               <Link to="/terms-of-service" className="text-brand-600 font-medium border-b-2 border-brand-600 pb-1">
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
                <FileText className="h-8 w-8 text-brand-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These terms govern your use of ProTakeoff.ai and outline the rules and guidelines for our services.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: January 2025</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <div className="space-y-12">
            {/* Acceptance of Terms */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-brand-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Acceptance of Terms</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  By accessing and using ProTakeoff.ai, you accept and agree to be bound by the terms and provision 
                  of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
                <p>
                  These terms apply to all visitors, users, and others who access or use the service. By using our 
                  service, you agree to be bound by these terms and all applicable laws and regulations.
                </p>
              </div>
            </section>

            {/* Service Description */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Scale className="h-6 w-6 text-brand-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Service Description</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  ProTakeoff.ai provides AI-powered takeoff services for landscaping and irrigation companies. 
                  Our platform includes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Automated measurement and calculation tools</li>
                  <li>Project management and organization features</li>
                  <li>Bidding and estimation capabilities</li>
                  <li>File upload and processing services</li>
                  <li>Customer support and technical assistance</li>
                </ul>
              </div>
            </section>

            {/* User Accounts */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-brand-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">User Accounts</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>When you create an account with us, you must provide accurate and complete information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You are responsible for safeguarding your account credentials</li>
                  <li>You must notify us immediately of any unauthorized use</li>
                  <li>You are responsible for all activities under your account</li>
                  <li>You must be at least 18 years old to create an account</li>
                  <li>One account per person/company is allowed</li>
                </ul>
              </div>
            </section>

            {/* Payment Terms */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-brand-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Payment Terms</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>Payment terms for our services:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All fees are billed in advance on a monthly or annual basis</li>
                  <li>Payments are non-refundable except as required by law</li>
                  <li>We reserve the right to change pricing with 30 days notice</li>
                  <li>Late payments may result in service suspension</li>
                  <li>All fees are exclusive of applicable taxes</li>
                </ul>
              </div>
            </section>

            {/* Acceptable Use */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-brand-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Acceptable Use</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>You agree not to use the service to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Upload malicious software or content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the service or other users</li>
                  <li>Use the service for any illegal or unauthorized purpose</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Intellectual Property</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  The service and its original content, features, and functionality are owned by ProTakeoff.ai 
                  and are protected by international copyright, trademark, patent, trade secret, and other 
                  intellectual property laws.
                </p>
                <p>
                  You retain ownership of your content, but grant us a license to use, store, and display 
                  your content as necessary to provide the service.
                </p>
              </div>
            </section>

            {/* Privacy */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Your privacy is important to us. Please review our{" "}
                  <Link to="/privacy-policy" className="text-brand-600 hover:text-brand-700">
                    Privacy Policy
                  </Link>
                  , which also governs your use of the service, to understand our practices.
                </p>
              </div>
            </section>

            {/* Termination */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-brand-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Termination</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.</p>
                <p>Upon termination, your right to use the service will cease immediately. If you wish to terminate your account, you may simply discontinue using the service.</p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Limitation of Liability</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  In no event shall ProTakeoff.ai, nor its directors, employees, partners, agents, suppliers, 
                  or affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
                  damages, including without limitation, loss of profits, data, use, goodwill, or other 
                  intangible losses, resulting from your use of the service.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to Terms</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                  If a revision is material, we will try to provide at least 30 days notice prior to any new 
                  terms taking effect.
                </p>
                <p>
                  What constitutes a material change will be determined at our sole discretion. By continuing 
                  to access or use our service after any revisions become effective, you agree to be bound by 
                  the revised terms.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-gradient-to-r from-brand-50 to-brand-100 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> legal@protakeoffs.ai</p>
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

export default TermsOfService 