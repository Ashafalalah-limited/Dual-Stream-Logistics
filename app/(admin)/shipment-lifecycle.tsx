import { Redirect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/core/app-screen";
import { DataPanel } from "@/components/core/data-panel";
import { FadeInBlock } from "@/components/core/fade-in-block";
import { mockShipments } from "@/data/mock-logistics";
import { useAuth } from "@/hooks/use-auth";
import { useThemeColors } from "@/hooks/use-theme-colors";

function Step({ label, done, colors }: { label: string; done: boolean; colors: ReturnType<typeof useThemeColors> }) {
  return (
    <View style={styles.stepRow}>
      <View
        style={[
          styles.stepDot,
          { borderColor: colors.borderDefault },
          done ? [styles.stepDotDone, { backgroundColor: colors.emerald, borderColor: colors.emerald }] : undefined,
        ]}
      />
      <Text
        style={[
          styles.stepText,
          { color: colors.textSecondary },
          done ? [styles.stepTextDone, { color: colors.textPrimary }] : undefined,
        ]}>
        {label}
      </Text>
    </View>
  );
}

export default function ShipmentLifecycleScreen() {
  const { user } = useAuth();
  const colors = useThemeColors();

  if (!user || user.role !== "admin") {
    return <Redirect href="/auth/login" />;
  }

  return (
    <AppScreen
      title="Shipment Lifecycle"
      subtitle="Structured workflow tracking for regulated deliveries"
    >
      {mockShipments.map((shipment, index) => (
        <FadeInBlock key={shipment.id} delay={70 + index * 50}>
          <DataPanel title={shipment.id}>
            <Text
              style={[styles.meta, { color: colors.textSecondary }]}
            >{`${shipment.product} (${shipment.productClass})`}</Text>
            <Text
              style={[styles.meta, { color: colors.textSecondary }]}
            >{`Temperature Requirement: ${shipment.temperatureRange}`}</Text>
            <Text
              style={[styles.meta, { color: colors.textSecondary }]}
            >{`Vehicle: ${shipment.vehicle} | Driver: ${shipment.driver}`}</Text>
            <View style={styles.timeline}>
              <Step
                label="Pickup Confirmation"
                done={shipment.pickupConfirmed}
                colors={colors}
              />
              <Step
                label="In-Transit Monitoring"
                done={shipment.status !== "pickup"}
                colors={colors}
              />
              <Step
                label="Delivery Confirmation"
                done={shipment.deliveryConfirmed}
                colors={colors}
              />
            </View>
          </DataPanel>
        </FadeInBlock>
      ))}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  meta: { fontSize: 12 },
  timeline: { marginTop: 8, gap: 10 },
  stepRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 100,
    borderWidth: 2,
  },
  stepDotDone: {},
  stepText: { fontSize: 13 },
  stepTextDone: { fontWeight: "600" },
});

