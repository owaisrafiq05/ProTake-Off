
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Bid More, Win More.
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              ProTakeoff.ai is a digital marketplace where landscaping and irrigation companies can instantly purchase completed project takeoffs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                Get Started →
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 px-8 py-3 text-lg">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden transform rotate-3">
                  <img 
                    src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=300&h=200" 
                    alt="Sprinkler irrigation system"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden transform -rotate-2">
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=300&h=200" 
                    alt="Landscaping work"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-2xl overflow-hidden transform -rotate-1">
                  <img 
                    src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=300&h=200" 
                    alt="Irrigation sprinkler"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden transform rotate-2">
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=300&h=200" 
                    alt="Garden irrigation"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
