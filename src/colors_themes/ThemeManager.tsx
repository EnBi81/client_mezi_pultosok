import { useSettings } from '../settings/hooks/useSettings';
import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { toast } from '../utils';
import { useDeviceLocation } from '../location/hooks/useDeviceLocation';
import SunCalc from 'suncalc';
import { useLocale } from '../locale/hooks/useLocale';

export const ThemeManager = ({ children }: { children: React.ReactNode }) => {
  const { settings, modifySettings } = useSettings();
  const { location } = useDeviceLocation();
  const [sunSyncCounter, setSunSyncCounter] = useState(0);
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

    if (location.latitude === undefined || location.longitude === undefined) return;

    const now = new Date();
    const sunCalculationResult = SunCalc.getTimes(now, location.latitude, location.longitude, 0);

    const calculateTimeout = (date: Date, sunCalculationResult) => {
      const minute = 60 * 1000;

      const isBeforeSunrise = date.getTime() < sunCalculationResult.sunrise.getTime();
      if (isBeforeSunrise) return sunCalculationResult.sunrise.getTime() - date.getTime() + minute;

      const isBeforeSunset = date.getTime() < sunCalculationResult.sunset.getTime();
      if (isBeforeSunset) return sunCalculationResult.sunset.getTime() - date.getTime() + minute;

      // return next day 1 minute after midnight
      const oneMinAfterNextMidnight = new Date(date.getTime());
      oneMinAfterNextMidnight.setDate(oneMinAfterNextMidnight.getDate() + 1);
      oneMinAfterNextMidnight.setHours(0, 1, 0);

      return oneMinAfterNextMidnight.getTime() - date.getTime();
    };

    const setColorScheme = (date: Date) => {
      const sunCalculationResult = SunCalc.getTimes(date, location.latitude, location.longitude, 0);

      const isAfterSunrise = date.getTime() > sunCalculationResult.sunrise.getTime();
      const isBeforeSunset = date.getTime() < sunCalculationResult.sunset.getTime();

      let colorScheme;
      if (isAfterSunrise && isBeforeSunset) {
        colorScheme = 'light';
      } else {
        colorScheme = 'dark';
      }

      Appearance.setColorScheme(colorScheme);
    };

    // set it for now
    setColorScheme(now);

    // set timer until reaching the next point
    const timeoutMS = calculateTimeout(now, sunCalculationResult);
    const timeout = setTimeout(() => {
      setSunSyncCounter((num) => num + 1);
    }, timeoutMS);

    const trigger = new Date();
    trigger.setTime(trigger.getTime() + timeoutMS);

    return () => clearTimeout(timeout);

    /*
      {
        // sunrise (top edge of the sun appears on the horizon)
        "sunrise": "2024-06-07T12:48:47.622Z",
        // sunrise ends (bottom edge of the sun touches the horizon)
        "sunriseEnd": "2024-06-07T12:51:53.113Z",
        // morning golden hour (soft light, best time for photography) ends
        "goldenHourEnd": "2024-06-07T13:27:27.627Z",

        // sunset starts (bottom edge of the sun touches the horizon)
        "sunsetStart": "2024-06-08T03:25:35.941Z",
        // sunset (sun disappears below the horizon, evening civil twilight starts)
        "sunset": "2024-06-08T03:28:41.432Z",
        // evening golden hour starts
        "goldenHour": "2024-06-08T02:50:01.427Z"
      }
    */
  }, [settings.colorThemeProps.type, settings.locationCache.locationAccess, sunSyncCounter]);

  return children;
};
