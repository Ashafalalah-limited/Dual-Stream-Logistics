import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/hooks/use-auth";
import { getHomePath } from "@/hooks/use-role-home";
import { useThemeColors } from "@/hooks/use-theme-colors";

export default function LoginScreen() {
  const { user, signIn } = useAuth();
  const colors = useThemeColors();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      router.replace(getHomePath(user.role));
    }
  }, [user]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bgBackground }]}> 
      <View style={styles.container}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} contentFit="contain" />
        <Text style={[styles.company, { color: colors.textPrimary }]}>Dual Stream Logistics</Text>
        <Text style={[styles.tagline, { color: colors.primary }]}>Safe. Secure. Temperature-Controlled.</Text>

        <TextInput
          style={[styles.input, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault, color: colors.textPrimary }]}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault, color: colors.textPrimary }]}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
        />

        {error ? <Text style={[styles.error, { color: colors.danger }]}>{error}</Text> : null}

        <Pressable
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            const result = signIn(email, password);
            if (!result.ok) {
              setError(result.message ?? "Login failed");
            }
          }}>
          <Text style={[styles.primaryText, { color: colors.bgBackground }]}>Login</Text>
        </Pressable>

        <Pressable onPress={() => setError("Contact admin for password reset in this demo build.")}> 
          <Text style={[styles.link, { color: colors.emerald }]}>Forgot Password</Text>
        </Pressable>

        <Link href="/auth/signup" asChild>
          <Pressable>
            <Text style={[styles.link, { color: colors.emerald }]}>Create Account</Text>
          </Pressable>
        </Link>

        <Text style={[styles.hint, { color: colors.textSecondary }]}>Admin access is restricted to internal credentials only.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    gap: 12,
  },
  logo: { width: 220, height: 90, alignSelf: "center" },
  company: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
  },
  tagline: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 12,
  },
  error: { fontSize: 12 },
  primaryButton: {
    borderRadius: 10,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },
  primaryText: { fontSize: 15, fontWeight: "700" },
  link: {
    textAlign: "center",
    fontWeight: "600",
    marginTop: 2,
  },
  hint: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 8,
  },
});
