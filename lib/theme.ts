export const colors = {
  background: '#F6F3ED',
  surface: '#FFFCF7',
  text: '#171717',
  textMuted: '#77736C',
  border: '#DDD8CF',
  accent: '#7E2F28',
  imageOverlay: 'rgba(17, 17, 17, 0.68)',
  placeholderStone: '#D8D2C8',
  placeholderTaupe: '#B6A99A',
  placeholderInk: '#3A3937',
  placeholderClay: '#B78370',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
} as const;

export const radii = {
  sm: 8,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const fontSizes = {
  caption: 12,
  body: 16,
  subtitle: 20,
  action: 32,
  title: 40,
} as const;

export const lineHeights = {
  caption: 16,
  body: 24,
  subtitle: 26,
  action: 36,
  title: 44,
} as const;
