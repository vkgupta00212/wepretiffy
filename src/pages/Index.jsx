import Navigation from "../component/Navigation";
import HeroSection from "../component/HeroSection";
import ServicesCarousel from "../component/ServicesCarousel";
import PromoCard from "../component/PromocardSection";
import ServicesCarousel2 from "../component/ServicesCarousel2";
import ServicesCarousel3 from "../component/ServicesCarousel3";
import ServicesCarousel4 from "../component/ServicesCarousel4";
import WomenSaloonIn from "../component/ui/womensaloonIn";

const Index = () => {
  return (
    <div className="min-h-screen bg-white m-[1px]">
      {/* <Navigation /> */}
      <HeroSection />
      <PromoCard />
      {/* <ServicesCarousel /> */}
      <ServicesCarousel2 />
      {/* <ServicesCarousel3 /> */}
      <ServicesCarousel4 />
      {/* <TestimonialsSection />
      <BookingForm /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Index;
