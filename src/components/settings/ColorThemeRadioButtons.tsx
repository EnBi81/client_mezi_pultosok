import { useSettings } from '../../settings/hooks/useSettings';
import { RadioGroup, RadioItem } from './general/RadioGroup';
import { CollapsiblePanel } from './general/CollapsiblePanel';
import { useColorTheme } from '../../colors_themes/hooks/useColorTheme';
import { useLocale } from '../../locale/hooks/useLocale';
import { Icon } from '../icons/Icon';
import { useDeviceLocation } from '../../location/hooks/useDeviceLocation';
import { toast } from '../../utils';
import { useSunPosition } from '../../colors_themes/hooks/useSunPosition';

export const ColorThemeRadioButtons = () => {
  const { modifySettings } = useSettings();
  const { colorThemeSettings } = useColorTheme();
  const { l } = useLocale();
  const { location } = useDeviceLocation();
  const { nextSunEvent } = useSunPosition();

  const radioItems: RadioItem[] = [
    {
      id: 'user-preference',
      title: l.settings.general.colorTheme.systemDefault,
      icon: <Icon name={'person'} />,
    },
    {
      id: 'light',
      title: l.settings.general.colorTheme.lightMode,
      icon: <Icon name={'light-mode'} />,
    },
    {
      id: 'dark',
      title: l.settings.general.colorTheme.darkMode,
      icon: <Icon name={'dark-mode'} />,
    },
    {
      id: 'custom-sunsync',
      title: l.settings.general.colorTheme.sunSync,
      icon: <Icon name={'weather-sunset'} provider={'material-community'} />,
      onLongPress: () => {
        if (!nextSunEvent) {
          toast(l.settings.general.colorTheme.failedToGetSunEvent);
          return;
        }

        toast(nextSunEvent.getDisplayTextUntil());
      },
    },
  ];

  const onSelectionChange = (newColorTheme: string) => {
    let colorTheme;

    if (newColorTheme === 'light') colorTheme = 'light';
    else if (newColorTheme === 'dark') colorTheme = 'dark';
    else if (newColorTheme === 'custom-sunsync') colorTheme = 'custom-sunsync';
    else colorTheme = 'user-preference';

    if (colorTheme === 'custom-sunsync' && location.access === 'denied') {
      toast(l.settings.general.colorTheme.sunSyncModeEnableLocationToTurnOnSunSyncMode);
      return;
    }

    modifySettings(
      (settings) =>
        (settings.colorThemeProps = {
          type: colorTheme,
          darkTimeFrom: undefined,
          darkTimeTo: undefined,
        }),
    );
  };

  return (
    <CollapsiblePanel
      title={l.settings.general.colorTheme.collapseTitle}
      icon={<Icon name={'theme-light-dark'} provider={'material-community'} />}
    >
      <RadioGroup items={radioItems} selectedId={colorThemeSettings} onSelect={onSelectionChange} />
    </CollapsiblePanel>
  );
};
