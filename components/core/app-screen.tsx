import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import { type PropsWithChildren, type ReactNode, useCallback, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DSSpacing } from "@/constants/design";
import { useThemeColors } from "@/hooks/use-theme-colors";

type Props = PropsWithChildren<{
  title: string;
  subtitle?: string;
  rightNode?: ReactNode;
}>;

export function AppScreen({
  title,
  subtitle,
  children,
  rightNode,
}: Props) {
  const colors = useThemeColors();
  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        scrollRef.current?.scrollTo({ y: 0, animated: false });
      }, 0);

      return () => clearTimeout(timer);
    }, [])
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bgBackground }]}>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={require("@/assets/logo.png")}
            style={styles.logo}
            contentFit="contain"
          />
          <View style={styles.titleWrap}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
            {subtitle ? (
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                {subtitle}
              </Text>
            ) : null}
          </View>
          {rightNode}
        </View>

        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: DSSpacing.page,
    gap: DSSpacing.block,
    paddingBottom: 28,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "flex-start",
    marginBottom: 2,
  },
  logo: {
    width: 58,
    height: 58,
  },
  titleWrap: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 18,
  },
});
