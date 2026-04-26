import { BrowserRouter, Routes, Route } from 'react-router';
import { Toaster } from 'sonner';
import { CartProvider } from './contexts/CartContext';
import LuxuryHomePage from './components/LuxuryHomePage';
import LuxuryMenuPage from './components/LuxuryMenuPage';
import LuxuryCartPage from './components/LuxuryCartPage';
import LuxuryCheckoutPage from './components/LuxuryCheckoutPage';
import LuxuryBookingPage from './components/LuxuryBookingPage';
import LuxuryQueuePage from './components/LuxuryQueuePage';
import LuxuryQueueStatusPage from './components/LuxuryQueueStatusPage';
import LuxuryRestaurantPage from './components/LuxuryRestaurantPage';
import GalleryPage from './components/GalleryPage';
import LuxuryReviewsPage from './components/LuxuryReviewsPage';
import AdminDashboard from './components/AdminDashboard';
import LuxuryPromotionsPage from './components/LuxuryPromotionsPage';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-luxury-ivory">
          <Routes>
            <Route path="/" element={<LuxuryHomePage />} />
            <Route path="/restaurant" element={<LuxuryRestaurantPage />} />
            <Route path="/menu" element={<LuxuryMenuPage />} />
            <Route path="/cart" element={<LuxuryCartPage />} />
            <Route path="/checkout" element={<LuxuryCheckoutPage />} />
            <Route path="/booking" element={<LuxuryBookingPage />} />
            <Route path="/queue" element={<LuxuryQueuePage />} />
            <Route path="/queue/status" element={<LuxuryQueueStatusPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/reviews" element={<LuxuryReviewsPage />} />
            <Route path="/promotions" element={<LuxuryPromotionsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <Toaster position="top-center" richColors />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}