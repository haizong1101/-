import { useEffect, useState } from 'react'
import { LETTERS, Letter, PRAISES, PRAISES_ZH, randomOf } from '../data/content'
import { asrAvailable, listen, stopTts, tts, ttsSeq } from '../lib/speech'
import { addSpoken, completeLetter } from '../lib/store'
import { BackButton, Bunny, Confetti } from '../components/common'
import { Trace } from '../components/Trace'

type Phase = 'intro' | 'phonics' | 'trace' | 'find' | 'say' | 'reward'

const BALLOON_COLORS = ['#ffd9e8', '#d3f2df', '#dbeeff', '#ffeec2', '#e8dcff']

interface Props {
  letter: Letter
  onExit: () => void
}

export function LetterScreen({ letter, onExit }: Props) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [confetti, setConfetti] = useState(0)
  const cheer = () => setConfetti(c => c + 1)

  useEffect(() => () => stopTts(), [])

  return (
    <div className="screen" style={{ background: 'var(--butter)' }}>
      <BackButton onClick={onExit} />
      <Confetti trigger={confetti} />
      {phase === 'intro' && <Intro letter={letter} onDone={() => setPhase('phonics')} />}
      {phase === 'phonics' && <Phonics letter={letter} onDone={() => setPhase('trace')} />}
      {phase === 'trace' && (
        <TracePhase letter={letter} onCheer={cheer} onDone={() => setPhase('find')} />
      )}
      {phase === 'find' && (
        <FindPhase letter={letter} onCheer={cheer} onDone={() => setPhase('say')} />
      )}
      {phase === 'say' && (
        <SayPhase letter={letter} onCheer={cheer} onDone={() => setPhase('reward')} />
      )}
      {phase === 'reward' && <Reward letter={letter} onCheer={cheer} onExit={onExit} />}
    </div>
  )
}

function Intro({ letter, onDone }: { letter: Letter; onDone: () => void }) {
  const speak = () =>
    ttsSeq([
      [`This is ${letter.char}!`, 'en-US'],
      [`${letter.char}! ${letter.char}!`, 'en-US'],
    ])
  useEffect(() => {
    speak()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letter])

  return (
    <div className="center-stage">
      <Bunny />
      <div className="speech-bubble">This is {letter.char}!</div>
      <button className="word-card" style={{ minWidth: 220 }} onClick={speak}>
        <span className="hero-word" style={{ fontFamily: 'inherit', fontWeight: 800 }}>
          {letter.char}
        </span>
        <span className="zh">点我再听一遍</span>
      </button>
      <button className="big-btn primary" onClick={onDone}>
        下一步 ➜
      </button>
    </div>
  )
}

function Phonics({ letter, onDone }: { letter: Letter; onDone: () => void }) {
  const speak = () =>
    ttsSeq([
      [`${letter.char} says ${letter.sound}! ${letter.sound}, ${letter.sound}, ${letter.word.en}!`, 'en-US'],
      [`${letter.word.en}`, 'en-US'],
      [letter.word.zh, 'zh-CN'],
    ])
  useEffect(() => {
    speak()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letter])

  return (
    <div className="center-stage">
      <Bunny />
      <div className="speech-bubble">
        {letter.char} … {letter.word.en}!
      </div>
      <button className="word-card" style={{ minWidth: 240 }} onClick={speak}>
        <span style={{ fontSize: 66, fontWeight: 800 }}>{letter.char}</span>
        <span className="hero-word" style={{ fontSize: 90 }}>
          {letter.word.emoji}
        </span>
        <span className="en">{letter.word.en}</span>
        <span className="zh">{letter.word.zh}（点我再听）</span>
      </button>
      <button className="big-btn primary" onClick={onDone}>
        去描一描 ✏️
      </button>
    </div>
  )
}

function TracePhase({
  letter,
  onCheer,
  onDone,
}: {
  letter: Letter
  onCheer: () => void
  onDone: () => void
}) {
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    ttsSeq([
      ['用手指跟着小星星描一描吧！', 'zh-CN'],
      [`Trace the letter ${letter.char}!`, 'en-US'],
    ])
  }, [letter])

  const complete = async () => {
    setFinished(true)
    onCheer()
    await ttsSeq([
      [randomOf(PRAISES), 'en-US'],
      [`You wrote ${letter.char}!`, 'en-US'],
      [randomOf(PRAISES_ZH), 'zh-CN'],
    ])
    onDone()
  }

  return (
    <div className="center-stage">
      <div className="speech-bubble">
        {finished ? `你写出了 ${letter.char}！🎉` : `从 ⭐ 开始，用手指描出 ${letter.char}`}
      </div>
      <Trace
        strokes={letter.strokes}
        onComplete={complete}
        onStrokeDone={() => tts('Good!')}
      />
    </div>
  )
}

