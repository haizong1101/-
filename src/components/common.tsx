import { useEffect, useState } from 'react'
import { BunnyArt } from './art'

/** IP 角色小兔 Bunny */
export function Bunny({
  talking = false,
  happy = false,
  size = 96,
}: {
  talking?: boolean
  happy?: boolean
  size?: number
}) {
  return (
    <span className={`bunny${talking ? ' talking' : ''}`} role="img" aria-label="Bunny">
      <BunnyArt size={size} happy={happy} />
    </span>
  )
}

const CONFETTI = ['🎉', '⭐', '🌸', '💛', '✨', '🎈', '💚', '🩷']

/** 全屏撒花庆祝 */
export function Confetti({ trigger }: { trigger: number }) {
  const [pieces, setPieces] = useState<Array<{ id: number; left: number; delay: number; emoji: string }>>([])

  useEffect(() => {
    if (!trigger) return
    const batch = Array.from({ length: 24 }, (_, i) => ({
      id: trigger * 100 + i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      emoji: CONFETTI[Math.floor(Math.random() * CONFETTI.length)],
    }))
    setPieces(batch)
    const t = setTimeout(() => setPieces([]), 2400)
    return () => clearTimeout(t)
  }, [trigger])

  if (!pieces.length) return null
  return (
    <div className="confetti-layer">
      {pieces.map(p => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{ left: `${p.left}%`, animationDelay: `${p.delay}s` }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="big-btn back-btn" onClick={onClick} aria-label="返回">
      🏠
    </button>
  )
}
