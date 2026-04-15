import { type ReactNode, useEffect, useRef } from 'react';
import { Animated, Easing, type ViewStyle } from 'react-native';

type Props = {
  children: ReactNode;
  delay?: number;
  style?: ViewStyle;
};

export function FadeInBlock({ children, delay = 0, style }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 340,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 340,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }, [delay, opacity, translateY]);

  return <Animated.View style={[{ opacity, transform: [{ translateY }] }, style]}>{children}</Animated.View>;
}
