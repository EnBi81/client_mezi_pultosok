import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { useLocale } from '../../hooks/useLocale';
import { useColorTheme } from '../../hooks/useColorTheme';
import { useEnvironment } from '../../hooks/useEnvironment';
import { Icon } from '../Icon';

export const ErrorCard = ({ errorText }: { errorText: string }) => {
  const { l } = useLocale();
  const { colors } = useColorTheme();
  const { isDebug } = useEnvironment();

  return (
    <View style={[styles.card, { backgroundColor: colors.card.bg, shadowColor: colors.card.shadow }]}>
      <View style={{ marginTop: 20, marginLeft: 10 }}>
        <Icon name={'error'} color={'#ea0101'} size={35} />
      </View>
      <View style={styles.header}>
        <Text style={[styles.errorHeaderText, { color: colors.text.main }]}>{l.schedule.errorOccurred}</Text>
        {isDebug && (
          <View>
            <Text style={[styles.errorText, { color: colors.text.secondary }]}>{errorText}</Text>
          </View>
        )}
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
    flexDirection: 'row',
  },
  header: {
    padding: 16,
    flex: 1,
  },
  errorHeaderText: {
    color: '#ea0101',
    fontSize: 24,
    fontWeight: 'bold',
    wordWrap: 'wrap',
  },
  errorText: {
    fontSize: 18,
  },
});
