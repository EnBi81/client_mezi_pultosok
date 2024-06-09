import { View } from 'react-native';
import { Icon } from './icons/Icon';
import { SettingsOptionContainer } from './settings/SettingsOptionContainer';

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
  return (
    <SettingsOptionContainer
      icon={icon}
      title={title}
      type={'secondary'}
      rightSide={
        <View style={{ opacity: ticked ? 1 : 0 }}>
          <Icon name='done' />
        </View>
      }
      onPress={onPress}
      onLongPress={onLongPress}
    />
  );
};
