import { StyleSheet, Text, View } from 'react-native';

import type { TemperaturePoint } from '@/types/logistics';

type Props = {
  points: TemperaturePoint[];
};

export function TemperatureSparkline({ points }: Props) {
  const min = Math.min(...points.map((point) => point.value));
  const max = Math.max(...points.map((point) => point.value));
  const range = max - min || 1;

  return (
    <View style={styles.wrapper}>
      <View style={styles.chartRow}>
        {points.map((point, index) => {
          const normalized = (point.value - min) / range;
          const height = 26 + normalized * 90;

          return (
            <View key={`${point.label}-${index}`} style={styles.column}>
              <View style={[styles.bar, { height }]} />
              <Text style={styles.axisLabel}>{point.label}</Text>
            </View>
          );
        })}
      </View>

      <Text style={styles.summary}>{`Current range: ${min.toFixed(1)} C - ${max.toFixed(1)} C`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 130,
  },
  column: {
    alignItems: 'center',
    width: 44,
    gap: 8,
  },
  bar: {
    width: 20,
    borderRadius: 8,
    backgroundColor: '#22d3ee',
  },
  axisLabel: {
    color: '#94a3b8',
    fontSize: 10,
  },
  summary: {
    color: '#cbd5e1',
    fontSize: 12,
  },
});
