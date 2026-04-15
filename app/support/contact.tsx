import { StyleSheet, Text } from 'react-native';

import { AppScreen } from '@/components/core/app-screen';
import { DataPanel } from '@/components/core/data-panel';
import { useThemeColors } from '@/hooks/use-theme-colors';

export default function ContactScreen() {
  const colors = useThemeColors();

  return (
    <AppScreen title="Contact" subtitle="Enterprise support channels">
      <DataPanel title="Dual Stream Logistics">
        <Text style={[styles.line, { color: colors.textPrimary }]}>Email: support@dualstreamlogistics.com</Text>
        <Text style={[styles.line, { color: colors.textPrimary }]}>Phone: +234 800 000 0000</Text>
        <Text style={[styles.line, { color: colors.textPrimary }]}>Operations Desk: 24/7</Text>
      </DataPanel>
    </AppScreen>
  );
}

const styles = StyleSheet.create({ line: { fontSize: 13 } });
