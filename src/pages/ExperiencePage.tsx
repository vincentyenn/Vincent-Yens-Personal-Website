import { useLayoutEffect, useRef } from 'react'
import {
  ArrowUpRight,
  Briefcase,
  Compass,
  DownloadSimple,
  GraduationCap,
  LinkedinLogo,
} from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { experienceProfile } from '../data/content'

export function ExperiencePage() {
  const pageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-experience-reveal]',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.58, stagger: 0.055, ease: 'power3.out' },
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="experience-page">
      <header className="experience-hero">
        <div data-experience-reveal className="experience-hero__cover" aria-hidden="true">
          <div className="experience-hero__cover-icon"><Briefcase size={66} weight="duotone" /></div>
          <span>VY</span>
          <strong>EXPERIENCE</strong>
        </div>
        <div className="experience-hero__copy">
          <p data-experience-reveal>Resume</p>
          <h1 data-experience-reveal>Experience</h1>
          <p data-experience-reveal className="experience-hero__intro">
            Software engineer and curious builder who enjoys learning unfamiliar systems and turning new ideas into dependable products.
          </p>
          <div data-experience-reveal className="experience-hero__meta">
            <strong>Vincent Yen</strong>
            <span>{experienceProfile.roles.length} roles</span>
            <span>Texas A&amp;M University</span>
          </div>
        </div>
      </header>

      <div className="experience-actions" aria-label="Resume actions">
        <a className="experience-actions__primary" href={`${import.meta.env.BASE_URL}Vincent-Yen-Resume.pdf`} download>
          <DownloadSimple size={21} weight="bold" />
          Download resume
        </a>
        <a className="experience-actions__secondary" href="https://linkedin.com/in/vincentcyen" target="_blank" rel="noreferrer">
          <LinkedinLogo size={22} weight="fill" />
          LinkedIn
          <ArrowUpRight size={17} />
        </a>
      </div>

      <main className="experience-content">
        <section data-experience-reveal className="experience-intro" aria-labelledby="experience-intro-title">
          <h2 id="experience-intro-title">A little about how I work</h2>
          <p>{experienceProfile.introduction}</p>
        </section>

        <section className="experience-tracklist" aria-labelledby="professional-experience-title">
          <div className="experience-section-heading">
            <h2 id="professional-experience-title">Professional experience</h2>
            <p>Select a role to jump to the full details.</p>
          </div>
          <div className="experience-tracklist__header" aria-hidden="true">
            <span>#</span>
            <span>Title</span>
            <span>Company</span>
            <span>Period</span>
          </div>
          <ol>
            {experienceProfile.roles.map((role, index) => (
              <li data-experience-reveal key={role.id}>
                <Link to={`/experience#${role.id}`}>
                  <span className="experience-tracklist__number">{index + 1}</span>
                  <span className="experience-tracklist__title">
                    <span className="experience-tracklist__art" aria-hidden="true"><Briefcase size={25} weight="duotone" /></span>
                    <span><strong>{role.role}</strong><small>{role.location}</small></span>
                  </span>
                  <span>{role.company}</span>
                  <span>{role.period}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section data-experience-reveal className="experience-highlights" aria-label="Experience highlights">
          {experienceProfile.highlights.map((highlight) => (
            <div key={highlight.label}>
              <strong>{highlight.value}</strong>
              <span>{highlight.label}</span>
            </div>
          ))}
        </section>

        <section className="experience-roles" aria-label="Role details">
          {experienceProfile.roles.map((role, index) => (
            <article id={role.id} data-experience-reveal className="experience-role" key={role.id}>
              <div className="experience-role__side">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div aria-hidden="true">{role.mark}</div>
              </div>
              <div className="experience-role__body">
                <div className="experience-role__heading">
                  <div>
                    <h3>{role.role}</h3>
                    <p>{role.company}</p>
                  </div>
                  <div>
                    <strong>{role.period}</strong>
                    <span>{role.location}</span>
                  </div>
                </div>
                <p className="experience-role__summary">{role.summary}</p>
                <ul>
                  {role.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}
                </ul>
                <div className="experience-role__tools" aria-label={`Tools used at ${role.company}`}>
                  {role.tools.map((tool) => <span key={tool}>{tool}</span>)}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section id="full-resume" data-experience-reveal className="experience-resume" aria-labelledby="full-resume-title">
          <div className="experience-section-heading">
            <h2 id="full-resume-title">Full resume</h2>
            <p>View the complete one-page resume here, or open the PDF for a closer look.</p>
          </div>
          <a className="experience-resume__document" href={`${import.meta.env.BASE_URL}Vincent-Yen-Resume.pdf`} target="_blank" rel="noreferrer" aria-label="Open Vincent Yen's complete resume as a PDF">
            <img src={`${import.meta.env.BASE_URL}resume-cover.png`} alt="Vincent Yen's complete resume" />
          </a>
          <a className="experience-resume__open" href={`${import.meta.env.BASE_URL}Vincent-Yen-Resume.pdf`} target="_blank" rel="noreferrer">
            Open full PDF <ArrowUpRight size={18} />
          </a>
        </section>

        <section data-experience-reveal className="experience-credits" aria-labelledby="education-skills-title">
          <div className="experience-section-heading">
            <h2 id="education-skills-title">Education and skills</h2>
          </div>
          <div className="experience-credits__education">
            <GraduationCap size={32} weight="duotone" aria-hidden="true" />
            <div><strong>{experienceProfile.education.school}</strong><span>{experienceProfile.education.degree}</span></div>
            <div><strong>{experienceProfile.education.period}</strong><span>{experienceProfile.education.detail}</span></div>
          </div>
          <dl className="experience-credits__skills">
            {experienceProfile.skillGroups.map((group) => (
              <div key={group.label}>
                <dt>{group.label}</dt>
                <dd>{group.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section data-experience-reveal className="experience-exploring" aria-labelledby="always-exploring-title">
          <div className="experience-exploring__icon" aria-hidden="true"><Compass size={40} weight="duotone" /></div>
          <div>
            <h2 id="always-exploring-title">Always exploring</h2>
            <p>{experienceProfile.exploring.introduction}</p>
            <div className="experience-exploring__groups">
              <p><strong>Communities</strong><span>{experienceProfile.exploring.communities.join(', ')}</span></p>
              <p><strong>Outside of code</strong><span>{experienceProfile.exploring.interests.join(', ')}</span></p>
            </div>
          </div>
          <Link to="/projects">Explore projects <ArrowUpRight size={18} /></Link>
        </section>
      </main>
    </div>
  )
}
