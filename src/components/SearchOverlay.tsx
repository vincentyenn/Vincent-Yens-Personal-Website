import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, MagnifyingGlass, X } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { searchItems } from '../data/content'

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const overlayRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return searchItems.slice(0, 8)
    return searchItems
      .filter((item) => `${item.title} ${item.subtitle} ${item.type}`.toLowerCase().includes(normalized))
      .slice(0, 10)
  }, [query])

  useEffect(() => {
    if (!open) return
    setQuery('')
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => inputRef.current?.focus())
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, open])

  useLayoutEffect(() => {
    if (!open || !overlayRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.search-dialog', { opacity: 0, y: -18, scale: 0.985 }, { opacity: 1, y: 0, scale: 1, duration: 0.34, ease: 'power3.out' })
      gsap.fromTo('.search-result', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.26, stagger: 0.035, delay: 0.08, ease: 'power2.out' })
    }, overlayRef)
    return () => ctx.revert()
  }, [open, query])

  if (!open) return null

  return (
    <div ref={overlayRef} className="search-overlay" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="search-dialog" role="dialog" aria-modal="true" aria-labelledby="search-title">
        <div className="search-dialog__topline">
          <h2 id="search-title">Search the portfolio</h2>
          <button type="button" onClick={onClose} aria-label="Close search"><X size={22} /></button>
        </div>
        <label className="search-field">
          <MagnifyingGlass size={23} />
          <span className="sr-only">Search pages, projects, tracks, and skills</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Projects, tracks, or skills"
          />
          <kbd>ESC</kbd>
        </label>
        <div className="search-results" aria-live="polite">
          {results.length > 0 ? results.map((item) => (
            <Link className="search-result" key={item.id} to={item.href} onClick={onClose}>
              <span className="search-result__type">{item.type}</span>
              <span><strong>{item.title}</strong><small>{item.subtitle}</small></span>
              <ArrowRight size={18} />
            </Link>
          )) : (
            <div className="search-empty">
              <strong>No matches yet</strong>
              <span>Try a project name, tool, or page.</span>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
