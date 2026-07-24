import { useEffect, useState } from 'react'
import { LETTERS, Letter, PRAISES, PRAISES_ZH, randomOf } from '../data/content'
import { stopTts, tts, ttsSeq } from '../lib/speech'
import { getProgress } from '../lib/store'
import { BackButton, Bunny, Confetti } from '../components/common'
import { Art } from '../components/art'

// 首字母配对：把字母和以它开头的单词连起来（学完 6 个字母解锁）

const ROUNDS = 5

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function LetterMatchScreen({ onExit }: { onExit: () => void }) {
  const [pool] = useState<Letter[]>(() => {
    const learned = getProgress().completedLetters
    const ls = LETTERS.filter(l => learned.includes(l.char))
    return ls.length >= 3 ? ls : LETTERS.slice(0, 6)
  })
  const [round, setRound] = useState(0)
  const [target, setTarget] = useState<Letter>(() => randomOf(pool))
  const [options, setOptions] = useState<Letter[]>([])
  const [flash, setFlash] = useState<{ char: string; kind: 'correct' | 'wrong' } | null>(null)
  const [confetti, setConfetti] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => () => stopTts(), [])

  useEffect(() => {
    const others = shuffle(pool.filter(l => l.char !== target.char)).slice(0, 2)
    setOptions(shuffle([target, ...others]))
    ttsSeq([
      [`${target.char}! ${target.sound}!`, 'en-US'],
      [`Which one starts with ${target.char}?`, 'en-US'],
    ])
  }, [target, pool])

  const pick = async (l: Letter) => {
    if (flash || finished) return
    if (l.char === target.char) {
      setFlash({ char: l.char, kind: 'correct' })
      setConfetti(c => c + 1)
      await ttsSeq([
        [`Yes! ${target.char} is for ${target.word.en}!`, 'en-US'],
        [randomOf(PRAISES), 'en-US'],
      ])
      setFlash(null)
      if (round + 1 < ROUNDS) {
        setRound(round + 1)
        setTarget(randomOf(pool))
      } else {
        setFinished(true)
        setConfetti(c => c + 1)
        ttsSeq([
          ['You are a letter master!', 'en-US'],
          [randomOf(PRAISES_ZH), 'zh-CN'],
        ])
      }
    } else {
      setFlash({ char: l.char, kind: 'wrong' })
      await tts(`Hmm~ that is ${l.word.en}! Find ${target.char}!`)
      setFlash(null)
    }
  }

  if (finished) {
    return (
      <div className="screen" style={{ background: 'var(--butter)' }}>
        <BackButton onClick={onExit} />
        <Confetti trigger={confetti} />
        <div className="center-stage">
          <Bunny talking />
          <div className="speech-bubble">Letter Master! 🎉 配对小达人！</div>
          <button className="big-btn primary" onClick={onExit}>
            回到字母火车 🚂
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen" style={{ background: 'var(--butter)' }}>
      <BackButton onClick={onExit} />
      <Confetti trigger={confetti} />
      <div className="screen-title">Letter Match</div>
      <div className="subtitle">首字母配对 · 哪个是 {target.char} 开头？</div>
      <div className="center-stage" style={{ gap: 14 }}>
        <div className="stars-row">
          {Array.from({ length: ROUNDS }, (_, i) => (
            <span key={i}>{i < round ? '⭐' : '☆'}</span>
          ))}
        </div>
        <div className="match-letter">{target.char}</div>
        <div className="card-grid" style={{ maxWidth: 560 }}>
          {options.map(l => (
            <button
              key={l.char}
              className={`word-card${flash?.char === l.char ? ` ${flash.kind}` : ''}`}
              onClick={() => pick(l)}
            >
              <Art name={l.word.art ?? l.word.en} fallback={l.word.emoji} size={84} />
              <span className="en" style={{ fontSize: 20 }}>{l.word.en}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
