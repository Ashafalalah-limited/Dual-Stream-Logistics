import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme-colors';

type Props = {
  rows?: number;
};

export function PanelSkeleton({ rows = 3 }: Props) {
  const colors = useThemeColors();
  const opacity = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.95, duration: 450, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.45, duration: 450, useNativeDriver: true }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View style={[styles.panel, { borderColor: colors.borderDefault, backgroundColor: colors.bgCard, opacity }]}> 
      {Array.from({ length: rows }).map((_, idx) => (
        <View key={idx} style={[styles.line, { backgroundColor: colors.bgCardAlt, width: `${92 - idx * 8}%` }]} />
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 16,
    gap: 12,
  },
  line: {
    height: 13,
    borderRadius: 999,
  },
});

