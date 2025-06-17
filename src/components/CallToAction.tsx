
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="bg-green-600 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Grow Your Business?
        </h2>
        <p className="text-xl text-green-100 mb-8">
          Join ProTakeoff.ai today and start bidding on more projects with confidence.
        </p>
        <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
          Get Started Now →
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
