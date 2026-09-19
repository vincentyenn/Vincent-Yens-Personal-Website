import { useEffect, useRef } from 'react'

type VantaEffect = { destroy: () => void }
type VantaFactory = (options: Record<string, unknown>) => VantaEffect

export function HeroVisual() {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!element || reducedMotion) return

    let effect: VantaEffect | undefined
    let cancelled = false

    Promise.all([import('three'), import('vanta/dist/vanta.globe.min')])
      .then(([THREE, globeModule]) => {
        if (cancelled) return

        const moduleDefault = (globeModule as unknown as { default: unknown }).default
        const GLOBE = (
          typeof moduleDefault === 'function'
            ? moduleDefault
            : (moduleDefault as { default?: unknown })?.default
        ) as VantaFactory | undefined

        if (typeof GLOBE !== 'function') throw new TypeError('Vanta Globe factory is unavailable')

        effect = GLOBE({
          el: element,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 300,
          minWidth: 300,
          scale: 1,
          scaleMobile: 1,
          color: 0x62d990,
          color2: 0x184a31,
          size: 1.15,
          backgroundColor: 0x111513,
        }) as VantaEffect
      })
      .catch((error: unknown) => {
        console.warn('Vanta Globe could not start; using the static hero background.', error)
        element.dataset.visualFallback = 'true'
      })

    return () => {
      cancelled = true
      effect?.destroy()
    }
  }, [])

  return <div ref={elementRef} className="hero__visual" aria-hidden="true" />
}
