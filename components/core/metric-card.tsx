import { StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme-colors';

type Props = {
  label: string;
  value: string;
  trend?: string;
  tone?: 'blue' | 'emerald' | 'warning';
};

export function MetricCard({ label, value, trend, tone = 'blue' }: Props) {
  const colors = useThemeColors();
  const toneMap = {
    blue: { border: 'rgba(31, 162, 255, 0.35)', bg: colors.primarySoft, color: colors.primary },
    emerald: { border: 'rgba(16, 185, 129, 0.35)', bg: colors.emeraldSoft, color: colors.emerald },
    warning: { border: 'rgba(245, 158, 11, 0.35)', bg: 'rgba(245, 158, 11, 0.12)', color: colors.warning },
  };
  const palette = toneMap[tone];

  return (
    <View style={[styles.card, { borderColor: palette.border, backgroundColor: palette.bg }]}> 
      <Text style={[styles.label, { color: palette.color }]}>{label}</Text>
      <Text style={[styles.value, { color: colors.textPrimary }]}>{value}</Text>
      {trend ? <Text style={[styles.trend, { color: colors.textSecondary }]}>{trend}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48.2%',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
  },
  trend: {
    fontSize: 12,
  },
});
