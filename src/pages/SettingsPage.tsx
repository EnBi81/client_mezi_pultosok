import { View, Text, StyleSheet } from 'react-native';

export const SettingsPage = () => {
  return (
    <View style={[styles.maxSize, styles.whiteBg]}>
      <Text>Good Morning</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  maxSize: {
    width: '100%',
    height: '100%',
  },
  whiteBg: {
    backgroundColor: 'white',
  },
});
