import { StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme-colors';

type Props = {
  label: string;
  value: string;
  subtitle: string;
  color: string;
};

export function KpiCard({ label, value, subtitle, color }: Props) {
  const colors = useThemeColors();

  return (
    <View style={[styles.card, { borderColor: color, backgroundColor: `${color}1A` }]}> 
      <Text style={[styles.label, { color }]}>{label}</Text>
      <Text style={[styles.value, { color: colors.textPrimary }]}>{value}</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
  },
});
