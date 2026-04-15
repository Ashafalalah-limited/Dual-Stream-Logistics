import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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
import type {
  Shipment,
  ShipmentStatus,
  TemperatureMode,
} from "@/types/logistics";

const historyFilters: ("all" | ShipmentStatus)[] = [
  "all",
  "pending",
  "in-transit",
  "delivered",
  "delayed",
];
const tempModes: TemperatureMode[] = ["ambient", "chilled", "frozen"];

function kpiTitle(status: "active" | "transit" | "delivered" | "alerts") {
  return status === "active"
    ? "Active Shipments"
    : status === "transit"
      ? "In Transit"
      : status === "delivered"
        ? "Delivered"
        : "Temperature Alerts";
}

export default function CustomerDashboard() {
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
    invoice,
  } = useRealtimeLogistics();

  const [alertsOpen, setAlertsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof historyFilters)[number]>("all");
  const [detail, setDetail] = useState<Shipment | null>(null);
  const [rating, setRating] = useState(0);

  const [pickup, setPickup] = useState("Lagos Pharma Hub");
  const [delivery, setDelivery] = useState("Lekki Medical Center");
  const [packageType, setPackageType] = useState("Vaccines");
  const [tempMode, setTempMode] = useState<TemperatureMode>("chilled");
  const [weight, setWeight] = useState("280");
  const [eta, setEta] = useState("18:00");
  const [createdMessage, setCreatedMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (industry === "pharmaceutical") {
      setPickup("Lagos Pharma Hub");
      setDelivery("Lekki Medical Center");
      setPackageType("Vaccines");
      setTempMode("chilled");
      return;
    }

    setPickup("Agege Produce Depot");
    setDelivery("VI Fresh Market");
    setPackageType("Fresh Produce");
    setTempMode("ambient");
  }, [industry]);

  if (!user || user.role !== "customer") {
    return null;
  }

  const scopedShipments = shipments.filter((item) =>
    industry === "pharmaceutical"
      ? item.productClass.toLowerCase().includes("pharma")
      : item.productClass.toLowerCase().includes("agriculture"),
  );

  const scopedKpis = {
    active: scopedShipments.filter((item) => item.status !== "delivered")
      .length,
    inTransit: scopedShipments.filter(
      (item) =>
        item.status === "in-transit" || item.status === "out-for-delivery",
    ).length,
    delivered: scopedShipments.filter((item) => item.status === "delivered")
      .length,
    alerts: scopedShipments.filter((item) => item.status === "delayed").length,
  };

  const filteredHistory = scopedShipments.filter((item) => {
    const byStatus =
      statusFilter === "all" ? true : item.status === statusFilter;
    const q = search.trim().toLowerCase();
    const bySearch =
      q.length === 0 ||
      item.id.toLowerCase().includes(q) ||
      item.product.toLowerCase().includes(q);
    return byStatus && bySearch;
  });

  const workflow: ShipmentStatus[] = [
    "pending",
    "pickup",
    "in-transit",
    "out-for-delivery",
    "delivered",
  ];

  const weeklySeries = [
    { label: "Mon", value: 18 },
    { label: "Tue", value: 23 },
    { label: "Wed", value: 20 },
    { label: "Thu", value: 26 },
    { label: "Fri", value: 22 },
    { label: "Sat", value: 19 },
    { label: "Sun", value: 24 },
  ];

  return (
    <AppScreen
      title={
        industry === "pharmaceutical"
          ? "Pharmaceutical dashboard"
          : "Agriculture dashboard"
      }
      subtitle="Shipment management, tracking, compliance and billing"
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
          <PanelSkeleton rows={5} />
        </>
      ) : (
        <>
          <FadeInBlock delay={10}>
            <DataPanel title="Supply chain">
              <IndustrySelector />
            </DataPanel>
          </FadeInBlock>

          <FadeInBlock delay={30}>
            <DataPanel title="Dashboard Overview">
              <View style={styles.kpiGrid}>
                <View
                  style={[
                    styles.kpiCard,
                    {
                      borderColor: colors.borderDefault,
                      backgroundColor: colors.bgCardAlt,
                    },
                  ]}
                >
                  <Text
                    style={[styles.kpiLabel, { color: colors.textSecondary }]}
                  >
                    {kpiTitle("active")}
                  </Text>
                  <AnimatedCounter value={scopedKpis.active} />
                </View>
                <View
                  style={[
                    styles.kpiCard,
                    {
                      borderColor: colors.borderDefault,
                      backgroundColor: colors.bgCardAlt,
                    },
                  ]}
                >
                  <Text
                    style={[styles.kpiLabel, { color: colors.textSecondary }]}
                  >
                    {kpiTitle("transit")}
                  </Text>
                  <AnimatedCounter value={scopedKpis.inTransit} />
                </View>
                <View
                  style={[
                    styles.kpiCard,
                    {
                      borderColor: colors.borderDefault,
                      backgroundColor: colors.bgCardAlt,
                    },
                  ]}
                >
                  <Text
                    style={[styles.kpiLabel, { color: colors.textSecondary }]}
                  >
                    {kpiTitle("delivered")}
                  </Text>
                  <AnimatedCounter value={scopedKpis.delivered} />
                </View>
                <View
                  style={[
                    styles.kpiCard,
                    {
                      borderColor: colors.borderDefault,
                      backgroundColor: colors.bgCardAlt,
                    },
                  ]}
                >
                  <Text
                    style={[styles.kpiLabel, { color: colors.textSecondary }]}
                  >
                    {kpiTitle("alerts")}
                  </Text>
                  <AnimatedCounter value={scopedKpis.alerts} />
                </View>
              </View>
              <SparkLine points={weeklySeries} />
            </DataPanel>
          </FadeInBlock>

          <FadeInBlock delay={70}>
            <DataPanel title="Create Shipment">
              <View style={styles.grid2}>
                <View style={styles.fieldWrap}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>
                    Pickup Location
                  </Text>
                  <TextInput
                    value={pickup}
                    onChangeText={setPickup}
                    style={[
                      styles.input,
                      {
                        borderColor: colors.borderDefault,
                        color: colors.textPrimary,
                      },
                    ]}
                  />
                </View>
                <View style={styles.fieldWrap}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>
                    Delivery Location
                  </Text>
                  <TextInput
                    value={delivery}
                    onChangeText={setDelivery}
                    style={[
                      styles.input,
                      {
                        borderColor: colors.borderDefault,
                        color: colors.textPrimary,
                      },
                    ]}
                  />
                </View>
                <View style={styles.fieldWrap}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>
                    Package Type
                  </Text>
                  <TextInput
                    value={packageType}
                    onChangeText={setPackageType}
                    style={[
                      styles.input,
                      {
                        borderColor: colors.borderDefault,
                        color: colors.textPrimary,
                      },
                    ]}
                  />
                </View>
                <View style={styles.fieldWrap}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>
                    Weight (kg)
                  </Text>
                  <TextInput
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="number-pad"
                    style={[
                      styles.input,
                      {
                        borderColor: colors.borderDefault,
                        color: colors.textPrimary,
                      },
                    ]}
                  />
                </View>
                <View style={styles.fieldWrap}>
                  <Text style={[styles.label, { color: colors.textSecondary }]}>
                    Estimated Delivery Time
                  </Text>
                  <TextInput
                    value={eta}
                    onChangeText={setEta}
                    style={[
                      styles.input,
                      {
                        borderColor: colors.borderDefault,
                        color: colors.textPrimary,
                      },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.modeRow}>
                {tempModes.map((mode) => (
                  <Pressable
                    key={mode}
                    onPress={() => setTempMode(mode)}
                    style={() => [
                      styles.modeBtn,
                      {
                        borderColor:
                          tempMode === mode
                            ? colors.primary
                            : colors.borderDefault,
                        backgroundColor:
                          tempMode === mode
                            ? colors.primarySoft
                            : colors.bgCardAlt,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color:
                          tempMode === mode
                            ? colors.primary
                            : colors.textSecondary,
                        textTransform: "capitalize",
                      }}
                    >
                      {mode}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Pressable
                onPress={() => {
                  const trackingId = `DSL-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
                  const created: Shipment = {
                    id: trackingId,
                    product: packageType,
                    productClass:
                      industry === "pharmaceutical" ? "Pharma" : "Agriculture",
                    packageType,
                    pickupLocation: pickup,
                    deliveryLocation: delivery,
                    weightKg: Number(weight) || 0,
                    estimatedDeliveryTime: eta,
                    temperatureMode: tempMode,
                    temperatureRange:
                      tempMode === "frozen"
                        ? "-20 to -16 C"
                        : tempMode === "chilled"
                          ? "2 to 8 C"
                          : "10 to 26 C",
                    vehicle:
                      tempMode === "frozen"
                        ? "FRZ-009"
                        : tempMode === "chilled"
                          ? "CHL-021"
                          : "AMB-015",
                    driver: "Unassigned",
                    pickupConfirmed: false,
                    status: "pending",
                    deliveryConfirmed: false,
                    compliance: 100,
                    currentTemperatureC:
                      tempMode === "frozen"
                        ? -18
                        : tempMode === "chilled"
                          ? 4.8
                          : 21,
                    eta,
                  };
                  setShipments((current) => [created, ...current]);
                  setCreatedMessage(
                    `Shipment created successfully. Tracking ID: ${trackingId}`,
                  );
                }}
                style={({ pressed }) => [
                  styles.primaryBtn,
                  {
                    backgroundColor: colors.primary,
                    transform: [{ scale: pressed ? 0.99 : 1 }],
                  },
                ]}
              >
                <Text
                  style={[
                    styles.primaryBtnText,
                    { color: colors.bgBackground },
                  ]}
                >
                  Create Shipment
                </Text>
              </Pressable>
              {createdMessage ? (
                <Text
                  style={[styles.createdMessage, { color: colors.emerald }]}
                >
                  {createdMessage}
                </Text>
              ) : null}
            </DataPanel>
          </FadeInBlock>

          <FadeInBlock delay={110}>
            <DataPanel title="Shipment History">
              <View style={styles.filterRow}>
                <TextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search shipment ID"
                  placeholderTextColor={colors.textSecondary}
                  style={[
                    styles.searchInput,
                    {
                      borderColor: colors.borderDefault,
                      color: colors.textPrimary,
                    },
                  ]}
                />
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.chipWrap}
                >
                  {historyFilters.map((filter) => (
                    <Pressable
                      key={filter}
                      onPress={() => setStatusFilter(filter)}
                      style={[
                        styles.chip,
                        {
                          borderColor:
                            statusFilter === filter
                              ? colors.primary
                              : colors.borderDefault,
                          backgroundColor:
                            statusFilter === filter
                              ? colors.primarySoft
                              : colors.bgCardAlt,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color:
                            statusFilter === filter
                              ? colors.primary
                              : colors.textSecondary,
                        }}
                      >
                        {filter.replace(/-/g, " ")}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              {filteredHistory.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => setDetail(item)}
                  style={[
                    styles.rowItem,
                    { borderColor: colors.borderDefault },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[styles.rowTitle, { color: colors.textPrimary }]}
                    >
                      {item.id}
                    </Text>
                    <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
                      {item.product}
                    </Text>
                  </View>
                  <StatusBadge status={item.status} />
                </Pressable>
              ))}
            </DataPanel>
          </FadeInBlock>

          <FadeInBlock delay={150}>
            <DataPanel title="Real-Time Tracking">
              <LiveMapSimulation
                progress={progress}
                eta={focusedShipment?.eta ?? "18:00"}
                temperatureMode={focusedShipment?.temperatureMode}
              />
              <SparkLine points={history} height={95} />
            </DataPanel>
          </FadeInBlock>

          <FadeInBlock delay={190}>
            <DataPanel title="Temperature Compliance View">
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: 14,
                  fontWeight: "700",
                }}
              >{`Live Reading: ${temperature.toFixed(1)} C`}</Text>
              <Text
                style={{ color: colors.textPrimary, fontSize: 13 }}
              >{`Required Range: ${focusedShipment?.temperatureRange ?? "2-8 C"}`}</Text>
              <Text
                style={{
                  color: complianceOk ? colors.emerald : colors.danger,
                  fontSize: 13,
                  fontWeight: "700",
                }}
              >
                {complianceOk ? "Within Range" : "Out Of Range Alert"}
              </Text>
              <SparkLine points={history} height={90} />
            </DataPanel>
          </FadeInBlock>

          <FadeInBlock delay={230}>
            <DataPanel title="Delivery Confirmation Workflow">
              <View style={styles.flowRow}>
                {workflow.map((step) => {
                  const reached =
                    workflow.indexOf(step) <=
                    workflow.indexOf(focusedShipment?.status ?? "pending");
                  return (
                    <View key={step} style={styles.flowStep}>
                      <View
                        style={[
                          styles.flowDot,
                          {
                            backgroundColor: reached
                              ? colors.primary
                              : colors.borderDefault,
                          },
                        ]}
                      />
                      <Text
                        style={{
                          color: reached
                            ? colors.textPrimary
                            : colors.textSecondary,
                          fontSize: 11,
                        }}
                      >
                        {step.replace(/-/g, " ")}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.actionRow}>
                <Pressable
                  style={[styles.actionBtn, { borderColor: colors.emerald }]}
                >
                  <Text style={{ color: colors.emerald }}>
                    Confirm Delivery
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.actionBtn, { borderColor: colors.danger }]}
                >
                  <Text style={{ color: colors.danger }}>Report Issue</Text>
                </Pressable>
              </View>
              <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Pressable key={star} onPress={() => setRating(star)}>
                    <Text
                      style={{
                        color:
                          star <= rating
                            ? colors.warning
                            : colors.textSecondary,
                        fontSize: 20,
                      }}
                    >
                      ★
                    </Text>
                  </Pressable>
                ))}
              </View>
            </DataPanel>
          </FadeInBlock>

          <FadeInBlock delay={270}>
            <DataPanel title="Invoice Summary">
              <View style={styles.invoiceRow}>
                <Text style={{ color: colors.textSecondary }}>
                  Shipment Cost
                </Text>
                <Text style={{ color: colors.textPrimary }}>
                  ${invoice.baseFee.toFixed(2)}
                </Text>
              </View>
              <View style={styles.invoiceRow}>
                <Text style={{ color: colors.textSecondary }}>
                  Distance Fee
                </Text>
                <Text style={{ color: colors.textPrimary }}>
                  ${invoice.distanceFee.toFixed(2)}
                </Text>
              </View>
              <View style={styles.invoiceRow}>
                <Text style={{ color: colors.textSecondary }}>
                  Temp Handling
                </Text>
                <Text style={{ color: colors.textPrimary }}>
                  ${invoice.handlingFee.toFixed(2)}
                </Text>
              </View>
              <View style={styles.invoiceRow}>
                <Text style={{ color: colors.textSecondary }}>VAT</Text>
                <Text style={{ color: colors.textPrimary }}>
                  ${invoice.vat.toFixed(2)}
                </Text>
              </View>
              <View
                style={[
                  styles.invoiceRow,
                  styles.totalRow,
                  { borderTopColor: colors.borderDefault },
                ]}
              >
                <Text style={{ color: colors.textPrimary, fontWeight: "700" }}>
                  Total
                </Text>
                <Text style={{ color: colors.textPrimary, fontWeight: "700" }}>
                  ${invoice.total.toFixed(2)}
                </Text>
              </View>

              <View style={styles.actionRow}>
                <Pressable
                  style={[styles.actionBtn, { borderColor: colors.primary }]}
                >
                  <Text style={{ color: colors.primary }}>Download PDF</Text>
                </Pressable>
                <Pressable
                  style={[styles.payBtn, { backgroundColor: colors.emerald }]}
                >
                  <Text
                    style={[
                      styles.primaryBtnText,
                      { color: colors.bgBackground },
                    ]}
                  >
                    Pay Now
                  </Text>
                </Pressable>
              </View>
            </DataPanel>
          </FadeInBlock>
        </>
      )}

      <Modal
        visible={Boolean(detail)}
        transparent
        animationType="slide"
        onRequestClose={() => setDetail(null)}
      >
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: colors.bgCard,
                borderColor: colors.borderDefault,
              },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
              {detail?.id}
            </Text>
            <Text style={{ color: colors.textSecondary }}>
              {detail?.product}
            </Text>
            <Text
              style={{ color: colors.textPrimary }}
            >{`Pickup: ${detail?.pickupLocation ?? "-"}`}</Text>
            <Text
              style={{ color: colors.textPrimary }}
            >{`Delivery: ${detail?.deliveryLocation ?? "-"}`}</Text>
            <Text
              style={{ color: colors.textPrimary }}
            >{`Vehicle: ${detail?.vehicle}`}</Text>
            <Text
              style={{ color: colors.textPrimary }}
            >{`Driver: ${detail?.driver}`}</Text>
            {detail ? <StatusBadge status={detail.status} /> : null}
            <Pressable
              onPress={() => setDetail(null)}
              style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            >
              <Text
                style={[styles.primaryBtnText, { color: colors.bgBackground }]}
              >
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  headerActions: { alignItems: "flex-end", gap: 8 },
  kpiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
  },
  kpiCard: {
    width: "48%",
    borderWidth: 1,
    borderRadius: 22,
    padding: 12,
    gap: 4,
  },
  kpiLabel: { fontSize: 12, fontWeight: "600" },
  grid2: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 8,
  },
  fieldWrap: { width: "48%", gap: 4 },
  label: { fontSize: 12 },
  input: {
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
  },
  modeRow: { flexDirection: "row", gap: 8 },
  modeBtn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  primaryBtn: {
    marginTop: 8,
    borderRadius: 12,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  payBtn: {
    borderRadius: 12,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  primaryBtnText: { fontWeight: "800" },
  createdMessage: { fontSize: 12, marginTop: 6, fontWeight: "600" },
  filterRow: { gap: 10 },
  searchInput: {
    borderWidth: 1,
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 10,
  },
  chipWrap: { gap: 8 },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  rowItem: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rowTitle: { fontWeight: "700" },
  flowRow: { flexDirection: "row", justifyContent: "space-between" },
  flowStep: { alignItems: "center", width: 62, gap: 4 },
  flowDot: { width: 12, height: 12, borderRadius: 20 },
  actionRow: { flexDirection: "row", gap: 10 },
  actionBtn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flex: 1,
    alignItems: "center",
  },
  ratingRow: { flexDirection: "row", gap: 6 },
  invoiceRow: { flexDirection: "row", justifyContent: "space-between" },
  totalRow: { borderTopWidth: 1, paddingTop: 8 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(4, 12, 24, 0.7)",
    justifyContent: "center",
    padding: 18,
  },
  modalCard: { borderWidth: 1, borderRadius: 22, padding: 16, gap: 9 },
  modalTitle: { fontSize: 18, fontWeight: "800" },
});
