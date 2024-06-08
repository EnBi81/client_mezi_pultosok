import { useSettings } from '../../settings/hooks/useSettings';
import { RadioGroup, RadioItem } from './general/RadioGroup';
import { CollapsiblePanel } from './general/CollapsiblePanel';
import { useColorTheme } from '../../colors_themes/useColorTheme';
import { useLocale } from '../../locale/hooks/useLocale';
import { Icon } from '../icons/Icon';
import { useDeviceLocation } from '../../location/hooks/useDeviceLocation';
import { formatString, toast } from '../../utils';
import SunCalc from 'suncalc';

export const ColorThemeRadioButtons = () => {
  const { modifySettings } = useSettings();
  const { colorThemeSettings } = useColorTheme();
  const { l } = useLocale();
  const { location } = useDeviceLocation();

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
        const now = new Date();
        const sunCalculationResult = SunCalc.getTimes(now, location.latitude, location.longitude, 0);

        const showToastUntilNextTime = (
          timeFrom: Date,
          timeTo: Date,
          locales: { manyHours: string; oneHour: string; manyMinutes: string; oneMinute: string },
        ): boolean => {
          const isBeforeTime = timeFrom.getTime() < timeTo.getTime();

          if (!isBeforeTime) return false;

          const allMinutesUntil = (timeTo.getTime() - timeFrom.getTime()) / (1000 * 60);

          // less than an hour
          if (allMinutesUntil < 60) {
            if (allMinutesUntil < 2) toast(locales.oneMinute);
            else toast(formatString(locales.manyMinutes, allMinutesUntil));
            return true;
          }

          const hoursUntil = Math.floor(allMinutesUntil / 60);

          if (hoursUntil < 2) toast(locales.oneHour);
          else toast(formatString(locales.manyHours, hoursUntil));
          return true;
        };

        const sunriseLocales = {
          manyHours: l.settings.general.colorTheme.sunriseInHours,
          oneHour: l.settings.general.colorTheme.sunriseInHour,
          manyMinutes: l.settings.general.colorTheme.sunriseInMinutes,
          oneMinute: l.settings.general.colorTheme.sunriseInMinute,
        };

        const sunsetLocales = {
          manyHours: l.settings.general.colorTheme.sunsetInHours,
          oneHour: l.settings.general.colorTheme.sunsetInHour,
          manyMinutes: l.settings.general.colorTheme.sunsetInMinutes,
          oneMinute: l.settings.general.colorTheme.sunsetInMinute,
        };

        if (showToastUntilNextTime(now, sunCalculationResult.sunrise, sunriseLocales)) return;
        if (showToastUntilNextTime(now, sunCalculationResult.sunset, sunsetLocales)) return;

        const tomorrow = new Date(now.getTime());
        tomorrow.setDate(tomorrow.getDate() + 1);

        const sunCalculationTomorrowResult = SunCalc.getTimes(tomorrow, location.latitude, location.longitude, 0);
        showToastUntilNextTime(tomorrow, sunCalculationTomorrowResult.sunrise, sunriseLocales);
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
