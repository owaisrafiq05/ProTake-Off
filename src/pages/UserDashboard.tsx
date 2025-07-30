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
  FileText,
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

type FileItem = {
  filename: string;
  originalName: string;
  cloudinaryUrl: string;
  size: number;
};

type OrderItem = {
  takeoffId: string;
  title: string;
  price: number;
  blueprintUrl: string;
  files?: FileItem[];
};

const UserDashboard = () => {
  const { user, updateProfile, loading, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [profileUpdates, setProfileUpdates] = useState<Partial<UserProfile>>({})
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const {
    firstName = '',
    lastName = '',
    email = '',
    phone = '',
    company = '',
    address: updatesAddress = { street: '', city: '', state: '', zipCode: '' },
  } = profileUpdates;
  const {
    street = '',
    city = '',
    state = '',
  } = updatesAddress;

  useEffect(() => {
    if (user) setUserProfile(user as unknown as UserProfile)
  }, [user])

  useEffect(() => {
    async function fetchOrders() {
      if (user?.email) {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/orders/user/${user.email}`);
        const data = await res.json();
        if (data.success) setOrders(data.orders);
      }
    }
    fetchOrders();
  }, [user]);

  if (loading || !userProfile) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

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

  const filteredPurchases = orders.filter((order) => {
    return order.items.some((item: any) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
              <p className="text-2xl font-bold text-gray-900">{orders.flatMap(order => order.items).length}</p>
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
              <p className="text-2xl font-bold text-gray-900">${orders.flatMap(order => order.items).reduce((acc, item) => acc + item.price, 0)}</p>
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
                {orders.flatMap(order => order.items).length}
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
          {orders.slice(0, 3).map((order) => (
            <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <img
                  src={order.items[0].image || "/placeholder.svg"}
                  alt={order.items[0].title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{order.items[0].title}</h4>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-bold text-gray-900">${order.items[0].price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPurchases = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Purchase History</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search purchases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPurchases.map((order) => (
          order.items.map((item: any) => (
            <div key={item.takeoffId + order._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-16 h-12 rounded-lg object-cover mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>${item.price}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>Order ID: {order._id}</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    setSelectedItem(item);
                    setShowDownloadModal(true);
                  }}
                >
                  Download
                </Button>
              </div>
            </div>
          ))
        ))}
      </div>
      {filteredPurchases.length === 0 && (
        <div className="text-center py-12 text-gray-500">No purchases found.</div>
      )}
    </div>
  )

  const renderDownloads = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Downloads</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.flatMap(order => order.items).map((item: any) => (
          <div key={item.takeoffId + item.blueprintUrl} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-16 h-12 rounded-lg object-cover mr-4" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <span>Order</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Button 
                size="sm" 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  setSelectedItem(item);
                  setShowDownloadModal(true);
                }}
              >
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
      {orders.length === 0 && (
        <div className="text-center py-12 text-gray-500">No downloads found.</div>
      )}
    </div>
  )

  // Download Modal Component
  const DownloadModal = () => {
    if (!showDownloadModal || !selectedItem) return null;

    return (
      <>
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowDownloadModal(false)} />
        
        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Download Files</h3>
              <button 
                onClick={() => setShowDownloadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <h4 className="font-semibold text-gray-900 mb-4">{selectedItem.title}</h4>
              <div className="space-y-3">
                {selectedItem.files && selectedItem.files.length > 0 ? (
                  selectedItem.files.map((file: FileItem, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {file.originalName || `File ${index + 1}`}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <a
                        href={file.cloudinaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </a>
                    </div>
                  ))
                ) : (
                  // Fallback for backward compatibility
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {selectedItem.title}
                        </p>
                        <p className="text-xs text-gray-500">Blueprint file</p>
                      </div>
                    </div>
                    <a
                      href={selectedItem.blueprintUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

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
      <DownloadModal />
    </div>
  )
}

export default UserDashboard
