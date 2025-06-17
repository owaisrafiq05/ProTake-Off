
import { Clock, DollarSign, FileText, CheckCircle, TrendingUp, Zap } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Save Time",
      description: "Skip the manual takeoff process and get your estimates instantly."
    },
    {
      icon: DollarSign,
      title: "Increase Profits", 
      description: "Bid on more jobs with accurate estimates and competitive pricing."
    },
    {
      icon: FileText,
      title: "Accurate Takeoffs",
      description: "Get detailed material and quantity estimates for your projects."
    },
    {
      icon: CheckCircle,
      title: "No Subscriptions",
      description: "Pay only for what you need, when you need it."
    },
    {
      icon: TrendingUp,
      title: "Scale Your Business",
      description: "Take on more projects without increasing overhead costs."
    },
    {
      icon: Zap,
      title: "Fast Turnaround", 
      description: "Submit bids quickly and stay ahead of your competition."
    }
  ];

  return (
    <section id="features" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose ProTakeoff.ai
          </h2>
          <p className="text-xl text-gray-600">
            We help small to midsize contractors eliminate manual blueprint work, bid faster, and grow their business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
