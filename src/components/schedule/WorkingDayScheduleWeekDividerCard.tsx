import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useColorTheme } from '../../colors_themes/hooks/useColorTheme';

export const WorkingDayScheduleWeekDividerCard = ({ text }: { text: string }) => {
  const { colors } = useColorTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card.bg,
          shadowColor: colors.card.shadow,
          borderColor: 'rgba(255,255,255,0.38)',
          borderWidth: 1,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.text, { color: colors.text.main }]}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    elevation: 6,
  },
  header: {
    padding: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
