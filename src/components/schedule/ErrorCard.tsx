import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { useLocale } from '../../hooks/useLocale';

export const ErrorCard = ({ errorText }: { errorText: string }) => {
  const { l } = useLocale();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.errorHeaderText}>{l.errorOccurred}</Text>
        <View>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
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
  errorHeaderText: {
    color: '#ea0101',
    fontSize: 24,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'black',
    fontSize: 18,
  },
});
