import { View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUIEffects } from '../../hooks/useUIEffects';
import { toast } from '../../utils';
import { useLocale } from '../../hooks/useLocale';

export const MarkAllReadButton = () => {
  const { ripple } = useUIEffects();
  const { l } = useLocale();

  return (
    <View>
      <TouchableNativeFeedback
        background={ripple}
        onPress={() => toast('This button is under development')}
      >
        <View style={styles.button}>
          <View>
            <Icon style={styles.icon} name={'read'} size={20} color={'black'} />
          </View>
          <View>
            <Text style={styles.title}>{l.settings.markAllAsRead}</Text>
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
