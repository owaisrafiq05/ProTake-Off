"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, ArrowRight, Zap } from "lucide-react"

const TakeoffFinder = () => {
  const [zipCode, setZipCode] = useState("")
  const [projectSize, setProjectSize] = useState("")

  return (
    <section id="find-takeoffs" className="relative bg-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23059669&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;7&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-green-100/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-green-50/50 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200 mb-6">
            <Zap className="h-4 w-4 mr-2" />
            Instant Results
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find Your <span className="text-green-600">Takeoff</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Enter your ZIP code and project size to discover available takeoffs in your area. Get professional estimates
            in minutes, not days.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-lg mx-auto relative">
          {/* Form Header */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Search className="h-6 w-6 text-green-600" />
            </div>
          </div>

          <div className="space-y-6">
            {/* ZIP Code Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-left">ZIP Code</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Enter your ZIP code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="pl-10 text-center border-gray-300 text-lg py-4 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
              </div>
            </div>

            {/* Project Size Select */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 text-left">Project Size</label>
              <Select value={projectSize} onValueChange={setProjectSize}>
                <SelectTrigger className="w-full border-gray-300 text-lg py-4 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all">
                  <SelectValue placeholder="Select your project size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Small Projects</span>
                      <span className="text-sm text-gray-500">Under $5K</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Medium Projects</span>
                      <span className="text-sm text-gray-500">$5K - $25K</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="large">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Large Projects</span>
                      <span className="text-sm text-gray-500">$25K - $100K</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="enterprise">
                    <div className="flex flex-col items-start">
                      <span className="font-medium">Enterprise Projects</span>
                      <span className="text-sm text-gray-500">$100K+</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 group">
              Find Available Takeoffs
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust Indicator */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              <span className="font-medium text-green-600">500+</span> contractors trust ProTakeoff.ai for their
              estimates
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">2 min</div>
            <div className="text-sm text-gray-600">Average search time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">10K+</div>
            <div className="text-sm text-gray-600">Available takeoffs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">$50-150</div>
            <div className="text-sm text-gray-600">Typical pricing</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TakeoffFinder
