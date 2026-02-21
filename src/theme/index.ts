export const colors = {
  dark: {
    background: '#050505',
    surface: '#0c0c0c',
    surface2: '#111113',
    border: '#1a1a1e',
    borderHi: '#2a2a30',
    text: '#c8c8d0',
    textDim: '#5a5a66',
    textMuted: '#3a3a44',
    accent: '#f97316',
    accentGlow: 'rgba(249, 115, 22, 0.15)',
    accent2: '#ea580c',
    green: '#22c55e',
    cardShadow: 'rgba(0,0,0,0.5)',
  },
  light: {
    background: '#fafafa',
    surface: '#ffffff',
    surface2: '#f5f5f5',
    border: '#e5e5e5',
    borderHi: '#d0d0d0',
    text: '#1a1a1a',
    textDim: '#666666',
    textMuted: '#999999',
    accent: '#f97316',
    accentGlow: 'rgba(249, 115, 22, 0.15)',
    accent2: '#ea580c',
    green: '#16a34a',
    cardShadow: 'rgba(0,0,0,0.08)',
  },
};

export const typography = {
  fontFamily: {
    primary: undefined, // Uses system font — swap for 'SpaceGrotesk' once loaded
    mono: undefined,    // Swap for 'JetBrainsMono' once loaded
  },
  fontSize: {
    xs: 13,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 22,
    '3xl': 26,
    '4xl': 34,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 18,
    normal: 22,
    relaxed: 24,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
};

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  full: 9999,
};

export const shadows = {
  dark: {
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 8,
    },
  },
  light: {
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 3,
    },
  },
};

const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};

export default theme;
