import type { ReactNode } from 'react'

// 原创卡通素材库：统一 kawaii 风格
// 规范：viewBox 0 0 120 120 / 粗同色系描边 / 大黑眼睛带高光 / 粉腮红 / 微笑

const INK = '#4a3b45'
const BLUSH = '#ffb3c7'

interface ArtProps {
  size?: number
}

function Frame({ size = 96, children }: ArtProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block' }}
    >
      {children}
    </svg>
  )
}

function Eye({ x, y, r = 5, ink = INK }: { x: number; y: number; r?: number; ink?: string }) {
  return (
    <>
      <circle cx={x} cy={y} r={r} fill={ink} />
      <circle cx={x + r * 0.36} cy={y - r * 0.36} r={r * 0.34} fill="#fff" />
    </>
  )
}

function Cheeks({ y, dx = 24, cx = 60, r = 6 }: { y: number; dx?: number; cx?: number; r?: number }) {
  return (
    <>
      <circle cx={cx - dx} cy={y} r={r} fill={BLUSH} opacity={0.55} />
      <circle cx={cx + dx} cy={y} r={r} fill={BLUSH} opacity={0.55} />
    </>
  )
}

function Smile({ x = 60, y, w = 8, ink = INK }: { x?: number; y: number; w?: number; ink?: string }) {
  return <path d={`M${x - w} ${y} Q${x} ${y + w * 0.9} ${x + w} ${y}`} stroke={ink} strokeWidth={3.5} fill="none" />
}

function Sparkle({ x, y, s = 6, color = '#fff' }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <path
      d={`M${x} ${y - s} Q${x + s * 0.2} ${y - s * 0.2} ${x + s} ${y} Q${x + s * 0.2} ${y + s * 0.2} ${x} ${y + s} Q${x - s * 0.2} ${y + s * 0.2} ${x - s} ${y} Q${x - s * 0.2} ${y - s * 0.2} ${x} ${y - s} Z`}
      fill={color}
      opacity={0.9}
    />
  )
}

/* ---------- IP 角色：小兔 Bunny ---------- */

export function BunnyArt({ size, happy = false }: ArtProps & { happy?: boolean }) {
  return (
    <Frame size={size}>
      {/* 耳朵 */}
      <ellipse cx={44} cy={26} rx={11} ry={24} fill="#fff" stroke="#e3b7c6" strokeWidth={4} />
      <ellipse cx={76} cy={26} rx={11} ry={24} fill="#fff" stroke="#e3b7c6" strokeWidth={4} />
      <ellipse cx={44} cy={29} rx={5} ry={15} fill="#ffd2e2" />
      <ellipse cx={76} cy={29} rx={5} ry={15} fill="#ffd2e2" />
      {/* 头 */}
      <circle cx={60} cy={72} r={38} fill="#fff" stroke="#e3b7c6" strokeWidth={4} />
      {happy ? (
        <>
          <path d="M40 64 Q46 58 52 64" stroke={INK} strokeWidth={4} fill="none" />
          <path d="M68 64 Q74 58 80 64" stroke={INK} strokeWidth={4} fill="none" />
          <path d="M52 80 Q60 90 68 80 Z" fill="#ff8fae" stroke={INK} strokeWidth={3} />
        </>
      ) : (
        <>
          <Eye x={46} y={66} />
          <Eye x={74} y={66} />
          <path d="M56 76 Q60 80 64 76" stroke={INK} strokeWidth={3.5} fill="none" />
          <path d="M60 76 L60 72" stroke={INK} strokeWidth={3} />
          <ellipse cx={60} cy={71} rx={4.5} ry={3.5} fill="#ff9fbe" />
        </>
      )}
      <Cheeks y={78} dx={26} r={6.5} />
    </Frame>
  )
}

/* ---------- 动物 ---------- */

function Cat({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M26 48 L32 16 L52 36 Z" fill="#ffcf8f" stroke="#dca253" strokeWidth={4} />
      <path d="M94 48 L88 16 L68 36 Z" fill="#ffcf8f" stroke="#dca253" strokeWidth={4} />
      <path d="M31 39 L34 26 L44 36 Z" fill="#ffe7ec" />
      <path d="M89 39 L86 26 L76 36 Z" fill="#ffe7ec" />
      <ellipse cx={60} cy={68} rx={40} ry={36} fill="#ffcf8f" stroke="#dca253" strokeWidth={4} />
      <Eye x={46} y={62} />
      <Eye x={74} y={62} />
      <path d="M56 73 L64 73 L60 78 Z" fill="#ff8fae" stroke={INK} strokeWidth={2} />
      <path d="M60 78 Q56 84 50 82 M60 78 Q64 84 70 82" stroke={INK} strokeWidth={3} fill="none" />
      <path d="M14 62 L34 64 M15 74 L34 71" stroke="#dca253" strokeWidth={3} />
      <path d="M106 62 L86 64 M105 74 L86 71" stroke="#dca253" strokeWidth={3} />
      <Cheeks y={74} dx={27} />
    </Frame>
  )
}

