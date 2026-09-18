import { DotsThree, Play, Shuffle, Timer } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { CoverArt } from '../components/CoverArt'
import { projects } from '../data/content'

export function ProjectsPage() {
  return (
    <div className="projects-page">
      <header className="playlist-header">
        <div className="playlist-header__mosaic" aria-hidden="true">
          {projects.map((project) => <CoverArt key={project.slug} position={project.coverPosition} />)}
          <div className="playlist-header__monogram">VY</div>
        </div>
        <div className="playlist-header__copy">
          <span>Portfolio playlist</span>
          <h1>Selected Work</h1>
          <p>Projects, experiments, and technical work organized by the decisions behind them.</p>
          <div className="playlist-header__owner"><strong>Vincent Yen</strong><span>{projects.length} projects</span></div>
        </div>
      </header>

      <section className="project-list" aria-labelledby="projects-heading">
        <div className="playlist-actions">
          <button type="button" className="round-play" aria-label="Play selected work"><Play size={27} weight="fill" /></button>
          <button type="button" aria-label="Shuffle projects"><Shuffle size={30} /></button>
          <button type="button" aria-label="More project options"><DotsThree size={31} weight="bold" /></button>
        </div>
        <h2 className="sr-only" id="projects-heading">Project playlists</h2>
        <div className="project-table__header" aria-hidden="true">
          <span>#</span><span>Title</span><span>Category</span><span>Year</span><Timer size={18} />
        </div>
        <div className="project-table">
          {projects.map((project, index) => (
            <Link className="project-row" key={project.slug} to={`/projects/${project.slug}`}>
              <span className="project-row__index">{index + 1}</span>
              <span className="project-row__title">
                <CoverArt position={project.coverPosition} />
                <span><strong>{project.title}</strong><small>{project.status}</small></span>
              </span>
              <span>{project.category}</span>
              <span>{project.year}</span>
              <span>{project.tracks.length} tracks</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
