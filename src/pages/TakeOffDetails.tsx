"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  MapPin,
  Download,
  Calendar,
  FileSpreadsheet,
  Zap,
  Users,
  Check,
  CreditCard,
  Shield,
  Eye,
  TrendingUp,
} from "lucide-react"

const TakeoffDetails = () => {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvc, setCvc] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePurchase = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
  }

  const projectTags = [
    { label: "Landscaping", color: "bg-green-100 text-green-800" },
    { label: "Medium Project", color: "bg-blue-100 text-blue-800" },
    { label: "Intermediate", color: "bg-yellow-100 text-yellow-800" },
    { label: "Residential", color: "bg-purple-100 text-purple-800" },
    { label: "Suburban", color: "bg-indigo-100 text-indigo-800" },
    { label: "Medium-Complexity", color: "bg-orange-100 text-orange-800" },
  ]

  const specifications = [
    { label: "Project Area", value: "2,500 sq ft" },
    { label: "Complexity Level", value: "Intermediate" },
    { label: "Estimated Hours", value: "32 hours" },
    { label: "Materials Included", value: "Sod, Trees, Shrubs, Mulch" },
    { label: "Irrigation", value: "Basic system included" },
  ]

  const includedItems = [
    "15 trees (various species)",
    "1,200 sq ft sod installation",
    "8 shrub groupings",
    "Mulch bed preparation",
    "Basic irrigation layout",
    "Material quantity breakdown",
    "Labor hour estimates",
    "Equipment requirements list",
  ]

  const deliveryFeatures = [
    {
      icon: FileSpreadsheet,
      title: "Excel Format",
      description: "Easy to customize and edit",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Zap,
      title: "Instant Download",
      description: "Available immediately after purchase",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Users,
      title: "Multiple Use",
      description: "Use for multiple project bids",
      color: "bg-purple-100 text-purple-600",
    },
  ]

  const popularProjects = [
    {
      title: "Small Garden Design",
      price: 49,
      downloads: 23,
      image: "/placeholder.svg?height=60&width=80",
    },
    {
      title: "Commercial Irrigation",
      price: 149,
      downloads: 18,
      image: "/placeholder.svg?height=60&width=80",
    },
    {
      title: "Backyard Renovation",
      price: 89,
      downloads: 31,
      image: "/placeholder.svg?height=60&width=80",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            to="/find-takeoffs"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Browse
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {projectTags.map((tag, index) => (
                  <span key={index} className={`px-3 py-1 rounded-full text-xs font-medium ${tag.color}`}>
                    {tag.label}
                  </span>
                ))}
              </div>

              {/* Title and Description */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Residential Landscaping - 2,500 sq ft
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Complete landscaping takeoff including material quantities, labor estimates, and pricing guidelines for
                a beautiful residential property transformation.
              </p>

              {/* Project Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  ZIP 75501
                </div>
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  45 downloads
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Added 6/10/2025
                </div>
              </div>
            </div>

            {/* Project Images */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Visualization</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group overflow-hidden rounded-xl">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Residential landscaping before"
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-xl">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Residential landscaping after"
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Project Specifications */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Specifications</h2>
              <p className="text-gray-600 mb-6">Detailed specifications and requirements for this project</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{spec.label}:</span>
                    <span className="text-gray-900 font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included in This Project</h2>
              <p className="text-gray-600 mb-6">Detailed breakdown of all components and deliverables</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {includedItems.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {deliveryFeatures.map((feature, index) => {
                  const IconComponent = feature.icon
                  return (
                    <div key={index} className="text-center">
                      <div
                        className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                      >
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 top-6 z-20">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Purchase Takeoff</h3>
              <p className="text-gray-600 mb-6">Get access to this professional takeoff instantly</p>

              {/* Project Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Project Area:</span>
                  <span className="font-semibold">2,500 sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Hours:</span>
                  <span className="font-semibold">32 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Format:</span>
                  <div className="flex items-center">
                    <FileSpreadsheet className="h-4 w-4 mr-1 text-green-600" />
                    <span className="font-semibold">Excel Spreadsheet</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery:</span>
                  <div className="flex items-center text-green-600">
                    <Zap className="h-4 w-4 mr-1" />
                    <span className="font-semibold">Instant</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <div className="flex items-center text-green-700 mb-2">
                  <Download className="h-4 w-4 mr-2" />
                  <span className="font-medium">Instant download after purchase</span>
                </div>
                <div className="flex items-center text-green-700">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="font-medium">Use for multiple project bids</span>
                </div>
              </div>

              {/* Payment Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <Input placeholder="MM/YY" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
                    <Input placeholder="123" value={cvc} onChange={(e) => setCvc(e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Purchase Button */}
              <Button
                onClick={handlePurchase}
                disabled={isProcessing}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessing ? "Processing..." : "Pay $99"}
              </Button>

              {/* Security Notice */}
              <div className="flex items-center justify-center text-xs text-gray-500 mt-4">
                <Shield className="h-3 w-3 mr-1" />
                <span>Secure payment processing</span>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By purchasing this takeoff, you agree to our{" "}
                <a href="#" className="text-green-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-green-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>

            {/* Popular This Week */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-6">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">Popular This Week</h3>
              </div>
              <div className="space-y-4">
                {popularProjects.map((project, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{project.title}</h4>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>${project.price}</span>
                        <span>{project.downloads} downloads</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default TakeoffDetails
