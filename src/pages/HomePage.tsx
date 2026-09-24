import { useLayoutEffect, useRef } from 'react'
import { ArrowRight, Briefcase, GraduationCap, MusicNotes, Play, VideoCamera } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { CoverArt } from '../components/CoverArt'
import { HeroVisual } from '../components/HeroVisual'
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
        <HeroVisual />
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__content">
          <p data-hero-reveal className="meta-label">Vincent Yen</p>
          <h1 data-hero-reveal id="home-heading"><span>Hi, I'm Vincent.</span><span>Welcome to my website.</span></h1>
          <p data-hero-reveal>I turn ideas into clear, considered interfaces that invite people to explore.</p>
          <div data-hero-reveal className="hero__actions">
            <Link className="primary-action" to="/projects">
              <Play size={19} weight="fill" />
              Explore projects
            </Link>
          </div>
        </div>
      </section>

      <section className="home-snapshot" aria-labelledby="snapshot-title">
        <div className="home-snapshot__heading">
          <h2 id="snapshot-title">A little about me</h2>
        </div>
        <div className="home-snapshot__grid">
          <article className="snapshot-card snapshot-card--identity">
            <GraduationCap className="snapshot-card__icon" size={30} weight="regular" aria-hidden="true" />
            <div>
              <h3>Computer science at Texas A&amp;M</h3>
              <p>I like building useful software and making the details feel considered.</p>
            </div>
          </article>

          <article className="snapshot-card snapshot-card--work">
            <div className="snapshot-card__title">
              <Briefcase size={21} weight="regular" aria-hidden="true" />
              <h3>Work and research</h3>
            </div>
            <div className="snapshot-card__entries">
              <p><strong>USAA</strong><span>Software engineering intern</span></p>
              <p><strong>UT Dallas</strong><span>Research intern, machine learning</span></p>
            </div>
          </article>

          <article className="snapshot-card snapshot-card--creative">
            <div className="snapshot-card__title">
              <VideoCamera size={21} weight="regular" aria-hidden="true" />
              <MusicNotes size={21} weight="regular" aria-hidden="true" />
              <h3>Outside the screen</h3>
            </div>
            <p>Aggie football videography, photography, and finding new music.</p>
          </article>
        </div>
      </section>

      <section id="featured" className="featured-project" aria-labelledby="featured-title">
        <CoverArt position="left" className="featured-project__art" />
        <div className="featured-project__copy">
          <p className="meta-label">Featured project</p>
          <h2 id="featured-title">{projects[0].title}</h2>
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
