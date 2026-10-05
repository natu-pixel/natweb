import { useEffect } from 'react'

const SKIP = '.home, .discover-page, .page-hero, .subs__hero'

// Fades inner-page content in as it scrolls into view; grid children are staggered.
export default function RevealController() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const items = []
    for (const section of document.querySelectorAll('main section')) {
      if (section.closest(SKIP)) continue
      for (const child of section.querySelectorAll(':scope > .container > *')) {
        const kids = [...child.children]
        if (getComputedStyle(child).display === 'grid' && kids.length > 1) kids.forEach((kid, index) => items.push([kid, index]))
        else items.push([child, 0])
      }
    }

    const timers = []
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const element = entry.target
        observer.unobserve(element)
        element.classList.add('is-revealed')
        const delay = parseInt(element.style.getPropertyValue('--reveal-delay'), 10) || 0
        // Hand transitions back to the element's own hover styles once revealed.
        timers.push(setTimeout(() => {
          element.classList.remove('reveal-item', 'is-revealed')
          element.style.removeProperty('--reveal-delay')
        }, 1000 + delay))
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })

    for (const [element, index] of items) {
      if ([...element.classList].some(name => name.startsWith('animate-'))) continue
      element.classList.add('reveal-item')
      element.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 90}ms`)
      observer.observe(element)
    }

    return () => {
      observer.disconnect()
      timers.forEach(clearTimeout)
      for (const [element] of items) {
        element.classList.remove('reveal-item', 'is-revealed')
        element.style.removeProperty('--reveal-delay')
      }
    }
  }, [])

  return null
}
