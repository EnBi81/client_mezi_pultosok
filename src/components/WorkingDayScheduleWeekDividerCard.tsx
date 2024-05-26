import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const WorkingDayScheduleWeekDividerCard = ({
  text,
}: {
  text: string;
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    elevation: 8,
  },
  header: {
    padding: 16,
  },
  text: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
