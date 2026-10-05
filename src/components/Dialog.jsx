import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Dialog({ title, onClose, children, className = '' }) {
  const ref = useRef(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    const dialog = ref.current
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    function cancel(event) {
      event.preventDefault()
      closeRef.current()
    }
    function containFocus(event) {
      if (event.key !== 'Tab') return
      const controls = [...dialog.querySelectorAll('a[href], button, input, select, textarea, iframe, [tabindex]')]
        .filter(element => !element.disabled && element.tabIndex >= 0 && element.getClientRects().length > 0)
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (!first) { event.preventDefault(); dialog.focus(); return }
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    dialog.addEventListener('cancel', cancel)
    dialog.addEventListener('keydown', containFocus)
    return () => {
      dialog.removeEventListener('cancel', cancel)
      dialog.removeEventListener('keydown', containFocus)
      dialog.close()
      document.body.style.overflow = overflow
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus()
    }
  }, [])

  return createPortal(
    <dialog ref={ref} className={`cinema-dialog ${className}`} aria-label={title}>
      <button className="dialog-close" aria-label={`Close ${title}`} onClick={onClose} autoFocus>&times;</button>
      {children}
    </dialog>,
    document.body,
  )
}
