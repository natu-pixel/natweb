import { HashRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SubscriptionsPage from './pages/SubscriptionsPage'
import ResellerPage from './pages/ResellerPage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import './App.css'

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"              element={<HomePage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/reseller"      element={<ResellerPage />} />
          <Route path="/services"      element={<ServicesPage />} />
          <Route path="/about"         element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  )
}

export default App
