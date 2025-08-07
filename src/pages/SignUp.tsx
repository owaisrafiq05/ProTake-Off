"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Building, Phone, MapPin } from "lucide-react"
import { useAuth } from "@/components/AuthContext"

interface SignupFormData {
  email: string
  password: string
  firstName: string
  lastName: string
  company: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
}

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>()

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    try {
      const res = await registerUser(data)
      if (res.success) {
        navigate('/login')
      }
    } catch (error) {
      // error handled in context
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
              <div className="hidden lg:flex lg:w-1/2 bg-brand text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;7&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-16">
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-8">
              {/* <img src="/logo.png" alt="ProTakeoff Logo" className="h-12 w-20 brightness-0 invert" /> */}
              <img src="/ProTakeoff.ai.png" alt="Protakeoffs.ai" className="h-6 brightness-0 invert" />
            </div>
          </div>

          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Join Thousands
              <br />
              of Contractors.
              <br />
              Start Winning.
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Get instant takeoffs, accurate estimates, and grow your landscaping business with AI-powered precision.
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-brand-500/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-brand-600/10 to-transparent rounded-full blur-3xl" />
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 bg-gray-50 overflow-y-auto">
        <div className="mx-auto w-full max-w-md">
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join Protakeoffs.ai and transform your business</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("firstName", { required: "First name is required" })}
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                    placeholder="John"
                  />
                </div>
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("lastName", { required: "Last name is required" })}
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                    placeholder="Doe"
                  />
                </div>
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
              </div>
            </div>

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
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            {/* Company & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("company", { required: "Company name is required" })}
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                    placeholder="ABC Landscaping"
                  />
                </div>
                {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("phone", { required: "Phone number is required" })}
                    type="tel"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                    placeholder="555-123-4567"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-brand-600" />
                Business Address
              </h3>

              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                                  <input
                    {...register("address.street", { required: "Street address is required" })}
                    type="text"
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                    placeholder="123 Main St"
                  />
                {errors.address?.street && <p className="mt-1 text-sm text-red-600">{errors.address.street.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    {...register("address.city", { required: "City is required" })}
                    type="text"
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                    placeholder="Austin"
                  />
                  {errors.address?.city && <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>}
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    {...register("address.state", { required: "State is required" })}
                    type="text"
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                    placeholder="TX"
                  />
                  {errors.address?.state && <p className="mt-1 text-sm text-red-600">{errors.address.state.message}</p>}
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    {...register("address.zipCode", { required: "ZIP code is required" })}
                    type="text"
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                    placeholder="78701"
                  />
                  {errors.address?.zipCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.address.zipCode.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded mt-1"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-brand-600 hover:text-brand-700 font-medium">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-brand-600 hover:text-brand-700 font-medium">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-brand-600 hover:text-brand-700 font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
