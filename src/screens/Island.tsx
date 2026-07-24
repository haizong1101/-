import { Island } from '../data/content'
import { getProgress } from '../lib/store'
import { BackButton } from '../components/common'
import { Art } from '../components/art'

interface Props {
  island: Island
  onLevel: (levelIndex: number) => void
  onBack: () => void
}

export function IslandScreen({ island, onLevel, onBack }: Props) {
  const progress = getProgress()

  return (
    <div className="screen" style={{ background: island.color }}>
      <BackButton onClick={onBack} />
      <div className="screen-title">
        {island.emoji} {island.name}
      </div>
      <div className="subtitle">{island.nameEn}</div>
      <div className="card-grid">
        {island.levels.map((level, i) => {
          const done = progress.completedLevels.includes(level.id)
          return (
            <button key={level.id} className="word-card" onClick={() => onLevel(i)}>
              <span style={{ display: 'flex', gap: 4 }}>
                {level.words.map(w => (
                  <Art key={w.en} name={w.art ?? w.en} fallback={w.emoji} size={62} />
                ))}
              </span>
              <span className="en" style={{ fontSize: 18 }}>
                {level.title}
              </span>
              <span className="zh">{done ? '⭐ 完成啦' : `第 ${i + 1} 关`}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
