"use client"

import { useState, useEffect, useRef } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, MapPin, Calendar, Ruler, DollarSign, Navigation } from "lucide-react"
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
  features?: string[]
  specifications?: any
  tags?: string[]
  images?: any[]
  files?: any[]
}

const PAGE_SIZE = 9

const FindTakeoffs = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
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
      if (selectedSize) params.size = selectedSize.toLowerCase()
      if (selectedTypes.length > 0) params.type = selectedTypes.join(",").toLowerCase()
      if (takeoffType) params.takeoffType = takeoffType.toLowerCase()
      if (distance) params.distance = distance

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
  }, [searchTerm, selectedSize, selectedTypes, zipCode, sort, takeoffType, distance])

  // Fetch more on page change
  useEffect(() => {
    if (page === 1) return
    fetchTakeoffs()
    // eslint-disable-next-line
  }, [page])

  // Infinite scroll observer
  useEffect(() => {
    if (loading) return
    if (!hasMore) return
    if (observer.current) observer.current.disconnect()

    observer.current = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1)
      }
    })

    if (lastTakeoffRef.current) {
      observer.current.observe(lastTakeoffRef.current)
    }
  }, [loading, hasMore, takeoffs])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const zip = params.get("zipCode") || ""
    const size = params.get("size") || ""
    const takeoffTypeParam = params.get("takeoffType") || ""
    const distanceParam = params.get("distance") || ""

    if (zip) setZipCode(zip)
    if (size) setSelectedSize(size.charAt(0).toUpperCase() + size.slice(1))
    if (takeoffTypeParam) setTakeoffType(takeoffTypeParam.charAt(0).toUpperCase() + takeoffTypeParam.slice(1))
    if (distanceParam) setDistance(distanceParam)
  }, [location.search])

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedSize("")
    setSelectedTypes([])
    setTakeoffType("")
    setDistance("")
    setZipCode("")
  }

  const handleViewDetails = (projectId: string) => {
    if (!user) {
      toast.error("To complete access please login")
      navigate("/login")
      return
    }
    navigate(`/takeoff-details/${projectId}`)
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Browse Takeoffs</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find and purchase takeoffs for your landscaping and irrigation projects.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Filter className="h-5 w-5 mr-2 text-gray-600" />
                    Filters
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search Projects</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

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
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
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
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
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
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                          />
                          <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors flex items-center">
                            <DollarSign className="h-3 w-3 mr-1 text-gray-400" />
                            {size.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Project Type</label>
                    <div className="space-y-3">
                      {["Landscaping", "Irrigation"].map((type) => (
                        <label key={type} className="flex items-center cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(type)}
                            onChange={() => handleTypeChange(type)}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Filter Actions */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium">
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
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 group"
                  >
                    {/* Project Type Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {project.projectType.charAt(0).toUpperCase() + project.projectType.slice(1)}
                      </span>
                      <span className={`text-xs text-gray-500 font-medium ${!user ? "blur-sm select-none" : ""}`}>
                        ${project.price}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {project.title}
                    </h3>

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

                    {/* Project Description */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                    {/* View Details Button */}
                    <Button
                      onClick={() => handleViewDetails(project._id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-200 transform group-hover:scale-105"
                    >
                      View Details
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
