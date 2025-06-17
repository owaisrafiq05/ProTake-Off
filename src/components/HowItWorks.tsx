
const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Enter ZIP Code & Project Size",
      description: "Search for available takeoffs in your area by entering your project details."
    },
    {
      number: "2", 
      title: "Purchase Takeoff",
      description: "Pay $50-$150 based on project size and complexity."
    },
    {
      number: "3",
      title: "Instant Email Delivery", 
      description: "Receive your Excel file takeoff immediately after purchase."
    },
    {
      number: "4",
      title: "Customize & Submit",
      description: "Add your pricing and submit your bid to the general contractor."
    }
  ];

  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Get your takeoffs in minutes, not days. No subscriptions. No delays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
