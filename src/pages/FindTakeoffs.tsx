"use client"

import { useState, useEffect, useRef } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, MapPin, Calendar, Ruler, DollarSign, Navigation, FileText } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useLocation, useNavigate } from "react-router-dom"
import { getTakeoffs } from "../lib/api"
import { useAuth } from "../components/AuthContext"
import { toast } from "sonner"

interface Takeoff {
  _id: string
  title: string
  projectType: string
  zipCode: string
  projectSize: string
  price: number
  description: string
  expirationDate?: string
  createdAt?: string
  features?: string[]
  specifications?: any
  tags?: string[]
  pdfPreview?: any[]
  files?: any[]
}

const PAGE_SIZE = 9

const FindTakeoffs = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [takeoffType, setTakeoffType] = useState("")
  const [distance, setDistance] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [takeoffs, setTakeoffs] = useState<Takeoff[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)
  const lastTakeoffRef = useRef<HTMLDivElement | null>(null)
  const [sort, setSort] = useState("newest")
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  // Fetch takeoffs with filters and pagination
  const fetchTakeoffs = async (reset = false) => {
    setLoading(true)
    setError(null)
    try {
      const params: any = {
        page: reset ? 1 : page,
        limit: PAGE_SIZE,
        sort,
      }

      if (searchTerm) params.search = searchTerm
      if (zipCode) params.zipCode = zipCode
      // Only send size parameter if it's not "All"
      if (selectedSize && selectedSize !== "All") {
        // Map UI size values back to API parameter values
        const apiSizeMapping: { [key: string]: string } = {
          'Small': 'small',
          'Medium': 'medium',
          'Large': 'large', 
          'Corporate': 'corporate'
        }
        params.size = apiSizeMapping[selectedSize] || selectedSize.toLowerCase()
      }
      if (takeoffType) {
        params.type = takeoffType.toLowerCase()
      }
      if (distance) params.distance = distance

      console.log('Sending params to API:', params)
      const data = await getTakeoffs(params)

      if (reset) {
        setTakeoffs(data)
      } else {
        setTakeoffs((prev) => [...prev, ...data])
      }

      setHasMore(data.length === PAGE_SIZE)
    } catch (err: any) {
      setError(err.message || "Failed to fetch takeoffs")
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch and on filter/search change
  useEffect(() => {
    setPage(1)
    fetchTakeoffs(true)
    // eslint-disable-next-line
  }, [searchTerm, selectedSize, takeoffType, zipCode, sort, distance])

  // Fetch more on page change
  useEffect(() => {
    if (page === 1) return
    fetchTakeoffs()
    // eslint-disable-next-line
  }, [page])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (loading) return

    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1)
      }
    })

    if (lastTakeoffRef.current) {
      observer.current.observe(lastTakeoffRef.current)
    }

    return () => {
      if (observer.current) observer.current.disconnect()
    }
  }, [loading, hasMore])

  // Parse URL params on mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const search = searchParams.get("search")
    const size = searchParams.get("size")
    const type = searchParams.get("type") || searchParams.get("takeoffType")
    const zip = searchParams.get("zipCode")
    const dist = searchParams.get("distance")

    if (search) setSearchTerm(search)
    if (size) {
      // Map URL size parameter to UI size values
      const sizeMapping: { [key: string]: string } = {
        'small': 'Small',
        'medium': 'Medium', 
        'large': 'Large',
        'corporate': 'Corporate',
        'all': 'All'
      }
      const mappedSize = sizeMapping[size.toLowerCase()] || size
      console.log('URL size param:', size, 'mapped to:', mappedSize)
      setSelectedSize(mappedSize)
    }
    if (type) setTakeoffType(type)
    if (zip) setZipCode(zip)
    if (dist) setDistance(dist)
  }, [location.search])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedSize("")
    setTakeoffType("")
    setDistance("")
    setZipCode("")
    setSort("newest")
  }

  const handleViewDetails = (projectId: string) => {
    if (!user) {
      toast.error("Please login to view takeoff details")
      navigate("/login")
      return
    }
    navigate(`/takeoff-details/${projectId}`)
  }

  // Helper function to get preview image for takeoff
  const getTakeoffPreview = (takeoff: Takeoff) => {
    // First try to get PDF first page preview from files array
    if (takeoff.files && takeoff.files.length > 0) {
      const pdfFile = takeoff.files.find((file: any) => 
        file.isPdf && (file.firstPagePreviewUrl || file.cloudinaryUrl)
      )
      if (pdfFile) {
        return pdfFile.firstPagePreviewUrl || pdfFile.cloudinaryUrl
      }
    }
    
    // Fallback to pdfPreview array
    if (takeoff.pdfPreview && takeoff.pdfPreview.length > 0) {
      const pdfPreview = takeoff.pdfPreview.find((pdf: any) => 
        pdf.firstPagePreviewUrl || pdf.cloudinaryUrl
      )
      if (pdfPreview) {
        return pdfPreview.firstPagePreviewUrl || pdfPreview.cloudinaryUrl
      }
    }
    
    // Default placeholder
    return "/placeholder.svg"
  }

  // Helper function to check if takeoff is "New" (within 5 days of creation)
  const isNewTakeoff = (takeoff: Takeoff) => {
    if (!takeoff.createdAt) return false
    const createdAt = new Date(takeoff.createdAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - createdAt.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 5
  }

  // Helper function to check if takeoff is "Expire Soon" (within 5 days of expiration)
  const isExpireSoon = (takeoff: Takeoff) => {
    if (!takeoff.expirationDate) return false
    const expirationDate = new Date(takeoff.expirationDate)
    const now = new Date()
    const diffTime = Math.abs(expirationDate.getTime() - now.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 5 && diffDays >= 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section id="find-takeoffs" className="relative bg-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23059669&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;7&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-brand-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-brand-50/50 to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Your Perfect Takeoff
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse through our extensive collection of professional takeoffs. Filter by location, project type, and size to find exactly what you need.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search takeoffs by title, description, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-brand-500 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Filters and Results */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
                <div className="flex items-center mb-6">
                  <Filter className="h-5 w-5 text-brand-600 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                </div>

                <div className="space-y-6">
                  {/* Zip Code */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Enter Zip Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Takeoff Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Takeoff Type</label>
                    <div className="space-y-3">
                      {["Landscaping", "Irrigation", "Bundle"].map((type) => (
                        <label key={type} className="flex items-center cursor-pointer group">
                          <input
                            type="radio"
                            name="takeoffType"
                            value={type}
                            checked={takeoffType === type}
                            onChange={(e) => setTakeoffType(e.target.value)}
                            className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300"
                          />
                          <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Distance */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Distance</label>
                    <div className="space-y-3">
                      {[
                        { value: "25", label: "25 miles" },
                        { value: "100", label: "100 miles" },
                        { value: "150", label: "150+ miles" },
                        { value: "all", label: "All" },
                      ].map((dist) => (
                        <label key={dist.value} className="flex items-center cursor-pointer group">
                          <input
                            type="radio"
                            name="distance"
                            value={dist.value}
                            checked={distance === dist.value}
                            onChange={(e) => setDistance(e.target.value)}
                            className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300"
                          />
                          <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors flex items-center">
                            <Navigation className="h-3 w-3 mr-1 text-gray-400" />
                            {dist.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Project Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Project Size</label>
                    <div className="space-y-3">
                      {[
                        { value: "Small", label: "Small ($50K - $150K)" },
                        { value: "Medium", label: "Medium ($150K - $300K)" },
                        { value: "Large", label: "Large ($350K - $1M)" },
                        { value: "Corporate", label: "Corporate ($1M+)" },
                        { value: "All", label: "All Sizes" },
                      ].map((size) => (
                        <label key={size.value} className="flex items-center cursor-pointer group">
                          <input
                            type="radio"
                            name="size"
                            value={size.value}
                            checked={selectedSize === size.value}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300"
                          />
                          <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors flex items-center">
                            <DollarSign className="h-3 w-3 mr-1 text-gray-400" />
                            {size.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Filter Actions */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium">
                      Apply Filters
                    </Button>
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Showing <span className="font-medium">{takeoffs.length}</span> takeoffs
                </p>
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="newest">Sort by: Newest</option>
                  <option value="price_asc">Sort by: Price (Low to High)</option>
                  <option value="price_desc">Sort by: Price (High to Low)</option>
                  <option value="size">Sort by: Size</option>
                </select>
              </div>

              {/* Project Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {takeoffs.map((project, idx) => (
                  <div
                    key={project._id}
                    ref={idx === takeoffs.length - 1 ? lastTakeoffRef : null}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 group relative"
                  >
                    {/* Status Labels - Top Right Corner */}
                    <div className="absolute top-4 right-4 z-10">
                      {isNewTakeoff(project) && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                          New
                        </span>
                      )}
                      {isExpireSoon(project) && !isNewTakeoff(project) && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                          Expire Soon
                        </span>
                      )}
                    </div>

                    {/* Project Type Badge and Price */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
                        {project.projectType.charAt(0).toUpperCase() + project.projectType.slice(1)}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                      {project.title}
                    </h3>

                    {/* Price Display */}
                    <div className="mb-3">
                      {!user ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-lg font-bold text-brand-600 blur-[3px] select-none cursor-help">
                              ${project.price}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Login to see pricing</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <span className="text-lg font-bold text-brand-600">
                          ${project.price}
                        </span>
                      )}
                    </div>

                    {/* Project Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span>ZIP Code: {project.zipCode}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Ruler className="h-4 w-4 mr-2 text-gray-400" />
                        <span>
                          Size: {project.projectSize?.charAt(0).toUpperCase() + project.projectSize?.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Expires: {project.expirationDate ? new Date(project.expirationDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) : "-"}</span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Button
                      onClick={() => handleViewDetails(project._id)}
                      className={`w-full font-medium transition-all duration-200 transform group-hover:scale-105 ${
                        !user 
                          ? "bg-gray-400 hover:bg-gray-500 text-white cursor-not-allowed" 
                          : "bg-brand-600 hover:bg-brand-700 text-white"
                      }`}
                    >
                      {!user ? "Login to View Details" : "View Details"}
                    </Button>
                  </div>
                ))}
              </div>

              {loading && <div className="text-center py-8 text-gray-500">Loading...</div>}
              {error && <div className="text-center py-8 text-red-500">{error}</div>}
              {!loading && !hasMore && takeoffs.length > 0 && (
                <div className="text-center py-8 text-gray-400">No more takeoffs to load.</div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default FindTakeoffs
