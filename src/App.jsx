import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Navigations/NavBar';
import Footer from './Footer/Footer';
import ScrollNav from './Navigations/ScrollNav';
import { CartProvider } from './Contexts/Context.jsx';
import Shop from './pages/Shop';
import Categories from './pages/Category';
import About from './pages/About';
import ScrollToTop from './ScrollToTop';
import Contact from './pages/Contact';
import ProductPage from './pages/Detail';
import LoginPage from './Authentication/Login';
import RegisterPage from './Authentication/Register';
import ForgotPasswordPage from './Authentication/ForgotPassword';
import ResetPasswordPage from './Authentication/ResetPassword';
import Profile from './pages/Profile';
import OTPForm from './Authentication/Otp';
import Cart from './pages/Cart';
import Home from './pages/Home';
import EnergyCalculators from './pages/EnergyCalculators';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Required toast CSS
import 'leaflet/dist/leaflet.css'; // ✅ Required Leaflet CSS
import { MobileNav } from './Navigations/MobileNav.jsx'
import CheckoutPage from './pages/Checkout.jsx';
import WishlistPage from './pages/Wishlist.jsx';

function App() {
  
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen justify-between">
          {/* Top navigation */}
          <NavBar />
          <ScrollNav />
          <ScrollToTop />

          {/* Main routes */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/energy-calculator" element={<EnergyCalculators />} />
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
              <Route path="/otp" element={<OTPForm />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/shop/:id" element={<Shop />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/wish" element={<WishlistPage />} />
              <Route path="/detail/:slug" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
          <MobileNav/>
          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
