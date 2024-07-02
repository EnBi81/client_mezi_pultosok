import { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import { useSettings } from '../../hooks/useSettings';
import { toast } from '../../utils/utils';
import { useLocale } from '../../hooks/useLocale';
import DeviceCountry from 'react-native-device-country';
import RNCountry from 'react-native-countries';
import { OSPlatform } from '../../utils/OSPlatform';

export const useDeviceLocationContextHook = () => {
  const { settings, modifySettings } = useSettings();
  const [country, setCountry] = useState({
    countryCode: '-',
    countryName: '-',
  });
  const { l } = useLocale();

  useEffect(() => {
    // if we already got the location once, don't get it again
    if (settings.locationCache.locationAccess === 'granted') return;
    // dont request the device location if we don't need it
    if (settings.colorThemeProps.type !== 'custom-sunsync') return;

    updateLocation({});
  }, [settings.colorThemeProps.type]);

  async function updateLocation({ displayErrorToastMessage }: { displayErrorToastMessage?: boolean }) {
    const requestPermission = OSPlatform.select({
      android: async () => {
        const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
        return result === PermissionsAndroid.RESULTS.GRANTED;
      },
      ios: async () => {
        const result = await Geolocation.requestAuthorization('whenInUse');
        return result === 'granted';
      }
    })

    const permissionGranted = await requestPermission();
    if(!permissionGranted) {
      toast(l.location.permissionDenied);
      modifySettings((settings) => (settings.locationCache.locationAccess = 'denied'));
      return;
    }
    

    Geolocation.getCurrentPosition(
      (position) => {
        DeviceCountry.getCountryCode()
          .then((result) => {
            console.log('device country result: ', result)
            const countryCode = result.code.toUpperCase();
            const country = RNCountry.getCountryNamesWithCodes.find((c) => c.code === countryCode);
            if (!country) {
              throw new Error('Country is undefined');
            }

            setCountry({
              countryCode: country.code,
              countryName: country.name,
            });
          })
          .catch((err) => {
            console.log('Device country error: ', err)
            setCountry({
              countryName: '-',
              countryCode: '-',
            });
          });

        modifySettings(
          (settings) =>
            (settings.locationCache = {
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
              locationAccess: 'granted',
            }),
        );
      },
      (error) => {
        if (!displayErrorToastMessage) {
          return;
        }
        if (error.code === 1) {
          toast(l.location.permissionDenied);
        } else if (error.code === 2) {
          toast(l.location.providerNotAvailable);
        } else if (error.code === 3) {
          toast(l.location.requestTimedOut);
        } else if (error.code === 4) {
          toast(l.location.googlePlayNotAvailable);
        } else if (error.code === 5) {
          toast(l.location.serviceNotAvailable);
        } else {
          toast(l.location.error);
        }
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
    );
  }

  return {
    location: {
      latitude: settings.locationCache.latitude,
      longitude: settings.locationCache.longitude,
      access: settings.locationCache.locationAccess,
    },
    deviceCountry: {
      code: country.countryCode,
      name: country.countryName,
    },
    updateLocation: () => updateLocation({ displayErrorToastMessage: true }),
  };
};
