
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ProTakeoff.ai</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Instant takeoffs for landscaping and irrigation companies. Bid faster, win more jobs.
            </p>
            <div className="flex space-x-4">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#features" className="block text-green-600 hover:text-green-700">Features</a>
              <a href="#find-takeoffs" className="block text-green-600 hover:text-green-700">Find Takeoffs</a>
              <a href="#how-it-works" className="block text-green-600 hover:text-green-700">How It Works</a>
              <a href="#pricing" className="block text-green-600 hover:text-green-700">Pricing</a>
              <a href="#contact" className="block text-green-600 hover:text-green-700">Contact</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">
            © 2025 ProTakeoff.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
