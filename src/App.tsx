import { useEffect, useState } from 'react'
import { ISLANDS, LETTERS } from './data/content'
import { addUsageSec, overDailyLimit } from './lib/store'
import { stopTts, tts } from './lib/speech'
import { HomeScreen } from './screens/Home'
import { IslandScreen } from './screens/Island'
import { LevelScreen } from './screens/Level'
import { AbcTrainScreen } from './screens/AbcTrain'
import { LetterScreen } from './screens/Letter'
import { StickersScreen } from './screens/Stickers'
import { ParentGate, ParentScreen } from './screens/Parent'
import { Bunny } from './components/common'

type Route =
  | { name: 'welcome' }
  | { name: 'home' }
  | { name: 'island'; id: string }
  | { name: 'level'; islandId: string; levelIndex: number }
  | { name: 'abc' }
  | { name: 'letter'; index: number }
  | { name: 'stickers' }
  | { name: 'gate' }
  | { name: 'parent' }

export default function App() {
  const [route, setRoute] = useState<Route>({ name: 'welcome' })
  const [resting, setResting] = useState(overDailyLimit)

  // 每日用时统计：仅在儿童界面且页面可见时计时
  useEffect(() => {
    const childActive = !['welcome', 'gate', 'parent'].includes(route.name)
    if (!childActive || resting) return
    const timer = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      addUsageSec(1)
      if (overDailyLimit()) setResting(true)
    }, 1000)
    return () => clearInterval(timer)
  }, [route.name, resting])

  const go = (r: Route) => {
    stopTts()
    setRoute(r)
  }

  // 休息遮罩：到达每日上限后覆盖儿童界面，仅家长可解除
  if (resting && !['gate', 'parent'].includes(route.name)) {
    return (
      <div className="overlay">
        <Bunny happy size={110} />
        <div className="screen-title">小兔要睡觉啦</div>
        <div className="subtitle">
          今天学得真棒！眼睛要休息咯，明天再来玩吧～
        </div>
        <button className="chip" onClick={() => go({ name: 'gate' })}>
          👨‍👩‍👧 家长中心
        </button>
      </div>
    )
  }

  switch (route.name) {
    case 'welcome':
      // 首屏需要一次点击：满足浏览器音频播放的用户手势要求
      return (
        <div className="overlay" style={{ cursor: 'pointer' }} onClick={() => {
          tts('Hello! I am Bunny!')
          go({ name: 'home' })
        }}>
          <Bunny talking />
          <div className="screen-title">Bunny English</div>
          <div className="subtitle">小兔英语 · 点一下开始</div>
          <button className="big-btn primary">🎈 开始玩</button>
        </div>
      )
    case 'home':
      return (
        <HomeScreen
          onIsland={id => go({ name: 'island', id })}
          onAbc={() => go({ name: 'abc' })}
          onStickers={() => go({ name: 'stickers' })}
          onParent={() => go({ name: 'gate' })}
        />
      )
    case 'island': {
      const island = ISLANDS.find(i => i.id === route.id)!
      return (
        <IslandScreen
          island={island}
          onLevel={levelIndex => go({ name: 'level', islandId: island.id, levelIndex })}
          onBack={() => go({ name: 'home' })}
        />
      )
    }
    case 'level': {
      const island = ISLANDS.find(i => i.id === route.islandId)!
      return (
        <LevelScreen
          island={island}
          level={island.levels[route.levelIndex]}
          onExit={() => go({ name: 'island', id: island.id })}
        />
      )
    }
    case 'abc':
      return (
        <AbcTrainScreen
          onLetter={index => go({ name: 'letter', index })}
          onBack={() => go({ name: 'home' })}
        />
      )
    case 'letter':
      return (
        <LetterScreen
          letter={LETTERS[route.index]}
          onExit={() => go({ name: 'abc' })}
        />
      )
    case 'stickers':
      return <StickersScreen onBack={() => go({ name: 'home' })} />
    case 'gate':
      return (
        <ParentGate
          onPass={() => go({ name: 'parent' })}
          onBack={() => (resting ? setRoute({ name: 'home' }) : go({ name: 'home' }))}
        />
      )
    case 'parent':
      return (
        <ParentScreen
          onBack={() => {
            setResting(overDailyLimit())
            go({ name: 'home' })
          }}
        />
      )
  }
}
