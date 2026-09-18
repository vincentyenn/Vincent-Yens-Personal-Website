import { useLayoutEffect, useRef } from 'react'
import { ArrowRight, Play } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { CoverArt } from '../components/CoverArt'
import { SpotlightCard } from '../components/SpotlightCard'
import { projects } from '../data/content'

export function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-reveal]',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out' },
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="home-page">
      <section className="hero" aria-labelledby="home-heading">
        <div className="hero__wash" aria-hidden="true" />
        <div className="hero__content">
          <p data-hero-reveal className="meta-label">Vincent Yen</p>
          <h1 data-hero-reveal id="home-heading">Building digital experiences with rhythm.</h1>
          <p data-hero-reveal>I turn ideas into clear, considered interfaces that invite people to explore.</p>
          <div data-hero-reveal className="hero__actions">
            <Link className="primary-action" to="/projects">
              <Play size={19} weight="fill" />
              Explore projects
            </Link>
          </div>
        </div>
      </section>

      <section id="featured" className="featured-project" aria-labelledby="featured-title">
        <CoverArt position="left" className="featured-project__art" />
        <div className="featured-project__copy">
          <p className="meta-label">Featured project</p>
          <h2 id="featured-title">The Connection</h2>
          <p>{projects[0].summary}</p>
          <Link to="/projects/the-connection">Open project <ArrowRight size={18} /></Link>
        </div>
      </section>

      <section className="home-section" aria-labelledby="playlist-heading">
        <div className="section-heading">
          <div>
            <h2 id="playlist-heading">Made for curious people</h2>
            <p>Projects presented as playlists, with the work broken into tracks.</p>
          </div>
          <Link to="/projects">Show all</Link>
        </div>
        <div className="playlist-grid">
          {projects.map((project) => (
            <Link className="playlist-card-link" key={project.slug} to={`/projects/${project.slug}`}>
              <SpotlightCard className="playlist-card">
                <CoverArt position={project.coverPosition} />
                <strong>{project.title}</strong>
                <span>{project.category}</span>
                <span className="card-play" aria-hidden="true"><Play size={20} weight="fill" /></span>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </section>

      <section id="about-preview" className="profile-preview" aria-labelledby="profile-heading">
        <div className="profile-preview__portrait" aria-hidden="true">VY</div>
        <div>
          <h2 id="profile-heading">About Vincent</h2>
          <p>A computer science student interested in the point where engineering, interaction, and visual systems meet.</p>
          <span>Full profile coming next</span>
        </div>
      </section>

      <section id="learning" className="learning-strip" aria-labelledby="learning-heading">
        <div>
          <h2 id="learning-heading">Currently learning</h2>
          <p>Motion systems, interface architecture, and how small design choices change the way a product feels.</p>
        </div>
        <BriefcaseMark />
      </section>
    </div>
  )
}

function BriefcaseMark() {
  return <div className="learning-strip__mark" aria-hidden="true"><span>VY</span></div>
}
