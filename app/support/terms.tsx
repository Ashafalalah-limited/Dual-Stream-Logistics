import { StyleSheet, Text } from 'react-native';

import { AppScreen } from '@/components/core/app-screen';
import { DataPanel } from '@/components/core/data-panel';
import { useThemeColors } from '@/hooks/use-theme-colors';

export default function TermsScreen() {
  const colors = useThemeColors();

  return (
    <AppScreen title="Terms & Conditions" subtitle="Platform usage terms">
      <DataPanel title="Terms Summary">
        <Text style={[styles.line, { color: colors.textPrimary }]}>- Users must maintain accurate shipment records.</Text>
        <Text style={[styles.line, { color: colors.textPrimary }]}>- Unauthorized access attempts are prohibited.</Text>
        <Text style={[styles.line, { color: colors.textPrimary }]}>- Dual Stream reserves rights to enforce compliance controls.</Text>
      </DataPanel>
    </AppScreen>
  );
}

const styles = StyleSheet.create({ line: { fontSize: 13 } });
