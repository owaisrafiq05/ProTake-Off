
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactForm = () => {
  return (
    <section id="contact" className="bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600">
            Have questions or need more information? Get in touch with our team.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-green-600 mb-2">
                  Name
                </label>
                <Input 
                  placeholder="Enter your name here"
                  className="border-green-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-green-600 mb-2">
                  Email
                </label>
                <Input 
                  type="email"
                  placeholder="Enter your email here"
                  className="border-green-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-green-600 mb-2">
                Message
              </label>
              <Textarea 
                placeholder="Enter your message here....."
                rows={6}
                className="border-green-300 focus:border-green-500 focus:ring-green-500 resize-none"
              />
            </div>
            
            <div className="text-center">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
