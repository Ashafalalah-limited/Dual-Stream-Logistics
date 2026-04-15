import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

import { useThemeColors } from "@/hooks/use-theme-colors";
import type { UserRole } from "@/types/logistics";

type Props = {
  role: UserRole;
};

export function RoleHeaderActions({ role }: Props) {
  const colors = useThemeColors();

  const settingsPath =
    role === "admin"
      ? "/(admin)/settings"
      : role === "driver"
        ? "/(driver)/settings"
        : "/(customer)/settings";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.settingsBtn,
        {
          borderColor: colors.primary,
          backgroundColor: colors.primarySoft,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
      onPress={() => router.push(settingsPath)}
    >
      <Text style={[styles.settingsText, { color: colors.primary }]}>
        Settings
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  settingsBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  settingsText: {
    fontSize: 11,
    fontWeight: "700",
  },
});

