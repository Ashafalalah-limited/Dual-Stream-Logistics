import { StyleSheet, Text } from 'react-native';

import { AppScreen } from '@/components/core/app-screen';
import { DataPanel } from '@/components/core/data-panel';
import { useThemeColors } from '@/hooks/use-theme-colors';

export default function PrivacyScreen() {
  const colors = useThemeColors();

  return (
    <AppScreen title="Privacy Policy" subtitle="Data security and confidentiality controls">
      <DataPanel title="Policy Summary">
        <Text style={[styles.line, { color: colors.textPrimary }]}>- Shipment and telemetry data are encrypted in transit.</Text>
        <Text style={[styles.line, { color: colors.textPrimary }]}>- Access is role-restricted and audited.</Text>
        <Text style={[styles.line, { color: colors.textPrimary }]}>- Data retention follows compliance requirements.</Text>
      </DataPanel>
    </AppScreen>
  );
}

const styles = StyleSheet.create({ line: { fontSize: 13 } });