function FindPhase({
  letter,
  onCheer,
  onDone,
}: {
  letter: Letter
  onCheer: () => void
  onDone: () => void
}) {
  const ROUNDS = 2
  const [round, setRound] = useState(0)
  const [balloons, setBalloons] = useState<string[]>([])
  const [popped, setPopped] = useState<string[]>([])
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const others = LETTERS.map(l => l.char).filter(c => c !== letter.char)
    const distractors = [...others].sort(() => Math.random() - 0.5).slice(0, 3)
    setBalloons([letter.char, ...distractors].sort(() => Math.random() - 0.5))
    setPopped([])
    ttsSeq([[`Pop the balloon with ${letter.char}! Find ${letter.char}!`, 'en-US']])
  }, [round, letter])

  const pop = async (c: string) => {
    if (busy) return
    if (c === letter.char) {
      setBusy(true)
      setPopped(p => [...p, c])
      onCheer()
      await ttsSeq([
        [`Yes! ${letter.char}!`, 'en-US'],
        [randomOf(PRAISES), 'en-US'],
      ])
      setBusy(false)
      if (round + 1 < ROUNDS) setRound(round + 1)
      else onDone()
    } else {
      setPopped(p => [...p, c])
      await tts(`That is ${c}! Find ${letter.char}!`)
    }
  }

  return (
    <div className="center-stage">
      <Bunny />
      <div className="speech-bubble">Pop the balloon with {letter.char}!</div>
      <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', justifyContent: 'center' }}>
        {balloons.map((c, i) => (
          <button
            key={`${round}-${c}`}
            className={`balloon${popped.includes(c) ? ' popped' : ''}`}
            style={{ animationDelay: `${i * 0.35}s` }}
            onClick={() => pop(c)}
          >
            <span className="body" style={{ background: BALLOON_COLORS[i % BALLOON_COLORS.length] }}>
              {c}
            </span>
            <span className="string" />
          </button>
        ))}
      </div>
    </div>
  )
}

function SayPhase({
  letter,
  onCheer,
  onDone,
}: {
  letter: Letter
  onCheer: () => void
  onDone: () => void
}) {
  const [state, setState] = useState<'idle' | 'listening'>('idle')
  const [bubble, setBubble] = useState(`Say: ${letter.word.en}!`)
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    ttsSeq([[`Last one! Say: ${letter.word.en}!`, 'en-US']])
  }, [letter])

  const start = async () => {
    if (state !== 'idle') return
    if (!asrAvailable) {
      await ttsSeq([
        [`${letter.word.en}!`, 'en-US'],
        ['跟着小兔念出来吧！', 'zh-CN'],
      ])
      onDone()
      return
    }
    setState('listening')
    setBubble('👂 小兔在听……')
    await tts(`Say: ${letter.word.en}!`)
    const r = await listen([letter.word.en, letter.char], 5000)
    if (r.tier === 1 || attempts >= 1) {
      if (r.tier !== 3) addSpoken()
      onCheer()
      setBubble(randomOf(PRAISES))
      await ttsSeq([
        [randomOf(PRAISES), 'en-US'],
        [randomOf(PRAISES_ZH), 'zh-CN'],
      ])
      onDone()
    } else {
      if (r.tier === 2) addSpoken()
      setAttempts(a => a + 1)
      setBubble('Good try! 再来一次~')
      await ttsSeq([
        ['Good try! Listen!', 'en-US'],
        [`${letter.word.en}!`, 'en-US'],
      ])
      setState('idle')
    }
  }

  return (
    <div className="center-stage">
      <Bunny talking={state === 'listening'} />
      <div className="speech-bubble">{bubble}</div>
      <div className="word-card" style={{ minWidth: 200, pointerEvents: 'none' }}>
        <span style={{ fontSize: 52, fontWeight: 800 }}>{letter.char}</span>
        <span className="hero-word" style={{ fontSize: 84 }}>
          {letter.word.emoji}
        </span>
        <span className="en">{letter.word.en}</span>
      </div>
      <button
        className={`big-btn round mic-btn${state === 'listening' ? ' listening' : ''}`}
        onClick={start}
      >
        🎤
      </button>
    </div>
  )
}

function Reward({
  letter,
  onCheer,
  onExit,
}: {
  letter: Letter
  onCheer: () => void
  onExit: () => void
}) {
  useEffect(() => {
    completeLetter(letter.char)
    onCheer()
    ttsSeq([
      [`Hooray! You learned ${letter.char}!`, 'en-US'],
      ['字母贴纸到手啦！', 'zh-CN'],
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="center-stage">
      <Bunny talking />
      <div className="speech-bubble">You learned {letter.char}! 🎉</div>
      <span className="sticker-cell" style={{ width: 110, fontSize: 56, fontWeight: 800 }}>
        {letter.char}
      </span>
      <button className="big-btn primary" onClick={onExit}>
        回到字母火车 🚂
      </button>
    </div>
  )
}
