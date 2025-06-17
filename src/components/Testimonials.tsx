const Testimonials = () => {
  const testimonials = [
    {
      rating: 5,
      text: "ProTakeoff.ai has completely transformed our bidding process. We're now able to bid on twice as many projects in half the time.",
      author: "John Smith",
      company: "Green Landscapes Inc",
      profileImage:
        "https://lh3.googleusercontent.com/a/ACg8ocKvNzPfOJjQyGqOgOKZzKVKHJ8vZhWqQvZQVyHFoJ4=s96-c",
    },
    {
      rating: 5,
      text: "The accuracy of the takeoffs is impressive. We've increased our win rate by 30% since we started using ProTakeoff.ai.",
      author: "Sarah Johnson",
      company: "Irrigation Experts LLC",
      profileImage:
        "https://lh3.googleusercontent.com/a/ACg8ocLPjbKzVuKjZmYqOgNjJhWqQvZQVyHFoJ4VzKHJ8v=s96-c",
    },
    {
      rating: 4,
      text: "ProTakeoff.ai has completely transformed our bidding process. We're now able to bid on twice as many projects in half the time.",
      author: "Michael Rodriguez",
      company: "Texas Lawn Solutions",
      profileImage:
        "https://lh3.googleusercontent.com/a/ACg8ocMPjbKzVuKjZmYqOgNjJhWqQvZQVyHFoJ4VzKHJ8w=s96-c",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? "text-green-500" : "text-gray-300"
        }`}
      >
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
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.profileImage}
                  alt={`${testimonial.author} profile`}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${testimonial.author}&background=22c55e&color=fff&size=48`;
                  }}
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.company}
                  </div>
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
