"use client"

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
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
import { getTakeoffById, getPopularTakeoffs } from "../lib/api"
import { useCart } from "../components/CartContext"
import { toast } from "sonner"

const TakeoffDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [takeoff, setTakeoff] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvc, setCvc] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [popular, setPopular] = useState<any[]>([])
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchTakeoff() {
      setLoading(true)
      setError(null)
      try {
        const data = await getTakeoffById(id!)
        setTakeoff(data)
      } catch (err: any) {
        setError(err.message || "Failed to fetch takeoff")
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchTakeoff()
  }, [id])

  useEffect(() => {
    async function fetchPopular() {
      try {
        const data = await getPopularTakeoffs(3)
        // Exclude current takeoff
        setPopular(data.filter((t: any) => t._id !== id))
      } catch {}
    }
    fetchPopular()
  }, [id])

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
  if (!takeoff) return <div className="min-h-screen flex items-center justify-center text-gray-400">No takeoff found.</div>

  // Helper: format date
  const formatDate = (dateStr: string) => dateStr ? new Date(dateStr).toLocaleDateString() : "-"

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

  // Add to Cart handler
  const handleAddToCart = () => {
    if (!takeoff) return;
    addItem({
      id: takeoff._id,
      title: takeoff.title,
      type: takeoff.projectType,
      area: takeoff.specifications?.area ? `${takeoff.specifications.area} sq ft` : '',
      price: takeoff.price,
      image: takeoff.images && takeoff.images[0]?.cloudinaryUrl ? takeoff.images[0].cloudinaryUrl : "/placeholder.svg",
    });
    // Optionally show a toast or feedback
    toast.success('Added to cart!');
  };

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
                {takeoff.tags?.map((tag: string, index: number) => (
                  <span key={index} className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {tag}
                  </span>
                ))}
                {takeoff.projectType && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {takeoff.projectType.charAt(0).toUpperCase() + takeoff.projectType.slice(1)}
                  </span>
                )}
                {takeoff.projectSize && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {takeoff.projectSize.charAt(0).toUpperCase() + takeoff.projectSize.slice(1)}
                  </span>
                )}
                {takeoff.specifications?.complexity && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {takeoff.specifications.complexity.charAt(0).toUpperCase() + takeoff.specifications.complexity.slice(1)}
                  </span>
                )}
              </div>

              {/* Title and Description */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {takeoff.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {takeoff.description}
              </p>

              {/* Project Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  ZIP {takeoff.zipCode}
                </div>
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  {takeoff.downloadCount || 0} downloads
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Expires {formatDate(takeoff.expirationDate)}
                </div>
              </div>
            </div>

            {/* Project Images */}
            {takeoff.images && takeoff.images.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Visualization</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {takeoff.images.map((img: any, idx: number) => (
                    <div key={idx} className="relative group overflow-hidden rounded-xl">
                      <img
                        src={img.cloudinaryUrl}
                        alt={`Project image ${idx + 1}`}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Specifications */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Specifications</h2>
              <p className="text-gray-600 mb-6">Detailed specifications and requirements for this project</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Project Area:</span>
                  <span className="text-gray-900 font-semibold">{takeoff.specifications?.area ? `${takeoff.specifications.area} sq ft` : '-'}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Complexity Level:</span>
                  <span className="text-gray-900 font-semibold">{takeoff.specifications?.complexity || '-'}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Estimated Hours:</span>
                  <span className="text-gray-900 font-semibold">{takeoff.specifications?.estimatedHours ? `${takeoff.specifications.estimatedHours} hours` : '-'}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Materials Included:</span>
                  <span className="text-gray-900 font-semibold">{takeoff.specifications?.materials?.join(', ') || '-'}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            {takeoff.features && takeoff.features.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  {takeoff.features.map((feature: string, idx: number) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Files/Blueprints */}
            {/* {takeoff.files && takeoff.files.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Blueprints & Files</h2>
                <ul className="space-y-3">
                  {takeoff.files.map((file: any, idx: number) => (
                    <li key={idx} className="flex items-center gap-3">
                      <FileSpreadsheet className="h-5 w-5 text-green-600" />
                      <a href={file.cloudinaryUrl} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                        {file.originalName || file.filename}
                      </a>
                      <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
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
                  <span className="font-semibold">{takeoff.specifications?.area ? `${takeoff.specifications.area} sq ft` : '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Hours:</span>
                  <span className="font-semibold">{takeoff.specifications?.estimatedHours ? `${takeoff.specifications.estimatedHours} hours` : '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Format:</span>
                  <div className="flex items-center">
                    <FileSpreadsheet className="h-4 w-4 mr-1 text-green-600" />
                    <span className="font-semibold">Downloadable Files (after purchase)</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery:</span>
                  <div className="flex items-center text-green-600">
                    <Zap className="h-4 w-4 mr-1" />
                    <span className="font-semibold">Instant (after purchase)</span>
                  </div>
                </div>
              </div>
              {/* Add to Cart Button */}
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={handleAddToCart}
              >
                Add to Cart (${takeoff.price})
              </Button>
              {/* Security Notice */}
              <div className="flex items-center justify-center text-xs text-gray-500 mt-4">
                <Shield className="h-3 w-3 mr-1" />
                <span>Secure checkout after adding to cart</span>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                By adding this takeoff to your cart, you agree to our{" "}
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
                {popular.length === 0 && <div className="text-gray-400 text-sm">No popular takeoffs yet.</div>}
                {popular.map((project, index) => (
                  <Link to={`/takeoff-details/${project._id}`} key={project._id}>
                  <div
                    key={project._id}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <img
                      src={project.images && project.images[0]?.cloudinaryUrl ? project.images[0].cloudinaryUrl : "/placeholder.svg"}
                      alt={project.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{project.title}</h4>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>${project.price}</span>
                        <span>{project.downloadCount || 0} downloads</span>
                      </div>
                    </div>
                  </div>
                  </Link>
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
