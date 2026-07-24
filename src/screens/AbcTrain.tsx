import { LETTERS } from '../data/content'
import { getProgress } from '../lib/store'
import { BackButton } from '../components/common'
import { Art } from '../components/art'

interface Props {
  onLetter: (index: number) => void
  onMatch: () => void
  onBack: () => void
}

const MATCH_UNLOCK = 6

export function AbcTrainScreen({ onLetter, onMatch, onBack }: Props) {
  const progress = getProgress()
  const learnedCount = progress.completedLetters.length
  const matchReady = learnedCount >= MATCH_UNLOCK

  return (
    <div className="screen" style={{ background: 'var(--butter)' }}>
      <BackButton onClick={onBack} />
      <div className="screen-title">ABC Train</div>
      <div className="subtitle">字母火车 · 每节车厢一个字母朋友</div>
      <button
        className="big-btn"
        style={{ marginBottom: 16, opacity: matchReady ? 1 : 0.55 }}
        onClick={matchReady ? onMatch : undefined}
      >
        🎯 Letter Match 首字母配对
        {!matchReady && (
          <span className="zh" style={{ fontSize: 14 }}>
            （学会 {MATCH_UNLOCK} 个字母解锁，还差 {MATCH_UNLOCK - learnedCount} 个）
          </span>
        )}
      </button>
      <div className="card-grid">
        {LETTERS.map((letter, i) => {
          const done = progress.completedLetters.includes(letter.char)
          return (
            <button key={letter.char} className="word-card" onClick={() => onLetter(i)}>
              <span style={{ fontSize: 54, fontWeight: 800 }}>{letter.char}</span>
              <Art name={letter.word.art ?? letter.word.en} fallback={letter.word.emoji} size={56} />
              <span className="zh">{done ? '⭐ 学会啦' : letter.word.en}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
