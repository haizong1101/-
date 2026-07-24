import { getProgress } from '../lib/store'
import { BackButton } from '../components/common'
import { Art, hasArt } from '../components/art'

const TOTAL_SLOTS = 28

export function StickersScreen({ onBack }: { onBack: () => void }) {
  const { stickers } = getProgress()
  const empties = Math.max(0, TOTAL_SLOTS - stickers.length)

  return (
    <div className="screen" style={{ background: 'var(--lilac)' }}>
      <BackButton onClick={onBack} />
      <div className="screen-title">🏅 贴纸博物馆</div>
      <div className="subtitle">已收集 {stickers.length} 张贴纸</div>
      <div className="sticker-grid">
        {stickers.map(s => (
          <div key={s} className="sticker-cell">
            {s.startsWith('🔤') ? (
              <span style={{ fontWeight: 800, fontSize: 40 }}>{s.slice(2)}</span>
            ) : hasArt(s) ? (
              <Art name={s} size={64} />
            ) : (
              s
            )}
          </div>
        ))}
        {Array.from({ length: empties }, (_, i) => (
          <div key={`e${i}`} className="sticker-cell empty" />
        ))}
      </div>
    </div>
  )
}
