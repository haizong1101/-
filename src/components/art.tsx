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

/* ---------- 美食街 ---------- */

function Banana({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M26 26 Q20 70 52 92 Q88 106 102 78 Q96 88 66 80 Q34 68 36 28 Q34 18 30 18 Q26 18 26 26 Z" fill="#ffe08a" stroke="#dfae2f" strokeWidth={4} />
      <path d="M28 20 L36 20" stroke="#8f6b4d" strokeWidth={6} />
      <Eye x={56} y={70} r={4.5} />
      <Eye x={76} y={74} r={4.5} />
      <path d="M60 82 Q66 87 72 83" stroke={INK} strokeWidth={3} fill="none" />
      <circle cx={48} cy={78} r={4.5} fill={BLUSH} opacity={0.6} />
      <circle cx={86} cy={82} r={4.5} fill={BLUSH} opacity={0.6} />
    </Frame>
  )
}

function Milk({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M36 40 L36 100 Q36 106 42 106 L78 106 Q84 106 84 100 L84 40 L74 22 L46 22 Z" fill="#fdfbf5" stroke="#c9b298" strokeWidth={4} />
      <path d="M36 40 L84 40" stroke="#c9b298" strokeWidth={3} />
      <path d="M46 22 L60 40 L60 106 M74 22 L60 40" stroke="#c9b298" strokeWidth={2.5} opacity={0.5} />
      <path d="M44 58 Q52 52 60 58 Q68 64 76 58 L76 92 L44 92 Z" fill="#aed4f5" opacity={0.7} />
      <Eye x={52} y={72} r={4.5} />
      <Eye x={68} y={72} r={4.5} />
      <Smile y={81} w={6} />
      <Cheeks y={79} dx={16} cx={60} r={4} />
    </Frame>
  )
}

function Bread({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M18 62 Q14 34 40 32 Q50 20 66 26 Q84 20 92 34 Q106 40 100 62 L100 84 Q100 94 88 94 L30 94 Q18 94 18 84 Z" fill="#f2c98a" stroke="#c9a06a" strokeWidth={4} />
      <path d="M30 46 Q36 40 42 46 M56 40 Q62 34 68 40 M80 48 Q86 42 92 48" stroke="#c9a06a" strokeWidth={3} fill="none" opacity={0.6} />
      <Eye x={48} y={66} r={4.5} />
      <Eye x={72} y={66} r={4.5} />
      <Smile y={76} w={7} />
      <Cheeks y={74} dx={22} r={5} />
    </Frame>
  )
}

function Cake({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <rect x={22} y={58} width={76} height={40} rx={10} fill="#ffc0d5" stroke="#e987ad" strokeWidth={4} />
      <path d="M22 70 Q30 80 38 70 Q46 80 54 70 Q62 80 70 70 Q78 80 86 70 Q94 80 98 70" stroke="#e987ad" strokeWidth={3.5} fill="none" />
      <rect x={34} y={40} width={52} height={20} rx={8} fill="#fdf2df" stroke="#d3ae7e" strokeWidth={4} />
      <rect x={57} y={18} width={6} height={16} rx={3} fill="#8fc4f2" stroke="#5b93c9" strokeWidth={2.5} />
      <path d="M60 12 Q64 16 60 20 Q56 16 60 12 Z" fill="#ffd75e" stroke="#e0ae2f" strokeWidth={2.5} />
      <Eye x={48} y={82} r={4.5} />
      <Eye x={72} y={82} r={4.5} />
      <Smile y={90} w={6} />
    </Frame>
  )
}

function Juice({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M34 34 L42 104 Q43 108 48 108 L72 108 Q77 108 78 104 L86 34 Z" fill="#ffd9a1" stroke="#e08a2e" strokeWidth={4} />
      <path d="M37 52 L83 52" stroke="#e08a2e" strokeWidth={3} opacity={0.5} />
      <path d="M70 30 L84 10" stroke="#ff8a80" strokeWidth={7} strokeLinecap="round" />
      <circle cx={90} cy={26} r={11} fill="#ffb066" stroke="#e08a2e" strokeWidth={3.5} />
      <path d="M90 17 L90 35 M81 26 L99 26" stroke="#e08a2e" strokeWidth={2} opacity={0.6} />
      <Eye x={52} y={72} r={4.5} />
      <Eye x={70} y={72} r={4.5} />
      <Smile y={82} w={6} x={61} />
      <Cheeks y={80} dx={17} cx={61} r={4.5} />
    </Frame>
  )
}

