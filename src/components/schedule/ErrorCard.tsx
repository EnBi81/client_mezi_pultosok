import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { useLocale } from '../../locale/hooks/useLocale';
import { useColorTheme } from '../../colors_themes/hooks/useColorTheme';

export const ErrorCard = ({ errorText }: { errorText: string }) => {
  const { l } = useLocale();
  const { colors } = useColorTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card.bg, shadowColor: colors.card.shadow }]}>
      <View style={styles.header}>
        <Text style={styles.errorHeaderText}>{l.schedule.errorOccurred}</Text>
        <View>
          <Text style={[styles.errorText, { color: colors.text.secondary }]}>{errorText}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginVertical: 8,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    elevation: 8,
  },
  header: {
    padding: 16,
  },
  errorHeaderText: {
    color: '#ea0101',
    fontSize: 24,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
  },
});
