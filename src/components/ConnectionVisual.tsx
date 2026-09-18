import { useEffect, useRef } from 'react'

type VantaEffect = { destroy: () => void }

export function ConnectionVisual() {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!element || reducedMotion) return

    let effect: VantaEffect | undefined
    let cancelled = false

    Promise.all([import('three'), import('vanta/dist/vanta.net.min')])
      .then(([THREE, { default: NET }]) => {
        if (cancelled) return
        effect = NET({
          el: element,
          THREE,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          minHeight: 240,
          minWidth: 240,
          scale: 1,
          scaleMobile: 1,
          color: 0x49b878,
          backgroundColor: 0x111111,
          points: 7,
          maxDistance: 18,
          spacing: 20,
          showDots: true,
        }) as VantaEffect
      })
      .catch(() => {
        element.dataset.visualFallback = 'true'
      })

    return () => {
      cancelled = true
      effect?.destroy()
    }
  }, [])

  return (
    <section className="connection-panel" aria-label="The Connection visual">
      <div ref={elementRef} className="connection-canvas" aria-hidden="true" />
      <div className="connection-panel__content">
        <p className="meta-label">Now exploring</p>
        <h2>The Connection</h2>
        <p>Ideas, projects, and the choices that connect them.</p>
      </div>
    </section>
  )
}
