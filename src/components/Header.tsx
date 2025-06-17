
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ProTakeoff.ai</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-gray-900 font-medium">Features</a>
            <a href="#find-takeoffs" className="text-gray-700 hover:text-gray-900 font-medium">Find Takeoffs</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-gray-900 font-medium">How It Works</a>
            <a href="#pricing" className="text-gray-700 hover:text-gray-900 font-medium">Pricing</a>
            <a href="#contact" className="text-gray-700 hover:text-gray-900 font-medium">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="outline" className="text-gray-700 border-gray-300">
              Login
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
