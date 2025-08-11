"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useCart } from "./CartContext"
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight } from "lucide-react"

const CartDropdown = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, isOpen, setIsOpen } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-25 z-40" onClick={() => setIsOpen(false)} />

      {/* Cart Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Shopping Cart ({items.length})
          </h3>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="max-h-96 overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-8 text-center">
              <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Link to="/find-takeoffs">
                <Button className="bg-brand-600 hover:bg-brand-700 text-white" onClick={() => setIsOpen(false)}>
                  Browse Takeoffs
                </Button>
              </Link>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  {/* Item Image */}
                  {/* <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
                  /> */}

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm leading-tight mb-1 truncate">{item.title}</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-brand-100 text-brand-800 px-2 py-1 rounded-full text-xs font-medium">
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">{item.area}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-brand-600">${item.price}</span>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 hover:bg-red-100 rounded transition-colors ml-2"
                        >
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            {/* Total */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold text-gray-900">Subtotal:</span>
              <span className="text-2xl font-bold text-brand-600">${getTotalPrice().toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <Link to="/checkout">
              <Button
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl group"
                onClick={() => setIsOpen(false)}
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            {/* Continue Shopping */}
            <Link to="/find-takeoffs">
              <Button
                variant="outline"
                className="w-full mt-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDropdown
