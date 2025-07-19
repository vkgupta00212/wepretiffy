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
    <Navbar />
    <Routes>
      {/* ✅ Valid Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/womensaloonIn" element={<WomenSaloonIn />} />
      <Route path="/paymentpage" element={<PaymentPage />} />
      <Route path="/cartcard" element={<CartCard />} />

      {/* ❌ Catch-all 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
