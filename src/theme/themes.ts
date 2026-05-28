import { SACRED_LIGHT, MIDNIGHT_VIGIL, EMERALD_GRACE } from './tokens';

export type ThemeId = 'sacred-light' | 'midnight-vigil' | 'emerald-grace';

export interface ThemeColors {
  bg: string;
  bgDeep: string;
  surface: string;
  surfaceAlt: string;
  overlay: string;
  crimson: string;
  crimsonDark: string;
  crimsonLight: string;
  crimsonMuted: string;
  gold: string;
  goldLight: string;
  goldMuted: string;
  ink: string;
  inkMedium: string;
  inkLight: string;
  inkFaint: string;
  divider: string;
  dividerStrong: string;
  white: string;
  shadow: string;
}

export interface Theme {
  id: ThemeId;
  name: string;
  description: string;
  previewColors: [string, string];
  colors: ThemeColors;
}

export const themes: Record<ThemeId, Theme> = {
  'sacred-light': {
    id: 'sacred-light',
    name: 'Sacred Light',
    description: 'Warm parchment tones inspired by illuminated manuscripts. Perfect for daytime devotion.',
    previewColors: ['#F7F0E0', '#EDE0C4'],
    colors: SACRED_LIGHT,
  },
  'midnight-vigil': {
    id: 'midnight-vigil',
    name: 'Midnight Vigil',
    description: 'Deep navy and silver for quiet evening prayer and contemplation.',
    previewColors: ['#1A1F2E', '#253347'],
    colors: MIDNIGHT_VIGIL,
  },
  'emerald-grace': {
    id: 'emerald-grace',
    name: 'Emerald Grace',
    description: 'Lush green hues evoking sacred gardens and new life in Christ.',
    previewColors: ['#E4F0DA', '#F0F7EC'],
    colors: EMERALD_GRACE,
  },
};

export function getThemeColors(themeId: ThemeId): ThemeColors {
  return themes[themeId].colors;
}
