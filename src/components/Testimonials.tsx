
const Testimonials = () => {
  const testimonials = [
    {
      rating: 5,
      text: "ProTakeoff.ai has completely transformed our bidding process. We're now able to bid on twice as many projects in half the time.",
      author: "John Smith",
      company: "Green Landscapes Inc"
    },
    {
      rating: 5,
      text: "The accuracy of the takeoffs is impressive. We've increased our win rate by 30% since we started using ProTakeoff.ai.",
      author: "Sarah Johnson", 
      company: "Irrigation Experts LLC"
    },
    {
      rating: 4,
      text: "ProTakeoff.ai has completely transformed our bidding process. We're now able to bid on twice as many projects in half the time.",
      author: "Michael Rodriguez",
      company: "Texas Lawn Solutions"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-lg ${index < rating ? 'text-green-500' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customer Say
          </h2>
          <p className="text-xl text-gray-600">
            Trusted by landscaping and irrigation companies across Texas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
