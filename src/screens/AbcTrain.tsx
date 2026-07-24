import { LETTERS } from '../data/content'
import { getProgress } from '../lib/store'
import { BackButton } from '../components/common'

interface Props {
  onLetter: (index: number) => void
  onBack: () => void
}

export function AbcTrainScreen({ onLetter, onBack }: Props) {
  const progress = getProgress()

  return (
    <div className="screen" style={{ background: 'var(--butter)' }}>
      <BackButton onClick={onBack} />
      <div className="screen-title">🚂 字母火车</div>
      <div className="subtitle">ABC Train · 每节车厢一个字母朋友</div>
      <div className="card-grid">
        {LETTERS.map((letter, i) => {
          const done = progress.completedLetters.includes(letter.char)
          return (
            <button key={letter.char} className="word-card" onClick={() => onLetter(i)}>
              <span style={{ fontSize: 54, fontWeight: 800 }}>{letter.char}</span>
              <span className="emoji" style={{ fontSize: 40 }}>
                {letter.word.emoji}
              </span>
              <span className="zh">{done ? '⭐ 学会啦' : letter.word.en}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
