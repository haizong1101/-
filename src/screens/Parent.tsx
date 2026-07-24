import { useState } from 'react'
import {
  getProgress,
  getSettings,
  getTodayUsageSec,
  resetToday,
  setSettings,
} from '../lib/store'
import { BackButton } from '../components/common'
import { asrAvailable } from '../lib/speech'

const LIMITS = [10, 15, 20, 30]

/** 家长门禁：随机算术题，防止幼儿误入 */
export function ParentGate({ onPass, onBack }: { onPass: () => void; onBack: () => void }) {
  const [q] = useState(() => {
    const a = 3 + Math.floor(Math.random() * 6)
    const b = 4 + Math.floor(Math.random() * 5)
    return { a, b }
  })
  const answer = q.a + q.b
  const [options] = useState(() => {
    const set = new Set([answer])
    while (set.size < 4) set.add(answer + Math.floor(Math.random() * 7) - 3)
    return [...set].sort(() => Math.random() - 0.5)
  })
  const [wrong, setWrong] = useState(false)

  return (
    <div className="screen">
      <BackButton onClick={onBack} />
      <div className="center-stage">
        <div className="screen-title">🔒 家长验证</div>
        <div className="subtitle">请家长回答：{q.a} + {q.b} = ?</div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          {options.map(o => (
            <button
              key={o}
              className="big-btn"
              onClick={() => (o === answer ? onPass() : setWrong(true))}
            >
              {o}
            </button>
          ))}
        </div>
        {wrong && <div className="subtitle">答错啦，再试一次</div>}
      </div>
    </div>
  )
}

export function ParentScreen({ onBack }: { onBack: () => void }) {
  const [settings, setLocal] = useState(getSettings)
  const progress = getProgress()
  const usedMin = Math.round(getTodayUsageSec() / 60)

  const update = (patch: Partial<typeof settings>) => {
    const next = { ...settings, ...patch }
    setLocal(next)
    setSettings(next)
  }

  return (
    <div className="screen">
      <BackButton onClick={onBack} />
      <div className="screen-title">👨‍👩‍👧 家长中心</div>
      <div className="parent-panel">
        <div className="parent-card">
          <h3>📊 今日学习</h3>
          <div>今日使用：{usedMin} 分钟 / 上限 {settings.dailyLimitMin} 分钟</div>
          <div>累计完成关卡：{progress.completedLevels.length} 个</div>
          <div>累计学会字母：{progress.completedLetters.length} 个</div>
          <div>累计开口次数：{progress.spokenCount} 次</div>
          <div>收集贴纸：{progress.stickers.length} 张</div>
        </div>
        <div className="parent-card">
          <h3>⏱️ 每日时长上限</h3>
          <div className="limit-row">
            {LIMITS.map(m => (
              <button
                key={m}
                className={`chip${settings.dailyLimitMin === m ? ' active' : ''}`}
                onClick={() => update({ dailyLimitMin: m })}
              >
                {m} 分钟
              </button>
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            <button className="chip" onClick={() => resetToday()}>
              重置今日计时（特殊情况用）
            </button>
          </div>
        </div>
        <div className="parent-card">
          <h3>🎤 语音功能状态</h3>
          <div>
            {asrAvailable
              ? '本设备支持语音识别，孩子可以进行跟读互动。'
              : '本设备浏览器暂不支持语音识别，"开口说"环节已自动切换为跟读模式（播放示范音，不做识别）。建议使用 Safari（iPad/iPhone）或 Chrome。'}
          </div>
          <div style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: 14 }}>
            隐私说明：语音识别由设备/浏览器本地能力完成，本应用不上传、不存储任何录音。
          </div>
        </div>
      </div>
    </div>
  )
}