function Dog({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <ellipse cx={24} cy={58} rx={13} ry={24} fill="#b58963" stroke="#8f6b4d" strokeWidth={4} />
      <ellipse cx={96} cy={58} rx={13} ry={24} fill="#b58963" stroke="#8f6b4d" strokeWidth={4} />
      <circle cx={60} cy={64} r={38} fill="#eccb9e" stroke="#c9a06a" strokeWidth={4} />
      <ellipse cx={60} cy={78} rx={19} ry={14} fill="#fdf2df" />
      <Eye x={45} y={58} />
      <Eye x={75} y={58} />
      <ellipse cx={60} cy={73} rx={7} ry={5.5} fill={INK} />
      <circle cx={62} cy={71.5} r={1.8} fill="#fff" />
      <path d="M60 78 Q60 84 60 84 M60 84 Q54 89 50 85 M60 84 Q66 89 70 85" stroke={INK} strokeWidth={3} fill="none" />
      <Cheeks y={72} dx={28} />
    </Frame>
  )
}

function Duck({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M56 16 Q60 6 66 14 Q70 8 72 16" stroke="#e0b23a" strokeWidth={4} fill="none" />
      <circle cx={60} cy={62} r={38} fill="#ffe08a" stroke="#e0b23a" strokeWidth={4} />
      <Eye x={45} y={54} />
      <Eye x={75} y={54} />
      <ellipse cx={60} cy={74} rx={17} ry={10} fill="#ffab5e" stroke="#e08a2e" strokeWidth={4} />
      <path d="M46 74 Q60 80 74 74" stroke="#e08a2e" strokeWidth={2.5} fill="none" />
      <Cheeks y={68} dx={29} />
    </Frame>
  )
}

function Pig({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M28 42 L34 20 L50 34 Z" fill="#ffb9cd" stroke="#e58aa6" strokeWidth={4} />
      <path d="M92 42 L86 20 L70 34 Z" fill="#ffb9cd" stroke="#e58aa6" strokeWidth={4} />
      <circle cx={60} cy={66} r={38} fill="#ffc7d7" stroke="#e58aa6" strokeWidth={4} />
      <Eye x={44} y={58} />
      <Eye x={76} y={58} />
      <ellipse cx={60} cy={74} rx={15} ry={11} fill="#ff9fbe" stroke="#e58aa6" strokeWidth={4} />
      <ellipse cx={54} cy={74} rx={2.6} ry={4} fill="#c96a89" />
      <ellipse cx={66} cy={74} rx={2.6} ry={4} fill="#c96a89" />
      <Smile y={91} w={7} />
      <Cheeks y={70} dx={30} />
    </Frame>
  )
}

function Bird({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M52 18 Q56 8 62 16 Q66 10 68 18" stroke="#4f93d8" strokeWidth={4} fill="none" />
      <circle cx={60} cy={64} r={38} fill="#8fc4f2" stroke="#5b93c9" strokeWidth={4} />
      <ellipse cx={60} cy={82} rx={20} ry={14} fill="#e9f4fd" />
      <path d="M24 66 Q14 76 28 84 Q20 88 30 92" stroke="#5b93c9" strokeWidth={4} fill="#aed4f5" />
      <path d="M96 66 Q106 76 92 84 Q100 88 90 92" stroke="#5b93c9" strokeWidth={4} fill="#aed4f5" />
      <Eye x={46} y={58} />
      <Eye x={74} y={58} />
      <path d="M54 68 L66 68 L60 76 Z" fill="#ffab5e" stroke="#e08a2e" strokeWidth={3} />
      <Cheeks y={72} dx={27} />
    </Frame>
  )
}