function Grapes({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M60 24 Q58 12 66 6" stroke="#8f6b4d" strokeWidth={5} fill="none" />
      <path d="M62 18 Q80 6 90 18 Q76 28 62 18 Z" fill="#8fd694" stroke="#5fb167" strokeWidth={3.5} />
      <g fill="#c1a0e8" stroke="#9668c9" strokeWidth={3.5}>
        <circle cx={42} cy={40} r={13} />
        <circle cx={78} cy={40} r={13} />
        <circle cx={60} cy={34} r={13} />
        <circle cx={32} cy={62} r={13} />
        <circle cx={88} cy={62} r={13} />
        <circle cx={46} cy={82} r={13} />
        <circle cx={74} cy={82} r={13} />
        <circle cx={60} cy={60} r={16} />
        <circle cx={60} cy={98} r={12} />
      </g>
      <Eye x={53} y={57} r={4.5} />
      <Eye x={69} y={57} r={4.5} />
      <Smile y={66} w={6} />
      <Sparkle x={38} y={34} s={4} />
    </Frame>
  )
}

/* ---------- 身体小屋 ---------- */

function EyeArt({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M14 60 Q60 18 106 60 Q60 102 14 60 Z" fill="#fff" stroke="#c9b298" strokeWidth={4} />
      <circle cx={60} cy={60} r={22} fill="#8fc4f2" stroke="#5b93c9" strokeWidth={4} />
      <circle cx={60} cy={60} r={11} fill={INK} />
      <circle cx={66} cy={54} r={4.5} fill="#fff" />
      <path d="M26 40 Q22 32 16 32 M42 28 Q40 20 34 18 M60 24 L60 14 M78 28 Q80 20 86 18 M94 40 Q98 32 104 32" stroke={INK} strokeWidth={3.5} fill="none" />
    </Frame>
  )
}

function Nose({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <circle cx={60} cy={60} r={44} fill="#ffe9d9" stroke="#e8c4a8" strokeWidth={4} opacity={0.7} />
      <path d="M60 34 Q52 56 48 66 Q44 80 60 80 Q76 80 72 66 Q68 56 60 34 Z" fill="#ffc3a1" stroke="#e08a5e" strokeWidth={4} />
      <ellipse cx={54} cy={74} rx={3} ry={4} fill="#c9764a" opacity={0.7} />
      <ellipse cx={66} cy={74} rx={3} ry={4} fill="#c9764a" opacity={0.7} />
      <Cheeks y={78} dx={32} r={6} />
      <Sparkle x={86} y={34} s={5} color="#f5cfae" />
    </Frame>
  )
}

function Mouth({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <circle cx={60} cy={58} r={44} fill="#ffe9d9" stroke="#e8c4a8" strokeWidth={4} opacity={0.7} />
      <path d="M28 52 Q60 60 92 52 Q88 92 60 92 Q32 92 28 52 Z" fill="#d95f76" stroke="#b34257" strokeWidth={4} />
      <path d="M34 54 Q60 62 86 54 Q84 64 78 66 Q60 70 42 66 Q36 64 34 54 Z" fill="#fff" />
      <path d="M44 82 Q60 88 76 82 Q68 78 60 78 Q52 78 44 82 Z" fill="#ff8fae" />
      <Cheeks y={64} dx={40} r={6} />
    </Frame>
  )
}

function Ear({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M42 44 Q42 14 66 16 Q92 18 88 46 Q86 66 72 76 Q62 84 62 96 Q60 108 46 104 Q34 100 40 86" fill="#ffd9be" stroke="#e0a882" strokeWidth={4} />
      <path d="M56 44 Q58 30 70 32 Q80 34 76 48 Q74 58 64 62" stroke="#e0a882" strokeWidth={4} fill="none" />
      <Cheeks y={92} dx={0} cx={84} r={5} />
      <Sparkle x={26} y={34} s={5} color="#f5cfae" />
      <path d="M18 56 Q24 60 18 66 M14 44 Q22 48 16 54" stroke="#c9b298" strokeWidth={3} fill="none" opacity={0.7} />
    </Frame>
  )
}

