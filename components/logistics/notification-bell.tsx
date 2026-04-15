import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme-colors';
import type { NotificationItem } from '@/hooks/use-realtime-logistics';

type Props = {
  items: NotificationItem[];
  open: boolean;
  onToggle: () => void;
};

export function NotificationBell({ items, open, onToggle }: Props) {
  const colors = useThemeColors();

  return (
    <View style={styles.wrap}>
      <Pressable
        onPress={onToggle}
        style={({ pressed }) => [
          styles.bell,
          {
            borderColor: colors.borderDefault,
            backgroundColor: colors.bgCardAlt,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
        ]}>
        <Text style={[styles.bellText, { color: colors.textPrimary }]}>{`Alerts (${items.length})`}</Text>
      </Pressable>

      {open ? (
        <View
          style={[
            styles.dropdown,
            { borderColor: colors.borderDefault, backgroundColor: colors.bgCard, shadowColor: colors.shadow },
          ]}>
          {items.slice(0, 4).map((item) => (
            <View key={item.id} style={styles.row}>
              <Text style={[styles.message, { color: colors.textPrimary }]}>{item.message}</Text>
              <Text style={[styles.time, { color: colors.textSecondary }]}>{item.at}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    alignItems: 'flex-end',
  },
  bell: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  bellText: {
    fontSize: 12,
    fontWeight: '700',
  },
  dropdown: {
    position: 'absolute',
    top: 44,
    right: 0,
    zIndex: 10,
    borderWidth: 1,
    borderRadius: 14,
    padding: 10,
    gap: 10,
    width: 250,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 8,
  },
  row: {
    gap: 2,
  },
  message: {
    fontSize: 12,
  },
  time: {
    fontSize: 11,
  },
});

