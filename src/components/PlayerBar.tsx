import {
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from '@phosphor-icons/react'
import type { RefObject } from 'react'

const IconLink = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a className="icon-action" href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
    {children}
  </a>
)

type PlayerBarProps = {
  progressRef: RefObject<HTMLDivElement | null>
  currentTimeRef: RefObject<HTMLSpanElement | null>
  totalTimeRef: RefObject<HTMLSpanElement | null>
  timelineRef: RefObject<HTMLDivElement | null>
}

export function PlayerBar({ progressRef, currentTimeRef, totalTimeRef, timelineRef }: PlayerBarProps) {
  return (
    <footer className="player" aria-label="Page exploration controls">
      <div className="player__identity">
        <div className="player__cover" aria-hidden="true" />
        <div>
          <strong>The Connection</strong>
          <span>Vincent Yen</span>
        </div>
      </div>

      <div className="player__center">
        <div className="player__controls" aria-hidden="true">
          <Shuffle size={18} />
          <SkipBack size={20} weight="fill" />
          <button type="button" className="player__play" aria-label="Playful visual control">
            <Play size={20} weight="fill" />
          </button>
          <SkipForward size={20} weight="fill" />
          <Repeat size={18} />
        </div>
        <div ref={timelineRef} className="player__timeline" aria-label="Page exploration progress: 0 percent">
          <span ref={currentTimeRef}>0:00</span>
          <div className="progress-track"><div ref={progressRef} className="progress-fill" /></div>
          <span ref={totalTimeRef}>3:42</span>
        </div>
      </div>

      <div className="player__socials">
        <IconLink href="https://github.com/vincentyenn" label="Open Vincent's GitHub"><GithubLogo size={21} /></IconLink>
        <button className="icon-action icon-action--pending" type="button" aria-label="LinkedIn link coming soon" title="LinkedIn link coming soon" disabled><LinkedinLogo size={21} /></button>
        <button className="icon-action icon-action--pending" type="button" aria-label="Email link coming soon" title="Email link coming soon" disabled><EnvelopeSimple size={22} /></button>
      </div>
    </footer>
  )
}