function Hand({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path
        d="M42 100 Q30 88 28 66 Q28 58 34 58 Q40 58 41 66 L43 74 L43 34 Q43 26 49 26 Q55 26 55 34 L55 68 L57 24 Q57 16 63 16 Q69 16 69 24 L69 68 L73 30 Q74 22 80 23 Q86 24 85 32 L82 70 L88 56 Q91 48 97 51 Q102 54 99 62 Q92 84 84 96 Q76 108 60 108 Q48 108 42 100 Z"
        fill="#ffd9be"
        stroke="#e0a882"
        strokeWidth={4}
      />
      <Cheeks y={88} dx={14} cx={62} r={5} />
      <Sparkle x={24} y={28} s={6} color="#f5cfae" />
    </Frame>
  )
}

function Foot({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M38 66 Q34 30 58 28 Q84 26 84 62 Q84 84 78 98 Q74 108 58 106 Q42 104 40 88 Z" fill="#ffd9be" stroke="#e0a882" strokeWidth={4} />
      <circle cx={34} cy={26} r={8} fill="#ffd9be" stroke="#e0a882" strokeWidth={3.5} />
      <circle cx={48} cy={18} r={6.5} fill="#ffd9be" stroke="#e0a882" strokeWidth={3.5} />
      <circle cx={62} cy={15} r={6} fill="#ffd9be" stroke="#e0a882" strokeWidth={3.5} />
      <circle cx={75} cy={18} r={5.5} fill="#ffd9be" stroke="#e0a882" strokeWidth={3.5} />
      <circle cx={86} cy={25} r={5} fill="#ffd9be" stroke="#e0a882" strokeWidth={3.5} />
      <ellipse cx={60} cy={80} rx={14} ry={10} fill={BLUSH} opacity={0.45} />
      <Sparkle x={98} y={48} s={5} color="#f5cfae" />
    </Frame>
  )
}

/* ---------- 字母火车新单词 ---------- */

function Ball({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <circle cx={60} cy={60} r={44} fill="#fdfbf5" stroke="#c9645e" strokeWidth={4} />
      <path d="M60 16 Q38 60 60 104 Q82 60 60 16 Z" fill="#ff8a80" stroke="#e05a50" strokeWidth={3.5} />
      <path d="M16 60 Q60 40 104 60 Q60 80 16 60 Z" fill="#7db8f5" stroke="#5590d4" strokeWidth={3.5} opacity={0.9} />
      <circle cx={60} cy={60} r={12} fill="#ffd75e" stroke="#dfae2f" strokeWidth={3.5} />
      <Sparkle x={84} y={30} s={6} />
    </Frame>
  )
}

function Kite({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M60 8 L96 46 L60 84 L24 46 Z" fill="#ffb1cd" stroke="#e987ad" strokeWidth={4} />
      <path d="M60 8 L60 84 M24 46 L96 46" stroke="#e987ad" strokeWidth={3} opacity={0.6} />
      <path d="M60 84 Q54 96 60 104 Q66 110 60 116" stroke="#c9b298" strokeWidth={3} fill="none" />
      <path d="M50 96 L58 92 L54 100 Z" fill="#ffd75e" stroke="#dfae2f" strokeWidth={2.5} />
      <path d="M64 106 L72 102 L68 110 Z" fill="#8fd694" stroke="#5fb167" strokeWidth={2.5} />
      <Eye x={52} y={42} r={4.5} />
      <Eye x={70} y={42} r={4.5} />
      <Smile y={52} w={6} />
      <Cheeks y={50} dx={17} r={4} />
    </Frame>
  )
}

