import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

export type AppThemeMode = 'dark' | 'light';

export type ThemePalette = {
  bgBackground: string;
  bgBackgroundAlt: string;
  bgCard: string;
  bgCardAlt: string;
  bgGlass: string;
  borderDefault: string;
  textPrimary: string;
  textSecondary: string;
  primary: string;
  primarySoft: string;
  emerald: string;
  emeraldSoft: string;
  warning: string;
  danger: string;
  shadow: string;
  // Backward-compatible aliases.
  bg: string;
  bgAlt: string;
  surface: string;
  surfaceAlt: string;
  glass: string;
  border: string;
  text: string;
  mutedText: string;
};

const palettes: Record<AppThemeMode, ThemePalette> = {
  dark: {
    bgBackground: '#050b14',
    bgBackgroundAlt: '#081322',
    bgCard: '#0b1627',
    bgCardAlt: '#0f1d33',
    bgGlass: 'rgba(17, 31, 52, 0.7)',
    borderDefault: '#1f334f',
    textPrimary: '#e6f0ff',
    textSecondary: '#8aa4c3',
    primary: '#1fa2ff',
    primarySoft: 'rgba(31, 162, 255, 0.14)',
    emerald: '#10b981',
    emeraldSoft: 'rgba(16, 185, 129, 0.14)',
    warning: '#f59e0b',
    danger: '#ef4444',
    shadow: '#0a0f18',
    bg: '#050b14',
    bgAlt: '#081322',
    surface: '#0b1627',
    surfaceAlt: '#0f1d33',
    glass: 'rgba(17, 31, 52, 0.7)',
    border: '#1f334f',
    text: '#e6f0ff',
    mutedText: '#8aa4c3',
  },
  light: {
    bgBackground: '#eef3fb',
    bgBackgroundAlt: '#e6edf9',
    bgCard: '#f8fbff',
    bgCardAlt: '#f2f7ff',
    bgGlass: 'rgba(248, 251, 255, 0.84)',
    borderDefault: '#d8e2f1',
    textPrimary: '#0a1b2f',
    textSecondary: '#4e6788',
    primary: '#0a84ff',
    primarySoft: 'rgba(10, 132, 255, 0.11)',
    emerald: '#0e9f6e',
    emeraldSoft: 'rgba(14, 159, 110, 0.12)',
    warning: '#c27803',
    danger: '#d63636',
    shadow: '#90a4bf',
    bg: '#eef3fb',
    bgAlt: '#e6edf9',
    surface: '#f8fbff',
    surfaceAlt: '#f2f7ff',
    glass: 'rgba(248, 251, 255, 0.84)',
    border: '#d8e2f1',
    text: '#0a1b2f',
    mutedText: '#4e6788',
  },
};

type ThemeContextValue = {
  mode: AppThemeMode;
  colors: ThemePalette;
  setMode: (mode: AppThemeMode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<AppThemeMode>('dark');

  const value = useMemo(
    () => ({
      mode,
      colors: palettes[mode],
      setMode,
      toggleMode: () => setMode((current) => (current === 'dark' ? 'light' : 'dark')),
    }),
    [mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAppTheme must be used inside AppThemeProvider');
  }

  return context;
}
