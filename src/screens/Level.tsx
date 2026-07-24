import { useCallback, useEffect, useRef, useState } from 'react'
import { Island, Level, PRAISES, PRAISES_ZH, Word, randomOf } from '../data/content'
import { asrAvailable, listen, stopTts, tts, ttsSeq } from '../lib/speech'
import { addSpoken, completeLevel } from '../lib/store'
import { BackButton, Bunny, Confetti } from '../components/common'

type Phase = 'listen' | 'find' | 'say' | 'play' | 'reward'

interface Props {
  island: Island
  level: Level
  onExit: () => void
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function LevelScreen({ island, level, onExit }: Props) {
  const [phase, setPhase] = useState<Phase>('listen')
  const [confetti, setConfetti] = useState(0)
  const cheer = () => setConfetti(c => c + 1)

  useEffect(() => () => stopTts(), [])

  return (
    <div className="screen" style={{ background: island.color }}>
      <BackButton onClick={onExit} />
      <Confetti trigger={confetti} />
      {phase === 'listen' && (
        <ListenPhase level={level} onDone={() => setPhase('find')} />
      )}
      {phase === 'find' && (
        <FindPhase island={island} level={level} onCheer={cheer} onDone={() => setPhase('say')} />
      )}
      {phase === 'say' && (
        <SayPhase level={level} onCheer={cheer} onDone={() => setPhase('play')} />
      )}
      {phase === 'play' && (
        <PlayPhase island={island} level={level} onCheer={cheer} onDone={() => setPhase('reward')} />
      )}
      {phase === 'reward' && <RewardPhase level={level} onCheer={cheer} onExit={onExit} />}
    </div>
  )
}

/* ---------- 1. 磨耳朵 ---------- */

function ListenPhase({ level, onDone }: { level: Level; onDone: () => void }) {
  const [idx, setIdx] = useState(0)
  const [talking, setTalking] = useState(false)
  const word = level.words[idx]
  const playing = useRef(false)

  const present = useCallback(
    async (w: Word) => {
      if (playing.current) return
      playing.current = true
      setTalking(true)
      await ttsSeq([
        [`Look! A ${w.en}!`, 'en-US'],
        [w.flavor ?? '', 'en-US'],
        [`${w.en}! ${w.en}!`, 'en-US'],
        [w.zh, 'zh-CN'],
      ])
      setTalking(false)
      playing.current = false
    },
    [],
  )

  useEffect(() => {
    present(word)
  }, [word, present])

  const next = () => {
    stopTts()
    playing.current = false
    if (idx + 1 < level.words.length) setIdx(idx + 1)
    else onDone()
  }

  return (
    <div className="center-stage">
      <Bunny talking={talking} />
      <div className="speech-bubble">Look! A {word.en}!</div>
      <button
        className="word-card"
        style={{ minWidth: 220 }}
        onClick={() => present(word)}
      >
        <span className="hero-word">{word.emoji}</span>
        <span className="hero-label">{word.en}</span>
        <span className="zh">{word.zh}（点我再听一遍）</span>
      </button>
      <button className="big-btn primary" onClick={next}>
        {idx + 1 < level.words.length ? '下一个 ➜' : '我记住啦 ➜'}
      </button>
    </div>
  )
}

/* ---------- 2. 认一认 ---------- */

function FindPhase({
  island,
  level,
  onCheer,
  onDone,
}: {
  island: Island
  level: Level
  onCheer: () => void
  onDone: () => void
}) {
  // 选项 = 本关词 + 1 个同岛干扰词（如有）
  const [queue] = useState(() => shuffle(level.words))
  const [qIdx, setQIdx] = useState(0)
  const [options, setOptions] = useState<Word[]>([])
  const [flash, setFlash] = useState<{ en: string; kind: 'correct' | 'wrong' } | null>(null)
  const target = queue[qIdx]

  useEffect(() => {
    const others = island.levels
      .flatMap(l => l.words)
      .filter(w => !level.words.some(lw => lw.en === w.en))
    const distractor = others.length ? [randomOf(others)] : []
    setOptions(shuffle([...level.words, ...distractor]))
    ttsSeq([
      [`Where is the ${target.en}? Tap the ${target.en}!`, 'en-US'],
    ])
  }, [target, island, level])

  const pick = async (w: Word) => {
    if (flash) return
    if (w.en === target.en) {
      setFlash({ en: w.en, kind: 'correct' })
      onCheer()
      await ttsSeq([
        [`Yes! ${w.en}!`, 'en-US'],
        [randomOf(PRAISES), 'en-US'],
      ])
      setFlash(null)
      if (qIdx + 1 < queue.length) setQIdx(qIdx + 1)
      else onDone()
    } else {
      setFlash({ en: w.en, kind: 'wrong' })
      await tts(`Hmm~ try again! Where is the ${target.en}?`)
      setFlash(null)
    }
  }

  return (
    <div className="center-stage">
      <Bunny />
      <div className="speech-bubble">Where is the {target.en}?</div>
      <div className="card-grid" style={{ maxWidth: 560 }}>
        {options.map(w => (
          <button
            key={w.en}
            className={`word-card${flash?.en === w.en ? ` ${flash.kind}` : ''}`}
            onClick={() => pick(w)}
          >
            <span className="emoji">{w.emoji}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------- 3. 开口说 ---------- */

function SayPhase({
  level,
  onCheer,
  onDone,
}: {
  level: Level
  onCheer: () => void
  onDone: () => void
}) {
  const [idx, setIdx] = useState(0)
  const [state, setState] = useState<'idle' | 'listening' | 'feedback'>('idle')
  const [bubble, setBubble] = useState('')
  const word = level.words[idx]
  const attemptRef = useRef(0)

  useEffect(() => {
    attemptRef.current = 0
    setBubble(`Say: ${word.en}!`)
    ttsSeq([[`Now you try! Say: ${word.en}!`, 'en-US']])
  }, [word])

  const goNext = () => {
    if (idx + 1 < level.words.length) {
      setState('idle')
      setIdx(idx + 1)
    } else onDone()
  }

  const start = async () => {
    if (state !== 'idle') return
    if (!asrAvailable) {
      // 降级：无法录音时改为再听一遍 + 直接通过
      setBubble('跟着小兔一起念～')
      await ttsSeq([
        [`${word.en}! ${word.en}!`, 'en-US'],
        ['跟着小兔念出来吧！', 'zh-CN'],
      ])
      goNext()
      return
    }
    setState('listening')
    setBubble('👂 小兔在听……')
    await tts(`Say: ${word.en}!`)
    const result = await listen([word.en], 5000)
    setState('feedback')
    if (result.tier === 1) {
      addSpoken()
      onCheer()
      setBubble(randomOf(PRAISES))
      await ttsSeq([
        [randomOf(PRAISES), 'en-US'],
        [randomOf(PRAISES_ZH), 'zh-CN'],
      ])
      goNext()
    } else if (result.tier === 2) {
      addSpoken()
      attemptRef.current += 1
      if (attemptRef.current >= 2) {
        // 两次尝试后无条件表扬放行，绝不卡关
        onCheer()
        setBubble('Good try! 你真勇敢！')
        await ttsSeq([
          ['Good try!', 'en-US'],
          ['敢开口就是最棒的！', 'zh-CN'],
        ])
        goNext()
      } else {
        setBubble('Good try! Listen again~')
        await ttsSeq([
          ['Good try! Listen again!', 'en-US'],
          [`${word.en}! ${word.en}!`, 'en-US'],
        ])
        setState('idle')
      }
    } else {
      attemptRef.current += 1
      if (attemptRef.current >= 2) {
        setBubble("It's okay! Next time~")
        await tts("It's okay! Next time!")
        goNext()
      } else {
        setBubble('小兔没听到，再试一次？')
        await ttsSeq([['大声一点点，小兔在听哦！', 'zh-CN']])
        setState('idle')
      }
    }
  }

  return (
    <div className="center-stage">
      <Bunny talking={state === 'listening'} />
      <div className="speech-bubble">{bubble}</div>
      <div className="word-card" style={{ minWidth: 220, pointerEvents: 'none' }}>
        <span className="hero-word">{word.emoji}</span>
        <span className="hero-label">{word.en}</span>
      </div>
      <button
        className={`big-btn round mic-btn${state === 'listening' ? ' listening' : ''}`}
        onClick={start}
        aria-label="按一下开始说"
      >
        🎤
      </button>
      <div className="subtitle">按一下麦克风，大声说出来！</div>
    </div>
  )
}

/* ---------- 4. 玩一玩：喂小兔 ---------- */

const ROUNDS = 3

function PlayPhase({
  island,
  level,
  onCheer,
  onDone,
}: {
  island: Island
  level: Level
  onCheer: () => void
  onDone: () => void
}) {
  const [round, setRound] = useState(0)
  const [target, setTarget] = useState<Word>(() => randomOf(level.words))
  const [options, setOptions] = useState<Word[]>([])
  const [flash, setFlash] = useState<{ en: string; kind: 'correct' | 'wrong' } | null>(null)
  const [fed, setFed] = useState(false)

  useEffect(() => {
    const others = island.levels
      .flatMap(l => l.words)
      .filter(w => !level.words.some(lw => lw.en === w.en))
    const distractor = others.length ? [randomOf(others)] : []
    setOptions(shuffle([...level.words, ...distractor]))
    ttsSeq([[`Give Bunny the ${target.en}!`, 'en-US']])
  }, [round, target, island, level])

  const pick = async (w: Word) => {
    if (flash) return
    if (w.en === target.en) {
      setFlash({ en: w.en, kind: 'correct' })
      setFed(true)
      onCheer()
      await ttsSeq([
        ['Yum yum! Thank you!', 'en-US'],
        [`${w.en}!`, 'en-US'],
      ])
      setFed(false)
      setFlash(null)
      if (round + 1 < ROUNDS) {
        setRound(round + 1)
        setTarget(randomOf(level.words))
      } else onDone()
    } else {
      setFlash({ en: w.en, kind: 'wrong' })
      await tts(`Hmm~ Bunny wants the ${target.en}!`)
      setFlash(null)
    }
  }

  return (
    <div className="center-stage">
      <span style={{ fontSize: 84 }}>{fed ? '😋' : '🐰'}</span>
      <div className="speech-bubble">Give Bunny the {target.en}!</div>
      <div className="stars-row">
        {Array.from({ length: ROUNDS }, (_, i) => (
          <span key={i}>{i < round ? '⭐' : '☆'}</span>
        ))}
      </div>
      <div className="card-grid" style={{ maxWidth: 560 }}>
        {options.map(w => (
          <button
            key={w.en}
            className={`word-card${flash?.en === w.en ? ` ${flash.kind}` : ''}`}
            onClick={() => pick(w)}
          >
            <span className="emoji">{w.emoji}</span>
            <span className="en">{w.en}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------- 5. 奖励 ---------- */

function RewardPhase({
  level,
  onCheer,
  onExit,
}: {
  level: Level
  onCheer: () => void
  onExit: () => void
}) {
  useEffect(() => {
    completeLevel(
      level.id,
      level.words.map(w => w.emoji),
    )
    onCheer()
    ttsSeq([
      ['Hooray! You did it!', 'en-US'],
      ['你获得了新贴纸！', 'zh-CN'],
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="center-stage">
      <Bunny talking />
      <div className="speech-bubble">Hooray! 🎉 获得新贴纸！</div>
      <div style={{ display: 'flex', gap: 16 }}>
        {level.words.map(w => (
          <span key={w.en} className="sticker-cell" style={{ width: 96 }}>
            {w.emoji}
          </span>
        ))}
      </div>
      <button className="big-btn primary" onClick={onExit}>
        回到地图 🗺️
      </button>
    </div>
  )
}
