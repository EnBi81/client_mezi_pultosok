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
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
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
