import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import EventSection from "../components/EventSection";
import PricingPlans from "../components/PricingPlans";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div className="scroll-smooth">
      <HeroSection />
      <AboutUs />
      <EventSection />
      <PricingPlans />
      <ContactUs />
      <Footer />
    </div>
  );
}
export default HomePage;
