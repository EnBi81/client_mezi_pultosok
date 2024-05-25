import AsyncStorage from '@react-native-async-storage/async-storage';
import {WorkingDaySchedule} from "../interfaces/WorkingDaySchedule";
import {useEffect, useState} from "react";

interface CacheDataObject {
    data: WorkingDaySchedule[];
    cacheTime: number;
}

export const usePultosokDataCaching = () => {
    const dataCacheKey = 'working-days-cache-key';
    const [cachedData, setCachedData] = useState<CacheDataObject>()
    const [isInitialCacheLoaded, setIsInitialCacheLoaded] = useState<boolean>(false)

    const getData = async () => {
        console.log('get cache')
        const jsonValue = await AsyncStorage.getItem(dataCacheKey);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    };

    const storeData = async (value) => {
        console.log('store cache')
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(dataCacheKey, jsonValue);
    };

    useEffect(() => {
        getData()
            .then(data => {
                if(data !== null)
                    setCachedData(data);

                setIsInitialCacheLoaded(true)
            })
            .catch(() => {
                setIsInitialCacheLoaded(true)
                console.log('could not find cached data');
            })
    }, [])


    const cacheData = (data: WorkingDaySchedule[]) => {
        const toBeCachedData: CacheDataObject = {
            data: data,
            cacheTime: new Date().getTime(),
        }

        storeData(toBeCachedData)
            .then(() => {
                setCachedData(toBeCachedData)
            })
            .catch(err => {
                console.error('Failed to cache data', err);
            })
    }

    return {
        cacheData: cacheData,
        isInitialCacheLoaded,
        cachedData
    }
}