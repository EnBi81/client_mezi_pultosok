import {useEffect, useState} from "react";
import {WorkingDaySchedule} from "../interfaces/WorkingDaySchedule";
import Toast from 'react-native-toast-message';
import PultosokSharedPreferences from 'react-native-shared-preferences';

export const usePultosokData = () => {
    const [workingDays, setWorkingDays] = useState<WorkingDaySchedule[]>([]);
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        fetch('http://176.31.93.249:25566/spreadsheet-data')
            .then(data => {
                if(!data.ok)
                    throw new Error('Response Failed');

                return data.json();
            })
            .then(data => {
                let arr = data;
                if(!Array.isArray(arr))
                    throw new Error('Invalid Response (err 12425)')

                arr = arr.map(d => {
                    const date = new Date(d.date);

                    return {
                        ...d,
                        dateStringShort: date.toLocaleDateString(undefined, { dateStyle: 'short' }),
                        dateStringLong: date.toLocaleDateString(undefined, { weekday: 'long' })
                    };
                })

                setWorkingDays(arr);

                PultosokSharedPreferences.setName("com.client_mez_pultosok.PultosokSharedPreferences");
                PultosokSharedPreferences.setItem("apiData", JSON.stringify(arr));

                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Pultosok Refreshed',
                    text2: '',
                });
            })
            .catch(err => {
                console.error(err)
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Failed to load data.',
                    text2: '',
                });
            })
    }, [counter])

    useEffect(() => {
        const interval = setInterval(() => {
            refresh();
        }, 3 * 60 * 60 * 1000);

        return () => clearInterval(interval);
    }, [])

    function refresh() {
        setCounter(prev => prev + 1)
    }

    return {
        workingDays,
        refresh: refresh
    };
}