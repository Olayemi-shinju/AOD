import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './Navigations/NavBar'
import Footer from './Footer/Footer'
import ScrollNav from './Navigations/ScrollNav'
import { CartProvider } from './Contexts/Context.jsx' // ✅ Import your context provider
import Shop from './pages/Shop'
import Categories from './pages/Category'
import About from './pages/About'
import ScrollToTop from './ScrollToTop'
import Contact from './pages/Contact'
import 'leaflet/dist/leaflet.css';
import ProductPage from './pages/Detail'
import LoginPage from './Authentication/Login'
import RegisterPage from './Authentication/Register'
import ForgotPasswordPage from './Authentication/ForgotPassword'
import ResetPasswordPage from './Authentication/ResetPassword'
import Profile from './pages/Profile'
import OTPForm from './Authentication/Otp'
import Cart from './pages/Cart'
import Home from './pages/Home'
import EnergyCalculators from './pages/EnergyCalculators'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <CartProvider> {/* ✅ Wrap the app here */}
      <div className='justify-between flex flex-col h-screen'>
        <BrowserRouter>
          <NavBar />
          <ScrollNav />
          <ScrollToTop/>
          <Routes>
            {/* Add your routes here */}
            <Route path='/' element={<Home/>}/>
            <Route path='*' element={<NotFound/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/energy-calculator' element={<EnergyCalculators/>}/>
            <Route path='/reset-password' element={<ResetPasswordPage/>}/>
            <Route path='/otp' element={<OTPForm/>}/>
            <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/shop' element={<Shop/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/categories' element={<Categories/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/detail/:id' element={<ProductPage/>}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </CartProvider>
  )
}

export default App
