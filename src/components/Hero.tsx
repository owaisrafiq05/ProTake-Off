"use client"

import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { ArrowRight, CheckCircle, Users, Award, TrendingUp } from "lucide-react"

const Hero = () => {
  const navigate = useNavigate()
  return (
    <section className="relative bg-white py-16 min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23059669&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;7&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-brand-100/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-brand-50/50 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center bg-brand-50 text-brand-700 px-4 py-2 rounded-full text-sm font-medium border border-brand-200">
              <Award className="h-4 w-4 mr-2" />
              Trusted by 500+ Contractors
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Bid More,
                <br />
                <span className="text-brand-600">Win More.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Protakeoffs.ai is the first AI-powered marketplace where landscaping and irrigation professionals can instantly purchase accurate, ready-to-use project takeoffs — From Blueprint to Bid, instantly.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-3">
              {[
                "Instant access to professional takeoffs",
                "Save 80% of your estimation time",
                "Takeoffs Done. Deals Won.",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-brand-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 group" onClick={() => navigate('/find-takeoffs')}>
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600 font-medium">Active Contractors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600 font-medium">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600 font-medium">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Image Section */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full bg-gradient-to-br from-gray-50 to-white border border-gray-200">
                <img
                  src="/hero.jpg"
                  alt="Protakeoffs.ai - Digital marketplace for landscaping and irrigation project takeoffs"
                  className="w-full h-auto object-cover"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200 hidden md:block">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">80% Faster</div>
                    <div className="text-xs text-gray-600">Estimation Time</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200 hidden md:block">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">500+</div>
                    <div className="text-xs text-gray-600">Happy Contractors</div>
                  </div>
                </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute -z-10 top-8 right-8 w-72 h-72 bg-gradient-to-br from-brand-200/20 to-blue-200/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50/50 to-transparent" />
    </section>
  )
}

export default Hero
