import { useAppTheme } from '@/providers/theme-provider';

export function useThemeColors() {
  return useAppTheme().colors;
}
