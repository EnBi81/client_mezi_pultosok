import { View } from 'react-native';
import { Icon } from './Icon';
import { SettingsOptionContainer } from './settings/SettingsOptionContainer';

export interface RadioItem {
  id: string;
  title: string;
  secondaryTitle?: string | React.ReactNode;
  icon?: React.ReactNode;
  onLongPress?: () => void;
}

export const RadioGroup = ({
  items,
  selectedId,
  onSelect,
  level,
}: {
  items: RadioItem[];
  selectedId: string | undefined;
  onSelect: (selected: string) => void;
  level: number;
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
          secondaryTitle={item.secondaryTitle}
          level={level}
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
  secondaryTitle,
  icon,
  onPress,
  onLongPress,
  level,
}: {
  ticked: boolean;
  title: string;
  secondaryTitle: string | React.ReactNode | undefined;
  icon?: React.ReactNode;
  onPress: () => void;
  onLongPress: () => void;
  level: number;
}) => {
  return (
    <SettingsOptionContainer
      icon={icon}
      title={title}
      secondaryText={secondaryTitle}
      type={'secondary'}
      level={level}
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
