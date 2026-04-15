import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "@/hooks/use-auth";
import { getHomePath } from "@/hooks/use-role-home";
import { useThemeColors } from "@/hooks/use-theme-colors";
import type { UserRole } from "@/types/logistics";

const publicRoles: Exclude<UserRole, "admin">[] = ["customer", "driver"];

export default function SignUpScreen() {
  const { user, signUp } = useAuth();
  const colors = useThemeColors();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Exclude<UserRole, "admin">>("customer");

  useEffect(() => {
    if (user) {
      router.replace(getHomePath(user.role));
    }
  }, [user]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bgBackground }]}> 
      <View style={styles.container}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} contentFit="contain" />
        <Text style={[styles.title, { color: colors.textPrimary }]}>Create Account</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Select a role and complete registration.</Text>

        <View style={styles.roleRow}>
          {publicRoles.map((option) => {
            const active = role === option;
            return (
              <Pressable
                key={option}
                onPress={() => setRole(option)}
                style={[
                  styles.roleBtn,
                  {
                    borderColor: active ? colors.primary : colors.borderDefault,
                    backgroundColor: active ? colors.primarySoft : colors.bgCard,
                  },
                ]}>
                <Text style={[styles.roleText, { color: active ? colors.primary : colors.textSecondary }]}>{option}</Text>
              </Pressable>
            );
          })}
        </View>

        <TextInput
          style={[styles.input, { backgroundColor: colors.bgCard, borderColor: colors.borderDefault, color: colors.textPrimary }]}
          value={name}
          onChangeText={setName}
          placeholder="Full Name"
          placeholderTextColor={colors.textSecondary}
        />
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

        <Pressable
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
          onPress={() => signUp({ name, email: email || `${role}@dualstreamlogistics.com`, role })}>
          <Text style={[styles.primaryText, { color: colors.bgBackground }]}>Create Account</Text>
        </Pressable>

        <Text style={[styles.lockedRole, { color: colors.warning }]}>Role is fixed after registration for compliance control.</Text>

        <Link href="/auth/login" asChild>
          <Pressable>
            <Text style={[styles.link, { color: colors.emerald }]}>Back to Login</Text>
          </Pressable>
        </Link>
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
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 13,
    marginBottom: 8,
  },
  roleRow: { flexDirection: "row", gap: 10 },
  roleBtn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  roleText: {
    textTransform: "capitalize",
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 12,
  },
  primaryButton: {
    borderRadius: 10,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },
  primaryText: { fontSize: 15, fontWeight: "700" },
  lockedRole: { textAlign: "center", fontSize: 12 },
  link: {
    textAlign: "center",
    fontWeight: "600",
    marginTop: 2,
  },
});
