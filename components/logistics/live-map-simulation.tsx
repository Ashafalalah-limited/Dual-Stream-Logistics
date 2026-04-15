import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme-colors';
import type { TemperatureMode } from '@/types/logistics';

type Props = {
  progress: number;
  temperatureMode?: TemperatureMode;
  eta: string;
};

export function LiveMapSimulation({ progress, temperatureMode, eta }: Props) {
  const colors = useThemeColors();
  const anim = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [anim, progress]);

  const markerColor =
    temperatureMode === 'frozen'
      ? colors.emerald
      : temperatureMode === 'chilled'
        ? colors.primary
        : colors.warning;

  const left = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [22, 268],
  });

  return (
    <View style={[styles.map, { backgroundColor: colors.bgCardAlt, borderColor: colors.borderDefault }]}> 
      <View style={[styles.route, { backgroundColor: colors.borderDefault }]} />
      <Animated.View
        style={[styles.marker, { left, borderColor: markerColor, backgroundColor: colors.bgBackgroundAlt }]}>
        <View style={[styles.dot, { backgroundColor: markerColor }]} />
      </Animated.View>
      <Text style={[styles.eta, { color: colors.textPrimary }]}>{`Live ETA: ${eta}`}</Text>
      <Text style={[styles.legend, { color: colors.textSecondary }]}>Ambient/Chilled/Frozen vehicle icon simulation</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    borderWidth: 1,
    borderRadius: 20,
    height: 220,
    overflow: 'hidden',
    justifyContent: 'center',
    padding: 16,
  },
  route: {
    position: 'absolute',
    left: 24,
    right: 24,
    top: 112,
    height: 3,
    borderRadius: 999,
  },
  marker: {
    position: 'absolute',
    top: 96,
    width: 24,
    height: 24,
    marginLeft: -12,
    borderRadius: 24,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 20,
  },
  eta: {
    marginTop: 122,
    fontSize: 14,
    fontWeight: '700',
  },
  legend: {
    marginTop: 5,
    fontSize: 12,
  },
});

