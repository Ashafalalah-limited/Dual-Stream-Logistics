import { StyleSheet, Text, View } from 'react-native';

import type { Shipment } from '@/types/logistics';

type Props = {
  shipment: Shipment;
};

const statusMap: Record<Shipment['status'], { label: string; bg: string; border: string; text: string }> = {
  pending: {
    label: 'PENDING',
    bg: 'rgba(245, 158, 11, 0.12)',
    border: 'rgba(245, 158, 11, 0.35)',
    text: '#f59e0b',
  },
  delivered: {
    label: 'DELIVERED',
    bg: 'rgba(16, 185, 129, 0.12)',
    border: 'rgba(16, 185, 129, 0.35)',
    text: '#10b981',
  },
  'in-transit': {
    label: 'IN TRANSIT',
    bg: 'rgba(59, 130, 246, 0.12)',
    border: 'rgba(59, 130, 246, 0.35)',
    text: '#60a5fa',
  },
  pickup: {
    label: 'PICKUP',
    bg: 'rgba(245, 158, 11, 0.12)',
    border: 'rgba(245, 158, 11, 0.35)',
    text: '#f59e0b',
  },
  'out-for-delivery': {
    label: 'OUT FOR DELIVERY',
    bg: 'rgba(56, 189, 248, 0.12)',
    border: 'rgba(56, 189, 248, 0.35)',
    text: '#38bdf8',
  },
  delayed: {
    label: 'DELAYED',
    bg: 'rgba(239, 68, 68, 0.12)',
    border: 'rgba(239, 68, 68, 0.35)',
    text: '#ef4444',
  },
};

export function ShipmentCard({ shipment }: Props) {
  const statusStyle = statusMap[shipment.status];

  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <View style={styles.titleWrap}>
          <Text style={styles.id}>{shipment.id}</Text>
          <Text style={styles.product}>{shipment.product}</Text>
          <Text style={styles.meta}>{`${shipment.vehicle} | ${shipment.driver}`}</Text>
        </View>

        <View style={[styles.badge, { backgroundColor: statusStyle.bg, borderColor: statusStyle.border }]}>
          <Text style={[styles.badgeText, { color: statusStyle.text }]}>{statusStyle.label}</Text>
        </View>
      </View>

      <View style={styles.rowBetween}>
        <Text style={styles.detail}>{`Temp: ${shipment.currentTemperatureC} C (${shipment.temperatureRange})`}</Text>
        <Text style={styles.compliance}>{`${shipment.compliance}% compliant`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  titleWrap: {
    flex: 1,
    gap: 4,
  },
  id: {
    fontSize: 12,
    fontWeight: '600',
    color: '#22d3ee',
  },
  product: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  meta: {
    color: '#94a3b8',
    fontSize: 12,
  },
  badge: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  detail: {
    color: '#cbd5e1',
    fontSize: 13,
    flex: 1,
  },
  compliance: {
    color: '#34d399',
    fontWeight: '600',
    fontSize: 13,
  },
});
