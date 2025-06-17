
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Pay only for what you need. No subscriptions. No hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Small Projects */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Small Projects</h3>
              <p className="text-gray-600 mb-4">Under 5,000 sq ft</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">50$</span>
                <span className="text-gray-600"> per takeoff</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Residential Gardens</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Small commercial entrances</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Backyard renovations</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Small irrigation systems</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Excel format delivery</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Instant download</span>
                </li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Browse Small Projects
              </Button>
            </div>

            {/* Medium Projects */}
            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-green-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Medium Projects</h3>
              <p className="text-gray-600 mb-4">5,000 to 15,000 sq ft</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">100$</span>
                <span className="text-gray-600"> per takeoff</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Residential developments</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Commercial properties</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">HOA common areas</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Medium irrigation systems</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Excel format delivery</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Instant download</span>
                </li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Browse Medium Projects
              </Button>
            </div>

            {/* Large Projects */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Large Projects</h3>
              <p className="text-gray-600 mb-4">Over 15,000 sq ft</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">150$</span>
                <span className="text-gray-600"> per takeoff</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Commercial complexes</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Municipal Projects</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Parks and recreation areas</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Large irrigation systems</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Excel format delivery</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Instant download</span>
                </li>
              </ul>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Browse Large Projects
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What's Included</h2>
          <p className="text-xl text-gray-600 mb-12">
            Every takeoff includes these features, regardless of project size.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Material Lists</h3>
              <p className="text-gray-600">Complete breakdown of all required materials with quantities.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excel Format</h3>
              <p className="text-gray-600">Easily customizable spreadsheets for adding your pricing.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Delivery</h3>
              <p className="text-gray-600">Immediate email delivery after purchase.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Labor Estimates</h3>
              <p className="text-gray-600">Estimated labor hours for project completion.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Equipment Requirements</h3>
              <p className="text-gray-600">List of necessary equipment for project execution.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bid Templates</h3>
              <p className="text-gray-600">Ready-to-use templates for submitting professional bids.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Pricing FAQ</h2>
          <p className="text-xl text-center text-gray-600 mb-12">Common questions about our pricing model.</p>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Are there any subscription fees?</h3>
              <p className="text-gray-600">No, ProTakeoff.ai operates on a pay-per-takeoff model. There are no subscriptions or recurring fees.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I purchase multiple takeoffs?</h3>
              <p className="text-gray-600">Yes, you can purchase as many takeoffs as you need. Each takeoff is priced individually based on project size.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer volume discounts?</h3>
              <p className="text-gray-600">Yes, for companies that regularly purchase multiple takeoffs, we offer volume discount packages. Contact our sales team for more information.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards and debit cards. Payment is processed securely through our platform.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
