import { ArrowLeft, ArrowUpRight, DotsThree, Play, Shuffle, Timer } from '@phosphor-icons/react'
import { Link, useParams } from 'react-router-dom'
import { CoverArt } from '../components/CoverArt'
import { projects } from '../data/content'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return (
      <section className="missing-project">
        <span>Project not found</span>
        <h1>This playlist is not in the library.</h1>
        <p>The project may have moved, or the address may be incomplete.</p>
        <Link to="/projects"><ArrowLeft size={18} /> Back to projects</Link>
      </section>
    )
  }

  return (
    <article className="project-detail">
      <header className="project-detail__header">
        <CoverArt position={project.coverPosition} className="project-detail__cover" />
        <div>
          <span>Project playlist</span>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <div className="project-detail__meta"><strong>Vincent Yen</strong><span>{project.year}</span><span>{project.tracks.length} tracks</span></div>
        </div>
      </header>

      <div className="project-detail__body">
        <div className="playlist-actions">
          <button type="button" className="round-play" aria-label={`Play ${project.title}`}><Play size={27} weight="fill" /></button>
          <button type="button" aria-label="Shuffle project tracks"><Shuffle size={30} /></button>
          <button type="button" aria-label="More project options"><DotsThree size={31} weight="bold" /></button>
        </div>

        <nav className="tracklist" aria-label={`${project.title} sections`}>
          <div className="tracklist__header" aria-hidden="true"><span>#</span><span>Title</span><span>Section</span><Timer size={18} /></div>
          {project.tracks.map((track, index) => (
            <Link key={track.id} to={`/projects/${project.slug}#${track.id}`}>
              <span>{index + 1}</span>
              <span><strong>{track.title}</strong><small>{track.description}</small></span>
              <span>{project.title}</span>
              <span>{track.duration}</span>
            </Link>
          ))}
        </nav>

        <div className="case-study">
          {project.tracks.map((track) => (
            <section id={track.id} key={track.id} className="case-study__section" aria-labelledby={`${track.id}-heading`}>
              <span>{track.title}</span>
              <h2 id={`${track.id}-heading`}>{track.description}</h2>
              {track.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {track.id === 'tools' && (
                <ul className="tool-list" aria-label="Tools used">
                  {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
                </ul>
              )}
              {track.id === 'links' && project.repository && (
                <a className="repository-link" href={project.repository} target="_blank" rel="noreferrer">
                  View repository <ArrowUpRight size={18} />
                </a>
              )}
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
