import { Redirect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/core/app-screen";
import { DataPanel } from "@/components/core/data-panel";
import { FadeInBlock } from "@/components/core/fade-in-block";
import { MetricCard } from "@/components/core/metric-card";
import { fleetAssets } from "@/data/mock-logistics";
import { useAuth } from "@/hooks/use-auth";
import { useThemeColors } from "@/hooks/use-theme-colors";

export default function FleetScreen() {
  const { user } = useAuth();
  const colors = useThemeColors();

  if (!user || user.role !== "admin") {
    return <Redirect href="/auth/login" />;
  }

  const trucks = fleetAssets.filter((asset) => asset.type === "truck").length;
  const vans = fleetAssets.filter((asset) => asset.type === "van").length;
  const motorcycles = fleetAssets.filter(
    (asset) => asset.type === "motorcycle",
  ).length;
  const tricycles = fleetAssets.filter(
    (asset) => asset.type === "tricycle",
  ).length;

  return (
    <AppScreen
      title="Fleet & Asset Control"
      subtitle="Vehicle utilization, maintenance, and operational state"
    >
      <FadeInBlock delay={60}>
        <View style={styles.grid}>
          <MetricCard label="TRUCKS" value={`${trucks}`} tone="blue" />
          <MetricCard label="VANS" value={`${vans}`} tone="emerald" />
          <MetricCard
            label="MOTORCYCLES"
            value={`${motorcycles}`}
            tone="warning"
          />
          <MetricCard label="TRICYCLES" value={`${tricycles}`} tone="blue" />
        </View>
      </FadeInBlock>

      <FadeInBlock delay={130}>
        <DataPanel title="Asset Utilization & Maintenance">
          {fleetAssets.map((asset) => (
            <View key={asset.id} style={[styles.assetRow, { borderBottomColor: colors.borderDefault }]}>
              <View>
                <Text
                  style={[styles.assetTitle, { color: colors.textPrimary }]}
                >{`${asset.id} (${asset.type})`}</Text>
                <Text
                  style={[styles.assetMeta, { color: colors.textSecondary }]}
                >{`Driver: ${asset.driver}`}</Text>
              </View>
              <View style={styles.rightMeta}>
                <Text
                  style={[styles.assetMeta, { color: colors.textSecondary }]}
                >{`Utilization: ${asset.utilization}%`}</Text>
                <Text
                  style={[styles.assetMeta, { color: colors.textSecondary }]}
                >{`Maintenance: ${asset.maintenance}`}</Text>
                <Text style={[styles.assetState, { color: colors.primary }]}>
                  {asset.state.toUpperCase()}
                </Text>
              </View>
            </View>
          ))}
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
  assetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  assetTitle: { fontSize: 14, fontWeight: "700" },
  assetMeta: { fontSize: 12 },
  rightMeta: { alignItems: "flex-end" },
  assetState: { fontSize: 11, fontWeight: "700" },
});

