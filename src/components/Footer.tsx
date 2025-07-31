"use client"

import type React from "react"

import { Link } from "react-router-dom"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-white border-t border-gray-200 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23059669&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;7&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative flex items-center">
                <img src="/logoUpdated.png" alt="ProTakeoff.ai" className="h-12" />
                <span className="ml-2 text-2xl font-bold text-[#5d722f] tracking-wide">
                  ProTakeoff<span className="text-gray-900">Ai</span>
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-8 max-w-md text-lg leading-relaxed">
              Revolutionizing takeoffs for landscaping and irrigation companies. Bid faster, win more jobs, and grow
              your business with AI-powered precision.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-brand-600" />
                </div>
                <span className="font-medium">hello@Protakeoffs.ai</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-brand-600" />
                </div>
                <span className="font-medium">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-brand-600" />
                </div>
                <span className="font-medium">San Francisco, CA</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-12 h-12 bg-gray-100 hover:bg-brand-600 rounded-lg flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110 group"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-gray-100 hover:bg-brand-600 rounded-lg flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110 group"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full"></div>
            </h3>
            <div className="space-y-3">
              {[
                { label: "Features", href: "/#features" },
                { label: "Find Takeoffs", href: "/find-takeoffs", isRoute: true },
                { label: "How It Works", href: "/#how-it-works" },
                { label: "Pricing", href: "/pricing", isRoute: true },
                { label: "Contact", href: "/#contact" },
              ].map(({ label, href, isRoute }) =>
                isRoute ? (
                  <Link
                    key={label}
                    to={href}
                    className="block text-gray-700 hover:text-brand-600 font-medium transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-brand-600" />
                    {label}
                  </Link>
                ) : (
                  <a
                    key={label}
                    href={href}
                    className="block text-gray-700 hover:text-brand-600 font-medium transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-brand-600" />
                    {label}
                  </a>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-center md:text-left">
              © 2025 Protakeoffs.ai. All rights reserved. Built with ❤️ for contractors.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">
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
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-100/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-brand-50/50 to-transparent rounded-full blur-3xl"></div>
    </footer>
  )
}

export default Footer