function Queen({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M32 38 L36 14 L48 30 L60 10 L72 30 L84 14 L88 38 Z" fill="#ffd75e" stroke="#dfae2f" strokeWidth={4} />
      <circle cx={36} cy={14} r={4} fill="#ff8a80" />
      <circle cx={60} cy={10} r={4} fill="#7db8f5" />
      <circle cx={84} cy={14} r={4} fill="#8fd694" />
      <circle cx={60} cy={72} r={34} fill="#ffe3d0" stroke="#e0a882" strokeWidth={4} />
      <path d="M28 66 Q22 90 34 100 M92 66 Q98 90 86 100" stroke="#b5835a" strokeWidth={7} fill="none" />
      <Eye x={48} y={68} />
      <Eye x={72} y={68} />
      <Smile y={80} w={7} />
      <Cheeks y={78} dx={22} r={5.5} />
    </Frame>
  )
}

function Umbrella({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M60 10 Q18 14 14 56 Q22 48 32 56 Q42 46 52 56 Q56 50 60 50 Q64 50 68 56 Q78 46 88 56 Q98 48 106 56 Q102 14 60 10 Z" fill="#c1a0e8" stroke="#9668c9" strokeWidth={4} />
      <path d="M60 10 L60 6" stroke="#9668c9" strokeWidth={4} />
      <path d="M60 52 L60 96 Q60 108 48 106 Q40 104 42 96" stroke="#9668c9" strokeWidth={5} fill="none" />
      <Eye x={48} y={34} r={4.5} />
      <Eye x={72} y={34} r={4.5} />
      <Smile y={42} w={6} />
      <path d="M84 76 Q88 82 84 86 Q80 82 84 76 Z M96 88 Q100 94 96 98 Q92 94 96 88 Z" fill="#8fc4f2" stroke="#5b93c9" strokeWidth={2} />
    </Frame>
  )
}

function Van({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M14 74 L14 48 Q14 40 22 40 L64 40 L78 24 Q80 22 84 22 L94 22 Q102 22 102 30 L106 48 L106 74 Q106 80 100 80 L20 80 Q14 80 14 74 Z" fill="#8fd694" stroke="#5fb167" strokeWidth={4} />
      <rect x={24} y={48} width={18} height={14} rx={4} fill="#e9f4fd" stroke="#5fb167" strokeWidth={3} />
      <path d="M80 30 L92 30 L96 46 L76 46 Z" fill="#e9f4fd" stroke="#5fb167" strokeWidth={3} />
      <circle cx={34} cy={84} r={11} fill="#6b5b52" stroke={INK} strokeWidth={3.5} />
      <circle cx={86} cy={84} r={11} fill="#6b5b52" stroke={INK} strokeWidth={3.5} />
      <circle cx={34} cy={84} r={4} fill="#e8dcc8" />
      <circle cx={86} cy={84} r={4} fill="#e8dcc8" />
      <Eye x={54} y={56} r={4.5} />
      <Eye x={66} y={56} r={4.5} />
      <Smile y={66} w={5} x={60} />
    </Frame>
  )
}

function Whale({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M58 30 Q56 20 60 14 M58 30 Q64 22 70 22" stroke="#5b93c9" strokeWidth={4} fill="none" />
      <path d="M12 68 Q14 38 52 36 Q94 34 100 62 Q102 70 96 76 L100 92 Q92 88 86 82 Q70 90 46 86 Q16 82 12 68 Z" fill="#8fc4f2" stroke="#5b93c9" strokeWidth={4} />
      <path d="M20 74 Q40 82 60 80" stroke="#5b93c9" strokeWidth={3} opacity={0.5} fill="none" />
      <ellipse cx={46} cy={78} rx={22} ry={8} fill="#e9f4fd" opacity={0.8} />
      <Eye x={34} y={58} />
      <Smile x={28} y={68} w={6} />
      <circle cx={26} cy={64} r={5} fill={BLUSH} opacity={0.5} />
      <circle cx={104} cy={30} r={4} fill="none" stroke="#9ed5ee" strokeWidth={3} />
      <circle cx={112} cy={42} r={2.6} fill="none" stroke="#9ed5ee" strokeWidth={2.5} />
    </Frame>
  )
}

