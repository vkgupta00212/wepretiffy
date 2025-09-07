import Navigation from "../component/Navigation";
import HeroSection from "../component/HeroSection";
import PromoCard from "../component/PromocardSection";
import ServicesCarousel2 from "../component/ServicesCarousel2";
import ServicesCarousel4 from "../component/ServicesCarousel4";
import BecomeWePretiffyCard from "../component/ui/becomeweprettifycard";
import SpecialForYou from "../component/ui/specialyforyou";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <HeroSection />

      {/* Promotional Section */}
      <PromoCard />

      {/* Services Section */}
      <ServicesCarousel2 />
      <ServicesCarousel4 />

      {/* Become WePretiffy Section */}
      <section className="py-12 bg-pink-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Become a WePretiffy Vendor
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            Join our growing community and offer your services to a wider
            audience. Fill in your details below and let's get started.
          </p>
          <BecomeWePretiffyCard />
        </div>
      </section>
    </div>
  );
};

export default Index;