function Fish({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M88 60 L110 42 Q106 60 110 78 Z" fill="#8fd8cf" stroke="#5cb3a8" strokeWidth={4} />
      <ellipse cx={56} cy={60} rx={42} ry={30} fill="#a7e3db" stroke="#5cb3a8" strokeWidth={4} />
      <path d="M50 32 Q60 22 68 32 Q62 38 50 32 Z" fill="#8fd8cf" stroke="#5cb3a8" strokeWidth={3.5} />
      <path d="M46 60 Q56 52 64 60 Q56 70 46 60 Z" fill="#8fd8cf" opacity={0.8} />
      <Eye x={34} y={54} />
      <Smile x={30} y={66} w={6} />
      <circle cx={30} cy={62} r={5} fill={BLUSH} opacity={0.5} />
      <circle cx={104} cy={24} r={4} fill="none" stroke="#9ed5ee" strokeWidth={3} />
      <circle cx={94} cy={14} r={2.6} fill="none" stroke="#9ed5ee" strokeWidth={2.5} />
    </Frame>
  )
}

function Bear({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <circle cx={30} cy={30} r={13} fill="#c69a6d" stroke="#9c744c" strokeWidth={4} />
      <circle cx={90} cy={30} r={13} fill="#c69a6d" stroke="#9c744c" strokeWidth={4} />
      <circle cx={30} cy={30} r={6} fill="#e8c8a2" />
      <circle cx={90} cy={30} r={6} fill="#e8c8a2" />
      <circle cx={60} cy={66} r={38} fill="#c69a6d" stroke="#9c744c" strokeWidth={4} />
      <ellipse cx={60} cy={78} rx={17} ry={13} fill="#e8c8a2" />
      <Eye x={45} y={60} />
      <Eye x={75} y={60} />
      <ellipse cx={60} cy={74} rx={6} ry={5} fill={INK} />
      <path d="M60 79 Q60 84 60 84 M54 87 Q60 90 66 87" stroke={INK} strokeWidth={3} fill="none" />
      <Cheeks y={72} dx={28} />
    </Frame>
  )
}

function Cow({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M34 22 Q28 10 40 12 Q44 18 40 24 Z" fill="#f5e6c8" stroke="#c9ab7c" strokeWidth={3.5} />
      <path d="M86 22 Q92 10 80 12 Q76 18 80 24 Z" fill="#f5e6c8" stroke="#c9ab7c" strokeWidth={3.5} />
      <ellipse cx={22} cy={52} rx={12} ry={8} fill="#fdf6ec" stroke="#c9b298" strokeWidth={4} />
      <ellipse cx={98} cy={52} rx={12} ry={8} fill="#fdf6ec" stroke="#c9b298" strokeWidth={4} />
      <circle cx={60} cy={62} r={38} fill="#fdfbf5" stroke="#c9b298" strokeWidth={4} />
      <path d="M68 26 Q88 28 92 44 Q80 52 66 42 Q62 32 68 26 Z" fill="#6b5b52" opacity={0.85} />
      <Eye x={44} y={56} />
      <Eye x={76} y={56} />
      <ellipse cx={60} cy={80} rx={21} ry={13} fill="#ffc7d7" stroke="#e5a1b8" strokeWidth={4} />
      <ellipse cx={52} cy={80} rx={3} ry={4.2} fill="#c96a89" />
      <ellipse cx={68} cy={80} rx={3} ry={4.2} fill="#c96a89" />
      <Cheeks y={66} dx={30} r={5.5} />
    </Frame>
  )
}

function Sheep({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <g fill="#fdf6ec" stroke="#d8c9b4" strokeWidth={4}>
        <circle cx={36} cy={40} r={15} />
        <circle cx={60} cy={32} r={16} />
        <circle cx={84} cy={40} r={15} />
        <circle cx={28} cy={62} r={14} />
        <circle cx={92} cy={62} r={14} />
        <circle cx={38} cy={82} r={15} />
        <circle cx={82} cy={82} r={15} />
        <circle cx={60} cy={88} r={16} />
        <circle cx={60} cy={60} r={26} stroke="none" />
      </g>
      <ellipse cx={24} cy={56} rx={9} ry={6} fill="#e8c8a2" stroke="#c9a06a" strokeWidth={3.5} transform="rotate(-20 24 56)" />
      <ellipse cx={96} cy={56} rx={9} ry={6} fill="#e8c8a2" stroke="#c9a06a" strokeWidth={3.5} transform="rotate(20 96 56)" />
      <ellipse cx={60} cy={66} rx={24} ry={22} fill="#f7e3c8" stroke="#d3ae7e" strokeWidth={4} />
      <Eye x={51} y={62} r={4.5} />
      <Eye x={69} y={62} r={4.5} />
      <Smile y={73} w={6} />
      <Cheeks y={70} dx={17} r={4.5} />
    </Frame>
  )
}

