import type { Project } from '../data/content'

export function CoverArt({ position, className = '' }: { position: Project['coverPosition']; className?: string }) {
  return (
    <div
      className={`cover-art cover-art--${position} ${className}`}
      role="img"
      aria-label="Abstract black, silver, and green project artwork"
    />
  )
}
