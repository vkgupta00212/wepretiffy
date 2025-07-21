import { QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WomenSaloonIn from "./component/ui/womensaloonIn";
import PaymentPage from "./component/ui/paymentpage";
import CartCard from "./component/ui/cartCard";
import Navbar from "./component/Navigation";
import Footer from "./component/Footer";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    {/* ⬇️ Apply font-sans to whole layout */}
    <div className="min-h-screen font-sans">
      <div className="mb-[80px]">
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/womensaloonIn" element={<WomenSaloonIn />} />
        <Route path="/paymentpage" element={<PaymentPage />} />
        <Route path="/cartcard" element={<CartCard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
