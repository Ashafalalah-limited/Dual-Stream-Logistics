import { Redirect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/core/app-screen";
import { DataPanel } from "@/components/core/data-panel";
import { FadeInBlock } from "@/components/core/fade-in-block";
import {
    complianceAlerts,
    mockShipments,
    tempSeries,
} from "@/data/mock-logistics";
import { useAuth } from "@/hooks/use-auth";
import { useThemeColors } from "@/hooks/use-theme-colors";

export default function ColdChainScreen() {
  const { user } = useAuth();
  const colors = useThemeColors();

  if (!user || user.role !== "admin") {
    return <Redirect href="/auth/login" />;
  }

  const focus = mockShipments[0];
  const stability = Math.max(0, Math.min(100, focus.compliance));

  return (
    <AppScreen
      title="Cold Chain Compliance"
      subtitle="Regulatory-grade monitoring and deviation controls"
    >
      <FadeInBlock delay={60}>
        <DataPanel title="Live Compliance Status">
          <Text
            style={[styles.metric, { color: colors.textPrimary }]}
          >{`Real-time Temp: ${focus.currentTemperatureC} C`}</Text>
          <Text
            style={[styles.metric, { color: colors.textPrimary }]}
          >{`Approved Range: ${focus.temperatureRange}`}</Text>
          <Text
            style={[styles.metric, { color: colors.textPrimary }]}
          >{`Compliance: ${focus.compliance}%`}</Text>
          <View style={[styles.gaugeTrack, { backgroundColor: colors.bgCardAlt }]}>
            <View style={[styles.gaugeFill, { width: `${stability}%`, backgroundColor: colors.emerald }]} />
          </View>
          <Text
            style={[styles.gaugeText, { color: colors.textSecondary }]}
          >{`Stability Gauge: ${stability}%`}</Text>
        </DataPanel>
      </FadeInBlock>

      <FadeInBlock delay={120}>
        <DataPanel title="Temperature Trend (Time-Based)">
          <View style={styles.chartRow}>
            {tempSeries.map((point, index) => (
              <View key={`${point.label}-${index}`} style={styles.barWrap}>
                <View style={[styles.bar, { height: 24 + point.value * 11, backgroundColor: colors.primary }]} />
                <Text style={[styles.barLabel, { color: colors.textSecondary }]}>{point.label}</Text>
              </View>
            ))}
          </View>
        </DataPanel>
      </FadeInBlock>

      <FadeInBlock delay={180}>
        <DataPanel title="Alerts & Deviation Notifications">
          {complianceAlerts.map((alert) => (
            <Text key={alert} style={[styles.alert, { color: colors.textSecondary }]}>{`- ${alert}`}</Text>
          ))}
        </DataPanel>
      </FadeInBlock>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  metric: { fontSize: 14, fontWeight: "600" },
  gaugeTrack: {
    marginTop: 6,
    height: 10,
    borderRadius: 999,
    overflow: "hidden",
  },
  gaugeFill: {
    height: "100%",
  },
  gaugeText: { fontSize: 12 },
  chartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  barWrap: { alignItems: "center", gap: 6, width: 42 },
  bar: { width: 20, borderRadius: 8 },
  barLabel: { fontSize: 10 },
  alert: { fontSize: 13 },
});

