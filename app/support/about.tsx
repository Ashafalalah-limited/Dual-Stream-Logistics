import { StyleSheet, Text } from 'react-native';

import { AppScreen } from '@/components/core/app-screen';
import { DataPanel } from '@/components/core/data-panel';
import { useThemeColors } from '@/hooks/use-theme-colors';

export default function AboutScreen() {
  const colors = useThemeColors();

  return (
    <AppScreen title="About" subtitle="Dual Stream Logistics Limited">
      <DataPanel title="Company Positioning">
        <Text style={[styles.line, { color: colors.textPrimary }]}>- Temperature-controlled logistics specialist</Text>
        <Text style={[styles.line, { color: colors.textPrimary }]}>- Pharmaceutical-compliant cold chain operator</Text>
        <Text style={[styles.line, { color: colors.textPrimary }]}>- Fleet intelligence and route execution platform</Text>
        <Text style={[styles.line, { color: colors.textPrimary }]}>- Secure, technology-enabled logistics infrastructure</Text>
        <Text style={[styles.line, { color: colors.textPrimary }]}>- Scalable, investment-ready operations model</Text>
      </DataPanel>
    </AppScreen>
  );
}

const styles = StyleSheet.create({ line: { fontSize: 13 } });
