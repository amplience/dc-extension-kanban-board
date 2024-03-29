const DARK = 'dark';
const LIGHT = 'light';

interface Preset {
  [key: string]: string;
}

export const PRESETS: Preset = {
  'rgb(63,152,134)': LIGHT,
  'rgb(100,190,225)': DARK,
  'rgb(25,195,151)': DARK,
  'rgb(126,224,216)': DARK,
  'rgb(198,78,103)': LIGHT,
  'rgb(240,110,170)': LIGHT,
  'rgb(205,154,195)': DARK,
  'rgb(255,167,124)': DARK,
  'rgb(52,87,101)': LIGHT,
  'rgb(144,90,159)': LIGHT,
  'rgb(198,156,84)': LIGHT,
  'rgb(192,192,48)': DARK,
  'rgb(0,67,115)': LIGHT,
  'rgb(101,87,77)': LIGHT,
  'rgb(113,114,153)': LIGHT,
  'rgb(164,164,164)': LIGHT,
  'rgb(182,216,227)': DARK,
  'rgb(210,141,136)': DARK,
  'rgb(190,220,132)': DARK,
  'rgb(242,189,87)': DARK,
  'rgb(230,228,117)': DARK,
  'rgb(110,137,151)': LIGHT,
  'rgb(137,162,212)': DARK,
  'rgb(201,196,212)': DARK,
} as const;

export default class Status {
  public id: string;
  public hydrated = false;
  public label?: string;
  public color?: string;
  public backgroundColor?: string;
  constructor({ id, label, color }: any = {}) {
    this.id = id;
    const hasStatus = label;
    if (hasStatus) {
      this.hydrated = true;
      this.label = label;
      this.color = PRESETS[color] || getContrastType(color);
      this.backgroundColor = color;
    } else {
      this.color = DARK;
    }
  }
}

function getContrastType(rgb: string) {
  const match = rgb.match(/rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/);
  if (!match) {
    return;
  }
  match.shift();
  return getLuminance(match) > 0.179 ? DARK : LIGHT;
}

function getLuminance(rgb: string[]) {
  const [r, g, b] = rgb.map((cs: string) => {
    const c: number = Number(cs) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
