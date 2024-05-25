import {useEffect, useState} from "react";
import {WorkingDaySchedule} from "../interfaces/WorkingDaySchedule";
import Toast from 'react-native-toast-message';
import PultosokSharedPreferences from 'react-native-shared-preferences';
import {usePultosokDataNetworking} from "./usePultosokDataNetworking";
import {usePultosokDataCaching} from "./usePultosokDataCaching";

export const usePultosokData = () => {
    const { refresh, data: networkingData, isRefreshing, error: networkingError } = usePultosokDataNetworking();
    const { cachedData, cacheData, isInitialCacheLoaded } = usePultosokDataCaching();
    const [workingDays, setWorkingDays] = useState<WorkingDaySchedule[]>();

    // handling cache x network data
    useEffect(() => {
        if(!isInitialCacheLoaded)
            return;

        // if no data is available, skip
        if(!cachedData && !networkingData)
            return;

        // if only the cache data is available, load that
        if(cachedData && !networkingData){
            setWorkingDays(cachedData.data);
            return;
        }

        const now = new Date().getTime();

        // if no cache data is available but the data from the server is, then load that
        if(!cachedData && networkingData){
            const data = networkingData.map(d => ({
                ...d,
                isNew: true,
                isNewDateRegistered: now,
            }));

            cacheData(data);
            setWorkingDays(data);
            return;
        }

        // double-checking
        if(!networkingData || !cachedData)
            return;

        // here both the networking and cache data is available
        const days: WorkingDaySchedule[] = networkingData.map(d => {
            const cachedDay = cachedData.data.find(f => f.date === d.date);
            let isNew = false;
            let newDateRegistered = undefined;

            if(!cachedDay){
                isNew = true;
                newDateRegistered = now;
            }
            // if in the cache it was set to new
            else if(cachedDay.isNew){
                newDateRegistered = cachedDay.isNewDateRegistered ?? now;

                const now = new Date().getTime();
                const newThresholdMilliSeconds = 1000 * 60 * 60 * 24; // 1 day
                //const newThresholdMilliSeconds = 1000 * 60; // 1 minute
                if(now - newDateRegistered < newThresholdMilliSeconds){
                    isNew = true;
                }
            }
            else {
                isNew = (JSON.stringify(d.cikola) !== JSON.stringify(cachedDay.cikola)) ||
                    (JSON.stringify(d.doborgaz) !== JSON.stringify(cachedDay.doborgaz));

                if(isNew){
                    newDateRegistered = now;
                }
            }

            return {
                ...d,
                isNewDateRegistered: newDateRegistered,
                isNew: isNew
            }
        })

        setWorkingDays(days);
        cacheData(days);

    }, [isInitialCacheLoaded, networkingData]);

    // sending data to the widget
    useEffect(() => {
        if(!workingDays)
            return;

        PultosokSharedPreferences.setName("com.client_mez_pultosok.PultosokSharedPreferences");
        PultosokSharedPreferences.setItem("apiData", JSON.stringify(workingDays));
    }, [workingDays])


    useEffect(() => {
        if(networkingError.isError) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: networkingError.errorMessage,
                text2: '',
            });

            return;
        }

        Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Pultosok Updated',
            text2: '',
        });

    }, [networkingData, networkingError])

    useEffect(() => {
        const interval = setInterval(() => {
            refresh();
        }, 3 * 60 * 60 * 1000);

        return () => clearInterval(interval);
    }, [])


    return {
        workingDays,
        refresh: refresh,
        isRefreshing
    };
}