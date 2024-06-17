import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { useUIEffects } from '../../hooks/useUIEffects';
import { useLocale } from '../../hooks/useLocale';
import { usePultosokData } from '../../hooks/usePultosokData';
import { toast } from '../../utils/utils';
import { useColorTheme } from '../../hooks/useColorTheme';
import { Icon } from '../Icon';

export const MarkAllReadButton = () => {
  const { colors } = useColorTheme();
  const { ripple } = useUIEffects();
  const { l } = useLocale();
  const { markAllAsRead } = usePultosokData();

  return (
    <View>
      <TouchableNativeFeedback
        background={ripple}
        onPress={() => {
          markAllAsRead();
          toast(l.settings.general.markedAllAsRead);
        }}
      >
        <View style={styles.button}>
          <View style={{ marginRight: 10 }}>
            <Icon name={'read'} provider={'material-community'} />
          </View>
          <View>
            <Text style={[styles.title, { color: colors.text.main }]}>{l.settings.general.markAllAsRead}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
