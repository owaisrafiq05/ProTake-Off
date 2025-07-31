import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Cookie, Settings, Shield, Eye, Database, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

const CookiePolicy: React.FC = () => {
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
               <Link to="/terms-of-service" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">
                 Terms of Service
               </Link>
               <Link to="/cookie-policy" className="text-brand-600 font-medium border-b-2 border-brand-600 pb-1">
                 Cookie Policy
               </Link>
             </div>
           </div>
           <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center">
                <Cookie className="h-8 w-8 text-brand-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              This policy explains how we use cookies and similar technologies to enhance your experience on ProTakeoff.ai.
            </p>
            <p className="text-sm text-gray-500 mt-4">Last updated: January 2025</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <div className="space-y-12">
            {/* What Are Cookies */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Cookie className="h-6 w-6 text-brand-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">What Are Cookies?</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  Cookies are small text files that are placed on your device when you visit our website. 
                  They help us provide you with a better experience by:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Remembering your preferences and settings</li>
                  <li>Analyzing how you use our website</li>
                  <li>Providing personalized content and features</li>
                  <li>Improving our services and user experience</li>
                  <li>Ensuring security and preventing fraud</li>
                </ul>
              </div>
            </section>

            {/* Types of Cookies */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Settings className="h-6 w-6 text-brand-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Types of Cookies We Use</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Essential Cookies</h3>
                  <p className="text-gray-700">
                    These cookies are necessary for the website to function properly. They enable basic functions 
                    like page navigation, access to secure areas, and user authentication.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Session management and security</li>
                    <li>User authentication and login</li>
                    <li>Shopping cart functionality</li>
                    <li>Form submission and validation</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Performance Cookies</h3>
                  <p className="text-gray-700">
                    These cookies help us understand how visitors interact with our website by collecting 
                    and reporting information anonymously.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Website usage analytics</li>
                    <li>Page load times and performance</li>
                    <li>Error tracking and debugging</li>
                    <li>User behavior analysis</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Functional Cookies</h3>
                  <p className="text-gray-700">
                    These cookies enable enhanced functionality and personalization, such as remembering 
                    your preferences and settings.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Language and region preferences</li>
                    <li>User interface customization</li>
                    <li>Remembering login status</li>
                    <li>Personalized content delivery</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Marketing Cookies</h3>
                  <p className="text-gray-700">
                    These cookies are used to track visitors across websites to display relevant and 
                    engaging advertisements.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Advertising campaign tracking</li>
                    <li>Social media integration</li>
                    <li>Retargeting and remarketing</li>
                    <li>Conversion tracking</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Database className="h-6 w-6 text-brand-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Third-Party Cookies</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  We may use third-party services that place cookies on your device. These services help us:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Analytics:</strong> Google Analytics for website usage analysis</li>
                  <li><strong>Payment Processing:</strong> Stripe for secure payment processing</li>
                  <li><strong>Customer Support:</strong> Intercom for live chat and support</li>
                  <li><strong>Marketing:</strong> Facebook Pixel and Google Ads for advertising</li>
                  <li><strong>Security:</strong> Cloudflare for DDoS protection and security</li>
                </ul>
                <p className="mt-4">
                  These third-party services have their own privacy policies and cookie practices. 
                  We recommend reviewing their policies for more information.
                </p>
              </div>
            </section>

            {/* Cookie Management */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-brand-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Managing Your Cookie Preferences</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>You have several options for managing cookies:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Browser Settings:</strong> Most browsers allow you to control cookies through settings</li>
                  <li><strong>Cookie Consent:</strong> Use our cookie consent banner to manage preferences</li>
                  <li><strong>Opt-Out Tools:</strong> Use industry opt-out tools for advertising cookies</li>
                  <li><strong>Contact Us:</strong> Email us for assistance with cookie management</li>
                </ul>
                <div className="mt-6 p-4 bg-brand-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Browser Cookie Settings</h4>
                  <ul className="space-y-1 text-sm">
                    <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                    <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                    <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                    <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookie Duration */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookie Duration</h2>
              <div className="space-y-4 text-gray-700">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Session Cookies</h3>
                    <p>These cookies are deleted when you close your browser and are used for temporary session management.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Persistent Cookies</h3>
                    <p>These cookies remain on your device for a set period (usually 1-2 years) and are used to remember your preferences.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Third-Party Cookies</h3>
                    <p>The duration of third-party cookies is determined by the respective service providers.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Updates to Policy */}
            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Updates to This Policy</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices 
                  or for other operational, legal, or regulatory reasons.
                </p>
                <p>
                  We will notify you of any material changes by posting the new Cookie Policy on this page 
                  and updating the "Last updated" date at the top of this policy.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-gradient-to-r from-brand-50 to-brand-100 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  If you have any questions about our use of cookies, please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@protakeoffs.ai</p>
                  <p><strong>Address:</strong> San Francisco, CA</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
                <p className="mt-4">
                  For more information about our privacy practices, please see our{" "}
                  <Link to="/privacy-policy" className="text-brand-600 hover:text-brand-700">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookiePolicy 