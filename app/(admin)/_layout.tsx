import { Tabs } from 'expo-router';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColors } from '@/hooks/use-theme-colors';

export default function AdminLayout() {
  const colors = useThemeColors();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.bgCard,
          borderTopColor: colors.borderDefault,
          height: 64,
          paddingTop: 6,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}>
      <Tabs.Screen
        name="operations"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol name="house.fill" color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol name="gearshape.fill" color={color} size={20} />,
        }}
      />
      <Tabs.Screen name="shipment-lifecycle" options={{ href: null }} />
      <Tabs.Screen name="cold-chain" options={{ href: null }} />
      <Tabs.Screen name="fleet" options={{ href: null }} />
      <Tabs.Screen name="network" options={{ href: null }} />
    </Tabs>
  );
}
