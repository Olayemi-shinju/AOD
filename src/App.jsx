import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // ✅ HelmetProvider
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
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet/dist/leaflet.css';
import { MobileNav } from './Navigations/MobileNav.jsx';
import CheckoutPage from './pages/Checkout.jsx';
import WishlistPage from './pages/Wishlist.jsx';
import Project from './pages/Project.jsx';
import BackToTopButton from './BackToTop.jsx';

function App() {
  return (
    <HelmetProvider> {/* ✅ HelmetProvider wraps the entire tree */}
      <CartProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen justify-between">
            <NavBar />
            <ScrollNav />
            <ScrollToTop />
            <BackToTopButton/>
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
                <Route path="/project" element={<Project />} />
                <Route path="/wish" element={<WishlistPage />} />
                <Route path="/detail/:slug" element={<ProductPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
            <MobileNav />

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
              toastClassName="!bg-white !text-black !rounded-xl !shadow-lg !border border-gray-200"
              bodyClassName="text-sm font-medium"
              progressClassName="bg-blue-500"
            />
          </div>
        </BrowserRouter>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;
