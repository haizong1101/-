// 语音层：TTS 播报 + 端侧 ASR 跟读识别（小词表模糊匹配、三档宽松评价）

let voicesReady = false
if ('speechSynthesis' in window) {
  speechSynthesis.getVoices()
  speechSynthesis.onvoiceschanged = () => {
    voicesReady = true
  }
}

function pickVoice(lang: string): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices()
  if (!voices.length) return null
  const exact = voices.filter(v => v.lang.replace('_', '-').startsWith(lang))
  // 偏好女声/童声关键词，更贴近"幼儿导向语"
  const cute = exact.find(v => /female|girl|child|Samantha|Ting-Ting|Tingting|Xiaoxiao/i.test(v.name))
  return cute ?? exact[0] ?? null
}

let speakSeq = 0

/** 朗读一段文字；语速放慢、音调上扬，返回播完的 Promise */
export function tts(text: string, lang: 'en-US' | 'zh-CN' = 'en-US'): Promise<void> {
  return new Promise(resolve => {
    if (!('speechSynthesis' in window) || !text) return resolve()
    const seq = ++speakSeq
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = lang
    u.rate = lang === 'en-US' ? 0.8 : 0.95
    u.pitch = 1.25
    const voice = pickVoice(lang)
    if (voice) u.voice = voice
    const done = () => resolve()
    u.onend = done
    u.onerror = done
    // 兜底：万一事件不触发（部分浏览器 bug），按时长估算收尾
    const guard = window.setTimeout(done, 1500 + text.length * 350)
    u.onend = () => {
      clearTimeout(guard)
      if (seq === speakSeq) resolve()
      else resolve()
    }
    speechSynthesis.speak(u)
    void voicesReady
  })
}

/** 依次朗读多段（可中英混排） */
export async function ttsSeq(parts: Array<[string, 'en-US' | 'zh-CN']>): Promise<void> {
  for (const [text, lang] of parts) {
    await tts(text, lang)
    await new Promise(r => setTimeout(r, 220))
  }
}

export function stopTts() {
  if ('speechSynthesis' in window) speechSynthesis.cancel()
}

// ---- ASR ----

type SR = typeof window.SpeechRecognition
const SpeechRecognitionImpl: SR | undefined =
  (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition

export const asrAvailable = !!SpeechRecognitionImpl

export type ListenTier = 1 | 2 | 3
export interface ListenResult {
  /** 1=匹配目标词 2=有发声但没匹配上 3=没听到声音/不可用 */
  tier: ListenTier
  transcript: string
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z ]/g, '').trim()
}

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  const dp = Array.from({ length: m + 1 }, (_, i) => {
    const row = new Array<number>(n + 1)
    row[0] = i
    return row
  })
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
  }
  return dp[m][n]
}

/** 幼儿发音宽松匹配：整句包含、编辑距离、首音节近似都算过 */
export function fuzzyMatch(transcript: string, target: string): boolean {
  const t = normalize(transcript)
  const w = normalize(target)
  if (!t || !w) return false
  if (t.includes(w) || w.includes(t)) return true
  const tol = Math.max(1, Math.floor(w.length / 2))
  for (const piece of t.split(' ')) {
    if (levenshtein(piece, w) <= tol) return true
    // 幼儿常见的"只发出词头"：前 2~3 个字母对上也算尝试成功
    if (w.length >= 3 && piece.length >= 2 && w.startsWith(piece.slice(0, 3))) return true
  }
  return false
}

/**
 * 监听一次跟读。目标词表极小（本关 1~3 个词），命中任意目标返回 tier1。
 * 不可用/无声音返回 tier3，调用方负责降级体验。
 */
export function listen(targets: string[], timeoutMs = 5000): Promise<ListenResult> {
  return new Promise(resolve => {
    if (!SpeechRecognitionImpl) return resolve({ tier: 3, transcript: '' })
    const rec = new SpeechRecognitionImpl()
    rec.lang = 'en-US'
    rec.interimResults = true
    rec.maxAlternatives = 5
    rec.continuous = false

    let heardSomething = false
    let finished = false
    let transcript = ''

    const finish = (tier: ListenTier) => {
      if (finished) return
      finished = true
      clearTimeout(timer)
      try {
        rec.stop()
      } catch {
        /* already stopped */
      }
      resolve({ tier, transcript })
    }

    const timer = window.setTimeout(() => finish(heardSomething ? 2 : 3), timeoutMs)

    rec.onspeechstart = () => {
      heardSomething = true
    }
    rec.onresult = (e: SpeechRecognitionEvent) => {
      heardSomething = true
      for (let i = 0; i < e.results.length; i++) {
        const alts = e.results[i]
        for (let j = 0; j < alts.length; j++) {
          transcript = alts[j].transcript
          if (targets.some(w => fuzzyMatch(transcript, w))) return finish(1)
        }
      }
      if (e.results[e.results.length - 1]?.isFinal) finish(2)
    }
    rec.onerror = () => finish(heardSomething ? 2 : 3)
    rec.onend = () => finish(heardSomething ? 2 : 3)

    try {
      rec.start()
    } catch {
      finish(3)
    }
  })
}
