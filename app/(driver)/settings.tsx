import { Redirect, router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

import { AppScreen } from "@/components/core/app-screen";
import { DataPanel } from "@/components/core/data-panel";
// header actions removed; sign out moved to session panel
import { useAuth } from "@/hooks/use-auth";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useAppTheme } from "@/providers/theme-provider";

export default function DriverSettingsScreen() {
  const { user, signOut } = useAuth();
  const colors = useThemeColors();
  const { mode, setMode } = useAppTheme();

  if (!user || user.role !== "driver") {
    return <Redirect href="/auth/login" />;
  }

  return (
    <AppScreen
      title="Driver Settings"
      subtitle="Navigation, safety, alerts and display preferences"
    >
      <DataPanel title="Driver Profile">
        <Text
          style={[styles.line, { color: colors.textPrimary }]}
        >{`Name: ${user.name}`}</Text>
        <Text
          style={[styles.line, { color: colors.textPrimary }]}
        >{`Email: ${user.email}`}</Text>
        <Text style={[styles.line, { color: colors.textPrimary }]}>
          Role: Driver (locked)
        </Text>
      </DataPanel>

      <DataPanel title="Appearance">
        <Pressable
          style={[
            styles.themeBtn,
            { borderColor: mode === "dark" ? colors.primary : colors.borderDefault },
          ]}
          onPress={() => setMode("dark")}
        >
          <Text
            style={{
              color: mode === "dark" ? colors.primary : colors.textSecondary,
            }}
          >
            Dark Mode
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.themeBtn,
            { borderColor: mode === "light" ? colors.primary : colors.borderDefault },
          ]}
          onPress={() => setMode("light")}
        >
          <Text
            style={{
              color: mode === "light" ? colors.primary : colors.textSecondary,
            }}
          >
            Light Mode
          </Text>
        </Pressable>
      </DataPanel>
      <DataPanel title="Session">
        <Pressable
          style={[styles.signOutBtn, { borderColor: colors.danger }]}
          onPress={() => {
            signOut();
            router.replace("/auth/login");
          }}
        >
          <Text style={[styles.signOutText, { color: colors.danger }]}>
            Sign Out
          </Text>
        </Pressable>
      </DataPanel>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  line: { fontSize: 13 },
  themeBtn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  signOutBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  signOutText: {
    fontSize: 13,
    fontWeight: "700",
  },
});


