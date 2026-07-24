import { useEffect, useMemo, useRef, useState } from 'react'

// 手指描红：SVG 路径采样成点位，触摸经过即点亮。
// 容差极宽（约字宽 40%），笔顺偏差不判错——只庆祝完成。

const TOLERANCE = 18 // viewBox 100 内的距离容差
const SAMPLES_PER_100 = 14 // 每 100 单位路径长度的采样点数
const PASS_RATIO = 0.72 // 点亮比例达标即算完成一笔

interface Pt {
  x: number
  y: number
}

function samplePath(d: string): Pt[] {
  const svgNS = 'http://www.w3.org/2000/svg'
  const path = document.createElementNS(svgNS, 'path')
  path.setAttribute('d', d)
  const len = path.getTotalLength()
  const n = Math.max(6, Math.round((len / 100) * SAMPLES_PER_100))
  const pts: Pt[] = []
  for (let i = 0; i <= n; i++) {
    const p = path.getPointAtLength((len * i) / n)
    pts.push({ x: p.x, y: p.y })
  }
  return pts
}

interface Props {
  strokes: string[]
  color?: string
  onComplete: () => void
  onStrokeDone?: (strokeIndex: number) => void
}

export function Trace({ strokes, color = '#ff9fbe', onComplete, onStrokeDone }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [strokeIdx, setStrokeIdx] = useState(0)
  const [hit, setHit] = useState<boolean[]>([])
  const [doneStrokes, setDoneStrokes] = useState<number[]>([])
  const tracingRef = useRef(false)

  const sampled = useMemo(() => strokes.map(samplePath), [strokes])
  const current = sampled[strokeIdx] ?? []

  useEffect(() => {
    setHit(new Array(current.length).fill(false))
  }, [strokeIdx, current.length])

  const toLocal = (e: React.PointerEvent): Pt | null => {
    const svg = svgRef.current
    if (!svg) return null
    const ctm = svg.getScreenCTM()
    if (!ctm) return null
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse())
    return { x: pt.x, y: pt.y }
  }

  const touch = (e: React.PointerEvent) => {
    if (!tracingRef.current || strokeIdx >= strokes.length) return
    const p = toLocal(e)
    if (!p) return
    setHit(prev => {
      let changed = false
      const next = prev.map((h, i) => {
        if (h) return true
        const d = Math.hypot(current[i].x - p.x, current[i].y - p.y)
        if (d <= TOLERANCE) {
          changed = true
          return true
        }
        return false
      })
      return changed ? next : prev
    })
  }

  // 完成判定放在 effect 里，避免在 setState 回调里做副作用
  useEffect(() => {
    if (!hit.length || strokeIdx >= strokes.length) return
    const ratio = hit.filter(Boolean).length / hit.length
    const lastHit = hit[hit.length - 1]
    if (ratio >= PASS_RATIO && lastHit) {
      const done = strokeIdx
      setDoneStrokes(prev => [...prev, done])
      onStrokeDone?.(done)
      if (done + 1 < strokes.length) setStrokeIdx(done + 1)
      else onComplete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hit])

  const start = current[0]

  return (
    <svg
      ref={svgRef}
      className="trace-svg"
      viewBox="0 0 100 100"
      onPointerDown={e => {
        tracingRef.current = true
        ;(e.target as Element).setPointerCapture?.(e.pointerId)
        touch(e)
      }}
      onPointerMove={touch}
      onPointerUp={() => {
        tracingRef.current = false
      }}
      onPointerCancel={() => {
        tracingRef.current = false
      }}
    >
      {/* 底层：字母整体淡色轮廓 */}
      {strokes.map((d, i) => (
        <path
          key={`bg${i}`}
          d={d}
          fill="none"
          stroke={doneStrokes.includes(i) ? color : '#f3ebe0'}
          strokeWidth={13}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={doneStrokes.includes(i) ? 0.9 : 1}
        />
      ))}
      {/* 当前笔画的引导点 */}
      {strokeIdx < strokes.length &&
        current.map((p, i) => (
          <circle
            key={i}
            className={`trace-dot${hit[i] ? ' hit' : ''}`}
            cx={p.x}
            cy={p.y}
            r={2.6}
          />
        ))}
      {/* 起笔小星星 */}
      {strokeIdx < strokes.length && start && (
        <text
          className="trace-star"
          x={start.x}
          y={start.y + 3}
          fontSize="11"
          textAnchor="middle"
        >
          ⭐
        </text>
      )}
    </svg>
  )
}
