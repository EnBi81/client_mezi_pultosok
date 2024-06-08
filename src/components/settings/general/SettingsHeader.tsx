import { StyleSheet, View, Text } from 'react-native';
import { useColorTheme } from '../../../colors_themes/hooks/useColorTheme';

export const SettingsHeader = ({ title, description }: { title: string; description: string }) => {
  const { colors } = useColorTheme();

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, { color: colors.text.main }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.text.secondary }]}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 25 },
  title: {
    fontSize: 28,
    fontWeight: '900',
  },
  description: {
    fontSize: 16,
  },
});
