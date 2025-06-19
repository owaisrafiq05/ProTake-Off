"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Shield,
  Check,
  CreditCard,
  Lock,
  FileSpreadsheet,
  Zap,
  Users,
  Download,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_51234567890")

// Real Stripe CardElement component
const StripeCardElement = ({ onChange }: { onChange: (event: any) => void }) => {
  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  }

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition-all">
      <CardElement options={cardElementOptions} onChange={onChange} />
    </div>
  )
}

const CheckoutContent = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentError, setPaymentError] = useState("")
  const [billingInfo, setBillingInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  })

  // Mock order data (in real app, this would come from cart/state)
  const orderData = {
    item: {
      title: "Residential Landscaping - 2,500 sq ft",
      type: "Medium Project",
      area: "2,500 sq ft",
      price: 99,
      image: "/placeholder.svg?height=100&width=150",
    },
    subtotal: 99,
    tax: 7.92, // 8% tax
    total: 106.92,
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingInfo({
      ...billingInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setPaymentError("")

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      setIsProcessing(false)
      return
    }

    try {
      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: `${billingInfo.firstName} ${billingInfo.lastName}`,
          email: billingInfo.email,
          address: {
            line1: billingInfo.address,
            city: billingInfo.city,
            state: billingInfo.state,
            postal_code: billingInfo.zipCode,
            country: billingInfo.country,
          },
        },
      })

      if (error) {
        setPaymentError(error.message || "An error occurred")
        setIsProcessing(false)
        return
      }

      // Create payment intent on your backend
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          amount: Math.round(orderData.total * 100), // Convert to cents
          currency: "usd",
          billing_details: billingInfo,
        }),
      })

      const { client_secret, error: backendError } = await response.json()

      if (backendError) {
        setPaymentError(backendError)
        setIsProcessing(false)
        return
      }

      // Confirm payment
      const { error: confirmError } = await stripe.confirmCardPayment(client_secret)

      if (confirmError) {
        setPaymentError(confirmError.message || "Payment failed")
        setIsProcessing(false)
      } else {
        setPaymentSuccess(true)
      }
    } catch (error) {
      setPaymentError("An unexpected error occurred")
      setIsProcessing(false)
    }
  }

  if (paymentSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your takeoff has been purchased successfully. Check your email for the download link.
          </p>
          <div className="space-y-4">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl">
              <Download className="h-4 w-4 mr-2" />
              Download Your Takeoff
            </Button>
            <Link to="/find-takeoffs">
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 py-3 rounded-xl">
                Browse More Takeoffs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link
          to="/takeoff/1"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Takeoff Details
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
            <p className="text-gray-600">Complete your purchase to get instant access to your takeoff</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={billingInfo.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full py-3 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">We'll send your takeoff download link here</p>
                </div>
              </div>
            </div>

            {/* Billing Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Billing Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="firstName"
                    value={billingInfo.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    className="py-3 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="lastName"
                    value={billingInfo.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    className="py-3 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company (Optional)</label>
                  <Input
                    name="company"
                    value={billingInfo.company}
                    onChange={handleInputChange}
                    placeholder="Your Company Name"
                    className="py-3 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="address"
                    value={billingInfo.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                    className="py-3 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="city"
                    value={billingInfo.city}
                    onChange={handleInputChange}
                    placeholder="Austin"
                    className="py-3 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="state"
                    value={billingInfo.state}
                    onChange={handleInputChange}
                    placeholder="TX"
                    className="py-3 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="zipCode"
                    value={billingInfo.zipCode}
                    onChange={handleInputChange}
                    placeholder="78701"
                    className="py-3 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Payment Information</h2>
                <div className="flex items-center text-sm text-gray-500">
                  <Shield className="h-4 w-4 mr-1" />
                  <span>Secured by Stripe</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Details</label>
                  <StripeCardElement onChange={() => {}} />
                </div>

                {paymentError && (
                  <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-xl">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-red-700">{paymentError}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing Payment...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Complete Purchase - ${orderData.total.toFixed(2)}
                </div>
              )}
            </Button>

            {/* Security Notice */}
            <div className="text-center text-sm text-gray-500">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-4 w-4 mr-1" />
                <span>Your payment information is secure and encrypted</span>
              </div>
              <p>
                By completing this purchase, you agree to our{" "}
                <a href="#" className="text-green-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-green-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Order Summary Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            {/* Order Item */}
            <div className="flex items-start space-x-4 mb-6 pb-6 border-b border-gray-200">
              <img
                src={orderData.item.image || "/placeholder.svg"}
                alt={orderData.item.title}
                className="w-20 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{orderData.item.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {orderData.item.type}
                  </span>
                  <span>{orderData.item.area}</span>
                </div>
                <div className="text-lg font-bold text-gray-900">${orderData.item.price}</div>
              </div>
            </div>

            {/* What's Included */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <FileSpreadsheet className="h-4 w-4 mr-2 text-green-600" />
                  <span>Excel format takeoff</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Zap className="h-4 w-4 mr-2 text-green-600" />
                  <span>Instant download</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2 text-green-600" />
                  <span>Multiple project use</span>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${orderData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${orderData.tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center text-green-700 mb-2">
                <Check className="h-4 w-4 mr-2" />
                <span className="font-medium">30-day money-back guarantee</span>
              </div>
              <div className="flex items-center text-green-700 mb-2">
                <Check className="h-4 w-4 mr-2" />
                <span className="font-medium">Instant email delivery</span>
              </div>
              <div className="flex items-center text-green-700">
                <Check className="h-4 w-4 mr-2" />
                <span className="font-medium">24/7 customer support</span>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Secure Checkout</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="h-4 w-4 mr-2 text-green-600" />
                <span>SSL encrypted payment</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CreditCard className="h-4 w-4 mr-2 text-green-600" />
                <span>PCI DSS compliant</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Lock className="h-4 w-4 mr-2 text-green-600" />
                <span>Bank-level security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Wrap the main component with Elements provider
const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <CheckoutContent />
        <Footer />
      </div>
    </Elements>
  )
}

export default Checkout
