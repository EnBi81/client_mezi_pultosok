import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export interface RadioItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
}

export const RadioGroup = ({
  items,
  selectedId,
  onSelect,
}: {
  items: RadioItem[];
  selectedId: string | undefined;
  onSelect: (string) => void;
}) => {
  return (
    <View>
      {items.map((item) => (
        <RadioButton
          key={item.id}
          ticked={item.id === selectedId}
          icon={item.icon}
          title={item.title}
          onPress={() => onSelect(item.id)}
        />
      ))}
    </View>
  );
};

const RadioButton = ({
  ticked,
  title,
  icon,
  onPress,
}: {
  ticked: boolean;
  title: string;
  icon?: React.ReactNode;
  onPress: () => void;
}) => {
  return (
    <View style={buttonStyles.wrapper}>
      <TouchableNativeFeedback onPress={onPress}>
        <View style={buttonStyles.contentWrapper}>
          <View style={{ flexDirection: 'row' }}>
            <View style={buttonStyles.iconWrapper}>{icon && icon}</View>
            <View>
              <Text style={buttonStyles.title}>{title}</Text>
            </View>
          </View>
          <View style={{ opacity: ticked ? 1 : 0 }}>
            <Icon name='done' size={20} color='#000' />
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  wrapper: {},
  contentWrapper: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    color: 'black',
  },
  iconWrapper: {
    marginRight: 5,
    width: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
