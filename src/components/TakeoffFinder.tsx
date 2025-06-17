
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TakeoffFinder = () => {
  return (
    <section id="find-takeoffs" className="bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Find Your Takeoff
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          Enter your ZIP code and project size to find available takeoffs.
        </p>
        
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
          <div className="space-y-6">
            <div>
              <Input 
                placeholder="Enter Zip Code" 
                className="w-full text-center border-gray-300 text-lg py-3"
              />
            </div>
            
            <div>
              <Select>
                <SelectTrigger className="w-full border-gray-300 text-lg py-3">
                  <SelectValue placeholder="Select Project Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (Under $5K)</SelectItem>
                  <SelectItem value="medium">Medium ($5K - $25K)</SelectItem>
                  <SelectItem value="large">Large ($25K - $100K)</SelectItem>
                  <SelectItem value="enterprise">Enterprise ($100K+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
              Find Takeoffs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TakeoffFinder;
