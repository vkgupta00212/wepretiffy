import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import spaImage from "../../assets/facialimg.png";
import GetProductImage from "../../backend/getproduct/getproductimage";
import SuggestProductScreen from "./suggestedproduct";
import RatingScreen from "./ratingscreen";
import GetProductReviews from "../../backend/getproduct/getproductreviews";
import InsertOrder from "../../backend/order/insertorder";
import GetOrder from "../../backend/order/getorderid";

const ProductMainPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const [reviews, setReviews] = useState([]);
  const product = location.state?.subService;
  const [cartItems, setCartItems] = useState([]);
  const [orderId, setOrderId] = useState(null);

  const UserID = localStorage.getItem("userPhone");

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      if (!product?.ProID) {
        setImages([spaImage]);
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const fetchedImages = await GetProductImage(product.ProID);

        if (Array.isArray(fetchedImages) && fetchedImages.length > 0) {
          const mapped = fetchedImages.map(
            (img) => img.productImage || spaImage
          );
          setImages(mapped);
        } else {
          setImages([spaImage]);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setImages([spaImage]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [product]);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    const fetchExistingOrder = async () => {
      try {
        if (!UserID) return;

        const orders = await GetOrder(UserID, "Pending");

        if (orders && orders.length > 0) {
          setOrderId(orders[0].OrderID); // reuse existing order
          console.log("Existing order found:", orders[0].OrderID);
        } else {
          setOrderId(null); // will generate only on first add
          console.log("No existing order, will generate new one on first add");
        }
      } catch (err) {
        console.error("GetOrderid failed:", err);
      }
    };
    fetchExistingOrder();
  }, [UserID]);

  useEffect(() => {
    if (!instanceRef.current || isLoading) return;
    const autoplay = setInterval(() => {
      instanceRef.current?.next();
    }, 4000);
    return () => clearInterval(autoplay);
  }, [instanceRef, isLoading]);

  useEffect(() => {
    const fetchReview = async () => {
      if (!product?.ProID) {
        setReviews([]);
        return;
      }
      try {
        const fetchedReviews = await GetProductReviews(product.ProID);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      }
    };
    fetchReview();
  }, [product]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl text-gray-600">No product details found.</p>
      </div>
    );
  }

  const dummyReviews = [
    { id: 1, Rating: "4.5", Comment: "Great product!" },
    { id: 2, Rating: "5", Comment: "Excellent service." },
    { id: 3, Rating: "3.8", Comment: "Good but could be better." },
  ];

  const handleAdd = async () => {
    try {
      let currentOrderId = orderId;

      if (!currentOrderId) {
        currentOrderId = `ORD${Date.now()}`;
        setOrderId(currentOrderId);
        console.log("Generated new order:", currentOrderId);
      }

      const orderPayload = {
        OrderID: currentOrderId,
        UserID: UserID,
        OrderType: "Product",
        ItemImages: "",
        ItemName: product.ProductName || "",
        Price: Number(product.Price).toString(),
        Quantity: "1",
        Address: "",
        Slot: "",
        SlotDatetime: "",
        OrderDatetime: new Date().toISOString(),
      };

      const response = await InsertOrder(orderPayload);
      console.log("InsertOrder API Response:", response);
    } catch (err) {
      console.error("InsertOrder failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 bg-white shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        {/* Left: Image/Slider */}
        <div className="md:w-1/2 w-full h-[400px] bg-gray-100 rounded-2xl overflow-hidden relative">
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-gray-600">Loading images...</p>
            </div>
          ) : images.length > 1 ? (
            <>
              <div ref={sliderRef} className="keen-slider w-full h-full">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="keen-slider__slide flex items-center justify-center bg-gray-100"
                  >
                    <img
                      src={img}
                      alt={`${product.ProductName} - Image ${index + 1}`}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.currentTarget.src = spaImage;
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              {loaded && instanceRef.current && (
                <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
                  <button
                    onClick={() => instanceRef.current?.prev()}
                    className="p-2 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition"
                    aria-label="Previous slide"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => instanceRef.current?.next()}
                    className="p-2 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition"
                    aria-label="Next slide"
                  >
                    ›
                  </button>
                </div>
              )}

              {/* Dots */}
              {loaded && instanceRef.current && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => instanceRef.current?.moveToIdx(index)}
                      className={`w-3 h-3 rounded-full ${
                        currentSlide === index
                          ? "bg-indigo-600"
                          : "bg-gray-300 hover:bg-gray-400"
                      } transition`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <img
              src={images[0] || spaImage}
              alt={product.ProductName}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.src = spaImage;
              }}
            />
          )}
        </div>

        {/* Right: Product Details */}
        <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {product.ProductName}
            </h2>
            <p className="text-gray-600 mt-4 text-sm md:text-base leading-relaxed">
              {product.ProductDes}
            </p>
          </div>

          <div className="mt-6">
            <p className="text-xl md:text-2xl font-semibold text-gray-900">
              ₹{Number(product.Price).toFixed(2)}
            </p>
            <button
              onClick={handleAdd}
              className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
              aria-label="Add to cart"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="p-1 mt-8">
        <RatingScreen reviews={reviews} />
      </div>
      <div className="p-1 mt-8">
        <SuggestProductScreen />
      </div>
    </div>
  );
};

export default ProductMainPage;
