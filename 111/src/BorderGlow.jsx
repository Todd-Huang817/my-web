import { useCallback, useRef } from 'react'
import './BorderGlow.css'

const gradients = (colors) => ({
  '--g1': `radial-gradient(at 80% 55%,${colors[0]} 0,transparent 52%)`,
  '--g2': `radial-gradient(at 12% 15%,${colors[1]} 0,transparent 50%)`,
  '--g3': `radial-gradient(at 55% 90%,${colors[2]} 0,transparent 52%)`,
})

export default function BorderGlow({ children, className = '', borderRadius = 999, glowRadius = 24, colors = ['#19c9e5', '#ff7048', '#8b78d2'] }) {
  const ref = useRef(null)
  const move = useCallback((event) => {
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const proximity = Math.min(1, Math.max(Math.abs(x - cx) / cx, Math.abs(y - cy) / cy))
    const angle = Math.atan2(y - cy, x - cx) * 180 / Math.PI + 90
    el.style.setProperty('--edge', proximity)
    el.style.setProperty('--angle', `${angle}deg`)
  }, [])
  return <div ref={ref} onPointerMove={move} onPointerLeave={() => ref.current?.style.setProperty('--edge', 0)} className={`border-glow-card ${className}`} style={{ '--radius': `${borderRadius}px`, '--glow': `${glowRadius}px`, ...gradients(colors) }}>
    <span className="edge-light" />
    <div className="border-glow-inner">{children}</div>
  </div>
}
