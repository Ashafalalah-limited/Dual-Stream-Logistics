import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme-colors';

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
};

export function AnimatedCounter({ value, prefix = '', suffix = '' }: Props) {
  const colors = useThemeColors();
  const animated = useRef(new Animated.Value(0)).current;
  const display = useRef(0);
  const textRef = useRef<Text>(null);

  useEffect(() => {
    const id = animated.addListener(({ value: current }) => {
      display.current = Math.round(current);
      textRef.current?.setNativeProps({ text: `${prefix}${display.current}${suffix}` });
    });

    Animated.timing(animated, {
      toValue: value,
      duration: 300,
      useNativeDriver: false,
    }).start();

    return () => {
      animated.removeListener(id);
    };
  }, [animated, prefix, suffix, value]);

  return <Text ref={textRef} style={[styles.text, { color: colors.textPrimary }]}>{`${prefix}${value}${suffix}`}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});
