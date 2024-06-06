import { useSettings } from '../../settings/hooks/useSettings';
import { RadioGroup, RadioItem } from './general/RadioGroup';
import { CollapsiblePanel } from './general/CollapsiblePanel';
import { useColorTheme } from '../../hooks/useColorTheme';
import { useLocale } from '../../locale/hooks/useLocale';
import { Icon } from '../icons/Icon';

export const ColorThemeRadioButtons = () => {
  const { settings, modifySettings } = useSettings();
  const { colorThemeSettings } = useColorTheme();
  const { l } = useLocale();

  const radioItems: RadioItem[] = [
    {
      id: 'user-preference',
      title: 'System Default',
      icon: <Icon name={'person'} />,
    },
    {
      id: 'light',
      title: 'Light',
      icon: <Icon name={'light-mode'} />,
    },
    {
      id: 'dark',
      title: 'Dark',
      icon: <Icon name={'dark-mode'} />,
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
      icon={<Icon name={'theme-light-dark'} provider={'material-community'} />}
    >
      <RadioGroup
        items={radioItems}
        selectedId={colorThemeSettings}
        onSelect={onSelectionChange}
      />
    </CollapsiblePanel>
  );
};
