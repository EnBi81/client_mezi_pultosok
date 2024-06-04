import { StyleSheet, View, Text } from 'react-native';

export const SettingsSection = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 25 },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: 'black',
  },
  description: {
    fontSize: 16,
    color: '#3d3d3d',
  },
});
