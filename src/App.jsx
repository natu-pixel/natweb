import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { MotionConfig } from 'framer-motion'
import { WatchlistProvider } from './components/WatchlistProvider'
import PageTransition from './components/PageTransition'
import RevealController from './components/RevealController'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import './components/ContentBrowser.css'
import './App.css'

const SubscriptionsPage = lazy(() => import('./pages/SubscriptionsPage'))
const ResellerPage = lazy(() => import('./pages/ResellerPage'))
const DiscoverPage = lazy(() => import('./pages/DiscoverPage'))
const WatchlistPage = lazy(() => import('./pages/WatchlistPage'))

function App() {
  return (
    <MotionConfig reducedMotion="user">
    <WatchlistProvider>
    <HashRouter>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <PageTransition>
          {location => (
            <Suspense fallback={<div className="discover-page container" role="status">Setting the scene...</div>}>
              <Routes location={location}>
                <Route path="/"              element={<HomePage />} />
                <Route path="/subscriptions" element={<SubscriptionsPage />} />
                <Route path="/reseller"      element={<ResellerPage />} />
                <Route path="/services"      element={<Navigate to="/" replace />} />
                <Route path="/about"         element={<Navigate to="/" replace />} />
                <Route path="/discover"      element={<DiscoverPage />} />
                <Route path="/watchlist"     element={<WatchlistPage />} />
                <Route path="*" element={<section className="discover-page container"><h1>Scene not found.</h1><p>Use the navigation to find your next destination.</p></section>} />
              </Routes>
              <RevealController />
            </Suspense>
          )}
        </PageTransition>
      </main>
      <Footer />
    </HashRouter>
    </WatchlistProvider>
    </MotionConfig>
  )
}

export default App
