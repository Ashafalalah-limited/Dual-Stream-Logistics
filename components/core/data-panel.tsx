import { type PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme-colors';

type Props = PropsWithChildren<{
  title: string;
}>;

export function DataPanel({ title, children }: Props) {
  const colors = useThemeColors();

  return (
    <View
      style={[
        styles.panel,
        {
          backgroundColor: colors.bgGlass,
          borderColor: colors.borderDefault,
          shadowColor: colors.shadow,
        },
      ]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 16,
    gap: 12,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
});
