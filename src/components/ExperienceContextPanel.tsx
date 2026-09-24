import { ArrowUpRight, Briefcase, FileText } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { experienceProfile } from '../data/content'

export function ExperienceContextPanel() {
  return (
    <section className="experience-context" aria-labelledby="experience-context-title">
      <div className="experience-context__art" aria-hidden="true">
        <Briefcase size={66} weight="duotone" />
        <span>VY</span>
        <strong>EXPERIENCE</strong>
      </div>
      <div className="experience-context__copy">
        <p className="meta-label">Now viewing</p>
        <h2 id="experience-context-title">Experience</h2>
        <p>Software engineering, applied research, education, and the skills Vincent keeps building.</p>
        <dl>
          {experienceProfile.highlights.slice(0, 3).map((highlight) => (
            <div key={highlight.label}><dt>{highlight.value}</dt><dd>{highlight.label}</dd></div>
          ))}
        </dl>
        <Link to="/experience#full-resume">
          <FileText size={18} /> View full resume <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  )
}
