"use client";

import { MapPin, CreditCard, Mail, FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();
  const steps = [
    {
      number: "1",
      title: "ZIP Code & Project Size",
      description:
        "Search for available takeoffs in your area by entering your location and project details",
      icon: MapPin,
      color: "bg-brand-100 text-brand-600",
    },
    {
      number: "2",
      title: "Purchase Takeoff",
      description:
        "Purchase takeoffs based on project size. Secure payments guaranteed.",
      icon: CreditCard,
      color: "bg-brand-100 text-brand-600",
    },
    {
      number: "3",
      title: "Instant Email Delivery",
      description:
        "Receive your takeoff immediately after purchase. No waiting, No delays.",
      icon: Mail,
      color: "bg-brand-100 text-brand-600",
    },
    {
      number: "4",
      title: "Customize & Submit",
      description:
        "Add your pricing and submit your bid to the general contractor. Win more projects.",
      icon: FileText,
      color: "bg-brand-100 text-brand-600",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative bg-white py-20 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23059669" fillOpacity="0.1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3Ccircle cx="27" cy="7" r="1"/%3E%3Ccircle cx="47" cy="7" r="1"/%3E%3Ccircle cx="7" cy="27" r="1"/%3E%3Ccircle cx="27" cy="27" r="1"/%3E%3Ccircle cx="47" cy="27" r="1"/%3E%3Ccircle cx="7" cy="47" r="1"/%3E%3Ccircle cx="27" cy="47" r="1"/%3E%3Ccircle cx="47" cy="47" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)] bg-repeat' />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-100/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-brand-50/50 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It <span className="text-brand-600">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Instant takeoffs in four easy steps. No guesswork. No delays. Just
            professional results, right when you need them.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative group">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0" />
                )}

                {/* Step Card */}
                <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-8 text-center hover:border-brand-300 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  {/* Step Number */}
                  <div className="w-16 h-16 bg-brand-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow for mobile */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-6">
                      <ArrowRight className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-brand-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Join hundreds of contractors who are already saving time and
              winning more bids.
            </p>
            <button
              className="bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={() => navigate("/find-takeoffs")}
            >
              Find Your First Takeoff
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
