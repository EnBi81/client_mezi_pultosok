import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { useColorTheme } from '../../../colors_themes/hooks/useColorTheme';
import { Icon } from '../../icons/Icon';

export interface RadioItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  onLongPress?: () => void;
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
  const emptyFunction = () => {};

  return (
    <View>
      {items.map((item) => (
        <RadioButton
          key={item.id}
          ticked={item.id === selectedId}
          icon={item.icon}
          title={item.title}
          onPress={() => onSelect(item.id)}
          onLongPress={item.onLongPress ?? emptyFunction}
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
  onLongPress,
}: {
  ticked: boolean;
  title: string;
  icon?: React.ReactNode;
  onPress: () => void;
  onLongPress: () => void;
}) => {
  const { colors } = useColorTheme();

  return (
    <View style={buttonStyles.wrapper}>
      <TouchableNativeFeedback onPress={onPress} onLongPress={onLongPress}>
        <View style={buttonStyles.contentWrapper}>
          <View style={{ flexDirection: 'row' }}>
            <View style={buttonStyles.iconWrapper}>{icon && icon}</View>
            <View>
              <Text style={{ color: colors.text.secondary }}>{title}</Text>
            </View>
          </View>
          <View style={{ opacity: ticked ? 1 : 0 }}>
            <Icon name='done' />
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
  iconWrapper: {
    marginRight: 5,
    width: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