function Fox({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M22 44 L20 12 L48 30 Z" fill="#ffab5e" stroke="#e08a2e" strokeWidth={4} />
      <path d="M98 44 L100 12 L72 30 Z" fill="#ffab5e" stroke="#e08a2e" strokeWidth={4} />
      <path d="M25 36 L24 20 L38 30 Z" fill="#fff" opacity={0.8} />
      <path d="M95 36 L96 20 L82 30 Z" fill="#fff" opacity={0.8} />
      <path d="M60 100 Q28 96 22 66 Q18 42 42 36 Q52 32 60 32 Q68 32 78 36 Q102 42 98 66 Q92 96 60 100 Z" fill="#ffab5e" stroke="#e08a2e" strokeWidth={4} />
      <path d="M60 100 Q40 96 36 76 Q44 66 60 66 Q76 66 84 76 Q80 96 60 100 Z" fill="#fff" opacity={0.85} />
      <Eye x={44} y={58} />
      <Eye x={76} y={58} />
      <ellipse cx={60} cy={80} rx={5.5} ry={4.5} fill={INK} />
      <path d="M54 90 Q60 94 66 90" stroke={INK} strokeWidth={3} fill="none" />
      <Cheeks y={68} dx={30} r={5} />
    </Frame>
  )
}

function Zebra({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M34 30 L26 8 L48 22 Z" fill="#fdfbf5" stroke="#8a8078" strokeWidth={4} />
      <path d="M86 30 L94 8 L72 22 Z" fill="#fdfbf5" stroke="#8a8078" strokeWidth={4} />
      <path d="M44 18 Q60 8 76 18 L74 30 L46 30 Z" fill="#6b5b52" />
      <circle cx={60} cy={64} r={38} fill="#fdfbf5" stroke="#8a8078" strokeWidth={4} />
      <path d="M34 40 Q44 46 40 56 M86 40 Q76 46 80 56 M52 30 L56 42 M68 30 L64 42" stroke="#6b5b52" strokeWidth={5} fill="none" />
      <ellipse cx={60} cy={82} rx={19} ry={14} fill="#e8ded4" />
      <Eye x={45} y={56} />
      <Eye x={75} y={56} />
      <ellipse cx={53} cy={84} rx={2.8} ry={4} fill={INK} />
      <ellipse cx={67} cy={84} rx={2.8} ry={4} fill={INK} />
      <Cheeks y={68} dx={28} r={5} />
    </Frame>
  )
}

/* ---------- TPR 魔法口令道具 ---------- */

export function CarrotArt({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M50 34 Q36 14 44 8 Q50 16 54 22 Q52 8 60 6 Q64 14 62 24 Q70 10 78 14 Q76 26 66 34 Z" fill="#8fd694" stroke="#5fb167" strokeWidth={3.5} />
      <path d="M46 36 Q70 30 74 44 Q80 62 62 86 Q52 100 44 88 Q30 62 38 46 Q40 38 46 36 Z" fill="#ffab5e" stroke="#e08a2e" strokeWidth={4} />
      <path d="M44 52 L58 50 M44 66 L56 64 M48 78 L58 76" stroke="#e08a2e" strokeWidth={3} opacity={0.6} />
      <Sparkle x={84} y={56} s={6} color="#ffe0b8" />
    </Frame>
  )
}

export function MoonArt({ size }: ArtProps) {
  return (
    <Frame size={size}>
      <path d="M76 12 A 48 48 0 1 0 108 74 A 38 38 0 1 1 76 12 Z" fill="#ffd75e" stroke="#e0ae2f" strokeWidth={4} />
      <Eye x={52} y={56} r={4.5} />
      <path d="M44 68 Q50 73 56 68" stroke={INK} strokeWidth={3} fill="none" />
      <circle cx={40} cy={62} r={4.5} fill={BLUSH} opacity={0.55} />
      <Sparkle x={90} y={26} s={6} color="#ffeec2" />
      <Sparkle x={100} y={48} s={4} color="#ffeec2" />
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
  banana: Banana,
  milk: Milk,
  bread: Bread,
  cake: Cake,
  juice: Juice,
  grapes: Grapes,
  eye: EyeArt,
  nose: Nose,
  mouth: Mouth,
  ear: Ear,
  hand: Hand,
  foot: Foot,
  ball: Ball,
  kite: Kite,
  queen: Queen,
  umbrella: Umbrella,
  van: Van,
  whale: Whale,
  fox: Fox,
  zebra: Zebra,
  carrot: CarrotArt,
  moon: MoonArt,
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
