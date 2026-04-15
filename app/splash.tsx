import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/hooks/use-auth";
import { getHomePath } from "@/hooks/use-role-home";
import { useThemeColors } from "@/hooks/use-theme-colors";

export default function SplashScreen() {
  const { user } = useAuth();
  const colors = useThemeColors();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        router.replace(getHomePath(user.role));
      } else {
        router.replace("/auth/login");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [user]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bgBackground }]}> 
      <View style={styles.content}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} contentFit="contain" />
        <Text style={[styles.company, { color: colors.textPrimary }]}>Dual Stream Logistics</Text>
        <Text style={[styles.tagline, { color: colors.primary }]}>Safe. Secure. Temperature-Controlled.</Text>
        <ActivityIndicator color={colors.primary} style={styles.loader} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    width: 230,
    height: 120,
    marginBottom: 16,
  },
  company: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontWeight: "600",
  },
  loader: {
    marginTop: 22,
  },
});
