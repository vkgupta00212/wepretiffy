// App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WomenSaloonIn from "./component/ui/womensaloonIn";
import PaymentPage from "./component/ui/paymentpage";
import Navbar from "./component/Navigation";
import Footer from "./component/Footer"; // Assuming this is your Footer component
import Login from "./component/login/Login";
import MobileNavbar from "./component/MobileNavb";
import { CartProvider } from "./component/context/cartContext";

const queryClient = new QueryClient();

// The Layout component is a great place to put shared components like Navbars and Footers.
const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreen(); // Initial check
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen font-sans flex flex-col">
      {!isMobile && <Navbar />}
      <main className="flex-grow">{children}</main>
      {isMobile && isHomePage && <MobileNavbar />}
      <div className="mt-[10px]">
        <Footer />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/womensaloonIn" element={<WomenSaloonIn />} />
            <Route path="/paymentpage" element={<PaymentPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
