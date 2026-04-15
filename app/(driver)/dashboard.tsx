import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/core/app-screen";
import { DataPanel } from "@/components/core/data-panel";
import { FadeInBlock } from "@/components/core/fade-in-block";
import { AnimatedCounter } from "@/components/logistics/animated-counter";
import { IndustrySelector } from "@/components/logistics/industry-selector";
import { LiveMapSimulation } from "@/components/logistics/live-map-simulation";
import { NotificationBell } from "@/components/logistics/notification-bell";
import { PanelSkeleton } from "@/components/logistics/panel-skeleton";
import { SparkLine } from "@/components/logistics/spark-line";
import { StatusBadge } from "@/components/logistics/status-badge";
import { useAuth } from "@/hooks/use-auth";
import { useIndustrySelection } from "@/hooks/use-industry-selection";
import { useRealtimeLogistics } from "@/hooks/use-realtime-logistics";
import { useThemeColors } from "@/hooks/use-theme-colors";

export default function DriverDashboard() {
  const { user } = useAuth();
  const colors = useThemeColors();
  const { industry } = useIndustrySelection();
  const {
    shipments,
    setShipments,
    temperature,
    history,
    progress,
    notifications,
    focusedShipment,
    complianceOk,
  } = useRealtimeLogistics();

  const [loading, setLoading] = useState(true);
  const [alertsOpen, setAlertsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  if (!user || user.role !== "driver") {
    return null;
  }

  const scopedShipments = shipments.filter((item) =>
    industry === "pharmaceutical"
      ? item.productClass.toLowerCase().includes("pharma")
      : item.productClass.toLowerCase().includes("agriculture"),
  );

  const scopedKpis = {
    alerts: scopedShipments.filter((item) => item.status === "delayed").length,
  };

  const assigned = scopedShipments
    .filter((item) => item.status !== "delivered")
    .slice(0, 4);
  const completed = scopedShipments.filter(
    (item) => item.status === "delivered",
  ).length;
  const earnings = assigned.length * 38 + completed * 44;

  const earningsSeries = [
    { label: "Mon", value: 105 },
    { label: "Tue", value: 84 },
    { label: "Wed", value: 133 },
    { label: "Thu", value: 118 },
    { label: "Fri", value: 141 },
    { label: "Sat", value: 90 },
    { label: "Sun", value: 112 },
  ];

  return (
    <AppScreen
      title={
        industry === "pharmaceutical"
          ? "Pharma Driver Dashboard"
          : "Agriculture Driver Dashboard"
      }
      subtitle="Dispatch, navigation, delivery execution and earnings monitoring"
      rightNode={
        <NotificationBell
          items={notifications}
          open={alertsOpen}
          onToggle={() => setAlertsOpen((old) => !old)}
        />
      }
    >
      {loading ? (
        <>
          <PanelSkeleton rows={4} />
          <PanelSkeleton rows={4} />
        </>
      ) : (
        <>
          <FadeInBlock delay={10}>
            <DataPanel title="Supply chain">
              <IndustrySelector />
            </DataPanel>
          </FadeInBlock>

          <FadeInBlock delay={30}>
            <DataPanel title="Driver Overview">
              <View style={styles.grid}>
                <View
                  style={[
                    styles.kpi,
                    {
                      borderColor: colors.borderDefault,
                      backgroundColor: colors.bgCardAlt,
                    },
                  ]}
                >
                  <Text
                    style={[styles.kpiLabel, { color: colors.textSecondary }]}
                  >
                    Today Deliveries
                  </Text>
                  <AnimatedCounter value={assigned.length} />
                </View>
                <View
                  style={[
                    styles.kpi,
                    {
                      borderColor: colors.borderDefault,
                      backgroundColor: colors.bgCardAlt,
                    },
                  ]}
                >
                  <Text
                    style={[styles.kpiLabel, { color: colors.textSecondary }]}
                  >
                    Completed
                  </Text>
                  <AnimatedCounter value={completed} />
                </View>
                <View
                  style={[
                    styles.kpi,
                    {
                      borderColor: colors.borderDefault,
                      backgroundColor: colors.bgCardAlt,
                    },
                  ]}
                >
                  <Text
                    style={[styles.kpiLabel, { color: colors.textSecondary }]}
                  >
                    Earnings Today
                  </Text>
                  <AnimatedCounter value={earnings} prefix="$" />
                </View>
                <View
                  style={[
                    styles.kpi,
                    {
                      borderColor: colors.borderDefault,
                      backgroundColor: colors.bgCardAlt,
                    },
                  ]}
                >
                  <Text
                    style={[styles.kpiLabel, { color: colors.textSecondary }]}
                  >
                    Temperature Alerts
                  </Text>
                  <AnimatedCounter value={scopedKpis.alerts} />
                </View>
              </View>
            </DataPanel>
          </FadeInBlock>

          <FadeInBlock delay={70}>
            <DataPanel title="Assigned Deliveries">
              {assigned.map((item) => (
                <View
                  key={item.id}
                  style={[
                    styles.deliveryRow,
                    { borderColor: colors.borderDefault },
                  ]}
                >
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text
                      style={{ color: colors.textPrimary, fontWeight: "700" }}
                    >{`${item.id} - ${item.product}`}</Text>
                    <StatusBadge status={item.status} />
                  </View>
                  <View style={styles.deliveryActions}>
                    <Pressable
                      style={[styles.smallBtn, { borderColor: colors.primary }]}
                    >
                      <Text style={{ color: colors.primary }}>Accept</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.smallBtn, { borderColor: colors.warning }]}
                    >
                      <Text style={{ color: colors.warning }}>Reject</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.smallBtn, { borderColor: colors.emerald }]}
                    >
                      <Text style={{ color: colors.emerald }}>Contact</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </DataPanel>
          </FadeInBlock>

          <FadeInBlock delay={110}>
            <DataPanel title="Live Delivery Mode">
              <LiveMapSimulation
                progress={progress}
                eta={focusedShipment?.eta ?? "17:40"}
                temperatureMode={focusedShipment?.temperatureMode}
              />
              <View style={styles.actionRow}>
                <Pressable
                  style={[styles.actionBtn, { borderColor: colors.primary }]}
                >
                  <Text style={{ color: colors.primary }}>Start Delivery</Text>
                </Pressable>
                <Pressable
                  style={[styles.actionBtn, { borderColor: colors.emerald }]}
                  onPress={() => {
                    if (!focusedShipment) return;
                    setShipments((curr) =>
                      curr.map((row) =>
                        row.id === focusedShipment.id
                          ? {
                              ...row,
                              status: "delivered",
                              deliveryConfirmed: true,
                            }
                          : row,
                      ),
                    );
                  }}
                >
                  <Text style={{ color: colors.emerald }}>Mark Delivered</Text>
                </Pressable>
                <Pressable
                  style={[styles.actionBtn, { borderColor: colors.danger }]}
                  onPress={() => {
                    if (!focusedShipment) return;
                    setShipments((curr) =>
                      curr.map((row) =>
                        row.id === focusedShipment.id
                          ? { ...row, status: "delayed" }
                          : row,
                      ),
                    );
                  }}
                >
                  <Text style={{ color: colors.danger }}>Report Delay</Text>
                </Pressable>
              </View>
            </DataPanel>
          </FadeInBlock>

          <FadeInBlock delay={150}>
            <DataPanel title="Temperature Monitoring">
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: 14,
                  fontWeight: "700",
                }}
              >{`Current: ${temperature.toFixed(1)} C`}</Text>
              <Text
                style={{
                  color: complianceOk ? colors.emerald : colors.danger,
                  fontSize: 13,
                  fontWeight: "700",
                }}
              >
                {complianceOk
                  ? "Within compliance range"
                  : "Out-of-range alert"}
              </Text>
              <SparkLine points={history} height={100} />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
              >
                {history.slice(-6).map((point, index) => (
                  <View
                    key={`${point.label}-${index}`}
                    style={[
                      styles.logChip,
                      { borderColor: colors.borderDefault },
                    ]}
                  >
                    <Text style={{ color: colors.textSecondary, fontSize: 11 }}>
                      {point.label}
                    </Text>
                    <Text
                      style={{ color: colors.textPrimary, fontWeight: "700" }}
                    >
                      {point.value.toFixed(1)} C
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </DataPanel>
          </FadeInBlock>

          <FadeInBlock delay={190}>
            <DataPanel title="Earnings Summary">
              <View style={styles.earnRow}>
                <Text style={{ color: colors.textSecondary }}>
                  Daily Earnings
                </Text>
                <Text style={{ color: colors.textPrimary, fontWeight: "700" }}>
                  ${earnings.toFixed(2)}
                </Text>
              </View>
              <View style={styles.earnRow}>
                <Text style={{ color: colors.textSecondary }}>
                  Weekly Projection
                </Text>
                <Text style={{ color: colors.textPrimary, fontWeight: "700" }}>
                  ${(earnings * 5.2).toFixed(2)}
                </Text>
              </View>
              <SparkLine points={earningsSeries} height={100} />
              <Pressable
                style={[
                  styles.withdrawBtn,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text
                  style={[styles.withdrawText, { color: colors.bgBackground }]}
                >
                  Request Withdrawal
                </Text>
              </Pressable>
            </DataPanel>
          </FadeInBlock>
          </>
        )}
      </AppScreen>
    );
  }

const styles = StyleSheet.create({
  headerActions: { alignItems: "flex-end", gap: 8 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },
  kpi: { width: "48%", borderWidth: 1, borderRadius: 22, padding: 12, gap: 3 },
  kpiLabel: { fontSize: 12 },
  deliveryRow: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 10,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  deliveryActions: { gap: 6 },
  smallBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  actionRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  actionBtn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  logChip: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minWidth: 86,
    gap: 2,
  },
  earnRow: { flexDirection: "row", justifyContent: "space-between" },
  withdrawBtn: {
    marginTop: 4,
    borderRadius: 12,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  withdrawText: { fontWeight: "800" },
});
