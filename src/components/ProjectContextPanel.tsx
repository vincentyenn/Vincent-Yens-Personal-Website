import { ArrowUpRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { CoverArt } from './CoverArt'
import { projects } from '../data/content'

export function ProjectContextPanel() {
  const featured = projects[0]
  return (
    <section className="project-context" aria-labelledby="context-title">
      <CoverArt position={featured.coverPosition} className="project-context__art" />
      <div className="project-context__copy">
        <p className="meta-label">Featured playlist</p>
        <h2 id="context-title">{featured.title}</h2>
        <p>{featured.summary}</p>
        <div className="project-context__meta">
          <span>{featured.year}</span>
          <span>{featured.tracks.length} tracks</span>
        </div>
        <Link to={`/projects/${featured.slug}`}>Open project <ArrowUpRight size={18} /></Link>
      </div>
    </section>
  )
}
