import { Play } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { CoverArt } from '../components/CoverArt'
import { SpotlightCard } from '../components/SpotlightCard'
import { projects } from '../data/content'

export function ProjectsPage() {
  return (
    <div className="projects-page">
      <header className="projects-page__header">
        <div>
          <h1>Projects</h1>
          <p>Each project is a playlist. Open one to explore the work behind it.</p>
        </div>
        <span>{projects.length} playlists</span>
      </header>

      <section aria-labelledby="projects-heading">
        <h2 className="sr-only" id="projects-heading">Project playlists</h2>
        <div className="project-playlist-grid">
          {projects.map((project) => (
            <Link
              className="project-playlist-link"
              key={project.slug}
              to={`/projects/${project.slug}`}
              aria-label={`Open ${project.title}, ${project.category} project playlist`}
            >
              <SpotlightCard className="project-playlist-card">
                <CoverArt position={project.coverPosition} />
                <span className="project-playlist-card__copy">
                  <strong>{project.title}</strong>
                  <span>By Vincent</span>
                </span>
                <span className="project-playlist-card__play" aria-hidden="true"><Play size={20} weight="fill" /></span>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
