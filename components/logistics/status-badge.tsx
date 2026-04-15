import { StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme-colors';
import type { ShipmentStatus } from '@/types/logistics';

type Props = {
  status: ShipmentStatus;
};

const labels: Record<ShipmentStatus, string> = {
  pending: 'Pending',
  pickup: 'Driver Picked Up',
  'in-transit': 'In Transit',
  'out-for-delivery': 'Out for Delivery',
  delivered: 'Delivered',
  delayed: 'Delayed',
};

export function StatusBadge({ status }: Props) {
  const colors = useThemeColors();

  const tone =
    status === 'delivered'
      ? colors.emerald
      : status === 'in-transit' || status === 'out-for-delivery'
        ? colors.primary
        : status === 'delayed'
          ? colors.danger
          : colors.warning;

  return (
    <View style={[styles.badge, { borderColor: tone, backgroundColor: `${tone}22` }]}> 
      <Text style={[styles.text, { color: tone }]}>{labels[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
});
