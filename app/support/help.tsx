import { StyleSheet, Text } from 'react-native';

import { AppScreen } from '@/components/core/app-screen';
import { DataPanel } from '@/components/core/data-panel';
import { useThemeColors } from '@/hooks/use-theme-colors';

export default function HelpScreen() {
  const colors = useThemeColors();

  return (
    <AppScreen title="Help & Support" subtitle="Operational assistance and issue escalation">
      <DataPanel title="Support Workflow">
        <Text style={[styles.line, { color: colors.textPrimary }]}>1. Open incident report with shipment ID.</Text>
        <Text style={[styles.line, { color: colors.textPrimary }]}>2. Include temperature logs and route details.</Text>
        <Text style={[styles.line, { color: colors.textPrimary }]}>3. Compliance team responds within SLA window.</Text>
      </DataPanel>
    </AppScreen>
  );
}

const styles = StyleSheet.create({ line: { fontSize: 13 } });
