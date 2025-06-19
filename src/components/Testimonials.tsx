"use client"

import { Star, Quote, Users, Award } from "lucide-react"

const Testimonials = () => {
  const testimonials = [
    {
      rating: 5,
      text: "ProTakeoff.ai has completely transformed our bidding process. We're now able to bid on twice as many projects in half the time.",
      author: "John Smith",
      company: "Green Landscapes Inc",
      location: "Austin, TX",
      profileImage: "https://ui-avatars.com/api/?name=John+Smith&background=22c55e&color=fff&size=96",
    },
    {
      rating: 5,
      text: "The accuracy of the takeoffs is impressive. We've increased our win rate by 30% since we started using ProTakeoff.ai.",
      author: "Sarah Johnson",
      company: "Irrigation Experts LLC",
      location: "Dallas, TX",
      profileImage: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=3b82f6&color=fff&size=96",
    },
    {
      rating: 5,
      text: "Game changer for our business! The time savings alone have allowed us to take on 40% more projects this year.",
      author: "Michael Rodriguez",
      company: "Texas Lawn Solutions",
      location: "Houston, TX",
      profileImage: "https://ui-avatars.com/api/?name=Michael+Rodriguez&background=8b5cf6&color=fff&size=96",
    },
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={`w-5 h-5 ${index < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <section className="relative bg-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23059669&quot; fillOpacity=&quot;0.1&quot;%3E%3Ccircle cx=&quot;7&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;7&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;27&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;7&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;27&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3Ccircle cx=&quot;47&quot; cy=&quot;47&quot; r=&quot;1&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-green-100/30 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-50/50 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200 mb-6">
            <Users className="h-4 w-4 mr-2" />
            Customer Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="text-green-600">Customers Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Trusted by landscaping and irrigation companies across Texas. See how ProTakeoff.ai is transforming
            businesses.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-green-300 hover:shadow-xl transition-all duration-300 hover:scale-105 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6 pt-2">
                <div className="flex space-x-1">{renderStars(testimonial.rating)}</div>
                <span className="ml-2 text-sm font-medium text-gray-600">({testimonial.rating}.0)</span>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 mb-8 leading-relaxed text-lg italic">
                "{testimonial.text}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={testimonial.profileImage || "/placeholder.svg"}
                    alt={`${testimonial.author} profile`}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://ui-avatars.com/api/?name=${testimonial.author}&background=22c55e&color=fff&size=56`
                    }}
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Award className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="font-bold text-gray-900 text-lg">{testimonial.author}</div>
                  <div className="text-green-600 font-medium">{testimonial.company}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="text-center mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600 font-medium">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-600 font-medium">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600 font-medium">Would Recommend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
