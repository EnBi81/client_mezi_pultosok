import SunCalc from 'suncalc';
import { useEffect, useState } from 'react';
import { useDeviceLocation } from '../../hooks/useDeviceLocation';
import { formatString } from '../../utils/utils';
import { useLocale } from '../../hooks/useLocale';
import { SunEvent } from '../../interfaces/SunEvent';
import { useAppState } from '../../hooks/useAppState';

export const useSunPositionContextHook = () => {
  const { location } = useDeviceLocation();
  const [nextEvent, setNextEvent] = useState<SunEvent>();
  const [nextEventCounter, setNextEventCounter] = useState(0);
  const { l } = useLocale();
  const { onFocusCounter } = useAppState();

  function getSunTimes(date: Date) {
    return SunCalc.getTimes(date, location.latitude, location.longitude, 0);
  }

  function getNextEvent(): SunEvent {
    // now
    const now = new Date();
    const nowTime = now.getTime();

    function newDate() {
      return new Date();
    }

    const todaySunTimes = getSunTimes(now);
    /*
      {
        // sunrise (top edge of the sun appears on the horizon)
        "sunrise": "2024-06-07T12:48:47.622Z",
        // sunrise ends (bottom edge of the sun touches the horizon)
        "sunriseEnd": "2024-06-07T12:51:53.113Z",
        // morning golden hour (soft light, best time for photography) ends
        "goldenHourEnd": "2024-06-07T13:27:27.627Z",

        // evening golden hour starts
        "goldenHour": "2024-06-08T02:50:01.427Z"
        // sunset starts (bottom edge of the sun touches the horizon)
        "sunsetStart": "2024-06-08T03:25:35.941Z",
        // sunset (sun disappears below the horizon, evening civil twilight starts)
        "sunset": "2024-06-08T03:28:41.432Z",
      }
    */

    const isBeforeSunrise = nowTime < todaySunTimes.sunrise.getTime();
    if (isBeforeSunrise) {
      return {
        type: 'sunrise',
        startAt: todaySunTimes.sunrise,
        getDisplayTextUntil: () =>
          timeUntilString({
            secondsUntil: secondsUntil(newDate(), todaySunTimes.sunrise),
            eventName: l.sunEvents.sunrise,
          }),
      };
    }

    const isBeforeMorningGoldenHourEnd = nowTime < todaySunTimes.goldenHourEnd.getTime();
    if (isBeforeMorningGoldenHourEnd) {
      return {
        type: 'golden-hour-end-morning',
        startAt: todaySunTimes.goldenHourEnd,
        getDisplayTextUntil: () =>
          timeUntilString({
            secondsUntil: secondsUntil(newDate(), todaySunTimes.goldenHourEnd),
            eventName: l.sunEvents.goldenHourEndMorning,
          }),
      };
    }

    const isBeforeEveningGoldenHour = nowTime < todaySunTimes.goldenHour.getTime();
    if (isBeforeEveningGoldenHour) {
      return {
        type: 'golden-hour-evening',
        startAt: todaySunTimes.goldenHour,
        getDisplayTextUntil: () =>
          timeUntilString({
            secondsUntil: secondsUntil(newDate(), todaySunTimes.goldenHour),
            eventName: l.sunEvents.golderHourEvening,
          }),
      };
    }

    const isBeforeSunset = nowTime < todaySunTimes.sunset.getTime();
    if (isBeforeSunset) {
      return {
        type: 'sunset',
        startAt: todaySunTimes.sunset,
        getDisplayTextUntil: () =>
          timeUntilString({
            secondsUntil: secondsUntil(newDate(), todaySunTimes.sunset),
            eventName: l.sunEvents.sunset,
          }),
      };
    }

    // if it is after sunset, then get the next day sunrise
    const tomorrow = new Date(now.getTime());
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowSunTimes = getSunTimes(tomorrow);

    return {
      type: 'sunrise',
      startAt: tomorrowSunTimes.sunrise,
      getDisplayTextUntil: () =>
        timeUntilString({
          secondsUntil: secondsUntil(newDate(), tomorrowSunTimes.sunrise),
          eventName: l.sunEvents.sunrise,
        }),
    };
  }

  function timeUntilString({ secondsUntil, eventName }: { secondsUntil: number; eventName: string }): string {
    if (secondsUntil < 5) {
      return formatString(l.settings.general.colorTheme.eventHappeningNow, eventName);
    }
    if (secondsUntil < 60) {
      return formatString(l.settings.general.colorTheme.eventIn, eventName, secondsUntil, l.time.seconds);
    }

    const minutesUntil = Math.floor(secondsUntil / 60);
    if (minutesUntil < 2) {
      return formatString(l.settings.general.colorTheme.eventIn, eventName, minutesUntil, l.time.minute);
    }
    if (minutesUntil < 60) {
      return formatString(l.settings.general.colorTheme.eventIn, eventName, minutesUntil, l.time.minutes);
    }

    const hoursUntil = Math.floor(minutesUntil / 60);
    if (hoursUntil < 2) {
      return formatString(l.settings.general.colorTheme.eventIn, eventName, hoursUntil, l.time.hour);
    }
    return formatString(l.settings.general.colorTheme.eventIn, eventName, hoursUntil, l.time.hours);
  }

  function secondsUntil(from: Date, to: Date) {
    return Math.round((to.getTime() - from.getTime()) / 1000);
  }

  // set initial sun event
  useEffect(() => {
    if (location.latitude === undefined || location.longitude === undefined) return;

    setNextEvent(getNextEvent());
  }, [location.longitude, location.latitude, l, nextEventCounter, onFocusCounter]);

  // update next event
  useEffect(() => {
    if (!nextEvent) return;

    // if the next event is available, set the timer for the event after the next event
    const now = new Date();
    const nextEventTime = new Date(nextEvent.startAt);

    const second = 1000;
    const timeoutMS = nextEventTime.getTime() - now.getTime() + 5 * second;

    const timeout = setTimeout(() => {
      setNextEventCounter((prev) => prev + 1);
    }, timeoutMS);

    return () => clearTimeout(timeout);
  }, [nextEvent]);

  return {
    nextEvent: nextEvent,
  };
};
