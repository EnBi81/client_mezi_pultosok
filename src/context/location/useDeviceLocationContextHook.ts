import { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import { useSettings } from '../../hooks/useSettings';
import { toast } from '../../utils/utils';
import { useLocale } from '../../hooks/useLocale';
import DeviceCountry from 'react-native-device-country';
import RNCountry from 'react-native-countries';

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

  function updateLocation({ displayErrorToastMessage }: { displayErrorToastMessage?: boolean }) {
    const granted = PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);

    granted
      .then((granted) => {
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          toast(l.location.permissionDenied);
          modifySettings((settings) => (settings.locationCache.locationAccess = 'denied'));

          return;
        }

        Geolocation.getCurrentPosition(
          (position) => {
            DeviceCountry.getCountryCode()
              .then((result) => {
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
              .catch(() => {
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
      })
      .catch((err) => console.log('error while requesting device location: ', err));
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
