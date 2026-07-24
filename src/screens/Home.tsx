import { ISLANDS, LETTERS } from '../data/content'
import { getProgress } from '../lib/store'
import { Bunny } from '../components/common'
import { Art, BadgeArt, PaletteArt, PawArt, TrainArt } from '../components/art'
import { tts, ttsSeq } from '../lib/speech'

const ISLAND_ICONS: Record<string, (p: { size?: number }) => React.ReactNode> = {
  animals: PawArt,
  colors: PaletteArt,
  food: p => <Art name="cake" {...p} />,
  body: p => <Art name="hand" {...p} />,
}

interface Props {
  onIsland: (id: string) => void
  onAbc: () => void
  onTpr: () => void
  onStickers: () => void
  onParent: () => void
}

export function HomeScreen({ onIsland, onAbc, onTpr, onStickers, onParent }: Props) {
  const progress = getProgress()

  return (
    <div className="screen">
      <div className="screen-title">
        <Bunny />
        Bunny English
      </div>
      <div className="subtitle">和小兔一起玩英语吧！</div>
      <div className="map-row">
        {ISLANDS.map(island => {
          const done = island.levels.filter(l => progress.completedLevels.includes(l.id)).length
          const Icon = ISLAND_ICONS[island.id]
          return (
            <button
              key={island.id}
              className="island-btn"
              style={{ background: island.color }}
              onClick={() => {
                tts(`${island.nameEn}! Let's go!`)
                onIsland(island.id)
              }}
            >
              <span className="icon">{Icon ? <Icon size={58} /> : island.emoji}</span>
              <span>
                <div className="name">{island.nameEn}</div>
                <div className="desc">{island.name}</div>
              </span>
              <span className="progress-dots">
                ⭐ {done}/{island.levels.length}
              </span>
            </button>
          )
        })}
        <button
          className="island-btn"
          style={{ background: 'var(--butter)' }}
          onClick={() => {
            ttsSeq([['A B C Train! Choo choo!', 'en-US']])
            onAbc()
          }}
        >
          <span className="icon"><TrainArt size={58} /></span>
          <span>
            <div className="name">ABC Train</div>
            <div className="desc">字母火车 · 描一描写一写</div>
          </span>
          <span className="progress-dots">
            🔤 {progress.completedLetters.length}/{LETTERS.length}
          </span>
        </button>
        <button
          className="island-btn"
          style={{ background: 'var(--mint)' }}
          onClick={() => {
            tts('Magic words! Let us play!')
            onTpr()
          }}
        >
          <span className="icon"><Bunny size={58} /></span>
          <span>
            <div className="name">Magic Words</div>
            <div className="desc">魔法口令 · 你说小兔做</div>
          </span>
          <span className="progress-dots">🎤</span>
        </button>
        <button
          className="island-btn"
          style={{ background: 'var(--lilac)' }}
          onClick={onStickers}
        >
          <span className="icon"><BadgeArt size={58} /></span>
          <span>
            <div className="name">My Stickers</div>
            <div className="desc">贴纸博物馆 · 看看我收集的贴纸</div>
          </span>
          <span className="progress-dots">{progress.stickers.length} 张</span>
        </button>
      </div>
      <button
        className="chip"
        style={{ marginTop: 'auto', opacity: 0.75 }}
        onClick={onParent}
      >
        👨‍👩‍👧 家长中心
      </button>
    </div>
  )
}
