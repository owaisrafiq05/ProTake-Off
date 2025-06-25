"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  User,
  Settings,
  ShoppingBag,
  Download,
  Eye,
  Calendar,
  FileSpreadsheet,
  CreditCard,
  Bell,
  Shield,
  Mail,
  Edit3,
  Save,
  X,
  CheckCircle,
  Clock,
  Search,
  ExternalLink,
} from "lucide-react"
import { useAuth } from "@/components/AuthContext"

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  avatar?: string;
  memberSince?: string;
  totalPurchases?: number;
  totalSpent?: number;
};

const UserDashboard = () => {
  const { user, updateProfile, loading, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [profileUpdates, setProfileUpdates] = useState<Partial<UserProfile>>({})

  const {
    firstName = '',
    lastName = '',
    email = '',
    phone = '',
    company = '',
    address: updatesAddress = {},
  } = profileUpdates;
  const {
    street = '',
    city = '',
    state = '',
  } = updatesAddress;

  useEffect(() => {
    if (user) setUserProfile(user)
  }, [user])

  if (loading || !userProfile) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  // Mock purchase history
  const purchaseHistory = [
    {
      id: "PO-001",
      title: "Residential Landscaping - 2,500 sq ft",
      type: "Medium Project",
      price: 99,
      date: "2025-01-15",
      status: "completed",
      downloadUrl: "#",
      image: "/placeholder.svg?height=60&width=80",
    },
    {
      id: "PO-002",
      title: "Commercial Irrigation System",
      type: "Large Project",
      price: 149,
      date: "2025-01-10",
      status: "completed",
      downloadUrl: "#",
      image: "/placeholder.svg?height=60&width=80",
    },
    {
      id: "PO-003",
      title: "Small Garden Design",
      type: "Small Project",
      price: 49,
      date: "2025-01-05",
      status: "completed",
      downloadUrl: "#",
      image: "/placeholder.svg?height=60&width=80",
    },
    {
      id: "PO-004",
      title: "Backyard Renovation",
      type: "Medium Project",
      price: 89,
      date: "2024-12-28",
      status: "processing",
      downloadUrl: null,
      image: "/placeholder.svg?height=60&width=80",
    },
  ]

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "purchases", label: "Purchase History", icon: ShoppingBag },
    { id: "downloads", label: "Downloads", icon: Download },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const handleSaveProfile = async () => {
    setIsEditing(false)
    const res = await updateProfile(profileUpdates)
    if (res.success) {
      setUserProfile({ ...userProfile, ...profileUpdates })
    }
  }

  const filteredPurchases = purchaseHistory.filter((purchase) => {
    const matchesSearch = purchase.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || purchase.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
        <div className="flex items-center space-x-6">
          <img
            src={userProfile.avatar || "/placeholder.svg"}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome back, {userProfile.firstName}!</h2>
            <p className="text-gray-600">Member since {userProfile.memberSince}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center text-sm text-gray-500">
                <ShoppingBag className="h-4 w-4 mr-1" />
                {userProfile.totalPurchases} purchases
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <CreditCard className="h-4 w-4 mr-1" />${userProfile.totalSpent} total spent
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Purchases</p>
              <p className="text-2xl font-bold text-gray-900">{userProfile.totalPurchases}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">${userProfile.totalSpent}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available Downloads</p>
              <p className="text-2xl font-bold text-gray-900">
                {purchaseHistory.filter((p) => p.status === "completed").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Download className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Purchases */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Recent Purchases</h3>
          <Button
            variant="outline"
            onClick={() => setActiveTab("purchases")}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            View All
          </Button>
        </div>
        <div className="space-y-4">
          {purchaseHistory.slice(0, 3).map((purchase) => (
            <div key={purchase.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <img
                  src={purchase.image || "/placeholder.svg"}
                  alt={purchase.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{purchase.title}</h4>
                  <p className="text-sm text-gray-500">{purchase.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-bold text-gray-900">${purchase.price}</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    purchase.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {purchase.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPurchases = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Purchase History</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search purchases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
          </select>
        </div>
      </div>

      {/* Purchase List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredPurchases.map((purchase) => (
            <div key={purchase.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={purchase.image || "/placeholder.svg"}
                    alt={purchase.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{purchase.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {purchase.date}
                      </span>
                      <span className="flex items-center">
                        <FileSpreadsheet className="h-4 w-4 mr-1" />
                        {purchase.type}
                      </span>
                      <span>Order #{purchase.id}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${purchase.price}</p>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        purchase.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {purchase.status === "completed" ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {purchase.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    {purchase.status === "completed" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderDownloads = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Available Downloads</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchaseHistory
          .filter((purchase) => purchase.status === "completed")
          .map((purchase) => (
            <div
              key={purchase.id}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={purchase.image || "/placeholder.svg"}
                alt={purchase.title}
                className="w-full h-32 rounded-lg object-cover mb-4"
              />
              <h3 className="font-semibold text-gray-900 mb-2">{purchase.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{purchase.type}</span>
                <span>{purchase.date}</span>
              </div>
              <div className="space-y-2">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Download Excel
                </Button>
                <Button variant="outline" className="w-full border-gray-300 text-gray-700">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-8">
      {/* Profile Settings */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="border-gray-300 text-gray-700">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700 text-white">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="outline" className="border-gray-300 text-gray-700">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <Input
              value={isEditing ? firstName || userProfile.firstName : userProfile.firstName}
              onChange={(e) => setProfileUpdates({ ...profileUpdates, firstName: e.target.value })}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <Input
              value={isEditing ? lastName || userProfile.lastName : userProfile.lastName}
              onChange={(e) => setProfileUpdates({ ...profileUpdates, lastName: e.target.value })}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <Input
              value={isEditing ? email || userProfile.email : userProfile.email}
              onChange={(e) => setProfileUpdates({ ...profileUpdates, email: e.target.value })}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <Input
              value={isEditing ? phone || userProfile.phone : userProfile.phone}
              onChange={(e) => setProfileUpdates({ ...profileUpdates, phone: e.target.value })}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <Input
              value={isEditing ? company || userProfile.company : userProfile.company}
              onChange={(e) => setProfileUpdates({ ...profileUpdates, company: e.target.value })}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <Input
              value={isEditing ? street || userProfile.address.street : userProfile.address.street}
              onChange={(e) => setProfileUpdates({ ...profileUpdates, address: { ...userProfile.address, ...profileUpdates.address, street: e.target.value } })}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
              placeholder="Street Address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <Input
              value={isEditing ? city || userProfile.address.city : userProfile.address.city}
              onChange={(e) => setProfileUpdates({ ...profileUpdates, address: { ...userProfile.address, ...profileUpdates.address, city: e.target.value } })}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <Input
              value={isEditing ? state || userProfile.address.state : userProfile.address.state}
              onChange={(e) => setProfileUpdates({ ...profileUpdates, address: { ...userProfile.address, ...profileUpdates.address, state: e.target.value } })}
              disabled={!isEditing}
              className={!isEditing ? "bg-gray-50" : ""}
            />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <div className="text-center mb-6">
                <img
                  src={userProfile.avatar || "/placeholder.svg"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-100"
                />
                <h3 className="font-bold text-gray-900">
                  {userProfile.firstName} {userProfile.lastName}
                </h3>
                <p className="text-sm text-gray-500">{userProfile.company}</p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "overview" && renderOverview()}
            {activeTab === "purchases" && renderPurchases()}
            {activeTab === "downloads" && renderDownloads()}
            {activeTab === "settings" && renderSettings()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default UserDashboard
