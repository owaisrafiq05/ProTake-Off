import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="bg-white py-12 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Bid More, Win More.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              ProTakeoff.ai is a digital marketplace where landscaping and
              irrigation companies can instantly purchase completed project
              takeoffs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                Get Started →
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 px-8 py-3 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="rounded-2xl overflow-hidden max-w-lg w-full">
              <img
                src="/hero.png"
                alt="ProTakeoff.ai - Digital marketplace for landscaping and irrigation project takeoffs"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
