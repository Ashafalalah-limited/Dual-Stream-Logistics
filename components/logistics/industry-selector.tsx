import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useIndustrySelection } from '@/hooks/use-industry-selection';
import { useThemeColors } from '@/hooks/use-theme-colors';

export function IndustrySelector() {
  const colors = useThemeColors();
  const { industry, setIndustry } = useIndustrySelection();

  const options = [
    { key: 'pharmaceutical', label: 'Pharmaceutical Supply Chain' },
    { key: 'agriculture', label: 'Agriculture Supply Chain' },
  ] as const;

  return (
    <View style={styles.row}>
      {options.map((option) => {
        const active = option.key === industry;
        return (
          <Pressable
            key={option.key}
            onPress={() => setIndustry(option.key)}
            style={[
              styles.button,
              {
                borderColor: active ? colors.primary : colors.borderDefault,
                backgroundColor: active ? colors.primarySoft : colors.bgCardAlt,
              },
            ]}>
            <Text style={{ color: active ? colors.primary : colors.textSecondary, fontSize: 12, fontWeight: '600' }}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  button: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
