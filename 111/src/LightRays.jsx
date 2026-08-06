import { useEffect, useRef } from 'react'
import { Mesh, Program, Renderer, Triangle } from 'ogl'
import './LightRays.css'

const rgb = (hex) => {
  const value = hex.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255)
}

export default function LightRays({
  raysOrigin = 'top-center', raysColor = '#19c9e5', raysSpeed = 1.1,
  lightSpread = 0.75, rayLength = 1.4, followMouse = true,
  mouseInfluence = 0.12, noiseAmount = 0.08, distortion = 0.06,
}) {
  const ref = useRef(null)
  useEffect(() => {
    const host = ref.current
    if (!host) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const renderer = new Renderer({ alpha: true, dpr: Math.min(devicePixelRatio, 2) })
    const gl = renderer.gl
    gl.canvas.className = 'light-rays-canvas'
    host.appendChild(gl.canvas)
    const vertex = `attribute vec2 position; varying vec2 uv; void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}`
    const fragment = `precision highp float; uniform float time; uniform vec2 resolution; uniform vec2 mouse; uniform vec3 color; varying vec2 uv;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      void main(){vec2 p=uv; p.y=1.-p.y; vec2 origin=vec2(.5,-.14); vec2 d=p-origin; float angle=atan(d.x,d.y); float dist=length(d); float aim=(mouse.x-.5)*.18; float spread=pow(max(cos(angle-aim),0.),1.0/${Math.max(lightSpread, .1)}); float wave=.74+.26*sin(angle*17.+time*${raysSpeed.toFixed(2)}+dist*8.); float noise=1.-${noiseAmount.toFixed(2)}+${noiseAmount.toFixed(2)}*hash(floor(p*35.+time)); float fall=1.-smoothstep(.1,${rayLength.toFixed(2)},dist); float rays=spread*wave*fall*noise; rays*=1.-smoothstep(.45,1.,p.y); float edge=1.-smoothstep(.25,.9,abs(p.x-.5)); vec3 c=color*rays*edge; gl_FragColor=vec4(c,rays*.8);}`
    const uniforms = { time: { value: 0 }, resolution: { value: [1, 1] }, mouse: { value: [.5, .5] }, color: { value: rgb(raysColor) } }
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program: new Program(gl, { vertex, fragment, uniforms }) })
    const resize = () => { renderer.setSize(host.clientWidth, host.clientHeight); uniforms.resolution.value = [gl.canvas.width, gl.canvas.height] }
    const mouse = (e) => { if (!followMouse) return; const r = host.getBoundingClientRect(); uniforms.mouse.value = [(e.clientX-r.left)/r.width, (e.clientY-r.top)/r.height] }
    let frame = null
    let inViewport = true
    const loop = (t) => {
      if (!inViewport || document.hidden) { frame = null; return }
      uniforms.time.value = t * .001
      renderer.render({ scene: mesh })
      frame = requestAnimationFrame(loop)
    }
    const start = () => { if (frame === null && inViewport && !document.hidden) frame = requestAnimationFrame(loop) }
    const stop = () => { if (frame !== null) cancelAnimationFrame(frame); frame = null }
    const visibility = () => document.hidden ? stop() : start()
    const intersection = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting
      if (inViewport) start(); else stop()
    }, { threshold: 0.02 })
    const ro = new ResizeObserver(resize)
    ro.observe(host)
    intersection.observe(host)
    resize()
    start()
    host.addEventListener('pointermove', mouse, { passive: true })
    document.addEventListener('visibilitychange', visibility)
    return () => {
      stop()
      ro.disconnect()
      intersection.disconnect()
      host.removeEventListener('pointermove', mouse)
      document.removeEventListener('visibilitychange', visibility)
      gl.canvas.remove()
    }
  }, [followMouse, raysColor, raysSpeed, lightSpread, rayLength, noiseAmount])
  return <div ref={ref} className="light-rays-container" aria-hidden="true" />
}
