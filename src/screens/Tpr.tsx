import { useEffect, useRef, useState } from 'react'
import { PRAISES, randomOf } from '../data/content'
import { asrAvailable, fuzzyMatch, listen, stopTts, tts, ttsSeq } from '../lib/speech'
import { addSpoken } from '../lib/store'
import { BackButton, Confetti } from '../components/common'
import { BunnyArt, CarrotArt, MoonArt } from '../components/art'

// TPR 魔法口令：孩子说出指令，小兔做动作（说不出也可以点卡片触发）

interface Action {
  en: string
  zh: string
  anim: string
  icon: (p: { size?: number }) => React.ReactNode
}

function JumpIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" strokeLinecap="round">
      <path d="M60 96 L60 30" stroke="#5fb167" strokeWidth={10} />
      <path d="M34 56 L60 24 L86 56" stroke="#5fb167" strokeWidth={10} fill="none" strokeLinejoin="round" />
      <path d="M28 104 Q60 92 92 104" stroke="#c9b298" strokeWidth={6} />
    </svg>
  )
}

function SpinIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" strokeLinecap="round">
      <path d="M96 60 A 36 36 0 1 1 60 24" stroke="#7db8f5" strokeWidth={10} fill="none" />
      <path d="M60 8 L82 24 L60 42 Z" fill="#7db8f5" />
    </svg>
  )
}

const ACTIONS: Action[] = [
  { en: 'jump', zh: '跳一跳', anim: 'act-jump', icon: JumpIcon },
  { en: 'spin', zh: '转圈圈', anim: 'act-spin', icon: SpinIcon },
  { en: 'eat', zh: '吃萝卜', anim: 'act-eat', icon: p => <CarrotArt {...p} /> },
  { en: 'sleep', zh: '睡觉觉', anim: 'act-sleep', icon: p => <MoonArt {...p} /> },
]

export function TprScreen({ onExit }: { onExit: () => void }) {
  const [acting, setActing] = useState<Action | null>(null)
  const [listening, setListening] = useState(false)
  const [bubble, setBubble] = useState('说出魔法口令，小兔就会动起来！')
  const [confetti, setConfetti] = useState(0)
  const busy = useRef(false)

  useEffect(() => {
    ttsSeq([
      ['Magic words time!', 'en-US'],
      ['说出魔法口令，小兔就会听你的话哦！', 'zh-CN'],
    ])
    return () => stopTts()
  }, [])

  const perform = async (a: Action, praise: boolean) => {
    if (busy.current) return
    busy.current = true
    setActing(a)
    setBubble(`${a.en}! ${a.zh}!`)
    if (praise) {
      setConfetti(c => c + 1)
      await tts(randomOf(PRAISES))
    }
    await ttsSeq([[`${a.en}! ${a.en}!`, 'en-US']])
    await new Promise(r => setTimeout(r, 1400))
    setActing(null)
    busy.current = false
  }

  const startListen = async () => {
    if (busy.current || listening) return
    if (!asrAvailable) {
      setBubble('这台设备听不到声音，点下面的卡片吧！')
      await tts('点下面的卡片，小兔也会动哦！', 'zh-CN')
      return
    }
    setListening(true)
    setBubble('👂 大声说：jump / spin / eat / sleep')
    await tts('Say a magic word!')
    const r = await listen(ACTIONS.map(a => a.en), 5000)
    setListening(false)
    if (r.tier === 1) {
      addSpoken()
      const matched = ACTIONS.find(a => fuzzyMatch(r.transcript, a.en)) ?? ACTIONS[0]
      await perform(matched, true)
      setBubble('再说一个口令试试！')
    } else if (r.tier === 2) {
      addSpoken()
      setBubble('Good try! 再说一次，或点卡片')
      await tts('Good try! Say: jump!')
    } else {
      setBubble('小兔没听到，再试一次？')
    }
  }

  return (
    <div className="screen" style={{ background: 'var(--mint)' }}>
      <BackButton onClick={onExit} />
      <Confetti trigger={confetti} />
      <div className="screen-title">Magic Words</div>
      <div className="subtitle">魔法口令 · 小兔听你的</div>
      <div className="center-stage" style={{ gap: 14 }}>
        <div className={`tpr-stage ${acting ? acting.anim : ''}`}>
          <BunnyArt size={150} happy={acting?.en === 'eat'} />
          {acting?.en === 'sleep' && <span className="zzz">Z z z…</span>}
          {acting?.en === 'eat' && (
            <span className="tpr-prop">
              <CarrotArt size={56} />
            </span>
          )}
        </div>
        <div className="speech-bubble">{bubble}</div>
        <button
          className={`big-btn round mic-btn${listening ? ' listening' : ''}`}
          onClick={startListen}
          aria-label="按一下说口令"
        >
          🎤
        </button>
        <div className="tpr-cards">
          {ACTIONS.map(a => (
            <button key={a.en} className="word-card tpr-card" onClick={() => perform(a, false)}>
              <a.icon size={56} />
              <span className="en" style={{ fontSize: 20 }}>{a.en}</span>
              <span className="zh" style={{ fontSize: 15 }}>{a.zh}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
