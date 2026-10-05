import { useId } from 'react'
import './Logo.css'

// N monogram: solid left stroke, a projector-light beam as the diagonal, translucent right stroke.
export function LogoMark({ className = '' }) {
  const id = useId()
  return (
    <svg className={`logo-mark ${className}`} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-tile`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff3b47" />
          <stop offset="1" stopColor="#a5060f" />
        </linearGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity=".55" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${id}-tile)`} />
      <rect x="16" y="16" width="8.5" height="32" rx="1.5" fill="#fff" />
      <path className="logo-mark__beam" d="M24.5 16 48 48H34L24.5 34z" fill={`url(#${id}-beam)`} />
      <path d="M39.5 16H48v26l-8.5-11.6z" fill="#fff" fillOpacity=".5" />
    </svg>
  )
}

export default function Logo({ size = 'md', tagline = true }) {
  return (
    <span className={`logo logo--${size}`}>
      <LogoMark />
      <span className="logo__word">NAT<em>.</em></span>
      {tagline && <span className="logo__sub">Entertainment</span>}
    </span>
  )
}
