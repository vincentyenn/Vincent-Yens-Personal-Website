import { useEffect, useRef } from 'react'

type VantaEffect = { destroy: () => void }
type VantaFactory = (options: Record<string, unknown>) => VantaEffect

async function importCompatibleBirds() {
  const innerWidthDescriptor = Object.getOwnPropertyDescriptor(window, 'innerWidth')

  try {
    // Vanta 0.5's GPU flock is incompatible with current Three.js. Loading the
    // module through its mobile path selects the dependable CPU flock instead.
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 599 })
    return await import('vanta/dist/vanta.birds.min')
  } finally {
    if (innerWidthDescriptor) {
      Object.defineProperty(window, 'innerWidth', innerWidthDescriptor)
    } else {
      Reflect.deleteProperty(window, 'innerWidth')
    }
  }
}

export function AboutVisual() {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!element || reducedMotion) return

    let effect: VantaEffect | undefined
    let cancelled = false

    Promise.all([import('three'), importCompatibleBirds()])
      .then(([THREE, birdsModule]) => {
        if (cancelled) return

        if (!Object.getOwnPropertyDescriptor(THREE.BufferAttribute.prototype, 'length')) {
          Object.defineProperty(THREE.BufferAttribute.prototype, 'length', {
            configurable: true,
            get: function (this: { array: ArrayLike<number> }) { return this.array.length },
          })
        }

        // Bridge the two Three.js names Vanta 0.5 still expects.
        const compatibleThree = {
          ...THREE,
          PlaneBufferGeometry: THREE.PlaneGeometry,
          VertexColors: true,
        }

        const moduleDefault = (birdsModule as unknown as { default: unknown }).default
        const BIRDS = (
          typeof moduleDefault === 'function'
            ? moduleDefault
            : (moduleDefault as { default?: unknown })?.default
        ) as VantaFactory | undefined

        if (typeof BIRDS !== 'function') throw new TypeError('Vanta Birds factory is unavailable')

        effect = BIRDS({
          el: element,
          THREE: compatibleThree,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 300,
          minWidth: 300,
          scale: 1,
          scaleMobile: 1,
          backgroundColor: 0x0c1411,
          backgroundAlpha: 0,
          color1: 0x1ed760,
          color2: 0x6c7dff,
          colorMode: 'lerpGradient',
          birdSize: 1.45,
          wingSpan: 30,
          speedLimit: 2.8,
          separation: 30,
          alignment: 30,
          cohesion: 44,
          quantity: 5,
        }) as VantaEffect
      })
      .catch((error: unknown) => {
        console.warn('Vanta Birds could not start; using the static About background.', error)
        element.dataset.visualFallback = 'true'
      })

    return () => {
      cancelled = true
      effect?.destroy()
    }
  }, [])

  return <div ref={elementRef} className="about-page__visual" aria-hidden="true" />
}
