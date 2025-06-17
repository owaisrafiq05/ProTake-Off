import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FindTakeoffs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Combined Hero and Browse Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Browse Takeoffs
            </h1>
            <p className="text-xl text-gray-600">
              Find and purchase takeoffs for your landscaping and irrigation
              projects.
            </p>
          </div>

          {/* Browse Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v4.586l-4-2v-2.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zip Code
                  </label>
                  <Input placeholder="Enter Zip Code" className="w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Size
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="size"
                        value="small"
                        className="mr-2"
                      />
                      <span className="text-gray-600">Small</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="size"
                        value="medium"
                        className="mr-2"
                      />
                      <span className="text-gray-600">Medium</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="size"
                        value="large"
                        className="mr-2"
                      />
                      <span className="text-gray-600">Large</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-600">Landscaping</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-600">Irrigation</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Apply Filters
                  </Button>
                  <Button variant="outline" className="w-full">
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Sample Takeoff Card */}
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                  <div className="mb-4">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                      Landscaping
                    </span>
                    <p className="text-sm text-gray-600">Over 15,000 sq ft</p>
                  </div>

                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">
                      150$
                    </span>
                    <span className="text-gray-600"> per takeoff</span>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Browse Large Projects
                  </Button>
                </div>

                {/* Additional sample cards */}
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                      Irrigation
                    </span>
                    <p className="text-sm text-gray-600">
                      5,000 - 15,000 sq ft
                    </p>
                  </div>

                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">
                      100$
                    </span>
                    <span className="text-gray-600"> per takeoff</span>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Browse Medium Projects
                  </Button>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                  <div className="mb-4">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                      Landscaping
                    </span>
                    <p className="text-sm text-gray-600">Under 5,000 sq ft</p>
                  </div>

                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">
                      50$
                    </span>
                    <span className="text-gray-600"> per takeoff</span>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Browse Small Projects
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FindTakeoffs;
