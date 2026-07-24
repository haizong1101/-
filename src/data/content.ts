// 课程内容：主题岛屿 + 字母火车
// 每关只教 2 个新词（幼儿短时记忆上限），emoji 作为 MVP 阶段的美术素材

export interface Word {
  en: string
  zh: string
  emoji: string
  /** 磨耳朵环节的扩展语料，如拟声词 */
  flavor?: string
  /** 卡通素材键名，默认取 en */
  art?: string
}

export interface Level {
  id: string
  title: string
  words: Word[]
}

export interface Island {
  id: string
  name: string
  nameEn: string
  emoji: string
  color: string
  levels: Level[]
}

export const ISLANDS: Island[] = [
  {
    id: 'animals',
    name: '动物岛',
    nameEn: 'Animal Island',
    emoji: '🐾',
    color: '#d3f2df',
    levels: [
      {
        id: 'an1',
        title: '小猫小狗',
        words: [
          { en: 'cat', zh: '小猫', emoji: '🐱', flavor: 'Meow meow!' },
          { en: 'dog', zh: '小狗', emoji: '🐶', flavor: 'Woof woof!' },
        ],
      },
      {
        id: 'an2',
        title: '鸭子小猪',
        words: [
          { en: 'duck', zh: '鸭子', emoji: '🦆', flavor: 'Quack quack!' },
          { en: 'pig', zh: '小猪', emoji: '🐷', flavor: 'Oink oink!' },
        ],
      },
      {
        id: 'an3',
        title: '小鸟小鱼',
        words: [
          { en: 'bird', zh: '小鸟', emoji: '🐦', flavor: 'Tweet tweet!' },
          { en: 'fish', zh: '小鱼', emoji: '🐟', flavor: 'Blub blub!' },
        ],
      },
      {
        id: 'an4',
        title: '兔子小熊',
        words: [
          { en: 'rabbit', zh: '兔子', emoji: '🐰', flavor: 'Hop hop!' },
          { en: 'bear', zh: '小熊', emoji: '🐻', flavor: 'Grr grr!' },
        ],
      },
      {
        id: 'an5',
        title: '奶牛绵羊',
        words: [
          { en: 'cow', zh: '奶牛', emoji: '🐮', flavor: 'Moo moo!' },
          { en: 'sheep', zh: '绵羊', emoji: '🐑', flavor: 'Baa baa!' },
        ],
      },
    ],
  },
  {
    id: 'colors',
    name: '颜色泡泡',
    nameEn: 'Color Bubbles',
    emoji: '🫧',
    color: '#dbeeff',
    levels: [
      {
        id: 'co1',
        title: '红色蓝色',
        words: [
          { en: 'red', zh: '红色', emoji: '🔴' },
          { en: 'blue', zh: '蓝色', emoji: '🔵' },
        ],
      },
      {
        id: 'co2',
        title: '黄色绿色',
        words: [
          { en: 'yellow', zh: '黄色', emoji: '🟡' },
          { en: 'green', zh: '绿色', emoji: '🟢' },
        ],
      },
      {
        id: 'co3',
        title: '粉色紫色',
        words: [
          { en: 'pink', zh: '粉色', emoji: '🌸' },
          { en: 'purple', zh: '紫色', emoji: '🟣' },
        ],
      },
      {
        id: 'co4',
        title: '橙色棕色',
        words: [
          { en: 'orange', zh: '橙色', emoji: '🟠' },
          { en: 'brown', zh: '棕色', emoji: '🟤' },
        ],
      },
      {
        id: 'co5',
        title: '黑色白色',
        words: [
          { en: 'black', zh: '黑色', emoji: '⚫' },
          { en: 'white', zh: '白色', emoji: '⚪' },
        ],
      },
    ],
  },
  {
    id: 'food',
    name: '美食街',
    nameEn: 'Yummy Street',
    emoji: '🍰',
    color: '#ffe9d2',
    levels: [
      {
        id: 'fo1',
        title: '香蕉牛奶',
        words: [
          { en: 'banana', zh: '香蕉', emoji: '🍌', flavor: 'Yummy yummy!' },
          { en: 'milk', zh: '牛奶', emoji: '🥛', flavor: 'Gulp gulp!' },
        ],
      },
      {
        id: 'fo2',
        title: '面包蛋糕',
        words: [
          { en: 'bread', zh: '面包', emoji: '🍞', flavor: 'Yummy!' },
          { en: 'cake', zh: '蛋糕', emoji: '🎂', flavor: 'Happy birthday!' },
        ],
      },
      {
        id: 'fo3',
        title: '果汁葡萄',
        words: [
          { en: 'juice', zh: '果汁', emoji: '🧃', flavor: 'Slurp slurp!' },
          { en: 'grapes', zh: '葡萄', emoji: '🍇', flavor: 'Yummy!' },
        ],
      },
      {
        id: 'fo4',
        title: '苹果鸡蛋',
        words: [
          { en: 'apple', zh: '苹果', emoji: '🍎', flavor: 'Crunch crunch!' },
          { en: 'egg', zh: '鸡蛋', emoji: '🥚' },
        ],
      },
    ],
  },
  {
    id: 'body',
    name: '身体小屋',
    nameEn: 'My Body',
    emoji: '👋',
    color: '#ffe3ec',
    levels: [
      {
        id: 'bo1',
        title: '眼睛鼻子',
        words: [
          { en: 'eye', zh: '眼睛', emoji: '👁️', flavor: 'Blink blink!' },
          { en: 'nose', zh: '鼻子', emoji: '👃', flavor: 'Sniff sniff!' },
        ],
      },
      {
        id: 'bo2',
        title: '嘴巴耳朵',
        words: [
          { en: 'mouth', zh: '嘴巴', emoji: '👄', flavor: 'Ah ah ah!' },
          { en: 'ear', zh: '耳朵', emoji: '👂' },
        ],
      },
      {
        id: 'bo3',
        title: '小手小脚',
        words: [
          { en: 'hand', zh: '小手', emoji: '✋', flavor: 'Clap clap!' },
          { en: 'foot', zh: '小脚', emoji: '🦶', flavor: 'Stomp stomp!' },
        ],
      },
    ],
  },
]

