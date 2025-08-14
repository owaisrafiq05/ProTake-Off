import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"
import { Check, Star, Zap, FileText, Clock, Shield, Award, ArrowRight, Sparkles } from "lucide-react"

const Pricing = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const pricingTiers = [
    {
      name: "Small Projects",
      description: "Perfect for residential or small commercial jobs",
      price: 50,
      size: "Under 5,000 sq ft",
      popular: false,
      color: "blue",
      features: [
        "Residential Properties",
        "Small commercial projects",
        "Backyard renovations",
        "Small irrigation system installations",
        "Excel format delivery",
        "Instant download",
      ],
    },
    {
      name: "Medium Projects",
      description: "Most popular for contractors",
      price: 100,
      size: "5,000 - 15,000 sq ft",
      popular: true,
      color: "brand",
      features: [
        "Residential developments",
        "Commercial properties",
        "HOA common areas",
        "Medium irrigation systems",
        "Excel format delivery",
        "Instant download",
      ],
    },
    {
      name: "Large Projects",
      description: "For complex commercial work",
      price: 150,
      size: "Over 15,000 sq ft",
      popular: false,
      color: "purple",
      features: [
        "Commercial complexes",
        "Municipal Projects",
        "Parks and recreation areas",
        "Large irrigation systems",
        "Excel format delivery",
        "Instant download",
      ],
    },
  ]

  const includedFeatures = [
    {
      icon: FileText,
      title: "Detailed Material Lists",
      description: "Complete breakdown of all required materials with quantities.",
      color: "bg-brand-100 text-brand-600",
    },
    {
      icon: Zap,
      title: "Excel Format",
      description: "Easily customizable spreadsheets for adding your pricing.",
      color: "bg-brand-100 text-brand-600",
    },
    {
      icon: Clock,
      title: "Instant Delivery",
      description: "Immediate email delivery after purchase.",
      color: "bg-brand-100 text-brand-600",
    },
    {
      icon: Award,
      title: "Labor Estimates",
      description: "Estimated labor hours for project completion.",
      color: "bg-brand-100 text-brand-600",
    },
    {
      icon: Shield,
      title: "Equipment Requirements",
      description: "List of necessary equipment for project execution.",
      color: "bg-brand-100 text-brand-600",
    },
    {
      icon: Star,
      title: "Bid Templates",
      description: "Ready-to-use templates for submitting professional bids.",
      color: "bg-brand-100 text-brand-600",
    },
  ]

  const faqs = [
    {
      question: "Are there any subscription fees?",
      answer: "No, Protakeoffs.ai operates on a pay-per-takeoff model. There are no subscriptions or recurring fees.",
    },
    {
      question: "Can I purchase multiple takeoffs?",
      answer:
        "Yes, you can purchase as many takeoffs as you need. Each takeoff is priced individually based on project size.",
    },
    {
      question: "Do you offer volume discounts?",
      answer:
        "Yes, for companies that regularly purchase multiple takeoffs, we offer volume discount packages. Contact our sales team for more information.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards and debit cards. Payment is processed securely through our platform.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23059669&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;7&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-brand-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-brand-50/50 to-transparent rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-brand-50 text-brand-700 px-4 py-2 rounded-full text-sm font-medium border border-brand-200 mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              No Subscriptions Required
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Simple, <span className="text-brand-600">Transparent</span> Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Pay only for what you need. No subscriptions. No hidden fees. <br/>Get professional takeoffs instantly.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                  tier.popular
                    ? "border-2 border-brand-500 shadow-2xl"
                    : "border-2 border-gray-200 shadow-lg hover:border-brand-300 hover:shadow-xl"
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-brand-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Card Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  <div className="text-sm text-gray-500 mb-6">{tier.size}</div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">~${tier.price}</span>
                    <span className="text-gray-600 text-lg"> per takeoff</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <div className="w-5 h-5 bg-brand-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Check className="h-3 w-3 text-brand-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link to="/find-takeoffs">
                  <Button
                    className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 group ${
                      tier.popular
                        ? "bg-brand-600 hover:bg-brand-700 text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                  >
                    Browse {tier.name}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                {/* Hover Effect */}
                {hoveredCard === index && (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent rounded-2xl pointer-events-none" />
                )}
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Instant Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="relative bg-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23059669&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;7&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What's <span className="text-brand-600">Included</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Every takeoff includes these premium features, regardless of project size. Professional quality
              guaranteed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {includedFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-brand-300 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-brand-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>

                  {/* Hover Effect */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-full h-1 bg-gradient-to-r from-brand-500 to-blue-500 rounded-full"></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative bg-gray-50 py-20 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pricing <span className="text-brand-600">FAQ</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Common questions about our transparent pricing model.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-200 hover:border-brand-300 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-brand-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed ml-11">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-brand-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
              <p className="text-gray-600 mb-6">
                Our team is here to help you choose the right pricing plan for your business.
              </p>
              <Link to="/#contact">
                <Button className="bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Pricing
