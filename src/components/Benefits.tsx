"use client"

import { Clock, DollarSign, FileText, CheckCircle, TrendingUp, Zap } from "lucide-react"

const Benefits = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Save Time",
      description: "Skip the manual takeoff process and get your estimates instantly. Focus on what matters most.",
      color: "bg-blue-100 text-blue-600",
      stat: "80% faster",
    },
    {
      icon: DollarSign,
      title: "Increase Profits",
      description: "Bid on more jobs with accurate estimates and competitive pricing. Grow your revenue.",
      color: "bg-green-100 text-green-600",
      stat: "30% more bids",
    },
    {
      icon: FileText,
      title: "Accurate Takeoffs",
      description: "Get detailed material and quantity estimates for your projects. Professional quality guaranteed.",
      color: "bg-purple-100 text-purple-600",
      stat: "99% accuracy",
    },
    {
      icon: CheckCircle,
      title: "No Subscriptions",
      description: "Pay only for what you need, when you need it. No monthly fees or hidden costs.",
      color: "bg-orange-100 text-orange-600",
      stat: "Pay per use",
    },
    {
      icon: TrendingUp,
      title: "Scale Your Business",
      description: "Take on more projects without increasing overhead costs. Grow efficiently and sustainably.",
      color: "bg-indigo-100 text-indigo-600",
      stat: "2x growth",
    },
    {
      icon: Zap,
      title: "Fast Turnaround",
      description: "Submit bids quickly and stay ahead of your competition. Speed wins contracts.",
      color: "bg-yellow-100 text-yellow-600",
      stat: "Minutes not days",
    },
  ]

  return (
    <section id="features" className="relative bg-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23059669&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;7&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-green-100/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-green-50/50 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-green-600">ProTakeoff.ai</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We help small to midsize contractors eliminate manual blueprint work, bid faster, and grow their business
            with AI-powered precision.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-sm border-2 border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {/* Icon and Stat */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 ${benefit.color} rounded-2xl flex items-center justify-center`}>
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600">{benefit.stat}</div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>

                {/* Hover Effect */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-full h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-green-50 text-green-700 px-6 py-3 rounded-full text-lg font-medium border border-green-200">
            <CheckCircle className="h-5 w-5 mr-2" />
            Trusted by 500+ contractors nationwide
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benefits
