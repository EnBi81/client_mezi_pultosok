import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUIEffects } from '../../hooks/useUIEffects';
import { useLocale } from '../../hooks/useLocale';
import { usePultosokDataContext } from '../../schedule_data/hooks/usePultosokDataContext';
import { toast } from '../../utils';

export const MarkAllReadButton = () => {
  const { ripple } = useUIEffects();
  const { l } = useLocale();
  const { markAllAsRead } = usePultosokDataContext();

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
          <View>
            <Icon style={styles.icon} name={'read'} size={20} color={'black'} />
          </View>
          <View>
            <Text style={styles.title}>{l.settings.general.markAllAsRead}</Text>
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
  icon: {
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
