"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { useAuth } from "@/components/AuthContext"

interface ForgotPasswordFormData {
  email: string
}

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const { forgotPassword } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>()

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    try {
      const res = await forgotPassword(data.email)
      if (res.success) {
        setIsEmailSent(true)
      }
    } catch (error) {
      // error handled in context
    } finally {
      setIsLoading(false)
    }
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen flex">
        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#16A34A] text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;7&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat" />
          </div>

          <div className="relative z-10 flex flex-col justify-center px-12 py-16">
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-8">
                <img src="/ProTakeoff.ai.png" alt="Protakeoffs.ai" className="h-6 brightness-0 invert" />
              </div>
            </div>

            <div className="max-w-md">
              <h1 className="text-4xl font-bold mb-6 leading-tight">
                Smart Takeoffs.
                <br />
                Faster Bids.
                <br />
                Better Business.
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Transform your landscaping business with AI-powered takeoffs and win more projects with precision
                estimates.
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-brand-500/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-brand-600/10 to-transparent rounded-full blur-3xl" />
          </div>
        </div>

        {/* Right Side - Success Message */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 bg-gray-50">
          <div className="mx-auto w-full max-w-md">
            {/* Back Button */}
            <Link to="/login" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Link>

            {/* Success Content */}
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-brand-100 mb-6">
                <CheckCircle className="h-6 w-6 text-brand-600" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Check Your Email</h2>
              <p className="text-gray-600 mb-8">
                We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> The reset link will expire in 10 minutes for security reasons.
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => navigate('/login')}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Return to Login
                </Button>
                
                <p className="text-gray-600">
                  Didn't receive the email?{" "}
                  <button
                    onClick={() => setIsEmailSent(false)}
                    className="text-brand-600 hover:text-brand-700 font-medium"
                  >
                    Try again
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#16A34A] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;7&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-16">
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-8">
              <img src="/ProTakeoff.ai.png" alt="Protakeoffs.ai" className="h-6 brightness-0 invert" />
            </div>
          </div>

          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Smart Takeoffs.
              <br />
              Faster Bids.
              <br />
              Better Business.
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Transform your landscaping business with AI-powered takeoffs and win more projects with precision
              estimates.
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-brand-500/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-brand-600/10 to-transparent rounded-full blur-3xl" />
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 bg-gray-50">
        <div className="mx-auto w-full max-w-md">
          {/* Back Button */}
          <Link to="/login" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password</h2>
            <p className="text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Forgot Password Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Remember your password?{" "}
              <Link to="/login" className="text-brand-600 hover:text-brand-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword 