// 课程内容：主题岛屿 + 字母火车
// 每关只教 2 个新词（幼儿短时记忆上限），emoji 作为 MVP 阶段的美术素材

export interface Word {
  en: string
  zh: string
  emoji: string
  /** 磨耳朵环节的扩展语料，如拟声词 */
  flavor?: string
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

export const LETTERS: Letter[] = [
  {
    char: 'O',
    sound: 'o',
    word: { en: 'orange', zh: '橙子', emoji: '🍊' },
    strokes: ['M50 14 A 33 36 0 1 0 50 86 A 33 36 0 1 0 50 14'],
  },
  {
    char: 'C',
    sound: 'k',
    word: { en: 'cat', zh: '小猫', emoji: '🐱' },
    strokes: ['M76 28 A 34 34 0 1 0 76 72'],
  },
  {
    char: 'I',
    sound: 'i',
    word: { en: 'ice cream', zh: '冰淇淋', emoji: '🍦' },
    strokes: ['M50 15 L50 85'],
  },
  {
    char: 'L',
    sound: 'l',
    word: { en: 'lion', zh: '狮子', emoji: '🦁' },
    strokes: ['M32 15 L32 85 L76 85'],
  },
  {
    char: 'T',
    sound: 't',
    word: { en: 'tiger', zh: '老虎', emoji: '🐯' },
    strokes: ['M20 18 L80 18', 'M50 18 L50 85'],
  },
  {
    char: 'E',
    sound: 'e',
    word: { en: 'egg', zh: '鸡蛋', emoji: '🥚' },
    strokes: ['M72 15 L28 15 L28 85 L72 85', 'M28 50 L62 50'],
  },
  {
    char: 'A',
    sound: 'a',
    word: { en: 'apple', zh: '苹果', emoji: '🍎' },
    strokes: ['M50 12 L22 88', 'M50 12 L78 88', 'M33 62 L67 62'],
  },
  {
    char: 'S',
    sound: 's',
    word: { en: 'sun', zh: '太阳', emoji: '☀️' },
    strokes: ['M70 24 C 52 8, 24 20, 32 40 C 38 54, 66 50, 69 66 C 72 86, 42 94, 27 78'],
  },
]

export const PRAISES = ['Wonderful!', 'Great job!', 'Amazing!', 'Super!', 'You did it!']
export const PRAISES_ZH = ['你真棒！', '太厉害啦！', '好棒呀！', '真了不起！']

export function randomOf<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
