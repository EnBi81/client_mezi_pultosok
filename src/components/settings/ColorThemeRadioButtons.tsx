import { useSettings } from '../../settings/hooks/useSettings';
import { RadioGroup, RadioItem } from './general/RadioGroup';
import { CollapsiblePanel } from './general/CollapsiblePanel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { useColorTheme } from '../../hooks/useColorTheme';
import { useLocale } from '../../locale/hooks/useLocale';

export const ColorThemeRadioButtons = () => {
  const { settings, modifySettings } = useSettings();
  const { colorThemeSettings } = useColorTheme();
  const { l } = useLocale();

  const radioItems: RadioItem[] = [
    {
      id: 'user-preference',
      title: 'System Default',
      icon: <Icon name={'person'} size={20} color={'#000'} />,
    },
    {
      id: 'light',
      title: 'Light',
      icon: <Icon name={'light-mode'} size={20} color={'#000'} />,
    },
    {
      id: 'dark',
      title: 'Dark',
      icon: <Icon name={'dark-mode'} size={20} color={'#000'} />,
    },
  ];

  const onSelectionChange = (newColorTheme: string) => {
    let colorTheme;

    if (newColorTheme === 'light') colorTheme = 'light';
    else if (newColorTheme === 'dark') colorTheme = 'dark';
    else colorTheme = 'user-preference';

    modifySettings({
      ...settings,
      colorTheme: colorTheme,
    });
  };

  return (
    <CollapsiblePanel
      title={l.settings.general.colorTheme.collapseTitle}
      icon={
        <IconCommunity name={'theme-light-dark'} size={20} color={'#000'} />
      }
    >
      <RadioGroup
        items={radioItems}
        selectedId={colorThemeSettings}
        onSelect={onSelectionChange}
      />
    </CollapsiblePanel>
  );
};
