import { StyleSheet, TouchableNativeFeedback, View, Text } from 'react-native';
import { useUIEffects } from '../../hooks/useUIEffects';
import { useColorTheme } from '../../hooks/useColorTheme';

interface SettingsOptionContainerProps {
  onPress?: () => void;
  onLongPress?: () => void;
  icon: React.ReactNode;
  title: string;
  type?: 'primary' | 'secondary' | undefined;
  rightSide?: React.ReactNode | undefined;
}

export const SettingsOptionContainer = ({
  title,
  icon,
  onPress,
  onLongPress,
  rightSide,
  type = 'primary',
}: SettingsOptionContainerProps) => {
  const { ripple } = useUIEffects();
  const { colors } = useColorTheme();

  const isPrimary = type === 'primary' || type === undefined;
  const isSecondary = type === 'secondary';

  return (
    <View style={styles.maxWidth}>
      <TouchableNativeFeedback background={ripple} onPress={onPress} onLongPress={onLongPress}>
        <View style={[styles.row, { padding: isPrimary ? 15 : 10 }]}>
          <View style={styles.icon}>{icon}</View>
          {isPrimary && <Text style={[styles.title, { fontWeight: 'bold', color: colors.text.main }]}>{title}</Text>}
          {isSecondary && <Text style={[styles.title, { color: colors.text.secondary }]}>{title}</Text>}
          <View>{rightSide}</View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  maxWidth: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    padding: 15,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  arrow: {
    marginLeft: 10,
  },
  contentWrapper: {
    width: '100%',
    paddingLeft: 15,
  },
});