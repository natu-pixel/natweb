import { useId } from 'react'

export default function WaveDivider({ to = '#101116', flip = false }) {
  const id = useId()
  return (
    <div className="wave-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 180" preserveAspectRatio="none" focusable="false" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff3b47" stopOpacity=".85" />
            <stop offset="38%" stopColor="#6d0a12" />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <path d="M0 56C330 164 860 -44 1440 60V180H0Z" fill={`url(#${id})`} />
      </svg>
    </div>
  )
}
