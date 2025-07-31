"use client"
import { useState, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  MapPin,
  Download,
  Calendar,
  FileSpreadsheet,
  Zap,
  Shield,
  Eye,
  TrendingUp,
  FileText,
  Lock,
  ExternalLink,
} from "lucide-react"
import { getTakeoffById, getPopularTakeoffs } from "../lib/api"
import { useCart } from "../components/CartContext"
import { toast } from "sonner"

// PDF Preview using iframe (most reliable approach)
const PdfIframePreview = ({ pdfUrl, className = "" }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  if (!pdfUrl) {
    return (
      <div className={`w-full h-96 bg-gray-100 flex items-center justify-center rounded-xl ${className}`}>
        <div className="text-center text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-2" />
          <p className="text-sm">No PDF available</p>
        </div>
      </div>
    )
  }

  const handleLoad = () => {
    setLoading(false)
    setError(false)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  if (error) {
    return (
      <div
        className={`w-full h-96 bg-red-50 flex items-center justify-center rounded-xl border border-red-200 ${className}`}
      >
        <div className="text-center text-red-600">
          <FileText className="h-12 w-12 mx-auto mb-2" />
          <p className="text-sm font-medium">Unable to preview PDF</p>
          <p className="text-xs mt-1">Click below to view in new tab</p>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Open PDF
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-2"></div>
            <p className="text-sm">Loading PDF preview...</p>
          </div>
        </div>
      )}
      <iframe
        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH`}
        className="w-full h-full border-0"
        onLoad={handleLoad}
        onError={handleError}
        title="PDF Preview"
        sandbox="allow-same-origin allow-scripts"
      />
      {/* Overlay to prevent interaction */}
      <div className="absolute inset-0 bg-transparent pointer-events-none"></div>
    </div>
  )
}

// Alternative PDF Preview using Google Docs Viewer
const GoogleDocsPreview = ({ pdfUrl, className = "" }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  if (!pdfUrl) {
    return (
      <div className={`w-full h-96 bg-gray-100 flex items-center justify-center rounded-xl ${className}`}>
        <div className="text-center text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-2" />
          <p className="text-sm">No PDF available</p>
        </div>
      </div>
    )
  }

  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`

  const handleLoad = () => {
    setLoading(false)
    setError(false)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  if (error) {
    return <PdfIframePreview pdfUrl={pdfUrl} className={className} />
  }

  return (
    <div className={`relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-2"></div>
            <p className="text-sm">Loading PDF preview...</p>
          </div>
        </div>
      )}
      <iframe
        src={googleViewerUrl}
        className="w-full h-full border-0"
        onLoad={handleLoad}
        onError={handleError}
        title="PDF Preview"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  )
}

// Canvas-based PDF Preview with better worker setup
const CanvasPdfPreview = ({ pdfUrl, className = "" }) => {
  const canvasRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!pdfUrl) {
      setError("No PDF URL provided")
      setLoading(false)
      return
    }

    const loadPdf = async () => {
      try {
        setLoading(true)
        setError(null)

        // Import PDF.js
        const pdfjsLib = await import("pdfjs-dist")

        // Try different worker sources
        const workerSources = [
          `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`,
          `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`,
          `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`,
        ]

        // Try each worker source
        for (const workerSrc of workerSources) {
          try {
            pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc
            break
          } catch (e) {
            console.warn(`Failed to set worker: ${workerSrc}`)
          }
        }

        // Load the PDF document
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
          cMapPacked: true,
        })

        const pdf = await loadingTask.promise
        const page = await pdf.getPage(1)
        const canvas = canvasRef.current

        if (!canvas) return

        const context = canvas.getContext("2d")
        const containerWidth = canvas.parentElement?.clientWidth || 600
        const viewport = page.getViewport({ scale: 1 })
        const scale = Math.min(containerWidth / viewport.width, 600 / viewport.width)
        const scaledViewport = page.getViewport({ scale })

        canvas.height = scaledViewport.height
        canvas.width = scaledViewport.width
        canvas.style.width = `${scaledViewport.width}px`
        canvas.style.height = `${scaledViewport.height}px`

        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        }

        await page.render(renderContext as any).promise
        setLoading(false)
      } catch (err) {
        console.error("Error loading PDF:", err)
        setError(`Failed to load PDF: ${err.message}`)
        setLoading(false)
      }
    }

    loadPdf()
  }, [pdfUrl])

  if (!pdfUrl) {
    return (
      <div className={`w-full h-96 bg-gray-100 flex items-center justify-center rounded-xl ${className}`}>
        <div className="text-center text-gray-500">
          <FileText className="h-12 w-12 mx-auto mb-2" />
          <p className="text-sm">No PDF available</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={`w-full h-96 bg-gray-100 flex items-center justify-center rounded-xl ${className}`}>
        <div className="text-center text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-2"></div>
          <p className="text-sm">Loading PDF preview...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return <GoogleDocsPreview pdfUrl={pdfUrl} className={className} />
  }

  return (
    <div
      className={`flex justify-center items-center bg-white rounded-xl overflow-hidden border border-gray-200 ${className}`}
    >
      <canvas ref={canvasRef} className="max-w-full h-auto" style={{ display: "block" }} />
    </div>
  )
}

// Main PDF Preview Component with fallbacks
const PdfPagePreview = ({ pdfUrl, className = "" }) => {
  const [previewMethod, setPreviewMethod] = useState("canvas")

  // Try canvas first, then fallback to Google Docs, then iframe
  if (previewMethod === "canvas") {
    return <CanvasPdfPreview pdfUrl={pdfUrl} className={className} />
  }

  if (previewMethod === "google") {
    return <GoogleDocsPreview pdfUrl={pdfUrl} className={className} />
  }

  return <PdfIframePreview pdfUrl={pdfUrl} className={className} />
}

// Small PDF Preview for sidebar
const SmallPdfPreview = ({ pdfUrl, className = "" }) => {
  if (!pdfUrl) {
    return (
      <div className={`w-full h-full bg-gray-200 flex items-center justify-center rounded ${className}`}>
        <FileText className="h-4 w-4 text-gray-400" />
      </div>
    )
  }

  return (
    <div className={`w-full h-full bg-gray-50 flex items-center justify-center rounded overflow-hidden ${className}`}>
      <iframe
        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH&zoom=25`}
        className="w-full h-full border-0 scale-50 origin-top-left"
        style={{ width: "200%", height: "200%" }}
        title="PDF Thumbnail"
        sandbox="allow-same-origin"
      />
    </div>
  )
}

const TakeoffDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [takeoff, setTakeoff] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [popular, setPopular] = useState<any[]>([])
  const { addItem } = useCart()

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
        setPopular(data.filter((t: any) => t._id !== id))
      } catch {}
    }
    fetchPopular()
  }, [id])

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
  if (!takeoff)
    return <div className="min-h-screen flex items-center justify-center text-gray-400">No takeoff found.</div>

  const formatDate = (dateStr: string) => (dateStr ? new Date(dateStr).toLocaleDateString() : "-")

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

  const handleAddToCart = () => {
    if (!takeoff) return

    let cartImage = "/placeholder.svg?height=200&width=300"
    const pdfFiles = takeoff.files?.filter((file: any) => file.isPdf && file.cloudinaryUrl) || []

    if (pdfFiles.length > 0) {
      cartImage = pdfFiles[0].cloudinaryUrl
    } else if (takeoff.pdfPreview && takeoff.pdfPreview.length > 0) {
      const firstPdfPreview = takeoff.pdfPreview.find((pdf: any) => pdf.cloudinaryUrl)
      if (firstPdfPreview) {
        cartImage = firstPdfPreview.cloudinaryUrl
      }
    }

    addItem({
      id: takeoff._id,
      title: takeoff.title,
      type: takeoff.projectType,
      area: takeoff.specifications?.area ? `${takeoff.specifications.area} sq ft` : "",
      price: takeoff.price,
      image: cartImage,
    })

    toast.success("Added to cart!")
  }

  const pdfFiles = takeoff.files?.filter((file: any) => file.isPdf && file.cloudinaryUrl) || []
  const hasPdfFiles = pdfFiles.length > 0

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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 relative">
              {/* Status Labels - Top Right Corner */}
              <div className="absolute top-6 right-6 z-10">
                {isNewTakeoff(takeoff) && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                    New
                  </span>
                )}
                {isExpireSoon(takeoff) && !isNewTakeoff(takeoff) && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    Expire Soon
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {takeoff.tags?.map((tag: string, index: number) => (
                  <span key={index} className="px-3 py-1 rounded-full text-xs font-medium bg-brand-100 text-brand-800">
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
                    {takeoff.specifications.complexity.charAt(0).toUpperCase() +
                      takeoff.specifications.complexity.slice(1)}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{takeoff.title}</h1>

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

            {/* PDF Preview Section */}
            {hasPdfFiles && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Project Documents Preview</h2>
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>First page preview only</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pdfFiles.map((file: any, idx: number) => (
                    <div key={idx} className="relative group">
                      <div className="relative rounded-xl border border-gray-200 overflow-hidden bg-white">
                        <PdfPagePreview pdfUrl={file.cloudinaryUrl} className="min-h-[400px]" />

                        {/* Overlay for locked content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4 text-center text-white">
                            <Lock className="h-6 w-6 mx-auto mb-2" />
                            <p className="text-sm font-medium">Purchase to unlock full document</p>
                          </div>
                        </div>
                      </div>

                      {/* File Info */}
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700 truncate">
                              {file.originalName || `Document ${idx + 1}.pdf`}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 ml-2">
                            {file.size ? `${(file.size / 1024).toFixed(1)} KB` : "PDF"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Preview Notice */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Preview Limitation</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        You're viewing the first page only. Purchase this takeoff to access the complete PDF documents
                        with all pages, detailed specifications, and downloadable files.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fallback for pdfPreview array */}
            {!hasPdfFiles && takeoff.pdfPreview && takeoff.pdfPreview.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Project Documents Preview</h2>
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>First page preview only</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {takeoff.pdfPreview.map((pdf: any, idx: number) => (
                    <div key={idx} className="relative group">
                      <div className="relative rounded-xl border border-gray-200 overflow-hidden bg-white">
                        <PdfPagePreview pdfUrl={pdf.cloudinaryUrl} className="min-h-[400px]" />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4 text-center text-white">
                            <Lock className="h-6 w-6 mx-auto mb-2" />
                            <p className="text-sm font-medium">Purchase to unlock full document</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700 truncate">
                              {pdf.originalName || `Document ${idx + 1}.pdf`}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 ml-2">
                            {pdf.size ? `${(pdf.size / 1024).toFixed(1)} KB` : "PDF"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Preview Limitation</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        You're viewing the first page only. Purchase this takeoff to access the complete PDF documents
                        with all pages and detailed specifications.
                      </p>
                    </div>
                  </div>
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
                  <span className="text-gray-900 font-semibold">
                    {takeoff.specifications?.area ? `${takeoff.specifications.area} sq ft` : "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-700">Complexity Level:</span>
                  <span className="text-gray-900 font-semibold">{takeoff.specifications?.complexity || "-"}</span>
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Purchase Takeoff</h3>
              <p className="text-gray-600 mb-6">Get instant access to this professional takeoff</p>

              {/* Project Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Project Area:</span>
                  <span className="font-semibold">
                    {takeoff.specifications?.area ? `${takeoff.specifications.area} sq ft` : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Format:</span>
                  <div className="flex items-center">
                    <FileSpreadsheet className="h-4 w-4 mr-1 text-brand-600" />
                    <span className="font-semibold">PDF Documents</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery:</span>
                  <div className="flex items-center text-brand-600">
                    <Zap className="h-4 w-4 mr-1" />
                    <span className="font-semibold">Instant Download</span>
                  </div>
                </div>
                {hasPdfFiles && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Documents:</span>
                    <div className="flex items-center text-blue-600">
                      <FileText className="h-4 w-4 mr-1" />
                      <span className="font-semibold">
                        {pdfFiles.length} PDF file{pdfFiles.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Display */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Price:</span>
                  <span className="text-2xl font-bold text-brand-600">${takeoff.price}</span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>

              {/* Security Notice */}
              <div className="flex items-center justify-center text-xs text-gray-500 mt-4">
                <Shield className="h-3 w-3 mr-1" />
                <span>Secure checkout process</span>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By purchasing, you agree to our{" "}
                <a href="#" className="text-brand-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-brand-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TakeoffDetails
