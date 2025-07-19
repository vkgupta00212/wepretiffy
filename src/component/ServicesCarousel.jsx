import { useEffect, useState } from "react";
import { Card, CardContent } from "../component/ui/card";
import HomepageImageShowAPI from "../backend/homepageimage/homepageImageShow";

const ServicesCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [services, setServices] = useState([]);

  // Fetch services from API on mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await HomepageImageShowAPI();
        setServices(data.slice(10, 20)); // Limit to 10
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  // Return next 3 services for sliding (can be used later)
  const getVisibleServices = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % services.length;
      visible.push(services[index]);
    }
    return visible;
  };

  return (
    <section id="services" className="py-10 bg-background">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-1">
        {/* Section Header */}
        <div className="text-[30px] font-medium text-black mb-10">
          <h2>New and noteworthy</h2>
        </div>

        <div className="relative">
          <div className="mx-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">
              {services.map((service) => (
                <div key={service.id}>
                  <Card className="overflow-hidden cursor-pointer">
                    <CardContent className="p-0">
                      <div className="border-b-2">
                        <img
                          src={`https://weprettify.com/images/${service.ServiceImage}`}
                          alt={service.ServiceName}
                          className="w-full object-contain"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Service name outside the card */}
                  <div className="flex items-start justify-start mt-4 px-1">
                    <span className="text-[16px] text-black font-medium">
                      {service.ServiceName}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optional: You can add carousel navigation arrows here later */}
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
