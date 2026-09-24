import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  House,
  MagnifyingGlass,
  Stack,
  UserCircle,
} from '@phosphor-icons/react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { CoverArt } from './CoverArt'
import { projects } from '../data/content'
import { PlayerBar } from './PlayerBar'
import { SearchOverlay } from './SearchOverlay'
import { SmoothScrollProvider } from './SmoothScrollProvider'

const navItems = [
  { label: 'Home', to: '/', icon: House },
  { label: 'Projects', to: '/projects', icon: Stack },
  { label: 'Profile', to: '/about', icon: UserCircle },
  { label: 'Experience', to: '/experience', icon: Briefcase },
]

export function AppShell() {
  const [searchOpen, setSearchOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const routeRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const currentTimeRef = useRef<HTMLSpanElement>(null)
  const totalTimeRef = useRef<HTMLSpanElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const navigate = useNavigate()

  const closeSearch = useCallback(() => setSearchOpen(false), [])

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  useLayoutEffect(() => {
    if (!routeRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const animation = gsap.fromTo(routeRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.42, ease: 'power3.out' })
    return () => {
      animation.kill()
    }
  }, [location.pathname])

  return (
    <SmoothScrollProvider
      wrapperRef={wrapperRef}
      contentRef={contentRef}
      progressRef={progressRef}
      currentTimeRef={currentTimeRef}
      totalTimeRef={totalTimeRef}
      timelineRef={timelineRef}
    >
      <div className="app-shell">
        <header className="topbar">
          <div className="topbar__history">
            <button type="button" onClick={() => navigate(-1)} aria-label="Go back"><ArrowLeft size={22} /></button>
            <button type="button" onClick={() => navigate(1)} aria-label="Go forward"><ArrowRight size={22} /></button>
          </div>
          <button className="search-trigger" type="button" aria-label="Search the portfolio" onClick={() => setSearchOpen(true)}>
            <MagnifyingGlass size={22} />
            <span>What do you want to explore?</span>
            <kbd>⌘ K</kbd>
          </button>
          <NavLink className="topbar__profile" to="/about" aria-label="Open Vincent Yen profile"><span>VY</span></NavLink>
        </header>

        <aside className="library" aria-label="Portfolio library">
          <div className="library__header"><h2>Your Library</h2><button type="button" aria-label="Library options">+</button></div>
          <nav className="library__nav" aria-label="Primary navigation">
            {navItems.map(({ label, to, icon: Icon }) => (
              <NavLink key={label} to={to} end={to === '/'}>
                <Icon size={24} weight="fill" /><span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="library__section-title"><span>Library</span><MagnifyingGlass size={17} /></div>
          <div className="library__collections">
            {projects.map((project) => (
              <NavLink key={project.slug} to={`/projects/${project.slug}`}>
                <CoverArt position={project.coverPosition} />
                <span><strong>{project.title}</strong><small>Project playlist</small></span>
              </NavLink>
            ))}
            <NavLink to="/#learning"><CoverArt position="center" /><span><strong>Current Learning</strong><small>Updated regularly</small></span></NavLink>
            <NavLink to="/about"><CoverArt position="right" /><span><strong>About Vincent</strong><small>Profile page</small></span></NavLink>
            <NavLink to="/experience"><span className="library__resume-cover" aria-hidden="true">CV</span><span><strong>Resume &amp; Experience</strong><small>Work and education</small></span></NavLink>
          </div>
        </aside>

        <main className="main-panel" id="main-content">
          <div ref={wrapperRef} className="main-panel__scroll">
            <div ref={contentRef} className="main-panel__scroll-content">
              <div ref={routeRef} className="route-stage" key={location.pathname}><Outlet /></div>
            </div>
          </div>
        </main>

        <PlayerBar
          progressRef={progressRef}
          currentTimeRef={currentTimeRef}
          totalTimeRef={totalTimeRef}
          timelineRef={timelineRef}
        />

        <nav className="mobile-nav" aria-label="Mobile navigation">
          <NavLink to="/" end><House size={24} weight="fill" /><span>Home</span></NavLink>
          <button type="button" onClick={() => setSearchOpen(true)}><MagnifyingGlass size={24} /><span>Search</span></button>
          <NavLink to="/projects"><Stack size={24} weight="fill" /><span>Library</span></NavLink>
        </nav>

        <SearchOverlay open={searchOpen} onClose={closeSearch} />
      </div>
    </SmoothScrollProvider>
  )
}
