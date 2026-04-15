import { StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme-colors';
import type { TemperaturePoint } from '@/types/logistics';

type Props = {
  points: TemperaturePoint[];
  height?: number;
};

export function SparkLine({ points, height = 110 }: Props) {
  const colors = useThemeColors();
  const min = Math.min(...points.map((point) => point.value));
  const max = Math.max(...points.map((point) => point.value));
  const range = max - min || 1;

  return (
    <View>
      <View style={[styles.row, { height }]}>
        {points.map((point, index) => {
          const normalized = (point.value - min) / range;
          return (
            <View key={`${point.label}-${index}`} style={styles.col}>
              <View style={[styles.bar, { backgroundColor: colors.primary, height: 18 + normalized * (height - 20) }]} />
            </View>
          );
        })}
      </View>
      <Text style={[styles.caption, { color: colors.textSecondary }]}>{`Range ${min.toFixed(1)}C to ${max.toFixed(1)}C`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  col: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    width: 10,
    borderRadius: 8,
  },
  caption: {
    marginTop: 8,
    fontSize: 12,
  },
});

