
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TakeoffFinder from "@/components/TakeoffFinder";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <TakeoffFinder />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <CallToAction />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
