import { useSettings } from '../../hooks/useSettings';
import { RadioGroup, RadioItem } from '../RadioGroup';
import { CollapsiblePanel } from '../CollapsiblePanel';
import { useColorTheme } from '../../hooks/useColorTheme';
import { useLocale } from '../../hooks/useLocale';
import { Icon } from '../Icon';
import { useDeviceLocation } from '../../hooks/useDeviceLocation';
import { toast } from '../../utils/utils';
import { useSunPosition } from '../../hooks/useSunPosition';
import { SettingsOptionContainer } from './SettingsOptionContainer';

export const ColorThemeRadioButtons = () => {
  const { modifySettings } = useSettings();
  const { colorThemeSettings } = useColorTheme();
  const { l } = useLocale();
  const { location, deviceCountry, updateLocation } = useDeviceLocation();
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
      <RadioGroup items={radioItems} level={1} selectedId={colorThemeSettings} onSelect={onSelectionChange} />
      {colorThemeSettings === 'custom-sunsync' && (
        <SettingsOptionContainer
          icon={<Icon name={'my-location'} />}
          title={l.settings.general.colorTheme.updateLocation}
          secondaryText={deviceCountry.name !== '' ? deviceCountry.name : undefined }
          type={'secondary'}
          level={2}
          onPress={() => {
            updateLocation();
            toast(l.settings.general.colorTheme.locationRequested);
          }}
        />
      )}
    </CollapsiblePanel>
  );
};