// ---- 字母火车 ----
// MVP 首发 8 个字母，按书写难度排序（先简单字形）
// strokes: 100x100 viewBox 内的 SVG path，一条 path 一笔

export interface Letter {
  char: string
  /** 字母音的口语化提示，交给 TTS 朗读 */
  sound: string
  word: Word
  strokes: string[]
}

// 学习顺序：按书写难度分组（先简单笔画，后复杂字形）
export const LETTERS: Letter[] = [
  {
    char: 'O',
    sound: 'o',
    word: { en: 'orange', zh: '橙子', emoji: '🍊', art: 'orange-fruit' },
    strokes: ['M50 14 A 33 36 0 1 0 50 86 A 33 36 0 1 0 50 14'],
  },
  {
    char: 'C',
    sound: 'kuh',
    word: { en: 'cat', zh: '小猫', emoji: '🐱' },
    strokes: ['M76 28 A 34 34 0 1 0 76 72'],
  },
  {
    char: 'I',
    sound: 'ih',
    word: { en: 'ice cream', zh: '冰淇淋', emoji: '🍦' },
    strokes: ['M50 15 L50 85'],
  },
  {
    char: 'L',
    sound: 'lll',
    word: { en: 'lion', zh: '狮子', emoji: '🦁' },
    strokes: ['M32 15 L32 85 L76 85'],
  },
  {
    char: 'T',
    sound: 'tuh',
    word: { en: 'tiger', zh: '老虎', emoji: '🐯' },
    strokes: ['M20 18 L80 18', 'M50 18 L50 85'],
  },
  {
    char: 'E',
    sound: 'eh',
    word: { en: 'egg', zh: '鸡蛋', emoji: '🥚' },
    strokes: ['M72 15 L28 15 L28 85 L72 85', 'M28 50 L62 50'],
  },
  {
    char: 'A',
    sound: 'ah',
    word: { en: 'apple', zh: '苹果', emoji: '🍎' },
    strokes: ['M50 12 L22 88', 'M50 12 L78 88', 'M33 62 L67 62'],
  },
  {
    char: 'S',
    sound: 'sss',
    word: { en: 'sun', zh: '太阳', emoji: '☀️' },
    strokes: ['M70 24 C 52 8, 24 20, 32 40 C 38 54, 66 50, 69 66 C 72 86, 42 94, 27 78'],
  },
  {
    char: 'H',
    sound: 'huh',
    word: { en: 'hand', zh: '小手', emoji: '✋' },
    strokes: ['M32 15 L32 85', 'M88 15 L88 85', 'M32 50 L88 50'],
  },
  {
    char: 'J',
    sound: 'juh',
    word: { en: 'juice', zh: '果汁', emoji: '🧃' },
    strokes: ['M70 15 L70 66 A 19 19 0 0 1 32 66'],
  },
  {
    char: 'U',
    sound: 'uh',
    word: { en: 'umbrella', zh: '雨伞', emoji: '☂️' },
    strokes: ['M30 15 L30 58 A 30 27 0 0 0 90 58 L90 15'],
  },
  {
    char: 'F',
    sound: 'fff',
    word: { en: 'fish', zh: '小鱼', emoji: '🐟' },
    strokes: ['M74 15 L32 15 L32 85', 'M32 50 L66 50'],
  },
  {
    char: 'D',
    sound: 'duh',
    word: { en: 'dog', zh: '小狗', emoji: '🐶' },
    strokes: ['M34 15 L34 85', 'M34 15 L46 15 A 37 35 0 0 1 46 85 L34 85'],
  },
  {
    char: 'P',
    sound: 'puh',
    word: { en: 'pig', zh: '小猪', emoji: '🐷' },
    strokes: ['M34 15 L34 85', 'M34 18 L56 18 A 19 19 0 1 1 56 56 L34 56'],
  },
  {
    char: 'B',
    sound: 'buh',
    word: { en: 'ball', zh: '皮球', emoji: '⚽' },
    strokes: ['M32 15 L32 85', 'M32 16 L54 16 A 16 16 0 1 1 54 49 L32 49', 'M32 49 L58 49 A 18 18 0 1 1 58 85 L32 85'],
  },
  {
    char: 'R',
    sound: 'rrr',
    word: { en: 'rabbit', zh: '兔子', emoji: '🐰' },
    strokes: ['M32 15 L32 85', 'M32 18 L56 18 A 19 19 0 1 1 56 55 L32 55', 'M52 55 L82 85'],
  },
  {
    char: 'K',
    sound: 'kuh',
    word: { en: 'kite', zh: '风筝', emoji: '🪁' },
    strokes: ['M32 15 L32 85', 'M80 18 L34 52 L82 85'],
  },
  {
    char: 'N',
    sound: 'nnn',
    word: { en: 'nose', zh: '鼻子', emoji: '👃' },
    strokes: ['M32 85 L32 15 L88 85 L88 15'],
  },
  {
    char: 'M',
    sound: 'mmm',
    word: { en: 'milk', zh: '牛奶', emoji: '🥛' },
    strokes: ['M26 85 L26 15 L60 62 L94 15 L94 85'],
  },
  {
    char: 'V',
    sound: 'vvv',
    word: { en: 'van', zh: '小货车', emoji: '🚐' },
    strokes: ['M28 15 L60 88 L92 15'],
  },
  {
    char: 'W',
    sound: 'wuh',
    word: { en: 'whale', zh: '鲸鱼', emoji: '🐳' },
    strokes: ['M20 15 L37 85 L60 38 L83 85 L100 15'],
  },
  {
    char: 'X',
    sound: 'ks',
    word: { en: 'fox', zh: '狐狸', emoji: '🦊' },
    strokes: ['M30 15 L90 85', 'M90 15 L30 85'],
  },
  {
    char: 'Y',
    sound: 'yuh',
    word: { en: 'yellow', zh: '黄色', emoji: '🟡' },
    strokes: ['M28 15 L60 52', 'M92 15 L60 52 L60 88'],
  },
  {
    char: 'Z',
    sound: 'zzz',
    word: { en: 'zebra', zh: '斑马', emoji: '🦓' },
    strokes: ['M28 18 L92 18 L28 82 L92 82'],
  },
  {
    char: 'G',
    sound: 'guh',
    word: { en: 'grapes', zh: '葡萄', emoji: '🍇' },
    strokes: ['M78 26 A 34 35 0 1 0 80 62 L58 62'],
  },
  {
    char: 'Q',
    sound: 'kwuh',
    word: { en: 'queen', zh: '女王', emoji: '👑' },
    strokes: ['M50 14 A 33 36 0 1 0 50 86 A 33 36 0 1 0 50 14', 'M62 66 L86 92'],
  },
]

export const PRAISES = ['Wonderful!', 'Great job!', 'Amazing!', 'Super!', 'You did it!']
export const PRAISES_ZH = ['你真棒！', '太厉害啦！', '好棒呀！', '真了不起！']

export function randomOf<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
