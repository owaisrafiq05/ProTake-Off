"use client"

import type React from "react"

import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Activity,
  Archive,
  Settings,
  Upload,
  Edit3,
  Trash2,
  Search,
  Download,
  Calendar,
  DollarSign,
  MapPin,
  FileText,
  ImageIcon,
  ToggleLeft,
  ToggleRight,
  Save,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("add-new")
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Form state for adding/editing takeoffs
  const [formData, setFormData] = useState({
    takeoffName: "",
    categories: {
      landscaping: false,
      irrigation: false,
      bundle: false,
    },
    sizes: {
      small: false,
      medium: false,
      large: false,
      corporate: false,
    },
    address: "",
    description: "",
    bidExpirationDate: "",
    price: "",
    jobId: "",
    imageIcon: null as File | null,
    blueprint: null as File | null,
  })

  // Mock data for existing takeoffs
  const [takeoffs, setTakeoffs] = useState([
    {
      id: "TO-001",
      takeoffName: "Residential Landscaping - 2,500 sq ft",
      categories: ["Landscaping"],
      sizes: ["Medium"],
      address: "Austin, TX 78701",
      description: "Complete front and backyard landscaping design with native plants",
      bidExpirationDate: "2025-02-15",
      price: 99,
      jobId: "JOB-2025-001",
      status: "active",
      dateCreated: "2025-01-10",
      downloads: 45,
      revenue: 4455,
      imageIcon: "/placeholder.svg?height=100&width=100",
      blueprint: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "TO-002",
      takeoffName: "Commercial Irrigation System",
      categories: ["Irrigation"],
      sizes: ["Large"],
      address: "Dallas, TX 75201",
      description: "Multi-zone irrigation system for office complex",
      bidExpirationDate: "2025-01-20",
      price: 149,
      jobId: "JOB-2025-002",
      status: "expired",
      dateCreated: "2024-12-15",
      downloads: 18,
      revenue: 2682,
      imageIcon: "/placeholder.svg?height=100&width=100",
      blueprint: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "TO-003",
      takeoffName: "Small Garden Design",
      categories: ["Landscaping"],
      sizes: ["Small"],
      address: "Houston, TX 77001",
      description: "Intimate garden space with seasonal flowers",
      bidExpirationDate: "2025-03-01",
      price: 49,
      jobId: "JOB-2025-003",
      status: "active",
      dateCreated: "2025-01-05",
      downloads: 23,
      revenue: 1127,
      imageIcon: "/placeholder.svg?height=100&width=100",
      blueprint: "/placeholder.svg?height=200&width=300",
    },
  ])

  const tabs = [
    { id: "add-new", label: "Add New", icon: Plus },
    { id: "active-log", label: "Active Log", icon: Activity },
    { id: "expired-takeoffs", label: "Expired Takeoffs", icon: Archive },
    { id: "admin", label: "Admin", icon: Settings },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement
      const [category, subcategory] = name.split(".")

      setFormData((prev) => ({
        ...prev,
        [category]: {
          ...prev[category as keyof typeof prev.categories],
          [subcategory]: checkbox.checked,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "imageIcon" | "blueprint") => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [type]: file,
      }))
    }
  }

  const generateJobId = () => {
    const timestamp = Date.now()
    const jobId = `JOB-2025-${String(timestamp).slice(-6)}`
    setFormData((prev) => ({
      ...prev,
      jobId,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const selectedCategories = Object.entries(formData.categories)
      .filter(([_, selected]) => selected)
      .map(([category, _]) => category.charAt(0).toUpperCase() + category.slice(1))

    const selectedSizes = Object.entries(formData.sizes)
      .filter(([_, selected]) => selected)
      .map(([size, _]) => size.charAt(0).toUpperCase() + size.slice(1))

    const newTakeoff = {
      id: `TO-${String(Date.now()).slice(-3)}`,
      takeoffName: formData.takeoffName,
      categories: selectedCategories,
      sizes: selectedSizes,
      address: formData.address,
      description: formData.description,
      bidExpirationDate: formData.bidExpirationDate,
      price: Number.parseFloat(formData.price),
      jobId: formData.jobId || `JOB-2025-${String(Date.now()).slice(-6)}`,
      status: "active",
      dateCreated: new Date().toISOString().split("T")[0],
      downloads: 0,
      revenue: 0,
      imageIcon: "/placeholder.svg?height=100&width=100",
      blueprint: "/placeholder.svg?height=200&width=300",
    }

    if (isEditing && editingId) {
      setTakeoffs((prev) =>
        prev.map((takeoff) => (takeoff.id === editingId ? { ...takeoff, ...newTakeoff, id: editingId } : takeoff)),
      )
      setIsEditing(false)
      setEditingId(null)
    } else {
      setTakeoffs((prev) => [...prev, newTakeoff])
    }

    // Reset form
    setFormData({
      takeoffName: "",
      categories: { landscaping: false, irrigation: false, bundle: false },
      sizes: { small: false, medium: false, large: false, corporate: false },
      address: "",
      description: "",
      bidExpirationDate: "",
      price: "",
      jobId: "",
      imageIcon: null,
      blueprint: null,
    })
  }

  const handleEdit = (takeoff: any) => {
    setFormData({
      takeoffName: takeoff.takeoffName,
      categories: {
        landscaping: takeoff.categories.includes("Landscaping"),
        irrigation: takeoff.categories.includes("Irrigation"),
        bundle: takeoff.categories.includes("Bundle"),
      },
      sizes: {
        small: takeoff.sizes.includes("Small"),
        medium: takeoff.sizes.includes("Medium"),
        large: takeoff.sizes.includes("Large"),
        corporate: takeoff.sizes.includes("Corporate"),
      },
      address: takeoff.address,
      description: takeoff.description,
      bidExpirationDate: takeoff.bidExpirationDate,
      price: takeoff.price.toString(),
      jobId: takeoff.jobId,
      imageIcon: null,
      blueprint: null,
    })
    setIsEditing(true)
    setEditingId(takeoff.id)
    setActiveTab("add-new")
  }

  const handleDelete = (id: string) => {
    setTakeoffs((prev) => prev.filter((takeoff) => takeoff.id !== id))
  }

  const toggleStatus = (id: string) => {
    setTakeoffs((prev) =>
      prev.map((takeoff) =>
        takeoff.id === id ? { ...takeoff, status: takeoff.status === "active" ? "inactive" : "active" } : takeoff,
      ),
    )
  }

  const filteredTakeoffs = takeoffs.filter((takeoff) => {
    const matchesSearch =
      takeoff.takeoffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      takeoff.address.toLowerCase().includes(searchTerm.toLowerCase())

    let matchesFilter = true
    if (activeTab === "active-log") {
      matchesFilter = takeoff.status === "active"
    } else if (activeTab === "expired-takeoffs") {
      matchesFilter = takeoff.status === "expired" || new Date(takeoff.bidExpirationDate) < new Date()
    }

    return matchesSearch && matchesFilter
  })

  const renderAddNew = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{isEditing ? "Edit Takeoff" : "Add New Takeoff"}</h2>
        {isEditing && (
          <Button
            onClick={() => {
              setIsEditing(false)
              setEditingId(null)
              setFormData({
                takeoffName: "",
                categories: { landscaping: false, irrigation: false, bundle: false },
                sizes: { small: false, medium: false, large: false, corporate: false },
                address: "",
                description: "",
                bidExpirationDate: "",
                price: "",
                jobId: "",
                imageIcon: null,
                blueprint: null,
              })
            }}
            variant="outline"
            className="border-gray-300 text-gray-700"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel Edit
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Takeoff Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Takeoff Name</label>
            <Input
              name="takeoffName"
              value={formData.takeoffName}
              onChange={handleInputChange}
              placeholder="Enter takeoff name"
              className="w-full py-3 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Categories</label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="categories.landscaping"
                  checked={formData.categories.landscaping}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Landscaping</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="categories.irrigation"
                  checked={formData.categories.irrigation}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Irrigation</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="categories.bundle"
                  checked={formData.categories.bundle}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Bundle</span>
              </label>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Project Sizes</label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="sizes.small"
                  checked={formData.sizes.small}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Small</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="sizes.medium"
                  checked={formData.sizes.medium}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Medium</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="sizes.large"
                  checked={formData.sizes.large}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Large</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="sizes.corporate"
                  checked={formData.sizes.corporate}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="text-gray-700">Corporate</span>
              </label>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <Input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter project address"
              className="w-full py-3 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Takeoff Description</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter detailed description"
              rows={4}
              className="w-full rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500 resize-none"
              required
            />
          </div>

          {/* Bid Expiration Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bid Expiration Date</label>
            <Input
              type="date"
              name="bidExpirationDate"
              value={formData.bidExpirationDate}
              onChange={handleInputChange}
              className="w-full py-3 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>

          {/* Price and Job ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full py-3 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job ID #</label>
              <div className="flex space-x-2">
                <Input
                  name="jobId"
                  value={formData.jobId}
                  onChange={handleInputChange}
                  placeholder="Autogenerate"
                  className="flex-1 py-3 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
                <Button
                  type="button"
                  onClick={generateJobId}
                  variant="outline"
                  className="border-gray-300 text-gray-700 px-4"
                >
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Add Image Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Add Image Icon</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors">
              <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-gray-400" />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "imageIcon")}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </label>
              {formData.imageIcon && <p className="mt-2 text-sm text-green-600">{formData.imageIcon.name}</p>}
            </div>
          </div>

          {/* Add Blueprint */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Add Blueprint</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors">
              <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <input
                type="file"
                accept=".pdf,.dwg,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(e, "blueprint")}
                className="hidden"
                id="blueprint-upload"
              />
              <label
                htmlFor="blueprint-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </label>
              {formData.blueprint && <p className="mt-2 text-sm text-green-600">{formData.blueprint.name}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Save className="h-5 w-5 mr-2" />
              {isEditing ? "Update Listing" : "Create Listing"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )

  const renderTakeoffsList = (title: string, showExpired = false) => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search takeoffs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Takeoffs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTakeoffs.map((takeoff) => (
          <div
            key={takeoff.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{takeoff.takeoffName}</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {takeoff.categories.map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                  {takeoff.sizes.map((size) => (
                    <span key={size} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              <button onClick={() => toggleStatus(takeoff.id)} className="ml-2">
                {takeoff.status === "active" ? (
                  <ToggleRight className="h-6 w-6 text-green-600" />
                ) : (
                  <ToggleLeft className="h-6 w-6 text-gray-400" />
                )}
              </button>
            </div>

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{takeoff.address}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Expires: {takeoff.bidExpirationDate}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>${takeoff.price}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{takeoff.downloads}</p>
                <p className="text-xs text-gray-500">Downloads</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">${takeoff.revenue}</p>
                <p className="text-xs text-gray-500">Revenue</p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  takeoff.status === "active"
                    ? "bg-green-100 text-green-800"
                    : takeoff.status === "expired"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {takeoff.status === "active" ? (
                  <CheckCircle className="h-3 w-3 mr-1 inline" />
                ) : (
                  <AlertCircle className="h-3 w-3 mr-1 inline" />
                )}
                {takeoff.status.charAt(0).toUpperCase() + takeoff.status.slice(1)}
              </span>
              <span className="text-xs text-gray-500">ID: {takeoff.jobId}</span>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Button
                onClick={() => handleEdit(takeoff)}
                variant="outline"
                size="sm"
                className="flex-1 border-gray-300 text-gray-700"
              >
                <Edit3 className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(takeoff.id)}
                variant="outline"
                size="sm"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredTakeoffs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Archive className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No takeoffs found</h3>
          <p className="text-gray-500">
            {searchTerm ? "Try adjusting your search terms" : "No takeoffs match the current filter"}
          </p>
        </div>
      )}
    </div>
  )

  const renderAdmin = () => (
    <div className="space-y-8">
      {/* Admin Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {takeoffs.filter((t) => t.status === "active").length}
            </div>
            <div className="text-sm text-gray-600">Active Takeoffs</div>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {takeoffs.reduce((sum, t) => sum + t.downloads, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Downloads</div>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              ${takeoffs.reduce((sum, t) => sum + t.revenue, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
          <div className="text-center p-6 bg-orange-50 rounded-xl">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {takeoffs.filter((t) => new Date(t.bidExpirationDate) < new Date()).length}
            </div>
            <div className="text-sm text-gray-600">Expired Takeoffs</div>
          </div>
        </div>
      </div>

      {/* Admin Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">System Settings</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">Auto-expire takeoffs</h4>
              <p className="text-sm text-gray-500">Automatically mark takeoffs as expired after bid date</p>
            </div>
            <ToggleRight className="h-6 w-6 text-green-600" />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">Email notifications</h4>
              <p className="text-sm text-gray-500">Send notifications for new purchases and downloads</p>
            </div>
            <ToggleRight className="h-6 w-6 text-green-600" />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">Backup data daily</h4>
              <p className="text-sm text-gray-500">Automatically backup takeoff data and files</p>
            </div>
            <ToggleRight className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="bg-green-600 hover:bg-green-700 text-white p-6 h-auto flex-col">
            <Download className="h-8 w-8 mb-2" />
            <span className="font-medium">Export Data</span>
            <span className="text-sm opacity-90">Download all takeoff data</span>
          </Button>

          <Button variant="outline" className="border-gray-300 text-gray-700 p-6 h-auto flex-col">
            <Archive className="h-8 w-8 mb-2" />
            <span className="font-medium">Archive Old</span>
            <span className="text-sm opacity-70">Archive expired takeoffs</span>
          </Button>

          <Button variant="outline" className="border-gray-300 text-gray-700 p-6 h-auto flex-col">
            <Settings className="h-8 w-8 mb-2" />
            <span className="font-medium">System Logs</span>
            <span className="text-sm opacity-70">View system activity</span>
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage takeoffs, view analytics, and configure system settings</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-green-500 text-green-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "add-new" && renderAddNew()}
            {activeTab === "active-log" && renderTakeoffsList("Active Takeoffs")}
            {activeTab === "expired-takeoffs" && renderTakeoffsList("Expired Takeoffs", true)}
            {activeTab === "admin" && renderAdmin()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default AdminPanel
