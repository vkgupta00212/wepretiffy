import { useEffect, useState } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WomenSaloonIn from "./component/ui/womensaloonIn";
import PaymentPage from "./component/ui/paymentpage";
import Navbar from "./component/Navigation";
import Footer from "./component/Footer";
import Login from "./component/login/Login";
import OtpVerification from "./component/ui/otpverification";
import MobileNavbar from "./component/MobileNavb";
import { CartProvider } from "./component/context/cartContext";
import Course from "./component/ui/course";
import SkinAnalyzer from "./component/ui/skinanalyzer";
import UserProfile from "./component/ui/userprofile";
import JoinCourses from "./component/ui/join";
import TermsPage from "./component/ui/terms&condition";
import PrivacyAndPolicy from "./component/ui/privacy&policy";
import TransactionHistory from "./component/ui/transactions";
import ProductScreen from "./component/ui/products";

const queryClient = new QueryClient();

const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen font-sans flex flex-col bg-gray-50">
      {!isMobile && (
        <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
          <Navbar />
        </header>
      )}
      <main className={`flex-grow ${!isMobile ? "pt-16" : "pt-0"}`}>
        {children}
      </main>
      {isMobile && isHomePage && (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-t-md">
          <MobileNavbar />
        </div>
      )}
      <footer className="mt-8 bg-gray-100">
        <Footer />
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/womensaloonIn" element={<WomenSaloonIn />} />
              <Route path="/paymentpage" element={<PaymentPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/otpverification" element={<OtpVerification />} />
              <Route path="/course" element={<Course />} />
              <Route path="/skinanalyzer" element={<SkinAnalyzer />} />
              <Route path="/userprofile" element={<UserProfile />} />
              <Route path="/joincourses" element={<JoinCourses />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyAndPolicy />} />
              <Route path="/transactions" element={<TransactionHistory />} />
              <Route path="/productscreen" element={<ProductScreen />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </HashRouter>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
