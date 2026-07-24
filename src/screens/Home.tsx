import { ISLANDS, LETTERS } from '../data/content'
import { getProgress } from '../lib/store'
import { Bunny } from '../components/common'
import { BadgeArt, PaletteArt, PawArt, TrainArt } from '../components/art'
import { tts, ttsSeq } from '../lib/speech'

const ISLAND_ICONS: Record<string, (p: { size?: number }) => React.ReactNode> = {
  animals: PawArt,
  colors: PaletteArt,
}

interface Props {
  onIsland: (id: string) => void
  onAbc: () => void
  onStickers: () => void
  onParent: () => void
}

export function HomeScreen({ onIsland, onAbc, onStickers, onParent }: Props) {
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
                <div className="name">{island.name}</div>
                <div className="desc">{island.nameEn}</div>
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
            <div className="name">字母火车</div>
            <div className="desc">ABC Train · 描一描写一写</div>
          </span>
          <span className="progress-dots">
            🔤 {progress.completedLetters.length}/{LETTERS.length}
          </span>
        </button>
        <button
          className="island-btn"
          style={{ background: 'var(--lilac)' }}
          onClick={onStickers}
        >
          <span className="icon"><BadgeArt size={58} /></span>
          <span>
            <div className="name">贴纸博物馆</div>
            <div className="desc">看看我收集的贴纸</div>
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
