import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { LogoMark } from './Logo'
import './PageTransition.css'

const EASE = [0.2, 0.8, 0.2, 1]

// The curtain covers the old page on exit, then lifts away from the new one.
export default function PageTransition({ children }) {
  const location = useLocation()
  const reduced = useReducedMotion()
  const cover = reduced ? 0.01 : 0.5
  const reveal = reduced ? 0.01 : 0.65

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
    >
      <motion.div
        key={location.pathname}
        className="page-shell"
        exit={{ opacity: 1, transition: { duration: cover } }}
      >
        {!reduced && (
          <>
            <motion.div
              className="page-curtain page-curtain--cover"
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 0 }}
              exit={{ scaleY: 1, transition: { duration: cover, ease: EASE } }}
            >
              <span className="page-curtain__mark"><LogoMark /><span>NAT<em>.</em></span></span>
            </motion.div>
            <motion.div
              className="page-curtain page-curtain--reveal"
              aria-hidden="true"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0, transition: { duration: reveal, ease: EASE, delay: 0.08 } }}
            >
              <span className="page-curtain__mark"><LogoMark /><span>NAT<em>.</em></span></span>
            </motion.div>
          </>
        )}
        <motion.div
          className="page-shell__content"
          initial={{ opacity: 0, y: reduced ? 0 : 36 }}
          animate={{ opacity: 1, y: 0, transition: { duration: reduced ? 0.01 : 0.8, ease: EASE, delay: reduced ? 0 : 0.22 } }}
          exit={{ opacity: reduced ? 0 : 0.4, y: reduced ? 0 : -20, transition: { duration: cover, ease: EASE } }}
        >
          {children(location)}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
