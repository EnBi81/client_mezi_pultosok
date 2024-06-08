import { useSettings } from '../../settings/hooks/useSettings';
import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { toast } from '../../utils';
import { useLocale } from '../../locale/hooks/useLocale';
import { useSunPosition } from '../hooks/useSunPosition';

export const ThemeManager = ({ children }: { children: React.ReactNode }) => {
  const { settings, modifySettings } = useSettings();
  const { nextSunEvent } = useSunPosition();
  const { l } = useLocale();

  // set color theme
  useEffect(() => {
    if (settings.colorThemeProps.type === 'light') {
      Appearance.setColorScheme('light');
    }
    if (settings.colorThemeProps.type === 'dark') {
      Appearance.setColorScheme('dark');
    }
    if (settings.colorThemeProps.type === 'user-preference') {
      Appearance.setColorScheme(null);
    }
  }, [settings.colorThemeProps.type, settings.locationCache.locationAccess]);

  // sun sync
  useEffect(() => {
    if (settings.colorThemeProps.type !== 'custom-sunsync') {
      return;
    }

    if (settings.locationCache.locationAccess === 'denied') {
      modifySettings((settings) => (settings.colorThemeProps.type = 'user-preference'));
      toast(l.settings.general.colorTheme.sunSyncModeTurnedOffBecauseLocationDenied);
      return;
    }

    if (!nextSunEvent) return;

    if (
      nextSunEvent.type === 'sunrise' ||
      nextSunEvent.type === 'golden-hour-end-morning' ||
      nextSunEvent.type === 'sunset'
    ) {
      Appearance.setColorScheme('dark');
    }
    if (nextSunEvent.type === 'golden-hour-evening') {
      Appearance.setColorScheme('light');
    }
  }, [settings.colorThemeProps.type, settings.locationCache.locationAccess, nextSunEvent]);

  return children;
};
