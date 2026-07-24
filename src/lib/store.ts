// 本地进度 / 设置 / 每日用时（MVP 无后端，全部 localStorage）

export interface Settings {
  dailyLimitMin: number
  soundOn: boolean
}

export interface ProgressState {
  completedLevels: string[]
  completedLetters: string[]
  stickers: string[] // emoji 列表
  spokenCount: number // 累计开口次数（家长报告用）
}

const KEY_SETTINGS = 'bunny.settings'
const KEY_PROGRESS = 'bunny.progress'
const KEY_USAGE = 'bunny.usage'

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback
  } catch {
    return fallback
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage full or unavailable — 进度丢失可接受 */
  }
}

export function getSettings(): Settings {
  return load(KEY_SETTINGS, { dailyLimitMin: 15, soundOn: true })
}

export function setSettings(s: Settings) {
  save(KEY_SETTINGS, s)
}

export function getProgress(): ProgressState {
  return load(KEY_PROGRESS, {
    completedLevels: [],
    completedLetters: [],
    stickers: [],
    spokenCount: 0,
  })
}

export function completeLevel(levelId: string, stickers: string[]) {
  const p = getProgress()
  if (!p.completedLevels.includes(levelId)) p.completedLevels.push(levelId)
  for (const s of stickers) if (!p.stickers.includes(s)) p.stickers.push(s)
  save(KEY_PROGRESS, p)
}

export function completeLetter(char: string) {
  const p = getProgress()
  if (!p.completedLetters.includes(char)) p.completedLetters.push(char)
  const sticker = `🔤${char}`
  if (!p.stickers.includes(sticker)) p.stickers.push(sticker)
  save(KEY_PROGRESS, p)
}

export function addSpoken() {
  const p = getProgress()
  p.spokenCount += 1
  save(KEY_PROGRESS, p)
}

// ---- 每日用时 ----

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

export function getTodayUsageSec(): number {
  const u = load(KEY_USAGE, { date: today(), seconds: 0 })
  return u.date === today() ? u.seconds : 0
}

export function addUsageSec(sec: number) {
  const u = load(KEY_USAGE, { date: today(), seconds: 0 })
  const next = u.date === today() ? u.seconds + sec : sec
  save(KEY_USAGE, { date: today(), seconds: next })
}

export function overDailyLimit(): boolean {
  return getTodayUsageSec() >= getSettings().dailyLimitMin * 60
}

export function resetToday() {
  save(KEY_USAGE, { date: today(), seconds: 0 })
}
