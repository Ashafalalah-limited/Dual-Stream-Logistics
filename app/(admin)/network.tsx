import { Redirect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/core/app-screen";
import { DataPanel } from "@/components/core/data-panel";
import { FadeInBlock } from "@/components/core/fade-in-block";
import { mapPoints } from "@/data/mock-logistics";
import { useAuth } from "@/hooks/use-auth";
import { useThemeColors } from "@/hooks/use-theme-colors";
import type { ShipmentStatus } from "@/types/logistics";

function getStatusColor(status: ShipmentStatus, colors: ReturnType<typeof useThemeColors>) {
  if (status === "delivered") return colors.emerald;
  if (status === "in-transit") return colors.primary;
  return colors.warning;
}

export default function NetworkScreen() {
  const { user } = useAuth();
  const colors = useThemeColors();

  if (!user || user.role !== "admin") {
    return <Redirect href="/auth/login" />;
  }

  return (
    <AppScreen
      title="Network Visibility Map"
      subtitle="Live fleet movement, route status, and ETA intelligence"
    >
      <FadeInBlock delay={80}>
        <DataPanel title="Active Route Theater">
          <View style={[styles.map, { backgroundColor: colors.bgCardAlt, borderColor: colors.borderDefault }]}>
            <View style={[styles.routeA, { backgroundColor: colors.borderDefault }]} />
            <View style={[styles.routeB, { backgroundColor: colors.borderDefault }]} />
            {mapPoints.map((point) => (
              <View
                key={point.id}
                style={[
                  styles.marker,
                  {
                    left: `${point.xPercent}%`,
                    top: `${point.yPercent}%`,
                    borderColor: getStatusColor(point.status, colors),
                    backgroundColor: colors.bgBackgroundAlt,
                  },
                ]}
              >
                <View
                  style={[
                    styles.markerDot,
                    { backgroundColor: getStatusColor(point.status, colors) },
                  ]}
                />
              </View>
            ))}
          </View>
          <View style={styles.legendRow}>
            <Text style={[styles.legend, { color: colors.textSecondary }]}>Blue = In Transit</Text>
            <Text style={[styles.legend, { color: colors.textSecondary }]}>Green = Delivered</Text>
            <Text style={[styles.legend, { color: colors.textSecondary }]}>Amber = Pickup</Text>
          </View>
        </DataPanel>
      </FadeInBlock>

      <FadeInBlock delay={150}>
        <DataPanel title="Vehicle ETA Feed">
          {mapPoints.map((point) => (
            <View key={point.id} style={[styles.etaRow, { borderBottomColor: colors.borderDefault }]}>
              <Text
                style={[styles.etaLabel, { color: colors.textPrimary }]}
              >{`${point.id} - ${point.label}`}</Text>
              <Text style={[styles.etaValue, { color: colors.emerald }]}>{point.eta}</Text>
            </View>
          ))}
        </DataPanel>
      </FadeInBlock>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 300,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  routeA: {
    position: "absolute",
    left: 30,
    right: 40,
    top: 90,
    height: 2,
    transform: [{ rotate: "-8deg" }],
  },
  routeB: {
    position: "absolute",
    left: 40,
    right: 70,
    top: 190,
    height: 2,
    transform: [{ rotate: "12deg" }],
  },
  marker: {
    position: "absolute",
    width: 22,
    height: 22,
    borderRadius: 22,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -11,
    marginTop: -11,
  },
  markerDot: {
    width: 8,
    height: 8,
    borderRadius: 20,
  },
  legendRow: { flexDirection: "row", justifyContent: "space-between" },
  legend: { fontSize: 11 },
  etaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  etaLabel: { fontSize: 13 },
  etaValue: { fontSize: 12, fontWeight: "700" },
});

