import { Redirect, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/core/app-screen";
import { DataPanel } from "@/components/core/data-panel";
import { FadeInBlock } from "@/components/core/fade-in-block";
import { MetricCard } from "@/components/core/metric-card";
import { IndustrySelector } from "@/components/logistics/industry-selector";
import { operationalMetrics } from "@/data/mock-logistics";
import { useAuth } from "@/hooks/use-auth";
import { useIndustrySelection } from "@/hooks/use-industry-selection";
import { useThemeColors } from "@/hooks/use-theme-colors";

export default function OperationsScreen() {
  const { user } = useAuth();
  const colors = useThemeColors();
  const { industry } = useIndustrySelection();

  if (!user || user.role !== "admin") {
    return <Redirect href="/auth/login" />;
  }

  return (
    <AppScreen
      title={
        industry === "pharmaceutical"
          ? "Pharmaceutical Intelligence"
          : "Agriculture Intelligence"
      }
      subtitle="Executive analytics, compliance posture, and daily logistics velocity"
    >
      <FadeInBlock delay={20}>
        <DataPanel title="Supply chain">
          <IndustrySelector />
        </DataPanel>
      </FadeInBlock>

      <FadeInBlock delay={50}>
        <View style={styles.grid}>
          {operationalMetrics.map((item, idx) => (
            <MetricCard
              key={item.label}
              label={item.label.toUpperCase()}
              value={item.value}
              trend={item.trend}
              tone={
                idx % 3 === 0 ? "blue" : idx % 3 === 1 ? "emerald" : "warning"
              }
            />
          ))}
        </View>
      </FadeInBlock>

      <FadeInBlock delay={120}>
        <DataPanel title="Delay Risk Indicators">
          <Text style={[styles.textLine, { color: colors.textSecondary }]}>
            {industry === "pharmaceutical"
              ? "Vaccine corridor congestion risk: 14% (moderate)"
              : "Fresh produce corridor congestion risk: 17% (moderate)"}
          </Text>
          <Text style={[styles.textLine, { color: colors.textSecondary }]}>
            {industry === "pharmaceutical"
              ? "Cold storage route risk: 8% (low)"
              : "Farm-to-market route risk: 11% (low)"}
          </Text>
          <Text style={[styles.textLine, { color: colors.textSecondary }]}>
            {industry === "pharmaceutical"
              ? "Qualified cold-chain driver availability: 96%"
              : "Harvest dispatch driver availability: 94%"}
          </Text>
        </DataPanel>
      </FadeInBlock>

      <FadeInBlock delay={180}>
        <DataPanel title="Support & Information">
          <View style={styles.supportRow}>
            <Pressable onPress={() => router.push("/support/about")}>
              <Text style={[styles.supportLink, { color: colors.emerald, borderColor: colors.borderDefault }]}>About</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/support/contact")}>
              <Text style={[styles.supportLink, { color: colors.emerald, borderColor: colors.borderDefault }]}>Contact</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/support/help")}>
              <Text style={[styles.supportLink, { color: colors.emerald, borderColor: colors.borderDefault }]}>Help</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/support/privacy")}>
              <Text style={[styles.supportLink, { color: colors.emerald, borderColor: colors.borderDefault }]}>Privacy</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/support/terms")}>
              <Text style={[styles.supportLink, { color: colors.emerald, borderColor: colors.borderDefault }]}>Terms</Text>
            </Pressable>
          </View>
        </DataPanel>
      </FadeInBlock>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },
  textLine: { fontSize: 13 },
  supportRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  supportLink: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});

