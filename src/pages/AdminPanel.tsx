"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
  MessageCircle,
} from "lucide-react"
import { createTakeoff, getAllTakeoffs, getAllTakeoffsAdmin, updateTakeoff, deleteTakeoff as apiDeleteTakeoff, getAllUsers, getAllUserTransactions, getAllContacts, updateContactStatus, deleteContact, getContactStats, resendOrderEmail } from "../lib/api"
import { Toaster, toast } from "../components/ui/sonner"
import AdminHeader from "@/components/AdminHeader"

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("add-new")
  // Admin User Management & Transaction History
  const [users, setUsers] = useState<any[]>([])
  const [userTransactions, setUserTransactions] = useState<any[]>([])
  const [userSearch, setUserSearch] = useState("")
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [userPage, setUserPage] = useState(1)
  const [userPageSize, setUserPageSize] = useState(10)
  const [userLoading, setUserLoading] = useState(false)

  // Contact Management State
  const [contacts, setContacts] = useState<any[]>([])
  const [contactStats, setContactStats] = useState<any>(null)
  const [contactSearch, setContactSearch] = useState("")
  const [contactStatusFilter, setContactStatusFilter] = useState("all")
  const [contactPage, setContactPage] = useState(1)
  const [contactLoading, setContactLoading] = useState(false)

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setUserLoading(true)
      const res = await getAllUsers()
      setUsers(res.data.users || [])
    } catch (err: any) {
      toast.error("Failed to fetch users")
    } finally {
      setUserLoading(false)
    }
  }

  // Fetch all user transactions
  const fetchUserTransactions = async () => {
    try {
      const res = await getAllUserTransactions()
      setUserTransactions(res.data || [])
    } catch (err: any) {
      toast.error("Failed to fetch user transactions")
    }
  }

  useEffect(() => {
    if (activeTab === "user-management") {
      fetchUsers()
      fetchUserTransactions()
    }
  }, [activeTab])

  // Reset user page when search changes
  useEffect(() => {
    setUserPage(1)
  }, [userSearch])

  // Contact Management Functions
  const fetchContacts = async () => {
    try {
      setContactLoading(true)
      const params: any = {
        page: contactPage,
        limit: 10,
      }
      
      // Only add search if it's not empty
      if (contactSearch && contactSearch.trim()) {
        params.search = contactSearch
      }
      
      // Only add status if it's not 'all'
      if (contactStatusFilter && contactStatusFilter !== 'all') {
        params.status = contactStatusFilter
      }
      
      console.log('Fetching contacts with params:', params)
      const res = await getAllContacts(params)
      console.log('Contacts API response:', res)
      setContacts(res.data.contacts || [])
      console.log('Set contacts:', res.data.contacts || [])
    } catch (err: any) {
      console.error('Error fetching contacts:', err)
      toast.error("Failed to fetch contacts")
    } finally {
      setContactLoading(false)
    }
  }

  const fetchContactStats = async () => {
    try {
      const res = await getContactStats()
      setContactStats(res.data)
    } catch (err: any) {
      toast.error("Failed to fetch contact statistics")
    }
  }

  const handleContactStatusUpdate = async (id: string, status: string) => {
    try {
      await updateContactStatus(id, status)
      toast.success("Contact status updated successfully")
      fetchContacts()
    } catch (err: any) {
      toast.error("Failed to update contact status")
    }
  }

  const handleContactDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact?")) return
    
    try {
      await deleteContact(id)
      toast.success("Contact deleted successfully")
      fetchContacts()
    } catch (err: any) {
      toast.error("Failed to delete contact")
    }
  }

  // Handle resending order confirmation email
  const handleResendOrderEmail = async (orderId: string) => {
    try {
      await resendOrderEmail(orderId)
      toast.success("Order confirmation email sent successfully")
    } catch (err: any) {
      toast.error("Failed to send order confirmation email")
    }
  }

  useEffect(() => {
    if (activeTab === "contacts") {
      fetchContacts()
      fetchContactStats()
    }
  }, [activeTab, contactPage, contactSearch, contactStatusFilter])
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    zipCode: "",
    expirationDate: "",
    price: "",
    pdfPreview: [] as File[],
    files: [] as File[],
    features: "",
    area: "",
    complexity: "",
    tags: "",
    isActive: true,
  })

  // Fetch takeoffs from API
  const [takeoffs, setTakeoffs] = useState([])
  const fetchTakeoffs = async () => {
    setLoading(true)
    try {
      const data = await getAllTakeoffsAdmin()
      setTakeoffs(data)
    } catch {
      setError("Failed to fetch takeoffs")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTakeoffs()
  }, [])

  const tabs = [
    { id: "add-new", label: "Add New", icon: Plus },
    { id: "active-log", label: "Active Log", icon: Activity },
    { id: "expired-takeoffs", label: "Expired Takeoffs", icon: Archive },
    { id: "user-management", label: "User Management", icon: Settings },
    { id: "contacts", label: "Contact Forms", icon: MessageCircle },
    { id: "admin", label: "Admin", icon: Settings },
  ]

  // Admin User Management & Transaction History View
  const renderUserManagement = () => {
    // Filter users by search
    const filteredUsers = users.filter(user => {
      const name = `${user.firstName} ${user.lastName}`.toLowerCase()
      const email = user.email.toLowerCase()
      return (
        name.includes(userSearch.toLowerCase()) ||
        email.includes(userSearch.toLowerCase())
      )
    })

    // Pagination calculations
    const totalUsers = filteredUsers.length
    const totalPages = Math.ceil(totalUsers / userPageSize)
    const startIndex = (userPage - 1) * userPageSize
    const endIndex = startIndex + userPageSize
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    // Find transactions for selected user
    const selectedUserTx = userTransactions.find((utx: any) => utx.user._id === selectedUserId)

    return (
      <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Input
              placeholder="Search users by name or email..."
              value={userSearch}
              onChange={e => setUserSearch(e.target.value)}
              className="w-full md:w-80"
            />
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Show:</label>
              <select
                value={userPageSize}
                onChange={(e) => {
                  setUserPageSize(Number(e.target.value))
                  setUserPage(1) // Reset to first page when changing page size
                }}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">per page</span>
            </div>
          </div>
          
          {userLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading users...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Registered</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                      <th className="px-4 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {paginatedUsers.map(user => (
                      <tr key={user._id} className={selectedUserId === user._id ? "bg-brand-50" : ""}>
                        <td className="px-4 py-2 whitespace-nowrap">{user.firstName} {user.lastName}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{user.company}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "-"}</td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <Button
                            size="sm"
                            variant={selectedUserId === user._id ? "default" : "outline"}
                            onClick={() => setSelectedUserId(user._id)}
                          >
                            View Transactions
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1} to {Math.min(endIndex, totalUsers)} of {totalUsers} users
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUserPage(Math.max(1, userPage - 1))}
                      disabled={userPage === 1}
                      className="flex items-center gap-1"
                    >
                      Previous
                    </Button>
                    
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum
                        if (totalPages <= 5) {
                          pageNum = i + 1
                        } else if (userPage <= 3) {
                          pageNum = i + 1
                        } else if (userPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i
                        } else {
                          pageNum = userPage - 2 + i
                        }
                        
                        return (
                          <Button
                            key={pageNum}
                            variant={userPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => setUserPage(pageNum)}
                            className="w-8 h-8 p-0"
                          >
                            {pageNum}
                          </Button>
                        )
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setUserPage(Math.min(totalPages, userPage + 1))}
                      disabled={userPage === totalPages}
                      className="flex items-center gap-1"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {paginatedUsers.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Settings className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                  <p className="text-gray-500">
                    {userSearch ? "Try adjusting your search terms" : "No users match the current criteria"}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Transaction History for selected user */}
        {selectedUserId && selectedUserTx && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Transaction History for {selectedUserTx.user.firstName} {selectedUserTx.user.lastName}</h3>
            {selectedUserTx.transactions.length === 0 ? (
              <div className="text-gray-500">No transactions found for this user.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {selectedUserTx.transactions.map((tx: any) => (
                      <tr key={tx._id}>
                        <td className="px-4 py-2 whitespace-nowrap">{new Date(tx.createdAt).toLocaleString()}</td>
                        <td className="px-4 py-2 whitespace-nowrap">${tx.amount?.toFixed(2)}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{tx.status}</td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <ul className="list-disc pl-4">
                            {tx.items.map((item: any, idx: number) => (
                              <li key={idx}>{item.title} (${item.price})</li>
                            ))}
                          </ul>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleResendOrderEmail(tx._id)}
                            className="flex items-center gap-2"
                          >
                            <MessageCircle className="h-4 w-4" />
                            Resend Email
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mt-4">
              <Button variant="outline" onClick={() => setSelectedUserId(null)}>Back to Users</Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      const type = e.target.id === "pdf-preview-upload" ? "pdfPreview" : "files"
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], ...files],
      }))
    }
  }

  const removeFile = (index: number, type: "pdfPreview" | "files") => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }))
  }

  const validateForm = () => {
    const requiredFields = [
      "takeoffName", "address", "zipCode", "expirationDate", "price", "features", "area", "complexity", "tags"
    ];
    for (const field of requiredFields) {
      if (!formData[field] || (typeof formData[field] === "string" && formData[field].trim() === "")) {
        toast.error(`Please fill the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
        return false;
      }
    }
    const hasCategory = Object.values(formData.categories).some(Boolean);
    if (!hasCategory) {
      toast.error("Please select at least one category.");
      return false;
    }
    const hasSize = Object.values(formData.sizes).some(Boolean);
    if (!hasSize) {
      toast.error("Please select at least one project size.");
      return false;
    }
    // Only require files on create, images are optional
    if (!isEditing) {
      if (formData.files.length === 0) {
        toast.error("Please upload at least one file.");
        return false;
      }
    }
    return true;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)
    setError(null)
    try {
      const selectedCategories = Object.entries(formData.categories)
        .filter(([_, selected]) => selected)
        .map(([category, _]) => category)
      const selectedSizes = Object.entries(formData.sizes)
        .filter(([_, selected]) => selected)
        .map(([size, _]) => size)
      const payload: any = {
        title: formData.takeoffName,
        projectType: selectedCategories.length === 2 ? "both" : selectedCategories[0] || "landscaping",
        projectSize: selectedSizes[0] || "small",
        zipCode: formData.zipCode,
        address: formData.address,
        price: Number(formData.price),
        features: formData.features.split(",").map(f => f.trim()).filter(Boolean),
        specifications: {
          area: Number(formData.area),
          complexity: formData.complexity,
        },
        expirationDate: formData.expirationDate,
        tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
        isActive: formData.isActive,
        files: formData.files,
        pdfPreview: formData.pdfPreview,
      }
      let result
      if (isEditing && editingId) {
        await updateTakeoff(editingId, payload)
        toast.success("Takeoff updated successfully!")
      } else {
        result = await createTakeoff(payload)
        toast.success("Takeoff created successfully!")
      }
      await fetchTakeoffs()
      setFormData({
        takeoffName: "",
        categories: { landscaping: false, irrigation: false, bundle: false },
        sizes: { small: false, medium: false, large: false, corporate: false },
        address: "",
        zipCode: "",
        expirationDate: "",
        price: "",
        pdfPreview: [],
        files: [],
        features: "",
        area: "",
        complexity: "",
        tags: "",
        isActive: true,
      })
      setIsEditing(false)
      setEditingId(null)
    } catch (err: any) {
      setError(err.message || "Failed to save takeoff")
      toast.error(err.message || "Failed to save takeoff")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (takeoff: any) => {
    setFormData({
      takeoffName: takeoff.title ?? takeoff.takeoffName ?? "",
      categories: {
        landscaping: (takeoff.projectType === "landscaping" || (Array.isArray(takeoff.categories) && takeoff.categories.includes("Landscaping"))),
        irrigation: (takeoff.projectType === "irrigation" || (Array.isArray(takeoff.categories) && takeoff.categories.includes("Irrigation"))),
        bundle: (Array.isArray(takeoff.categories) && takeoff.categories.includes("Bundle")),
      },
      sizes: {
        small: (takeoff.projectSize === "small" || (Array.isArray(takeoff.sizes) && takeoff.sizes.includes("Small"))),
        medium: (takeoff.projectSize === "medium" || (Array.isArray(takeoff.sizes) && takeoff.sizes.includes("Medium"))),
        large: (takeoff.projectSize === "large" || (Array.isArray(takeoff.sizes) && takeoff.sizes.includes("Large"))),
        corporate: (Array.isArray(takeoff.sizes) && takeoff.sizes.includes("Corporate")),
      },
      address: takeoff.address ?? "",
      zipCode: takeoff.zipCode ?? "",
      expirationDate: takeoff.expirationDate ? takeoff.expirationDate.slice(0, 10) : "",
      price: takeoff.price?.toString() ?? "",
      pdfPreview: [],
      files: [],
      features: takeoff.features ? takeoff.features.join(", ") : "",
      area: takeoff.specifications?.area?.toString() ?? "",
      complexity: takeoff.specifications?.complexity ?? "",
      tags: takeoff.tags ? takeoff.tags.join(", ") : "",
      isActive: takeoff.isActive ?? true,
    })
    setIsEditing(true)
    setEditingId(takeoff._id || takeoff.id)
    setActiveTab("add-new")
  }

  const handleDelete = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await apiDeleteTakeoff(id)
      toast.success("Takeoff deleted successfully!")
      await fetchTakeoffs()
    } catch (err: any) {
      setError(err.message || "Failed to delete takeoff")
      toast.error(err.message || "Failed to delete takeoff")
    } finally {
      setLoading(false)
    }
  }

  const toggleStatus = (id: string) => {
    setTakeoffs((prev) =>
      prev.map((takeoff) =>
        takeoff.id === id ? { ...takeoff, status: takeoff.status === "active" ? "inactive" : "active" } : takeoff,
      ),
    )
  }

  // Helper function to check if takeoff is "New" (within 5 days of creation)
  const isNewTakeoff = (takeoff: any) => {
    if (!takeoff.createdAt) return false
    const createdAt = new Date(takeoff.createdAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - createdAt.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 5
  }

  // Helper function to check if takeoff is "Expire Soon" (within 5 days of expiration)
  const isExpireSoon = (takeoff: any) => {
    if (!takeoff.expirationDate) return false
    const expirationDate = new Date(takeoff.expirationDate)
    const now = new Date()
    const diffTime = Math.abs(expirationDate.getTime() - now.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 5 && diffDays >= 0
  }

  // Filtering for active/expired takeoffs
  const now = new Date();
  const isExpired = (takeoff: any) => takeoff.expirationDate && new Date(takeoff.expirationDate) < now;
  const isActive = (takeoff: any) => takeoff.isActive && !isExpired(takeoff);

  const filteredTakeoffs = takeoffs.filter((takeoff) => {
    const name = takeoff.title ?? takeoff.takeoffName ?? "";
    const address = takeoff.zipCode ?? takeoff.address ?? "";
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesFilter = true;
    if (activeTab === "active-log") {
      matchesFilter = isActive(takeoff);
    } else if (activeTab === "expired-takeoffs") {
      matchesFilter = isExpired(takeoff);
    }

    return matchesSearch && matchesFilter;
  });

  const renderAddNew = () => (
    <div className={`bg-white rounded-2xl shadow-sm border ${isEditing ? 'border-brand-400' : 'border-gray-200'} p-8`}> 
      <div className="flex items-center justify-between mb-8">
        <h2 className={`text-2xl font-bold ${isEditing ? 'text-brand-700' : 'text-gray-900'}`}>{isEditing ? "Edit Takeoff" : "Add New Takeoff"}</h2>
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
                zipCode: "",
                expirationDate: "",
                price: "",
                pdfPreview: [],
                files: [],
                features: "",
                area: "",
                complexity: "",
                tags: "",
                isActive: true,
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
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Project Info Section */}
        <div className=" rounded-xl p-6 border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-brand-700">Project Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Takeoff Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Takeoff Name <span className="text-red-500">*</span></label>
              <Input
                name="takeoffName"
                value={formData.takeoffName}
                onChange={handleInputChange}
                placeholder="Enter takeoff name"
                className="w-full py-3 rounded-xl border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                required
              />
            </div>
            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address <span className="text-red-500">*</span></label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter project address"
                className="w-full py-3 rounded-xl border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                required
              />
            </div>
            {/* Zip Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code <span className="text-red-500">*</span></label>
              <Input
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="Enter zip code"
                className="w-full py-3 rounded-xl border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                required
              />
            </div>
            {/* Expiration Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiration Date <span className="text-red-500">*</span></label>
              <Input
                type="date"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleInputChange}
                className="w-full py-3 rounded-xl border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                required
              />
            </div>
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) <span className="text-red-500">*</span></label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full py-3 rounded-xl border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                required
              />
            </div>
          </div>
        </div>
        {/* Categories & Sizes Section */}
        <div className=" rounded-xl p-6 border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-brand-700">Categories & Project Size</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Categories <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="categories.landscaping"
                    checked={formData.categories.landscaping}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Landscaping</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="categories.irrigation"
                    checked={formData.categories.irrigation}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Irrigation</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="categories.bundle"
                    checked={formData.categories.bundle}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Bundle</span>
                </label>
              </div>
            </div>
            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Project Sizes <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="sizes.small"
                    checked={formData.sizes.small}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Small</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="sizes.medium"
                    checked={formData.sizes.medium}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Medium</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="sizes.large"
                    checked={formData.sizes.large}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Large</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="sizes.corporate"
                    checked={formData.sizes.corporate}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Corporate</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Features Section */}
        <div className=" rounded-xl p-6 border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-brand-700">Features</h3>
          <div className="grid grid-cols-1 gap-6">
            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma separated) <span className="text-red-500">*</span></label>
              <Textarea
                name="features"
                value={formData.features}
                onChange={handleInputChange}
                placeholder="e.g. Fast, Reliable, Eco-friendly"
                rows={2}
                className="w-full rounded-xl border-gray-300 focus:border-brand-500 focus:ring-brand-500 resize-none"
                required
              />
            </div>
          </div>
        </div>
        {/* Specifications Section */}
        <div className=" rounded-xl p-6 border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-brand-700">Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq ft) <span className="text-red-500">*</span></label>
              <Input
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                placeholder="e.g. 1000"
                type="number"
                min="0"
                className="w-full py-3 rounded-xl border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Complexity <span className="text-red-500">*</span></label>
              <select
                name="complexity"
                value={formData.complexity}
                onChange={handleInputChange}
                className="w-full py-3 rounded-xl border-gray-300 focus:border-brand-500 focus:ring-brand-500"
                required
              >
                <option value="">Select complexity</option>
                <option value="basic">Basic</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>
        {/* Tags Section */}
        <div className=" rounded-xl p-6 border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-brand-700">Tags</h3>
          <Textarea
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            placeholder="e.g. Residential, Commercial, Garden"
            rows={2}
            className="w-full rounded-xl border-gray-300 focus:border-brand-500 focus:ring-brand-500 resize-none"
            required
          />
        </div>
        
        {/* Status Section */}
        <div className=" rounded-xl p-6 border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-brand-700">Status</h3>
          <div className="flex items-center space-x-3">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">Active Takeoff</span>
            </label>
            <span className="text-sm text-gray-500">When unchecked, the takeoff will be hidden from users</span>
          </div>
        </div>
        {/* Uploads Section (only for create) */}
        {!isEditing && (
          <div className=" rounded-xl p-6 border border-gray-200 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-brand-700">Uploads</h3>
            <div className="space-y-6">
              {/* Add PDF Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Add PDF Preview (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-brand-400 transition-colors">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="pdf-preview-upload"
                  />
                  <label
                    htmlFor="pdf-preview-upload"
                    className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover: transition-colors"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload PDF Preview
                  </label>
                  {formData.pdfPreview.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.pdfPreview.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm text-gray-600">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index, "pdfPreview")}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Add Files */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Add Files <span className="text-red-500">*</span></label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-brand-400 transition-colors">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.dwg,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover: transition-colors"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </label>
                  {formData.files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm text-gray-600">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index, "files")}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Submit Button */}
        <div className="pt-6">
          <Button
            type="submit"
            className={`w-full ${isEditing ? 'bg-brand-600 hover:bg-brand-700' : 'bg-brand-600 hover:bg-brand-700'} text-white font-semibold py-4 text-lg rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl`}
          >
            <Save className="h-5 w-5 mr-2" />
            {isEditing ? "Update Listing" : "Create Listing"}
          </Button>
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
            key={takeoff._id || takeoff.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow relative"
          >
            {/* Status Labels - Top Right Corner */}
            <div className="absolute top-4 right-4 z-10">
              {isNewTakeoff(takeoff) && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                  New
                </span>
              )}
              {isExpireSoon(takeoff) && !isNewTakeoff(takeoff) && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                  Expire Soon
                </span>
              )}
            </div>

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{takeoff.title ?? takeoff.takeoffName ?? ""}</h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(Array.isArray(takeoff.categories) ? takeoff.categories : []).map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-brand-100 text-brand-800 text-xs font-medium rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                  {(Array.isArray(takeoff.sizes) ? takeoff.sizes : []).map((size) => (
                    <span key={size} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              <button onClick={() => toggleStatus(takeoff.id)} className="ml-2">
                {isActive(takeoff) ? (
                  <ToggleRight className="h-6 w-6 text-brand-600" />
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
                <span>Expires: {takeoff.expirationDate}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>${takeoff.price}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4 p-3  rounded-lg">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{takeoff.downloadCount}</p>
                <p className="text-xs text-gray-500">Downloads</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">${(takeoff.downloadCount * takeoff.price).toFixed(2)}</p>
                <p className="text-xs text-gray-500">Revenue</p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isActive(takeoff)
                    ? "bg-brand-100 text-brand-800"
                    : isExpired(takeoff)
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {isActive(takeoff) ? (
                  <CheckCircle className="h-3 w-3 mr-1 inline" />
                ) : (
                  <AlertCircle className="h-3 w-3 mr-1 inline" />
                )}
                {isActive(takeoff) ? "Active" : isExpired(takeoff) ? "Expired" : "Inactive"}
              </span>
              <span className="text-xs text-gray-500">ID: {takeoff._id}</span>
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
                onClick={() => handleDelete(takeoff._id || takeoff.id)}
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

  const renderContacts = () => (
    <div className="space-y-8">
      {/* Contact Statistics */}
      {contactStats && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Form Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-brand-50 rounded-xl">
              <div className="text-3xl font-bold text-brand-600 mb-2">
                {contactStats.total || 0}
              </div>
              <div className="text-sm text-gray-600">Total Submissions</div>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {contactStats.today || 0}
              </div>
              <div className="text-sm text-gray-600">Today's Submissions</div>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-xl">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {contactStats.byStatus?.new || 0}
              </div>
              <div className="text-sm text-gray-600">New Messages</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {contactStats.byStatus?.replied || 0}
              </div>
              <div className="text-sm text-gray-600">Replied</div>
            </div>
          </div>
        </div>
      )}

      {/* Contact List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Form Submissions</h2>
        
        {/* Filters and Search */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search by name, email, or message..."
            value={contactSearch}
            onChange={(e) => setContactSearch(e.target.value)}
            className="flex-1"
          />
          <select
            value={contactStatusFilter}
            onChange={(e) => setContactStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Contact Table */}
        {contactLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading contacts...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                      {contact.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      {contact.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      {contact.company || '-'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      {contact.phone}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      <div className="max-w-xs truncate" title={contact.message}>
                        {contact.message}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <select
                        value={contact.status}
                        onChange={(e) => handleContactStatusUpdate(contact._id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${
                          contact.status === 'new' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          contact.status === 'read' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          contact.status === 'replied' ? 'bg-brand-100 text-brand-800 border-brand-200' :
                          'bg-gray-100 text-gray-800 border-gray-200'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => {
                            // Copy email to clipboard
                            navigator.clipboard.writeText(contact.email)
                            toast.success("Email copied to clipboard")
                          }}
                          variant="outline"
                          size="sm"
                          className="border-gray-300 text-gray-700"
                        >
                          Copy Email
                        </Button>
                        <Button
                          onClick={() => handleContactDelete(contact._id)}
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {contacts.length === 0 && !contactLoading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contact submissions found</h3>
            <p className="text-gray-500">
              {contactSearch || contactStatusFilter !== 'all' ? "Try adjusting your search or filters" : "No contact form submissions yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  )

  const renderAdmin = () => (
    <div className="space-y-8">
      {/* Admin Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-brand-50 rounded-xl">
            <div className="text-3xl font-bold text-brand-600 mb-2">
              {takeoffs.filter(isActive).length}
            </div>
            <div className="text-sm text-gray-600">Active Takeoffs</div>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {takeoffs.reduce((sum, t) => sum + (t.downloadCount || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Downloads</div>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              ${takeoffs.reduce((sum, t) => sum + ((t.price || 0) * (t.downloadCount || 0)), 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
          <div className="text-center p-6 bg-orange-50 rounded-xl">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {takeoffs.filter(isExpired).length}
            </div>
            <div className="text-sm text-gray-600">Expired Takeoffs</div>
          </div>
        </div>
      </div>

      {/* Admin Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">System Settings</h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4  rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">Auto-expire takeoffs</h4>
              <p className="text-sm text-gray-500">Automatically mark takeoffs as expired after bid date</p>
            </div>
            <ToggleRight className="h-6 w-6 text-brand-600" />
          </div>

          <div className="flex items-center justify-between p-4  rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">Email notifications</h4>
              <p className="text-sm text-gray-500">Send notifications for new purchases and downloads</p>
            </div>
            <ToggleRight className="h-6 w-6 text-brand-600" />
          </div>

          <div className="flex items-center justify-between p-4  rounded-xl">
            <div>
              <h4 className="font-medium text-gray-900">Backup data daily</h4>
              <p className="text-sm text-gray-500">Automatically backup takeoff data and files</p>
            </div>
            <ToggleRight className="h-6 w-6 text-brand-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="bg-brand-600 hover:bg-brand-700 text-white p-6 h-auto flex-col">
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
    <div className="min-h-screen ">
      <AdminHeader />

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
                        ? "border-brand-500 text-brand-600"
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
            {activeTab === "user-management" && renderUserManagement()}
            {activeTab === "contacts" && renderContacts()}
            {activeTab === "admin" && renderAdmin()}
          </div>
        </div>
      </div>

      <Footer />
      <Toaster />
    </div>
  )
}

export default AdminPanel
