"use client"

import type React from "react"

// Real Stripe integration example (you would install @stripe/stripe-js and @stripe/react-stripe-js)
import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_...")

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

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
          name: "Customer Name",
          email: "customer@example.com",
        },
      })

      if (error) {
        setPaymentError(error.message || "An error occurred")
        setIsProcessing(false)
        return
      }

      // Send payment method to your backend
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          amount: 10692, // $106.92 in cents
          currency: "usd",
        }),
      })

      const { client_secret } = await response.json()

      // Confirm payment
      const { error: confirmError } = await stripe.confirmCardPayment(client_secret)

      if (confirmError) {
        setPaymentError(confirmError.message || "Payment failed")
      } else {
        // Payment succeeded
        console.log("Payment successful!")
      }
    } catch (error) {
      setPaymentError("An unexpected error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
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
    <form onSubmit={handleSubmit}>
      <div className="border border-gray-300 rounded-lg p-4 bg-white focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition-all">
        <CardElement options={cardElementOptions} />
      </div>
      {paymentError && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">{paymentError}</div>
      )}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isProcessing ? "Processing..." : "Complete Purchase"}
      </button>
    </form>
  )
}

// Wrapper component with Stripe Elements provider
const StripeCheckout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
}

export default StripeCheckout
