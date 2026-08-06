import { useCallback, useEffect, useRef } from 'react'

export default function ClickSpark({
  sparkColor = '#1dbfaf',
  sparkSize = 9,
  sparkRadius = 22,
  sparkCount = 8,
  duration = 480,
  easing = 'ease-out',
  extraScale = 1,
  children,
}) {
  const canvasRef = useRef(null)
  const sparksRef = useRef([])
  const frameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return undefined
    const resize = () => {
      const rect = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(parent)
    resize()
    return () => observer.disconnect()
  }, [])

  const ease = useCallback((t) => {
    if (easing === 'linear') return t
    if (easing === 'ease-in') return t * t
    if (easing === 'ease-in-out') return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    return t * (2 - t)
  }, [easing])

  const draw = useCallback((time) => {
    const canvas = canvasRef.current
    if (!canvas) { frameRef.current = null; return }
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    ctx.clearRect(0, 0, rect.width, rect.height)
    sparksRef.current = sparksRef.current.filter((spark) => {
      const progress = Math.min(1, (time - spark.startTime) / duration)
      if (progress >= 1) return false
      const eased = ease(progress)
      const distance = eased * sparkRadius * extraScale
      const length = sparkSize * (1 - eased)
      const x1 = spark.x + distance * Math.cos(spark.angle)
      const y1 = spark.y + distance * Math.sin(spark.angle)
      const x2 = spark.x + (distance + length) * Math.cos(spark.angle)
      const y2 = spark.y + (distance + length) * Math.sin(spark.angle)
      ctx.strokeStyle = spark.color
      ctx.globalAlpha = 1 - progress
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
      ctx.globalAlpha = 1
      return true
    })
    frameRef.current = sparksRef.current.length ? requestAnimationFrame(draw) : null
  }, [duration, ease, extraScale, sparkRadius, sparkSize])

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
  }, [])

  const handleClick = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = canvasRef.current.getBoundingClientRect()
    const now = performance.now()
    for (let i = 0; i < sparkCount; i += 1) {
      sparksRef.current.push({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        angle: (Math.PI * 2 * i) / sparkCount,
        startTime: now,
        color: i % 3 === 0 ? '#ff7048' : sparkColor,
      })
    }
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(draw)
  }

  return <div className="click-spark-root" onClick={handleClick}>
    <canvas ref={canvasRef} aria-hidden="true" />
    {children}
  </div>
}