/* ---------- 颜色泡泡 ---------- */

const COLOR_STYLES: Record<string, { fill: string; stroke: string; ink?: string }> = {
  red: { fill: '#ff8a80', stroke: '#e05a50' },
  blue: { fill: '#7db8f5', stroke: '#5590d4' },
  yellow: { fill: '#ffd75e', stroke: '#dfae2f' },
  green: { fill: '#8fd694', stroke: '#5fb167' },
  pink: { fill: '#ffb1cd', stroke: '#e987ad' },
  purple: { fill: '#c1a0e8', stroke: '#9668c9' },
  orange: { fill: '#ffb066', stroke: '#e08a2e' },
  brown: { fill: '#bd9270', stroke: '#8f6b4d' },
  black: { fill: '#5f5a60', stroke: '#3d383e', ink: '#ffffff' },
  white: { fill: '#fdfdfb', stroke: '#c9c2ba' },
}

function ColorBlob({ size, color }: ArtProps & { color: string }) {
  const c = COLOR_STYLES[color] ?? COLOR_STYLES.pink
  const ink = c.ink ?? INK
  return (
    <Frame size={size}>
      <path
        d="M62 12 C90 10 108 34 106 60 C104 90 86 108 58 106 C30 104 12 86 14 58 C16 30 34 14 62 12 Z"
        fill={c.fill}
        stroke={c.stroke}
        strokeWidth={4}
      />
      <Eye x={46} y={58} ink={ink} />
      <Eye x={74} y={58} ink={ink} />
      <Smile y={70} ink={ink} />
      <circle cx={38} cy={68} r={5.5} fill={BLUSH} opacity={c.ink ? 0.8 : 0.55} />
      <circle cx={82} cy={68} r={5.5} fill={BLUSH} opacity={c.ink ? 0.8 : 0.55} />
      <Sparkle x={84} y={32} s={7} />
      <Sparkle x={30} y={40} s={4} />
    </Frame>
  )
}

/* ---------- 字母火车的单词 ---------- */

function Apple({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M60 30 Q58 16 66 10" stroke="#8f6b4d" strokeWidth={5} fill="none" />
      <path d="M64 20 Q84 8 92 22 Q76 32 64 20 Z" fill="#8fd694" stroke="#5fb167" strokeWidth={3.5} />
      <path d="M60 34 Q40 20 26 38 Q14 56 26 80 Q38 104 60 100 Q82 104 94 80 Q106 56 94 38 Q80 20 60 34 Z" fill="#ff8a80" stroke="#e05a50" strokeWidth={4} />
      <Eye x={46} y={62} />
      <Eye x={74} y={62} />
      <Smile y={74} />
      <Cheeks y={72} dx={26} />
      <Sparkle x={38} y={46} s={6} />
    </Frame>
  )
}

function OrangeFruit({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M60 24 Q60 14 68 10" stroke="#8f6b4d" strokeWidth={5} fill="none" />
      <path d="M62 18 Q80 6 90 18 Q76 28 62 18 Z" fill="#8fd694" stroke="#5fb167" strokeWidth={3.5} />
      <circle cx={60} cy={66} r={40} fill="#ffb066" stroke="#e08a2e" strokeWidth={4} />
      <circle cx={40} cy={44} r={2} fill="#e08a2e" opacity={0.5} />
      <circle cx={82} cy={48} r={2} fill="#e08a2e" opacity={0.5} />
      <circle cx={88} cy={78} r={2} fill="#e08a2e" opacity={0.5} />
      <circle cx={32} cy={76} r={2} fill="#e08a2e" opacity={0.5} />
      <Eye x={46} y={62} />
      <Eye x={74} y={62} />
      <Smile y={74} />
      <Cheeks y={72} dx={26} />
      <Sparkle x={80} y={36} s={6} />
    </Frame>
  )
}

function Egg({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M60 10 C82 10 96 42 96 68 C96 92 80 108 60 108 C40 108 24 92 24 68 C24 42 38 10 60 10 Z" fill="#fdfaf2" stroke="#d8c9b4" strokeWidth={4} />
      <Eye x={47} y={62} />
      <Eye x={73} y={62} />
      <Smile y={73} w={7} />
      <Cheeks y={71} dx={23} r={5.5} />
      <Sparkle x={42} y={34} s={5} color="#eee3cf" />
    </Frame>
  )
}

