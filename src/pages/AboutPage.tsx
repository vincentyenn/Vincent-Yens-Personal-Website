import { useLayoutEffect, useRef } from 'react'
import {
  Code,
  Headphones,
  Play,
  ShieldCheck,
  VideoCamera,
} from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { AboutVisual } from '../components/AboutVisual'
import { CoverArt } from '../components/CoverArt'
import { SpotlightCard } from '../components/SpotlightCard'
import { aboutProfile, projects } from '../data/content'

const activityIcons = {
  code: Code,
  camera: VideoCamera,
  music: Headphones,
  security: ShieldCheck,
}

export function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-about-reveal]',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: 'power3.out' },
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="about-page">
      <div className="about-page__content">
        <header className="about-profile-header">
          <AboutVisual />
          <div className="about-page__scrim" aria-hidden="true" />
          <div data-about-reveal className="about-profile-header__portrait" aria-hidden="true">VY</div>
          <div className="about-profile-header__copy">
            <p data-about-reveal>Profile</p>
            <h1 data-about-reveal>Vincent Yen</h1>
            <div data-about-reveal className="about-profile-header__meta">
              <span>{projects.length} public playlists</span>
              <span>Computer Science</span>
              <span>Cybersecurity minor</span>
            </div>
          </div>
        </header>

        <div className="about-profile-actions">
          <Link to="/about#recent" className="about-profile-actions__play" aria-label="Jump to recent updates">
            <Play size={25} weight="fill" />
          </Link>
        </div>

        <section data-about-reveal className="about-intro" aria-labelledby="about-intro-title">
          <h2 id="about-intro-title">About</h2>
          <p>{aboutProfile.introduction}</p>
        </section>

        <section className="about-section" aria-labelledby="activities-title">
          <div className="about-section__heading">
            <div>
              <h2 id="activities-title">Favorite activities</h2>
              <p>Hobbies and extracurriculars that shape how I create.</p>
            </div>
          </div>
          <div className="activity-grid">
            {aboutProfile.activities.map((activity, index) => {
              const Icon = activityIcons[activity.icon]
              return (
                <article data-about-reveal className="activity-card" key={activity.title}>
                  <div className={`activity-card__art activity-card__art--${index + 1}`} aria-hidden="true">
                    <Icon size={54} weight="duotone" />
                  </div>
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section id="recent" className="about-section about-recent" aria-labelledby="recent-title">
          <div className="about-section__heading">
            <div>
              <h2 id="recent-title">What I've been up to recently</h2>
              <p>Current work, learning, hobbies, and extracurriculars.</p>
            </div>
          </div>
          <ol className="about-recent__list">
            {aboutProfile.recent.map((item, index) => {
              const Icon = activityIcons[item.icon]
              return (
                <li data-about-reveal key={item.title}>
                  <span className="about-recent__rank">{index + 1}</span>
                  <span className={`about-recent__art about-recent__art--${index + 1}`} aria-hidden="true">
                    <Icon size={26} weight="duotone" />
                  </span>
                  <span className="about-recent__copy">
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                  <span className="about-recent__category">{item.category}</span>
                  <span className="about-recent__status">{item.status}</span>
                </li>
              )
            })}
          </ol>
        </section>

        <section id="about-projects" className="about-section about-projects" aria-labelledby="about-projects-title">
          <div className="about-section__heading about-section__heading--with-link">
            <div>
              <h2 id="about-projects-title">Public playlists</h2>
              <p>Projects presented as playlists, with each case study organized into tracks.</p>
            </div>
            <Link to="/projects">Show all</Link>
          </div>
          <div className="about-projects__grid">
            {projects.map((project) => (
              <Link data-about-reveal key={project.slug} to={`/projects/${project.slug}`}>
                <SpotlightCard className="about-project-card">
                  <CoverArt position={project.coverPosition} />
                  <strong>{project.title}</strong>
                  <span>By Vincent</span>
                </SpotlightCard>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
