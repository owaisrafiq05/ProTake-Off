
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/6e8c3b94-92c1-43e5-a7ad-9103f6738072.png" 
                alt="ProTakeoff.ai Logo" 
                className="h-8 w-auto"
              />
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/#features" className="text-gray-700 hover:text-gray-900 font-medium">Features</a>
            <Link 
              to="/find-takeoffs" 
              className={`font-medium ${location.pathname === '/find-takeoffs' ? 'text-green-600' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Find Takeoffs
            </Link>
            <a href="/#how-it-works" className="text-gray-700 hover:text-gray-900 font-medium">How It Works</a>
            <Link 
              to="/pricing" 
              className={`font-medium ${location.pathname === '/pricing' ? 'text-green-600' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Pricing
            </Link>
            <a href="/#contact" className="text-gray-700 hover:text-gray-900 font-medium">Contact</a>
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