function Sun({ size }: ArtProps) {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 8
    const x1 = 60 + Math.cos(a) * 38
    const y1 = 60 + Math.sin(a) * 38
    const x2 = 60 + Math.cos(a) * 52
    const y2 = 60 + Math.sin(a) * 52
    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f2b53c" strokeWidth={7} />
  })
  return (
    <Frame size={size}>
      {rays}
      <circle cx={60} cy={60} r={32} fill="#ffd75e" stroke="#e0ae2f" strokeWidth={4} />
      <Eye x={49} y={56} />
      <Eye x={71} y={56} />
      <Smile y={67} w={7} />
      <Cheeks y={65} dx={20} r={5} />
    </Frame>
  )
}

function IceCream({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M38 58 L60 110 L82 58 Z" fill="#f2c98a" stroke="#c9a06a" strokeWidth={4} />
      <path d="M45 66 L75 66 M50 78 L72 78 M55 90 L66 90" stroke="#c9a06a" strokeWidth={2.5} />
      <path d="M32 50 Q30 20 60 20 Q90 20 88 50 Q94 62 82 62 L38 62 Q26 62 32 50 Z" fill="#ffc0d5" stroke="#e987ad" strokeWidth={4} />
      <path d="M46 62 Q46 72 52 62 M64 62 Q64 74 70 62" fill="#ffc0d5" stroke="#e987ad" strokeWidth={3.5} />
      <circle cx={60} cy={14} r={7} fill="#ff8a80" stroke="#e05a50" strokeWidth={3.5} />
      <Eye x={49} y={42} r={4.5} />
      <Eye x={71} y={42} r={4.5} />
      <Smile y={51} w={6} />
      <Cheeks y={49} dx={19} r={4.5} />
    </Frame>
  )
}

function Lion({ size }: ArtProps) {
  const mane = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 10
    return <circle key={i} cx={60 + Math.cos(a) * 36} cy={62 + Math.sin(a) * 36} r={15} fill="#f2a24d" />
  })
  return (
    <Frame size={size}>
      <g stroke="#cd7f2e" strokeWidth={3}>{mane}</g>
      <circle cx={60} cy={62} r={33} fill="#ffcf8f" stroke="#dca253" strokeWidth={4} />
      <Eye x={47} y={56} />
      <Eye x={73} y={56} />
      <ellipse cx={60} cy={68} rx={5.5} ry={4.5} fill="#a56a3a" />
      <path d="M60 72 Q60 77 60 77 M54 81 Q60 85 66 81" stroke={INK} strokeWidth={3} fill="none" />
      <Cheeks y={68} dx={24} r={5} />
    </Frame>
  )
}

function Tiger({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <circle cx={32} cy={30} r={12} fill="#ffb066" stroke="#e08a2e" strokeWidth={4} />
      <circle cx={88} cy={30} r={12} fill="#ffb066" stroke="#e08a2e" strokeWidth={4} />
      <circle cx={32} cy={30} r={5.5} fill="#ffe0c2" />
      <circle cx={88} cy={30} r={5.5} fill="#ffe0c2" />
      <circle cx={60} cy={66} r={38} fill="#ffb066" stroke="#e08a2e" strokeWidth={4} />
      <path d="M56 30 L60 40 L64 30 M38 38 L46 46 M82 38 L74 46" stroke="#8a5220" strokeWidth={5} fill="none" />
      <path d="M22 60 L32 62 M22 74 L32 72 M98 60 L88 62 M98 74 L88 72" stroke="#8a5220" strokeWidth={5} />
      <ellipse cx={60} cy={80} rx={16} ry={12} fill="#ffe0c2" />
      <Eye x={46} y={60} />
      <Eye x={74} y={60} />
      <ellipse cx={60} cy={75} rx={5.5} ry={4.5} fill="#a56a3a" />
      <path d="M54 86 Q60 90 66 86" stroke={INK} strokeWidth={3} fill="none" />
      <Cheeks y={70} dx={28} r={5} />
    </Frame>
  )
}

/* ---------- 界面图标 ---------- */

