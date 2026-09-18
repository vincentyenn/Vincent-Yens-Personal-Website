import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type PropsWithChildren,
  type RefObject,
} from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocation } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

type SmoothScrollContextValue = {
  scrollTo: (target: string | HTMLElement) => void
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => undefined,
})

type SmoothScrollProviderProps = PropsWithChildren<{
  wrapperRef: RefObject<HTMLDivElement | null>
  contentRef: RefObject<HTMLDivElement | null>
  progressRef: RefObject<HTMLDivElement | null>
  currentTimeRef: RefObject<HTMLSpanElement | null>
  totalTimeRef: RefObject<HTMLSpanElement | null>
  timelineRef: RefObject<HTMLDivElement | null>
}>

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainder = Math.floor(seconds % 60)
  return `${minutes}:${remainder.toString().padStart(2, '0')}`
}

export function SmoothScrollProvider({
  children,
  wrapperRef,
  contentRef,
  progressRef,
  currentTimeRef,
  totalTimeRef,
  timelineRef,
}: SmoothScrollProviderProps) {
  const location = useLocation()
  const lenisRef = useRef<Lenis | null>(null)
  const totalSecondsRef = useRef(222)

  const updateTimeline = useCallback((progress: number) => {
    const normalized = Math.min(1, Math.max(0, progress))
    const elapsed = Math.round(totalSecondsRef.current * normalized)
    if (currentTimeRef.current) currentTimeRef.current.textContent = formatTime(elapsed)
    if (totalTimeRef.current) totalTimeRef.current.textContent = formatTime(totalSecondsRef.current)
    if (timelineRef.current) {
      timelineRef.current.setAttribute('aria-label', `Page exploration progress: ${Math.round(normalized * 100)} percent`)
    }
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: normalized,
        duration: 0.18,
        ease: 'power2.out',
        overwrite: true,
      })
    }
  }, [currentTimeRef, progressRef, timelineRef, totalTimeRef])

  useEffect(() => {
    const wrapper = wrapperRef.current
    const content = contentRef.current
    if (!wrapper || !content) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({
      wrapper,
      content,
      smoothWheel: !reduceMotion,
      lerp: reduceMotion ? 1 : 0.075,
      anchors: false,
    })
    lenisRef.current = lenis

    const recalculateDuration = () => {
      totalSecondsRef.current = Math.min(480, Math.max(120, Math.round(content.scrollHeight / 8)))
      updateTimeline(lenis.progress)
      lenis.resize()
      ScrollTrigger.refresh()
    }

    lenis.on('scroll', ({ progress }: { progress: number }) => {
      updateTimeline(progress)
      ScrollTrigger.update()
    })

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const resizeObserver = new ResizeObserver(recalculateDuration)
    resizeObserver.observe(content)
    recalculateDuration()

    return () => {
      resizeObserver.disconnect()
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [contentRef, updateTimeline, wrapperRef])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const target = location.hash ? document.querySelector<HTMLElement>(location.hash) : null
    requestAnimationFrame(() => {
      lenis.scrollTo(target ?? 0, { immediate: reduceMotion, offset: target ? -24 : 0 })
      lenis.resize()
    })
  }, [location.hash, location.pathname])

  const scrollTo = useCallback((target: string | HTMLElement) => {
    const destination = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
    if (!destination) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    lenisRef.current?.scrollTo(destination, { immediate: reduceMotion, offset: -24 })
  }, [])

  const value = useMemo(() => ({ scrollTo }), [scrollTo])
  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>
}

export const useSmoothScroll = () => useContext(SmoothScrollContext)
