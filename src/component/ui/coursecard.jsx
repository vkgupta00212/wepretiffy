import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import GetServicePack from "../../backend/servicepack/getservicepack";

// ✅ Package Card Component
const PackageCardItem = ({
  image,
  servicename,
  duration,
  fees,
  discountfee,
  pkg, // pass the full object
}) => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    // ✅ Navigate to joincourses page and pass course details
    navigate("/joincourses", { state: { course: pkg } });
  };

  return (
    <div className="group w-full max-w-xs rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={servicename}
          className="w-full h-40 sm:h-48 md:h-52 lg:h-60 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-xs sm:text-sm font-medium text-gray-800 shadow-sm">
          {duration}
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight line-clamp-2">
          {servicename}
        </h2>

        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium">
          <span className="text-indigo-600 text-sm sm:text-base font-bold">
            ₹{discountfee || fees}
          </span>
          {discountfee && (
            <span className="line-through text-gray-500 text-xs sm:text-sm">
              ₹{fees}
            </span>
          )}
        </div>

        <button
          onClick={handleJoinClick} // ✅ navigate on click
          className="w-full px-3 sm:px-4 py-2 bg-indigo-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          Join
        </button>
      </div>
    </div>
  );
};

// ✅ Course Card List
const CourseCard = () => {
  const [servicePackages, setServicePackages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const data = await GetServicePack("2");
        setServicePackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-8 md:py-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 md:mb-8 text-left tracking-tight">
          Courses
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-32 md:h-40">
            <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="ml-2 md:ml-3 text-gray-600 text-base md:text-lg">
              Loading Courses...
            </p>
          </div>
        ) : servicePackages.length === 0 ? (
          <p className="text-center text-gray-500 text-base md:text-lg py-8 md:py-10 bg-white rounded-xl shadow-md">
            No Courses available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {servicePackages.map((pkg) => (
              <PackageCardItem
                key={pkg.id}
                {...pkg}
                pkg={pkg} // ✅ pass full course object
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