export function TrainArt({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <rect x={14} y={44} width={54} height={40} rx={10} fill="#8fc4f2" stroke="#5b93c9" strokeWidth={4} />
      <rect x={22} y={52} width={16} height={14} rx={5} fill="#e9f4fd" stroke="#5b93c9" strokeWidth={3} />
      <rect x={68} y={30} width={34} height={54} rx={10} fill="#ff9fbe" stroke="#e5749c" strokeWidth={4} />
      <rect x={76} y={12} width={12} height={20} rx={4} fill="#ffd75e" stroke="#dfae2f" strokeWidth={3.5} />
      <circle cx={95} cy={12} r={5} fill="#fff" stroke="#c9c2ba" strokeWidth={3} opacity={0.9} />
      <Eye x={78} y={50} r={4.5} />
      <Eye x={94} y={50} r={4.5} />
      <Smile x={86} y={60} w={6} />
      <circle cx={30} cy={92} r={10} fill="#6b5b52" stroke={INK} strokeWidth={3.5} />
      <circle cx={56} cy={92} r={10} fill="#6b5b52" stroke={INK} strokeWidth={3.5} />
      <circle cx={86} cy={92} r={10} fill="#6b5b52" stroke={INK} strokeWidth={3.5} />
      <circle cx={30} cy={92} r={3.5} fill="#e8dcc8" />
      <circle cx={56} cy={92} r={3.5} fill="#e8dcc8" />
      <circle cx={86} cy={92} r={3.5} fill="#e8dcc8" />
    </Frame>
  )
}

export function PawArt({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <ellipse cx={34} cy={38} rx={11} ry={14} fill="#c69a6d" stroke="#9c744c" strokeWidth={4} />
      <ellipse cx={60} cy={30} rx={11} ry={14} fill="#c69a6d" stroke="#9c744c" strokeWidth={4} />
      <ellipse cx={86} cy={38} rx={11} ry={14} fill="#c69a6d" stroke="#9c744c" strokeWidth={4} />
      <path d="M60 54 Q88 54 92 78 Q94 98 60 98 Q26 98 28 78 Q32 54 60 54 Z" fill="#e8c8a2" stroke="#c9a06a" strokeWidth={4} />
      <Sparkle x={78} y={72} s={5} />
    </Frame>
  )
}

export function PaletteArt({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <circle cx={42} cy={44} r={26} fill="#ff8a80" stroke="#e05a50" strokeWidth={4} opacity={0.92} />
      <circle cx={78} cy={44} r={26} fill="#7db8f5" stroke="#5590d4" strokeWidth={4} opacity={0.92} />
      <circle cx={60} cy={76} r={26} fill="#ffd75e" stroke="#dfae2f" strokeWidth={4} opacity={0.92} />
      <Sparkle x={60} y={52} s={7} />
    </Frame>
  )
}

export function BadgeArt({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M45 68 L36 108 L60 94 L84 108 L75 68 Z" fill="#7db8f5" stroke="#5590d4" strokeWidth={4} />
      <circle cx={60} cy={48} r={34} fill="#ffd75e" stroke="#dfae2f" strokeWidth={4} />
      <path d="M60 28 L66 42 L82 43 L70 53 L74 68 L60 60 L46 68 L50 53 L38 43 L54 42 Z" fill="#fff" stroke="#dfae2f" strokeWidth={3} />
    </Frame>
  )
}

/* ---------- 注册表 ---------- */

type ArtComp = (p: ArtProps) => ReactNode

const REGISTRY: Record<string, ArtComp> = {
  cat: Cat,
  dog: Dog,
  duck: Duck,
  pig: Pig,
  bird: Bird,
  fish: Fish,
  rabbit: p => <BunnyArt {...p} />,
  bear: Bear,
  cow: Cow,
  sheep: Sheep,
  apple: Apple,
  'orange-fruit': OrangeFruit,
  egg: Egg,
  sun: Sun,
  'ice cream': IceCream,
  lion: Lion,
  tiger: Tiger,
}

for (const color of Object.keys(COLOR_STYLES)) {
  REGISTRY[color] = p => <ColorBlob {...p} color={color} />
}

export function hasArt(name: string): boolean {
  return name in REGISTRY
}

/** 按单词渲染卡通图；没有素材时回退到 emoji */
export function Art({ name, fallback, size = 96 }: { name: string; fallback?: string; size?: number }) {
  const C = REGISTRY[name]
  if (C) return <C size={size} />
  return (
    <span style={{ fontSize: size * 0.8, lineHeight: 1 }} role="img">
      {fallback ?? name}
    </span>
  )
}
