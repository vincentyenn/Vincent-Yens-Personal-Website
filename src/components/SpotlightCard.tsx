import { useRef, type MouseEventHandler, type PropsWithChildren } from 'react'
import './SpotlightCard.css'

type SpotlightCardProps = PropsWithChildren<{
  className?: string
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`
}>

// Adapted from React Bits SpotlightCard: https://reactbits.dev/components/spotlight-card
export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(73, 184, 120, 0.18)',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`)
    card.style.setProperty('--spotlight-color', spotlightColor)
  }

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} className={`card-spotlight ${className}`}>
      {children}
    </div>
  )
}
