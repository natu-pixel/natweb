import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Force instant scroll reset to top of page upon route change
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
