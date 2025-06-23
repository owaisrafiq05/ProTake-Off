"use client"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, ShoppingCart, User, ChevronDown, Settings, LogOut, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { useCart } from "../components/CartContext"
import CartDropdown from "../components/CartDropdown"
import { useAuth } from "./AuthContext"

const Header = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getTotalItems, isOpen, setIsOpen } = useCart()
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const { user, logout, loading } = useAuth()

  const navItems = [
    { href: "/#features", label: "Features" },
    { href: "/find-takeoffs", label: "Find Takeoffs" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/checkout", label: "Checkout" },
    { href: "/#contact", label: "Contact" },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative flex items-center">
                {/* <img src="/logo.png" alt="ProTakeoff Logo" className="h-10 w-16" /> */}
                <img src="/ProTakeoff.ai.png" alt="ProTakeoff.ai" className="h-5 ml-2" />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) =>
              item.href.startsWith("/#") ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`font-medium transition-colors ${
                    location.pathname === item.href ? "text-green-600" : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Desktop Auth Buttons/User Dropdown */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Cart Icon */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <CartDropdown />
            </div>

            {/* User Dropdown or Auth Buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* User Dropdown Menu */}
                {isUserDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsUserDropdownOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 py-2">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <User className="h-5 w-5 mr-3 text-gray-400" />
                          <span className="font-medium">Dashboard</span>
                        </Link>
                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <ShoppingBag className="h-5 w-5 mr-3 text-gray-400" />
                          <span className="font-medium">Purchase History</span>
                        </Link>
                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <Settings className="h-5 w-5 mr-3 text-gray-400" />
                          <span className="font-medium">Settings</span>
                        </Link>
                        <div className="border-t border-gray-200 my-2"></div>
                        <button
                          className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                          onClick={() => {
                            setIsUserDropdownOpen(false)
                            logout()
                          }}
                        >
                          <LogOut className="h-5 w-5 mr-3" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-green-600 font-semibold border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={closeMobileMenu} />

            {/* Slide-in Menu */}
            <div
              className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
                isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    {/* <img src="/logo.png" alt="ProTakeoff Logo" className="h-8 w-12" /> */}
                    <img src="/ProTakeoff.ai.png" alt="ProTakeoff.ai" className="h-4" />
                  </div>
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                  {navItems.map((item) =>
                    item.href.startsWith("/#") ? (
                      <a
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                          location.pathname === item.href
                            ? "text-green-600 bg-green-50"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    ),
                  )}
                </nav>

                {/* Auth Buttons/User Mobile */}
                <div className="p-4 border-t border-gray-200 space-y-3">
                  {/* Mobile Cart Button */}
                  <button
                    onClick={() => {
                      setIsOpen(!isOpen)
                      closeMobileMenu()
                    }}
                    className="w-full flex items-center justify-between p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center">
                      <ShoppingCart className="h-5 w-5 mr-3" />
                      <span className="font-medium">Cart</span>
                    </div>
                    {getTotalItems() > 0 && (
                      <span className="bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </button>

                  {user ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="w-full flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={closeMobileMenu}
                      >
                        <User className="h-5 w-5 mr-3" />
                        <span className="font-medium">Dashboard</span>
                      </Link>
                      <button
                        className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => {
                          closeMobileMenu()
                          logout()
                        }}
                      >
                        <LogOut className="h-5 w-5 mr-3" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="w-full flex items-center p-3 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="w-full flex items-center p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        onClick={closeMobileMenu}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
